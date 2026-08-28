#!/usr/bin/env node
/**
 * Removes designer-guide build caches, dist output, and generated WebP images.
 * PNG screenshot sources are kept.
 */
import {existsSync, readdirSync, rmSync, unlinkSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const guideRoot = join(__dirname, '..');
const assetsRoot = join(guideRoot, 'public/assets/guide');

/** @type {{path: string, label: string}[]} */
const directories = [
  {path: join(guideRoot, 'dist'), label: 'dist/'},
  {path: join(guideRoot, '.astro'), label: '.astro/'},
  {path: join(guideRoot, 'node_modules/.astro'), label: 'node_modules/.astro/'},
];

/** @type {{path: string, label: string}[]} */
const files = [{path: join(guideRoot, 'src/data/navigation.json'), label: 'src/data/navigation.json'}];

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listWebpFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  /** @type {string[]} */
  const found = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...listWebpFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.webp')) {
      found.push(fullPath);
    }
  }
  return found;
}

/** @param {string} message */
function log(message) {
  console.log(message);
}

let removed = 0;

for (const entry of directories) {
  if (!existsSync(entry.path)) {
    continue;
  }
  rmSync(entry.path, {recursive: true, force: true});
  log(`Removed ${entry.label}`);
  removed += 1;
}

for (const entry of files) {
  if (!existsSync(entry.path)) {
    continue;
  }
  unlinkSync(entry.path);
  log(`Removed ${entry.label}`);
  removed += 1;
}

const webpFiles = listWebpFiles(assetsRoot);
for (const webpPath of webpFiles) {
  unlinkSync(webpPath);
  log(`Removed ${relative(guideRoot, webpPath)}`);
  removed += 1;
}

if (removed === 0) {
  log('Nothing to clean.');
} else {
  log(`Cleaned ${removed} path${removed === 1 ? '' : 's'}.`);
}
