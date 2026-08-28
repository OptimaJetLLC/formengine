import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const CHANGEFREQ = 'monthly';
const LASTMOD_MARKER = '@@designer-guide-lastmod@@';

/**
 * Scans the content directory and builds maps for the tracked Markdown paths.
 * @param {string} contentDir
 * @param {string} projectRoot
 * @returns {{pathToSlug: Map<string, string>, slugs: Set<string>}}
 */
function collectContentPaths(contentDir, projectRoot) {
  /** @type {Map<string, string>} */
  const pathToSlug = new Map();
  /** @type {Set<string>} */
  const slugs = new Set();

  /**
   * @param {string} dir directory to scan
   */
  function scan(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const rel = relative(contentDir, fullPath).replace(/\.md$/, '').replaceAll(sep, '/');
        const slug = rel === 'index' ? '' : rel.replace(/\/index$/, '');
        const gitPath = relative(projectRoot, fullPath).replaceAll(sep, '/');
        pathToSlug.set(gitPath, slug);
        slugs.add(slug);
      }
    }
  }

  scan(contentDir);
  return { pathToSlug, slugs };
}

/**
 * Builds a map of slug → last commit date from one Git history query.
 * Git returns commits newest first, so the first occurrence of a path is its last modification.
 * @param {string} contentDir
 * @param {string} projectRoot
 * @returns {Map<string, string>}
 */
function buildLastmodMap(contentDir, projectRoot) {
  const { pathToSlug, slugs } = collectContentPaths(contentDir, projectRoot);
  /** @type {Map<string, string>} */
  const lastmodBySlug = new Map();

  try {
    const history = execFileSync(
      'git',
      ['-c', 'core.quotepath=false', 'log', `--format=${LASTMOD_MARKER}%cs`, '--name-only', '--relative', '--', contentDir],
      {
        cwd: projectRoot,
        encoding: 'utf8',
      }
    );

    /** @type {string | null} */
    let commitDate = null;
    for (const line of history.split(/\r?\n/)) {
      if (line.startsWith(LASTMOD_MARKER)) {
        commitDate = line.slice(LASTMOD_MARKER.length) || null;
        continue;
      }
      if (!commitDate || !line) {
        continue;
      }

      const slug = pathToSlug.get(line);
      if (slug === undefined || lastmodBySlug.has(slug)) {
        continue;
      }

      lastmodBySlug.set(slug, commitDate);
      if (lastmodBySlug.size === slugs.size) {
        break;
      }
    }
  } catch {
    return new Map();
  }

  return lastmodBySlug;
}

/**
 * Generates a single `sitemap.xml` with lastmod and changefreq at build time.
 * @returns {import('astro').AstroIntegration}
 */
export function sitemapIntegration() {
  /** @type {import('astro').AstroConfig | undefined} */
  let astroConfig;

  return {
    name: 'designer-guide-sitemap',
    hooks: {
      'astro:config:done': ({ config }) => {
        astroConfig = config;
      },
      'astro:build:done': ({ dir, pages, logger }) => {
        if (!astroConfig?.site) {
          logger.warn('The `site` config option is required for sitemap generation. Skipping.');
          return;
        }

        const base = astroConfig.base ?? '/';
        const origin = new URL(base, astroConfig.site).href.replace(/\/$/, '');
        const projectRoot = process.cwd();
        const contentDir = join(projectRoot, 'content');
        const lastmodMap = buildLastmodMap(contentDir, projectRoot);

        const entries = pages.map((page) => {
          const slug = page.pathname.replace(/^\/|\/$/g, '');
          const path = page.pathname.replace(/\/$/, '');
          const loc = path ? `${origin}/${path}/` : `${origin}/`;
          const lastmod = lastmodMap.get(slug);
          return { loc, lastmod };
        });

        entries.sort((a, b) => a.loc.localeCompare(b.loc));

        const urlEntries = entries.map(({ loc, lastmod }) => {
          const parts = [`    <loc>${loc}</loc>`];
          if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
          parts.push(`    <changefreq>${CHANGEFREQ}</changefreq>`);
          return `  <url>\n${parts.join('\n')}\n  </url>`;
        });

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urlEntries,
          '</urlset>',
        ].join('\n');

        const outPath = join(dir.pathname, 'sitemap.xml');
        writeFileSync(outPath, `${xml}\n`, 'utf8');
        logger.info(`\`sitemap.xml\` created (${entries.length} URLs)`);
      },
    },
  };
}
