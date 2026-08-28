import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const SKIP_TYPES = new Set(['application/json', 'application/ld+json', 'importmap', 'speculationrules']);
const SCRIPT_RE = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi;

/**
 * Reads the script `type` attribute, defaulting to classic JavaScript.
 * @param {string} attrs
 * @returns {string}
 */
function getScriptType(attrs) {
  const match = /\btype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
  return (match?.[1] ?? match?.[2] ?? match?.[3] ?? 'text/javascript').trim().toLowerCase();
}

/**
 * Collects HTML files under the build output directory.
 * @param {string} dir
 * @param {string[]} files
 * @returns {string[]}
 */
function collectHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Minifies inline classic/module script bodies. JSON and import maps are left unchanged.
 * @param {string} html
 * @param {Map<string, string>} cache
 * @returns {string}
 */
function minifyInlineScripts(html, cache) {
  return html.replace(SCRIPT_RE, (full, attrs = '', body) => {
    if (!body.trim()) {
      return full;
    }

    const type = getScriptType(attrs);
    if (SKIP_TYPES.has(type) || type.endsWith('+json')) {
      return full;
    }

    const cached = cache.get(body);
    if (cached !== undefined) {
      return `<script${attrs}>${cached}</script>`;
    }

    try {
      const result = transformSync(body, {
        legalComments: 'none',
        loader: 'js',
        minify: true,
      });
      const minified = result.code.trimEnd();
      cache.set(body, minified);
      return `<script${attrs}>${minified}</script>`;
    } catch {
      return full;
    }
  });
}

/**
 * Minifies `is:inline` script bodies in built HTML. Astro does not minify those.
 * @returns {import('astro').AstroIntegration}
 */
export function minifyInlineScriptsIntegration() {
  return {
    name: 'designer-guide-minify-inline-scripts',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const cache = new Map();
        const files = collectHtmlFiles(distDir);
        let rewritten = 0;

        for (const file of files) {
          const original = readFileSync(file, 'utf8');
          const next = minifyInlineScripts(original, cache);
          if (next !== original) {
            writeFileSync(file, next);
            rewritten += 1;
          }
        }

        logger.info(`Minified inline scripts in ${rewritten} HTML files`);
      },
    },
  };
}
