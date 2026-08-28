/**
 * Rewrites `designer-guide:` markdown links using DESIGNER_GUIDE_URL.
 *
 * `baseUrl` is passed from `docusaurus.config.ts` after `.env` is loaded so the
 * compiled MDX worker does not depend on `process.env` being present.
 */
import { visit } from 'unist-util-visit';
import { extractDesignerGuidePath, toDesignerGuideHref } from '../lib/designer-guide-base.mjs';

/**
 * @param {{baseUrl?: string}} [options]
 * @returns {import('unified').Plugin}
 */
export default function remarkDesignerGuideLinks(options = {}) {
  const baseUrl = typeof options.baseUrl === 'string' ? options.baseUrl : undefined;

  return (tree) => {
    visit(tree, 'link', (node) => {
      const guidePath = extractDesignerGuidePath(node.url);
      if (guidePath !== null) {
        node.url = toDesignerGuideHref(guidePath, baseUrl);
      }
    });
  };
}
