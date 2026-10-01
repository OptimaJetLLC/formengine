/**
 * Replaces `:toolbar-icon[name]:` shortcodes with masked toolbar icon spans.
 */
import { visit } from 'unist-util-visit';
import { isToolbarIconName, toolbarIconHtml } from '../guide-toolbar-icons.mjs';

const SHORTCODE = /:toolbar-icon\[([a-z-]+)\]:/g;

/**
 * @param {string} value
 * @returns {Array<import('mdast').Text | import('mdast').Html> | null}
 */
function splitToolbarIconText(value) {
  if (!value.includes(':toolbar-icon[')) {
    return null;
  }

  /** @type {Array<import('mdast').Text | import('mdast').Html>} */
  const parts = [];
  let lastIndex = 0;

  for (const match of value.matchAll(SHORTCODE)) {
    const name = match[1];
    const start = match.index ?? 0;
    if (!isToolbarIconName(name)) {
      continue;
    }
    if (start > lastIndex) {
      parts.push({ type: 'text', value: value.slice(lastIndex, start) });
    }
    parts.push({ type: 'html', value: toolbarIconHtml(name) });
    lastIndex = start + match[0].length;
  }

  if (parts.length === 0) {
    return null;
  }
  if (lastIndex < value.length) {
    parts.push({ type: 'text', value: value.slice(lastIndex) });
  }
  return parts;
}

/** @returns {import('unified').Plugin} */
export default function remarkToolbarIcons() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number' || !('children' in parent)) {
        return;
      }
      const parts = splitToolbarIconText(node.value);
      if (!parts) {
        return;
      }
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}
