/**
 * Configurable FormEngine demo base URL for Form Author Guide deep links.
 *
 * Markdown stores the production host (`https://demo.formengine.io/`). At Astro
 * build/dev time, links are rewritten via {@link getDemoBase}:
 * - `DEMO_URL` from the environment, `.env`, or `.env.local`
 * - `http://localhost:5173/` when unset and {@link getDemoBase} is called with `isDev: true`
 * - `https://demo.formengine.io/` for production builds when unset
 */

/** Canonical production demo (also the host written into guide markdown). */
export const PRODUCTION_DEMO_BASE_URL = 'https://demo.formengine.io/'

/** Default Vite dev URL for `packages/apps/demo` (`npm run dev` / `vite`). */
const DEFAULT_DEV_DEMO_BASE_URL = 'http://localhost:5173/'

/** @param {string} base */
function normalizeBase(base) {
  return base.endsWith('/') ? base : `${base}/`
}

/**
 * Resolves the FormEngine demo origin from `DEMO_URL`, then dev/production defaults.
 * @param {{ isDev?: boolean }} [options]
 * @returns {string} demo base URL with a trailing slash
 */
export function getDemoBase(options = {}) {
  const raw = process.env.DEMO_URL?.trim()
  if (raw) {
    return normalizeBase(raw)
  }
  if (options.isDev) {
    return DEFAULT_DEV_DEMO_BASE_URL
  }
  return PRODUCTION_DEMO_BASE_URL
}

/**
 * Rewrites a production demo href to the active {@link getDemoBase} origin.
 * Preserves pathname, query, and hash.
 * @param href
 * @param [options]
 * @returns rewritten href, or original when not a demo link
 */
export function rewriteDemoHref(href, options = {}) {
  if (typeof href !== 'string') {
    return href
  }

  let url
  try {
    url = new URL(href)
  } catch {
    return href
  }

  if (url.hostname !== 'demo.formengine.io') {
    return href
  }

  const base = new URL(getDemoBase(options))
  url.protocol = base.protocol
  url.host = base.host
  return url.toString()
}
