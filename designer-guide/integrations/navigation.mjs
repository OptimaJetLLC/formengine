import { execFileSync } from 'node:child_process';
import { watch } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const integrationRoot = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = join(integrationRoot, '..');
const buildNavigationScript = join(projectRoot, 'scripts/build-navigation.mjs');
const contentDir = join(projectRoot, 'content');

/**
 * Regenerates sidebar navigation in a Node subprocess so Astro/Vite does not
 * bundle dynamic imports of content/_meta.js files.
 * @param {import('astro').AstroIntegrationLogger} logger
 */
function syncNavigation(logger) {
  try {
    const output = execFileSync('node', [buildNavigationScript], {
      cwd: projectRoot,
      encoding: 'utf8',
    }).trim();
    logger.info(output || 'Synced navigation');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to sync navigation: ${message}`);
  }
}

/** @returns {import('astro').AstroIntegration} */
export function navigationIntegration() {
  return {
    name: 'designer-guide-navigation',
    hooks: {
      'astro:config:setup': ({ logger }) => {
        syncNavigation(logger);
      },
      'astro:server:setup': ({ server, logger }) => {
        const watcher = watch(contentDir, { recursive: true }, (_event, filename) => {
          if (filename?.endsWith('_meta.js')) {
            syncNavigation(logger);
          }
        });

        server.httpServer?.once('close', () => {
          watcher.close();
        });
      },
    },
  };
}
