/**
 * Checks internal link integrity for the designer guide.
 * Internal links are markdown links whose href starts with "/" and points inside the guide.
 * Run: node scripts/check-links.mjs
 */
import { readdirSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONTENT = join(ROOT, 'content');

const EXTERNAL_PREFIXES = ['http:', 'https:', 'mailto:', 'tel:', '//'];
const DOCS_PROTOCOL = 'docs:';

/** @type {Set<string>} */
let validFiles = null;

/**
 * Walks a directory recursively and collects all .md/.mdx file paths relative to `base`.
 * @param {string} dir
 * @param {string} base
 * @returns {string[]}
 */
function walkDir(dir, base) {
  /** @type {string[]} */
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full, base));
    } else if (/\.(md|mdx)$/i.test(entry)) {
      results.push(full.slice(base.length + 1));
    }
  }
  return results;
}

/**
 * Collects all valid internal link targets.
 * @returns {Set<string>}
 */
function collectValidFiles() {
  if (validFiles) {
    return validFiles;
  }

  const files = walkDir(CONTENT, CONTENT);
  validFiles = new Set();

  for (const rel of files) {
    const ext = extname(rel);
    const slug = rel.slice(0, -ext.length);
    validFiles.add(slug);
    // index pages resolve their directory as well
    if (basename(slug) === 'index') {
      validFiles.add(dirname(slug));
    }
  }

  return validFiles;
}

/**
 * Resolves an internal href (starting with "/") to a content file slug.
 * @param {string} href href without hash
 * @returns {string | null}
 */
function resolveInternalHref(href) {
  // "/" → index
  if (href === '/') {
    return 'index';
  }
  // Leading slash
  const path = href.startsWith('/') ? href.slice(1) : href;
  // Trailing slash
  const clean = path.endsWith('/') ? path.slice(0, -1) : path;
  return clean || null;
}

/**
 * @param {string} href
 * @returns {boolean}
 */
function isExternal(href) {
  return EXTERNAL_PREFIXES.some((p) => href.startsWith(p));
}

/**
 * @param {string} line
 * @returns {{ href: string, start: number, end: number }[]}
 */
function extractLinks(line) {
  /** @type {{ href: string, start: number, end: number }[]} */
  const links = [];
  const re = /]\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(line)) !== null) {
    links.push({ href: match[1], start: match.index, end: match.index + match[0].length });
  }
  return links;
}

/**
 * Checks a single markdown file for broken internal links.
 * @param {string} contentPath path relative to CONTENT
 * @param {Set<string>} targets
 * @returns {Promise<{ file: string, errors: { line: number, href: string, suggestion?: string }[] }>}
 */
async function checkFile(contentPath, targets) {
  const fullPath = join(CONTENT, contentPath);
  const content = await readFile(fullPath, 'utf-8');
  const lines = content.split('\n');
  /** @type {{ line: number, href: string, suggestion?: string }[]} */
  const errors = [];

  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineNum = i + 1;

    // Track fenced code blocks to skip links inside them
    if (/^```/.test(line.trim())) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      continue;
    }

    const links = extractLinks(line);
    for (const link of links) {
      // Skip external links
      if (isExternal(link.href)) {
        continue;
      }
      // Skip docs: protocol (external)
      if (link.href.startsWith(DOCS_PROTOCOL)) {
        continue;
      }
      // Skip pure anchors
      if (link.href.startsWith('#')) {
        continue;
      }

      const hashIndex = link.href.indexOf('#');
      const hrefWithoutHash = hashIndex === -1 ? link.href : link.href.slice(0, hashIndex);

      // Only check absolute internal links
      if (!hrefWithoutHash.startsWith('/')) {
        // Could be relative links - skip for now (none expected)
        continue;
      }

      const slug = resolveInternalHref(hrefWithoutHash);
      if (slug === null) {
        continue;
      }

      if (!targets.has(slug)) {
        errors.push({ line: lineNum, href: link.href });
      }
    }
  }

  return { file: contentPath, errors };
}

/**
 * @param {string} slug
 * @param {Set<string>} targets
 * @returns {string | undefined}
 */
function fuzzyMatch(slug, targets) {
  const segments = slug.split('/');
  const last = segments[segments.length - 1];
  for (const target of targets) {
    const targetSegments = target.split('/');
    const targetLast = targetSegments[targetSegments.length - 1];
    if (targetLast.includes(last) && targetSegments.length === segments.length) {
      const matchCount = segments.filter((s, i) => targetSegments[i] === s).length;
      if (matchCount >= segments.length - 1) {
        return target;
      }
    }
  }
  return undefined;
}

async function main() {
  const targets = collectValidFiles();
  const contentFiles = walkDir(CONTENT, CONTENT);

  console.log(`Checking ${contentFiles.length} content files against ${targets.size} valid targets...\n`);

  let totalErrors = 0;
  /** @type {{ file: string, errors: { line: number, href: string }[] }[]} */
  const broken = [];

  for (const file of contentFiles) {
    const result = await checkFile(file, targets);
    if (result.errors.length > 0) {
      broken.push(result);
      totalErrors += result.errors.length;
    }
  }

  if (broken.length === 0) {
    console.log('All internal links are valid.\n');
    process.exit(0);
  }

  for (const entry of broken) {
    console.log(entry.file);
    for (const err of entry.errors) {
      const hashIndex = err.href.indexOf('#');
      const hrefWithoutHash = hashIndex === -1 ? err.href : err.href.slice(0, hashIndex);
      const slug = resolveInternalHref(hrefWithoutHash);
      const suggestion = fuzzyMatch(slug, targets);
      const hint = suggestion ? ` (did you mean "/${suggestion}"?)` : '';
      console.log(`  ${err.line}:${err.href}${hint}`);
    }
    console.log();
  }

  console.log(`${totalErrors} broken internal link(s) found in ${broken.length} file(s).\n`);
  process.exit(1);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isCli) {
  await main();
}
