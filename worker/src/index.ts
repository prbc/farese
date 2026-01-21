/**
 * Farese API Worker
 * Handles church submission requests and creates GitHub PRs
 */

interface Env {
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
  GITHUB_BASE_BRANCH: string;
}

interface ChurchSubmission {
  action: 'add' | 'edit' | 'delete';
  church: {
    name: string;
    address: string;
    website?: string;
    region: string;
    note?: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  submitter: {
    email: string;
    notes?: string;
  };
}

interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    name: string;
    address: string;
    region: string;
    website?: string;
    note?: string;
  };
}

interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/submit-church' && request.method === 'POST') {
      return handleChurchSubmission(request, env);
    }

    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};

async function handleChurchSubmission(request: Request, env: Env): Promise<Response> {
  try {
    const submission: ChurchSubmission = await request.json();

    // Validate required fields
    const validation = validateSubmission(submission);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Create GitHub PR
    const prResult = await createGitHubPR(submission, env);

    return new Response(JSON.stringify({
      success: true,
      message: 'Submission received and PR created',
      prUrl: prResult.prUrl,
      prNumber: prResult.prNumber,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Submission error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process submission',
      details: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

function validateSubmission(submission: ChurchSubmission): { valid: boolean; error?: string } {
  if (!submission.action || !['add', 'edit', 'delete'].includes(submission.action)) {
    return { valid: false, error: 'Invalid action type' };
  }

  if (!submission.church?.name || submission.church.name.length < 2) {
    return { valid: false, error: 'Church name is required (min 2 characters)' };
  }

  if (!submission.church?.address || submission.church.address.length < 5) {
    return { valid: false, error: 'Address is required (min 5 characters)' };
  }

  if (!submission.church?.region) {
    return { valid: false, error: 'Region is required' };
  }

  if (!submission.geometry?.coordinates ||
      submission.geometry.coordinates.length !== 2) {
    return { valid: false, error: 'Valid coordinates are required' };
  }

  const [lng, lat] = submission.geometry.coordinates;
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    return { valid: false, error: 'Coordinates out of range' };
  }

  if (!submission.submitter?.email || !submission.submitter.email.includes('@')) {
    return { valid: false, error: 'Valid submitter email is required' };
  }

  return { valid: true };
}

async function createGitHubPR(
  submission: ChurchSubmission,
  env: Env
): Promise<{ prUrl: string; prNumber: number }> {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BASE_BRANCH } = env;
  const [owner, repo] = GITHUB_REPO.split('/');

  // Generate unique branch name
  const timestamp = Date.now();
  const sanitizedName = submission.church.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 30);
  const branchName = `church-${submission.action}-${sanitizedName}-${timestamp}`;

  // Step 1: Get the current SHA of the base branch
  const refResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${GITHUB_BASE_BRANCH}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Farese-API-Worker',
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!refResponse.ok) {
    throw new Error(`Failed to get base branch ref: ${await refResponse.text()}`);
  }

  const refData = await refResponse.json() as { object: { sha: string } };
  const baseSha = refData.object.sha;

  // Step 2: Create a new branch
  const createBranchResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs`,
    {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Farese-API-Worker',
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      }),
    }
  );

  if (!createBranchResponse.ok) {
    throw new Error(`Failed to create branch: ${await createBranchResponse.text()}`);
  }

  // Step 3: Get current data.json content
  const fileResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/public/map/data.json?ref=${branchName}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Farese-API-Worker',
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!fileResponse.ok) {
    throw new Error(`Failed to get data.json: ${await fileResponse.text()}`);
  }

  const fileData = await fileResponse.json() as { content: string; sha: string };
  const currentContent = JSON.parse(atob(fileData.content)) as GeoJSONFeatureCollection;

  // Step 4: Modify the data based on action
  const newFeature: GeoJSONFeature = {
    type: 'Feature',
    geometry: submission.geometry,
    properties: {
      name: submission.church.name,
      address: submission.church.address,
      region: submission.church.region,
      ...(submission.church.website && { website: submission.church.website }),
      ...(submission.church.note && { note: submission.church.note }),
    },
  };

  let modifiedContent: GeoJSONFeatureCollection;
  let changeDescription: string;

  switch (submission.action) {
    case 'add':
      modifiedContent = {
        ...currentContent,
        features: [...currentContent.features, newFeature],
      };
      changeDescription = `Add new church: ${submission.church.name}`;
      break;

    case 'edit':
      // Find and update existing church by name (simplified matching)
      const editIndex = currentContent.features.findIndex(
        (f) => f.properties.name.toLowerCase() === submission.church.name.toLowerCase()
      );
      if (editIndex === -1) {
        // If not found by exact name, add as new
        modifiedContent = {
          ...currentContent,
          features: [...currentContent.features, newFeature],
        };
        changeDescription = `Add church (edit submitted but not found): ${submission.church.name}`;
      } else {
        const updatedFeatures = [...currentContent.features];
        updatedFeatures[editIndex] = newFeature;
        modifiedContent = { ...currentContent, features: updatedFeatures };
        changeDescription = `Update church: ${submission.church.name}`;
      }
      break;

    case 'delete':
      const deleteIndex = currentContent.features.findIndex(
        (f) => f.properties.name.toLowerCase() === submission.church.name.toLowerCase()
      );
      if (deleteIndex === -1) {
        throw new Error(`Church not found for deletion: ${submission.church.name}`);
      }
      const filteredFeatures = currentContent.features.filter((_, i) => i !== deleteIndex);
      modifiedContent = { ...currentContent, features: filteredFeatures };
      changeDescription = `Remove church: ${submission.church.name}`;
      break;

    default:
      throw new Error(`Unknown action: ${submission.action}`);
  }

  // Step 5: Update the file in the branch
  const updateResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/public/map/data.json`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Farese-API-Worker',
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: changeDescription,
        content: btoa(JSON.stringify(modifiedContent, null, 2)),
        sha: fileData.sha,
        branch: branchName,
      }),
    }
  );

  if (!updateResponse.ok) {
    throw new Error(`Failed to update data.json: ${await updateResponse.text()}`);
  }

  // Step 6: Create pull request
  const prBody = `## ${submission.action.charAt(0).toUpperCase() + submission.action.slice(1)} Church Submission

### Church Details
- **Name:** ${submission.church.name}
- **Address:** ${submission.church.address}
- **Region:** ${submission.church.region}
${submission.church.website ? `- **Website:** ${submission.church.website}` : ''}
${submission.church.note ? `- **Notes:** ${submission.church.note}` : ''}

### Location
- **Coordinates:** [${submission.geometry.coordinates[0]}, ${submission.geometry.coordinates[1]}]

### Submitter
- **Email:** ${submission.submitter.email}
${submission.submitter.notes ? `- **Notes:** ${submission.submitter.notes}` : ''}

---
*Submitted via Farese.com church submission form*`;

  const prResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Farese-API-Worker',
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: changeDescription,
        head: branchName,
        base: GITHUB_BASE_BRANCH,
        body: prBody,
      }),
    }
  );

  if (!prResponse.ok) {
    throw new Error(`Failed to create PR: ${await prResponse.text()}`);
  }

  const prData = await prResponse.json() as { html_url: string; number: number };

  return {
    prUrl: prData.html_url,
    prNumber: prData.number,
  };
}
