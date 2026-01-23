/**
 * Generate legacy static pages from templates.
 *
 * This TypeScript script replaces the Python 2 legacy/generate-text-directory.py
 * It reads church data from map/data.json, groups by region, and generates
 * static HTML pages using the legacy template, then copies everything to public/legacy/
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  statSync,
  copyFileSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Paths
const DATA_PATH = join(projectRoot, 'public', 'map', 'data.json');
const REGIONS_PATH = join(projectRoot, 'legacy', 'regions.json');
const TEMPLATE_PATH = join(projectRoot, 'legacy', 'text-dir-template.htm');
const LEGACY_DIR = join(projectRoot, 'legacy');
const OUTPUT_DIR = join(projectRoot, 'public', 'legacy');

// Types
interface ChurchProperties {
  name: string;
  address: string;
  website?: string;
  note?: string;
  region: string;
}

interface ChurchFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: ChurchProperties;
}

interface ChurchData {
  type: 'FeatureCollection';
  features: ChurchFeature[];
}

interface RegionMapping {
  code: string;
  'display-name': string;
  'file-name': string;
}

// Load region mappings
function loadRegionData(): RegionMapping[] {
  const content = readFileSync(REGIONS_PATH, 'utf-8');
  return JSON.parse(content);
}

// Get display name for a region code
function getRegionDisplayName(regions: RegionMapping[], code: string): string {
  const region = regions.find((r) => r.code === code);
  return region?.['display-name'] || code;
}

// Get file name for a region code
function getRegionFileName(regions: RegionMapping[], code: string): string {
  const region = regions.find((r) => r.code === code);
  return region?.['file-name'] || code.toLowerCase();
}

// Generate HTML for a list of churches
function generateChurchesHtml(churches: ChurchFeature[]): string {
  return churches
    .map((church) => {
      const { name, address, note, website } = church.properties;
      // Note: The original Python script doesn't escape HTML - the note field
      // already contains raw HTML from the legacy data
      const safeNote = note || '';
      const safeWebsite = website || '';

      // Match the exact format from the Python generator
      return `
        <tr>
        <td>
        <hr WIDTH="100%"></td>
        </tr>

        <tr>
        <td><b><font face="Calibri">${name}&nbsp;</font></b>
        <br><font face="Calibri">${address}</font>
        <br><font face="Calibri">${safeNote}</font>
        <br><font face="Calibri"><a href="http://${safeWebsite}">${safeWebsite}</a></font></td>
        </tr>
        `;
    })
    .join('');
}

// Generate HTML page for a region
function generateRegionPage(
  template: string,
  regionCode: string,
  churches: ChurchFeature[],
  regions: RegionMapping[]
): string {
  const displayName = getRegionDisplayName(regions, regionCode);
  const churchesHtml = generateChurchesHtml(churches);

  return template
    .replace(/{% REGION_NAME %}/g, displayName)
    .replace(/{% CHURCHES %}/g, churchesHtml);
}

// Group churches by region
function groupByRegion(
  churches: ChurchFeature[]
): Map<string, ChurchFeature[]> {
  const grouped = new Map<string, ChurchFeature[]>();

  for (const church of churches) {
    const region = church.properties.region;
    if (!grouped.has(region)) {
      grouped.set(region, []);
    }
    grouped.get(region)!.push(church);
  }

  return grouped;
}

// Copy static legacy files (excluding Python script and generated rbcd/*.htm)
function copyStaticLegacyFiles(): void {
  const rbcdDir = join(LEGACY_DIR, 'rbcd');
  const outputRbcdDir = join(OUTPUT_DIR, 'rbcd');

  // Ensure output directories exist
  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(outputRbcdDir, { recursive: true });

  function copyDir(src: string, dest: string, skipPatterns: RegExp[] = []) {
    mkdirSync(dest, { recursive: true });

    for (const entry of readdirSync(src)) {
      const srcPath = join(src, entry);
      const destPath = join(dest, entry);

      // Skip patterns
      if (skipPatterns.some((p) => p.test(entry))) {
        continue;
      }

      const stat = statSync(srcPath);
      if (stat.isDirectory()) {
        // Skip rbcd directory - we'll handle it specially
        if (entry !== 'rbcd') {
          copyDir(srcPath, destPath, skipPatterns);
        }
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }

  // Copy legacy root files (skip .py files and rbcd directory)
  copyDir(LEGACY_DIR, OUTPUT_DIR, [/\.py$/, /^rbcd$/]);

  // Copy ALL files from rbcd (including static HTML index pages like usa.htm, foreign.htm)
  // Generated region pages will overwrite old ones later
  if (existsSync(rbcdDir)) {
    for (const entry of readdirSync(rbcdDir)) {
      const srcPath = join(rbcdDir, entry);
      const destPath = join(outputRbcdDir, entry);
      const stat = statSync(srcPath);
      if (!stat.isDirectory()) {
        copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Main function
function main(): void {
  console.log('generate-legacy: Starting legacy site generation...');

  // Check if data file exists
  if (!existsSync(DATA_PATH)) {
    console.error(`Error: Church data not found at ${DATA_PATH}`);
    process.exit(1);
  }

  // Load data
  const churchData: ChurchData = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  const regions = loadRegionData();
  const template = readFileSync(TEMPLATE_PATH, 'utf-8');

  console.log(`  Loaded ${churchData.features.length} churches`);
  console.log(`  Loaded ${regions.length} region mappings`);

  // Copy static files first
  console.log('  Copying static legacy files...');
  copyStaticLegacyFiles();

  // Group churches by region
  const grouped = groupByRegion(churchData.features);
  console.log(`  Found ${grouped.size} regions with churches`);

  // Ensure output directory exists
  const rbcdOutputDir = join(OUTPUT_DIR, 'rbcd');
  mkdirSync(rbcdOutputDir, { recursive: true });

  // Generate pages for each region
  let generated = 0;
  for (const [regionCode, churches] of grouped) {
    const fileName = getRegionFileName(regions, regionCode);
    const displayName = getRegionDisplayName(regions, regionCode);
    const html = generateRegionPage(template, regionCode, churches, regions);
    const outputPath = join(rbcdOutputDir, `${fileName}.htm`);

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  Generated ${fileName}.htm (${displayName}: ${churches.length} churches)`);
    generated++;
  }

  console.log(`generate-legacy: Done! Generated ${generated} region pages to public/legacy/rbcd/`);
}

main();
