/**
 * Farese Geocoding API - Cloudflare Worker
 *
 * Geocoding service using Photon API for international coverage.
 */

export interface Env {
	ENVIRONMENT: string;
}

interface GeocodingResult {
	name: string;
	coordinates: [number, number];
	city?: string;
	state?: string;
	country?: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const { pathname, method } = { pathname: url.pathname, method: request.method };

		// CORS headers
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json',
		};

		// Handle CORS preflight
		if (method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		try {
			// Health check endpoints
			if (pathname === '/' || pathname === '/health') {
				return jsonResponse({
					status: 'healthy',
					message: 'Farese Geocoding API is running'
				}, corsHeaders);
			}

			// GET /v1/geocode?q=Brisbane - Geocode place name
			if (pathname === '/v1/geocode' && method === 'GET') {
				return await handleGeocode(request, corsHeaders);
			}

			// Not found
			return jsonResponse({ error: 'Not found' }, corsHeaders, 404);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error';
			return jsonResponse({ error: message }, corsHeaders, 500);
		}
	},
};

/**
 * Handle GET /v1/geocode - Geocode place name using Photon API
 */
async function handleGeocode(
	request: Request,
	corsHeaders: Record<string, string>
): Promise<Response> {
	const url = new URL(request.url);
	const query = url.searchParams.get('q');
	const limit = parseInt(url.searchParams.get('limit') || '5', 10);

	if (!query) {
		return jsonResponse({ error: 'Query parameter "q" is required' }, corsHeaders, 400);
	}

	if (query.length < 3) {
		return jsonResponse({ error: 'Query must be at least 3 characters' }, corsHeaders, 400);
	}

	try {
		const results = await geocodeWithPhoton(query, limit);
		return jsonResponse({ results }, corsHeaders);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Geocoding failed';
		return jsonResponse({ error: message }, corsHeaders, 500);
	}
}

/**
 * Geocode using Photon API (OpenStreetMap-based, international coverage)
 */
async function geocodeWithPhoton(query: string, limit: number): Promise<GeocodingResult[]> {
	const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=${limit}`;

	const response = await fetch(url, {
		headers: {
			'User-Agent': 'Farese.com Church Directory'
		}
	});

	if (!response.ok) {
		throw new Error(`Photon API error: ${response.status}`);
	}

	const data = await response.json() as {
		features?: Array<{
			geometry: {
				coordinates: [number, number];
			};
			properties: {
				name?: string;
				city?: string;
				state?: string;
				country?: string;
			};
		}>;
	};

	if (!data.features || data.features.length === 0) {
		return [];
	}

	return data.features.map(feature => ({
		name: feature.properties.name || 'Unknown',
		coordinates: feature.geometry.coordinates,
		city: feature.properties.city,
		state: feature.properties.state,
		country: feature.properties.country,
	}));
}

/**
 * Helper to create JSON responses
 */
function jsonResponse(data: any, headers: Record<string, string>, status: number = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers,
	});
}
