/**
 * Configurable Form Author Guide base URL for cross-links from Docusaurus docs.
 *
 * Set `DESIGNER_GUIDE_URL` to a site-root path (`/designer/user-guide`) or an
 * absolute URL. Defaults to the production Form Author Guide
 * (`https://learn.formengine.io/`); for local development set
 * `DESIGNER_GUIDE_URL=http://localhost:4321/`.
 */

/** Canonical production Form Author Guide. */
const PRODUCTION_DESIGNER_GUIDE_BASE_URL = 'https://learn.formengine.io/';

/** @param {string} base */
function normalizeBase(base) {
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * @returns {string}
 */
export function getDesignerGuideBase() {
  const raw = process.env.DESIGNER_GUIDE_URL?.trim();
  return normalizeBase(raw || PRODUCTION_DESIGNER_GUIDE_BASE_URL);
}

/**
 * @param {string} [guidePath] path under the guide root, e.g. `behavior/actions-basics/`
 * @param {string} [base] guide origin or path; defaults to {@link getDesignerGuideBase}
 * @returns {string}
 */
export function designerGuideUrl(guidePath = '', base = getDesignerGuideBase()) {
  const normalized = normalizeBase(base);
  const clean = guidePath.replace(/^\//, '');
  if (!clean) {
    return normalized;
  }
  return `${normalized}${clean}`;
}

/**
 * Markdown link prefix for cross-links to the Form Author Guide.
 * Rewritten at build time by remarkDesignerGuideLinks using DESIGNER_GUIDE_URL.
 */
export const DESIGNER_GUIDE_MARKDOWN_PREFIX = 'designer-guide:';

/**
 * @param {unknown} href
 * @returns {string | null} guide-relative path when href targets the author guide, else null
 */
export function extractDesignerGuidePath(href) {
  if (typeof href !== 'string') {
    return null;
  }

  if (href === DESIGNER_GUIDE_MARKDOWN_PREFIX || href.startsWith(DESIGNER_GUIDE_MARKDOWN_PREFIX)) {
    return href.slice(DESIGNER_GUIDE_MARKDOWN_PREFIX.length);
  }

  return null;
}

/**
 * @param {string} [guidePath]
 * @param {string} [base]
 * @returns {string} markdown-safe href (absolute URL or Docusaurus pathname escape)
 */
export function toDesignerGuideHref(guidePath = '', base = getDesignerGuideBase()) {
  const url = designerGuideUrl(guidePath, base);
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const sitePath = url.startsWith('/') ? url : `/${url}`;
  return `pathname:///../${sitePath.replace(/^\//, '')}`;
}
