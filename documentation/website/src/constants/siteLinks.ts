import {
  designerGuideUrl,
  getDesignerGuideBase,
  toDesignerGuideHref,
} from '../lib/designer-guide-base.mjs';

/**
 * Docusaurus serves docs under baseUrl `/documentation/`. To link to another
 * subsite on the same host (for example `/`), use the
 * pathname protocol with a parent segment so baseUrl resolves to site root.
 *
 * @see https://docusaurus.io/docs/advanced/routing#escaping-from-spa-redirects
 */
export const siteRootPathname = (pathFromSiteRoot: string): string => {
  const normalized = pathFromSiteRoot.startsWith('/') ? pathFromSiteRoot : `/${pathFromSiteRoot}`;
  return `pathname:///../${normalized.replace(/^\//, '')}`;
};

/** Sidebar / navbar href for the Form Author Guide (respects `DESIGNER_GUIDE_URL`). */
export const DESIGNER_USER_GUIDE_URL = toDesignerGuideHref();

export const SITE_HOME_URL = siteRootPathname('/');

export { designerGuideUrl, getDesignerGuideBase, toDesignerGuideHref };
