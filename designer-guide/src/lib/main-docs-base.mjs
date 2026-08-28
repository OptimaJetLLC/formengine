/**
 * Configurable main developer documentation base URL for cross-links from the Form Author Guide.
 *
 * Markdown stores the production host (`https://formengine.io/documentation/`). At Astro
 * build/dev time, links resolve via {@link getMainDocsBase}:
 * - `MAIN_DOCS_URL` env (see `.env.development` / `.env.example`)
 * - `https://formengine.io/documentation/` when unset (production default)
 *
 * Set `MAIN_DOCS_URL` to a same-origin path (`/documentation`) or an absolute URL.
 */

/** Canonical production developer docs (also the host assumed for legacy absolute links). */
const PRODUCTION_MAIN_DOCS_BASE_URL = 'https://formengine.io/documentation/'

/** @param {string} base */
function normalizeBase(base) {
  return base.endsWith('/') ? base : `${base}/`
}

function getMainDocsBase() {
  const raw = process.env.MAIN_DOCS_URL?.trim()
  if (raw) {
    return normalizeBase(raw)
  }
  return PRODUCTION_MAIN_DOCS_BASE_URL
}

/**
 * @param {string} [docsPath] path under the docs root, e.g. `formengine-designer/features/actions`
 * @returns {string}
 */
export function mainDocsUrl(docsPath = '') {
  const base = getMainDocsBase()
  const clean = docsPath.replace(/^\//, '')
  if (!clean) {
    return base
  }
  return `${base}${clean}`
}

/**
 * Stable markdown shorthand used in Form Author Guide content.
 * Rewritten at build time via MAIN_DOCS_URL.
 */
const MAIN_DOCS_MARKDOWN_PREFIX = 'docs:'

/** Absolute production prefix used in older content and for rewrite matching. */
const LEGACY_MAIN_DOCS_ABSOLUTE_PREFIX = 'https://formengine.io/documentation'

/**
 * @param {unknown} href
 * @returns {string | null} docs-relative path when href targets main docs, else null
 */
export function extractMainDocsPath(href) {
  if (typeof href !== 'string') {
    return null
  }

  if (href.startsWith(MAIN_DOCS_MARKDOWN_PREFIX)) {
    return href.slice(MAIN_DOCS_MARKDOWN_PREFIX.length)
  }

  if (href === LEGACY_MAIN_DOCS_ABSOLUTE_PREFIX || href === `${LEGACY_MAIN_DOCS_ABSOLUTE_PREFIX}/`) {
    return ''
  }

  if (href.startsWith(`${LEGACY_MAIN_DOCS_ABSOLUTE_PREFIX}/`)) {
    return href.slice(`${LEGACY_MAIN_DOCS_ABSOLUTE_PREFIX}/`.length)
  }

  return null
}
