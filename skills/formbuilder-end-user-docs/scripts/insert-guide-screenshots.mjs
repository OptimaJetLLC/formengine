#!/usr/bin/env node
/**
 * Inserts screenshot img tags after UI-focused H2 sections in designer guide pages.
 */
import { readdirSync, statSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import defaultUiImages from '../data/default-ui-images.json' with { type: 'json' };
import pageSectionImages from '../data/guide-screenshot-map.json' with { type: 'json' };
import skipHeadingsList from '../data/skip-headings.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.resolve(__dirname, '../../../designer-guide/content');
const SKIP_HEADINGS = new Set(skipHeadingsList);

/** Longest prefix first so step-specific keys win over generic ones. */
const DEFAULT_UI_PREFIXES = Object.entries(defaultUiImages).sort(([a], [b]) => b.length - a.length);

/**
 * @param {string} dir
 * @param {string} [base]
 * @returns {string[]}
 */
function walkMarkdownFiles(dir, base = dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      files.push(...walkMarkdownFiles(full, base));
      continue;
    }
    if (name.endsWith('.md')) {
      files.push(path.relative(base, full));
    }
  }
  return files;
}

/**
 * @param {string} line
 */
function normalizeHeading(line) {
  const match = line.match(/^## (.+)$/);
  return match ? match[1].trim().toLowerCase() : null;
}

/**
 * @param {string[]} lines
 * @param {number} startIndex
 */
function hasImageBeforeNextSection(lines, startIndex) {
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      return false;
    }
    if (lines[i].includes('<img src=')) {
      return true;
    }
  }
  return false;
}

/**
 * @param {string} src
 * @param {string} alt
 */
function imgTag(src, alt) {
  return `<img src="${src}" alt="${alt}" />`;
}

/**
 * @param {string} relPath
 * @param {string} heading
 */
function resolveImage(relPath, heading) {
  const pageMap = pageSectionImages[relPath];
  if (pageMap?.[heading]) {
    return pageMap[heading];
  }

  for (const [prefix, value] of DEFAULT_UI_PREFIXES) {
    if (heading.startsWith(prefix)) {
      const [src, alt] = value.split('|');
      return { src, alt };
    }
  }

  return null;
}

/**
 * @param {string} heading
 */
function isUiHeading(heading) {
  return !SKIP_HEADINGS.has(heading);
}

/**
 * @param {string} relPath
 */
async function processFile(relPath) {
  const filePath = path.join(contentRoot, relPath);
  const content = await readFile(filePath, 'utf8');
  const lines = content.split('\n');
  let changed = false;
  const insertions = [];

  for (let i = 0; i < lines.length; i++) {
    const heading = normalizeHeading(lines[i]);
    if (!heading || !isUiHeading(heading)) {
      continue;
    }
    if (hasImageBeforeNextSection(lines, i)) {
      continue;
    }
    const image = resolveImage(relPath, heading);
    if (!image) {
      continue;
    }
    insertions.push({ index: i + 1, image, heading });
  }

  if (insertions.length === 0) {
    return false;
  }

  let offset = 0;
  for (const { index, image, heading } of insertions) {
    const insertAt = index + offset;
    let j = insertAt;
    while (j < lines.length && lines[j].trim() === '') {
      j++;
    }
    const block = ['', imgTag(image.src, image.alt), ''];
    lines.splice(j, 0, ...block);
    offset += block.length;
    changed = true;
    console.log(`  + ${relPath} :: ${heading}`);
  }

  if (changed) {
    await writeFile(filePath, lines.join('\n'));
  }
  return changed;
}

async function main() {
  const files = walkMarkdownFiles(contentRoot).sort();
  let count = 0;
  for (const file of files) {
    if (await processFile(file)) {
      count++;
    }
  }
  console.log(`Updated ${count} files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
