/**
 * Rewrites demo.formengine.io links in markdown AST (links and inline HTML).
 * Must run at remark stage so raw `<a href="…">` in admonitions is updated
 * before Astro's built-in rehype-raw pass.
 */
import { visit } from 'unist-util-visit';
import { rewriteDemoHref } from '../lib/demo-base.mjs';

/** @param {string} html @param {boolean} isDev */
function rewriteDemoHtmlHrefs(html, isDev) {
  let result = html.replace(/href=(["'])https:\/\/demo\.formengine\.io([^"']*)\1/g, (_match, quote, rest) => {
    const rewritten = rewriteDemoHref(`https://demo.formengine.io${rest}`, { isDev });
    return `href=${quote}${rewritten}${quote}`;
  });

  result = result.replace(
    /openMinimalWindow\((['"])https:\/\/demo\.formengine\.io([^'"]*)\1\)/g,
    (_match, quote, rest) => {
      const rewritten = rewriteDemoHref(`https://demo.formengine.io${rest}`, { isDev });
      return `openMinimalWindow(${quote}${rewritten}${quote})`;
    }
  );

  return result;
}

/**
 * @param {{ isDev?: boolean }} [options]
 * @returns {import('unified').Plugin}
 */
export default function remarkRewriteDemoLinks(options = {}) {
  const isDev = options.isDev ?? true;

  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'link' && typeof node.url === 'string') {
        node.url = rewriteDemoHref(node.url, { isDev });
        return;
      }

      if (node.type === 'html' && typeof node.value === 'string') {
        node.value = rewriteDemoHtmlHrefs(node.value, isDev);
      }
    });
  };
}
