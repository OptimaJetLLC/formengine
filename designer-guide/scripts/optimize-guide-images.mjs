/**
 * Generates preview and full WebP siblings for guide PNG screenshots.
 * Convention per PNG source:
 *   foo.light.png -> foo.light.preview.webp (1440px wide) + foo.light.full.webp (native resolution)
 *
 * Conversion is skipped when both WebP outputs exist and the PNG SHA-256 matches `data/webp-manifest.json`.
 * Commit the manifest whenever PNGs or Sharp options change so CI/git checkouts can skip without relying on mtimes.
 */
import {createHash} from 'node:crypto';
import {existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync} from 'node:fs';
import {availableParallelism} from 'node:os';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsRoot = join(__dirname, '../public/assets/guide');
const manifestPath = join(__dirname, '../data/webp-manifest.json');
const GUIDE_PREVIEW_MAX_WIDTH = 1440;
const WEBP_OPTIONS = {quality: 82, effort: 4};
const HASH_ALGORITHM = 'sha256';

/**
 * @typedef {{previewMaxWidth: number, quality: number, effort: number, hashAlgorithm: string}} WebpOptimizeOptions
 * @typedef {{options: WebpOptimizeOptions, files: Record<string, string>}} WebpManifest
 */

/**
 * @returns {WebpOptimizeOptions} the Sharp settings hashed into the skip cache
 */
function currentOptions() {
  return {
    previewMaxWidth: GUIDE_PREVIEW_MAX_WIDTH,
    quality: WEBP_OPTIONS.quality,
    effort: WEBP_OPTIONS.effort,
    hashAlgorithm: HASH_ALGORITHM,
  };
}

/**
 * @param {string} pngPath the PNG source path
 */
function webpOutputPaths(pngPath) {
  return {
    previewPath: pngPath.replace(/\.png$/, '.preview.webp'),
    fullPath: pngPath.replace(/\.png$/, '.full.webp'),
    legacyPath: pngPath.replace(/\.png$/, '.webp'),
  };
}

/**
 * @param {string} pngPath the PNG source path
 * @returns {string} the POSIX-style path relative to the guide assets root
 */
function pngManifestKey(pngPath) {
  return relative(assetsRoot, pngPath).replaceAll('\\', '/');
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listPngFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  const files = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listPngFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.png')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * @param {string} filePath the file to hash
 * @returns {string} hex digest
 */
function hashFile(filePath) {
  return createHash(HASH_ALGORITHM).update(readFileSync(filePath)).digest('hex');
}

/**
 * @param {unknown} options parsed manifest options
 * @returns {boolean} true when Sharp settings match this script
 */
function optionsMatch(options) {
  const current = currentOptions();
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    return false;
  }

  const recorded = /** @type {Record<string, unknown>} */ (options);
  return (
    recorded.previewMaxWidth === current.previewMaxWidth &&
    recorded.quality === current.quality &&
    recorded.effort === current.effort &&
    recorded.hashAlgorithm === current.hashAlgorithm
  );
}

/**
 * @returns {WebpManifest} the committed skip cache, or an empty manifest
 */
function loadManifest() {
  if (!existsSync(manifestPath)) {
    return {options: currentOptions(), files: {}};
  }

  const parsed = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`Invalid WebP manifest: ${manifestPath}`);
  }

  const files = parsed.files;
  if (files !== null && files !== undefined && (typeof files !== 'object' || Array.isArray(files))) {
    throw new Error(`Invalid WebP manifest files map: ${manifestPath}`);
  }

  return {
    options: /** @type {WebpOptimizeOptions} */ (parsed.options),
    files: /** @type {Record<string, string>} */ (files ?? {}),
  };
}

/**
 * @param {WebpManifest} manifest the updated skip cache
 */
function writeManifest(manifest) {
  const files = Object.fromEntries(Object.entries(manifest.files).sort(([left], [right]) => left.localeCompare(right)));
  const serialized = `${JSON.stringify({options: manifest.options, files}, null, 2)}\n`;
  const existing = existsSync(manifestPath) ? readFileSync(manifestPath, 'utf8') : '';
  if (existing === serialized) {
    return;
  }
  writeFileSync(manifestPath, serialized);
}

/**
 * @param {string} pngPath the PNG source path
 * @param {string} pngHash hex SHA-256 of the PNG bytes
 * @param {string | undefined} previousHash hash recorded in the manifest for this file
 * @returns {boolean} true when conversion can be skipped
 */
function shouldSkipOutputs(pngPath, pngHash, previousHash) {
  if (previousHash !== pngHash) {
    return false;
  }

  const {previewPath, fullPath} = webpOutputPaths(pngPath);
  return existsSync(previewPath) && existsSync(fullPath);
}

/**
 * @param {string} legacyPath
 */
function removeLegacyWebp(legacyPath) {
  if (!existsSync(legacyPath)) {
    return;
  }
  if (legacyPath.endsWith('.preview.webp') || legacyPath.endsWith('.full.webp')) {
    return;
  }
  unlinkSync(legacyPath);
}

/**
 * @template T
 * @template R
 * @param {T[]} items items to process
 * @param {number} concurrency maximum number of in-flight workers
 * @param {(item: T) => Promise<R>} fn mapper
 * @returns {Promise<R[]>} results in input order
 */
async function mapWithConcurrency(items, concurrency, fn) {
  if (items.length === 0) {
    return [];
  }

  const limit = Math.max(1, Math.min(concurrency, items.length));
  /** @type {R[]} */
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await fn(items[index]);
    }
  }

  await Promise.all(Array.from({length: limit}, () => worker()));
  return results;
}

/**
 * @param {string} pngPath the PNG source path
 * @param {string | undefined} previousHash hash recorded in the manifest for this file
 * @returns {Promise<{result: 'converted' | 'skipped', key: string, hash: string}>} conversion outcome
 */
async function convertPngToWebpVariants(pngPath, previousHash) {
  const pngHash = hashFile(pngPath);
  const key = pngManifestKey(pngPath);
  const {previewPath, fullPath, legacyPath} = webpOutputPaths(pngPath);

  if (shouldSkipOutputs(pngPath, pngHash, previousHash)) {
    removeLegacyWebp(legacyPath);
    return {result: 'skipped', key, hash: pngHash};
  }

  await sharp(pngPath)
    .resize({width: GUIDE_PREVIEW_MAX_WIDTH, withoutEnlargement: true})
    .webp(WEBP_OPTIONS)
    .toFile(previewPath);

  await sharp(pngPath).webp(WEBP_OPTIONS).toFile(fullPath);
  removeLegacyWebp(legacyPath);
  return {result: 'converted', key, hash: pngHash};
}

async function main() {
  const pngFiles = listPngFiles(assetsRoot).sort((left, right) => pngManifestKey(left).localeCompare(pngManifestKey(right)));
  const loaded = loadManifest();
  const previousFiles = optionsMatch(loaded.options) ? loaded.files : {};
  const concurrency = Math.max(1, availableParallelism());

  const outcomes = await mapWithConcurrency(pngFiles, concurrency, (pngPath) => {
    const key = pngManifestKey(pngPath);
    return convertPngToWebpVariants(pngPath, previousFiles[key]);
  });

  /** @type {Record<string, string>} */
  const files = {};
  let converted = 0;
  let skipped = 0;

  for (const outcome of outcomes) {
    files[outcome.key] = outcome.hash;
    if (outcome.result === 'converted') {
      converted += 1;
    } else {
      skipped += 1;
    }
  }

  writeManifest({options: currentOptions(), files});
  console.log(`Guide images: ${converted} PNG sets -> .preview.webp + .full.webp, ${skipped} unchanged (${concurrency} parallel)`);
}

await main();
