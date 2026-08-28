/**
 * Rehype plugins for Form Author Guide markdown links:
 * - prefix in-guide paths with the Astro base
 * - rewrite `docs:…` (and legacy absolute main-docs URLs) via MAIN_DOCS_URL
 * - rewrite `https://demo.formengine.io` deep links via DEMO_URL (localhost Vite in dev)
 */
import { visit } from 'unist-util-visit';
import rootMeta from '../content/_meta.js';
import { siteBase } from '../site-paths.mjs';
import { rewriteDemoHref } from './lib/demo-base.mjs';
import { extractMainDocsPath, mainDocsUrl } from './lib/main-docs-base.mjs';

/** @type {readonly string[]} */
const GUIDE_SECTIONS = Object.keys(rootMeta);

/**
 * @param {string} [base]
 */
function resolvePluginBase(base = siteBase) {
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * @param {string} path pathname without hash or query
 */
function isInternalGuidePath(path) {
  if (path === '/') {
    return true;
  }

  return GUIDE_SECTIONS.some((section) => path === `/${section}` || path.startsWith(`/${section}/`));
}

/**
 * @param {string} base
 * @param {string} href
 */
function prefixGuideHref(base, href) {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) {
    return href;
  }

  const normalizedBase = resolvePluginBase(base);
  const basePath = normalizedBase.slice(0, -1);

  // Avoid double-prefixing when base is non-root (e.g. "/guide/").
  if (normalizedBase !== '/' && (href === basePath || href.startsWith(normalizedBase))) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex);
  const pathAndQuery = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const pathOnly = pathAndQuery.split('?')[0];

  if (!isInternalGuidePath(pathOnly)) {
    return href;
  }

  if (pathOnly === '/') {
    return `${normalizedBase}${hash}`;
  }

  return `${normalizedBase}${pathAndQuery.slice(1)}/${hash}`;
}

/**
 * @param {string} href
 */
function rewriteMainDocsHref(href) {
  const hashIndex = href.indexOf('#');
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex);
  const withoutHash = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const docsPath = extractMainDocsPath(withoutHash);
  if (docsPath === null) {
    return href;
  }
  return `${mainDocsUrl(docsPath)}${hash}`;
}

/**
 * External absolute links open in a new tab. Demo anchors that use `openMinimalWindow`
 * keep their popup behavior because their href stays "#".
 * @param {import('hast').Element} node anchor element with an already-resolved href
 */
function openExternalInNewTab(node) {
  const href = node.properties.href;
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) {
    return;
  }

  node.properties.target = '_blank';
  const rel = new Set(String(node.properties.rel ?? '').split(/\s+/).filter(Boolean));
  rel.add('noopener');
  rel.add('noreferrer');
  node.properties.rel = [...rel].join(' ');
}

/** Prefixes in-guide markdown links and rewrites configurable main-docs cross-links. */
export function rehypeGuideLinks(options = {}) {
  const base = resolvePluginBase(options.base);
  const isDev = options.isDev ?? false;

  return (tree) => {
    if (!tree) {
      return;
    }

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' || !node.properties) {
        return;
      }

      const href = node.properties.href;
      if (typeof href !== 'string') {
        return;
      }

      const withMainDocs = rewriteMainDocsHref(href);
      const withDemo = rewriteDemoHref(withMainDocs, { isDev });
      node.properties.href = prefixGuideHref(base, withDemo);
      openExternalInNewTab(node);
    });
  };
}
