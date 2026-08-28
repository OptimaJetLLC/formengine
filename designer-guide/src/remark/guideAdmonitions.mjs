/**
 * Docusaurus-style admonitions for Form Author Guide markdown.
 *
 * Supports fenced blocks:
 *   :::tip
 *   Content
 *   :::
 *
 * Legacy inline labels are also accepted:
 *   **Tip:** Content
 */
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

/** @type {Record<string, { variant: string, title: string }>} */
const FENCE_TYPES = {
  tip: { variant: 'tip', title: 'Tip' },
  'tip Try it': { variant: 'tip', title: 'Try it' },
  'info note': { variant: 'note', title: 'Note' },
  'info Important': { variant: 'important', title: 'Important' },
  'info For developers': { variant: 'developers', title: 'For developers' },
  'info For form authors': { variant: 'authors', title: 'For form authors' },
  info: { variant: 'info', title: 'Info' },
  warning: { variant: 'warning', title: 'Warning' },
  caution: { variant: 'caution', title: 'Caution' },
};

const FENCE_TYPE_PATTERN = Object.keys(FENCE_TYPES)
  .sort((a, b) => b.length - a.length)
  .map((type) => type.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|');

const SINGLE_FENCE_PATTERN = new RegExp(`^:::(${FENCE_TYPE_PATTERN})[ \\t]*\\n([\\s\\S]*?)\\n[ \\t]*:::[ \\t]*$`);

/** @type {Record<string, { variant: string, title: string }>} */
const INLINE_LABELS = {
  Tip: FENCE_TYPES.tip,
  Note: FENCE_TYPES['info note'],
  Important: FENCE_TYPES['info Important'],
  Warning: FENCE_TYPES.warning,
};

/** @type {import('unified').Processor<import('mdast').Root>} */
let nestedParser;

/**
 * Serializes phrasing content back to markdown so single-paragraph fences can be re-parsed.
 * @param {import('mdast').PhrasingContent | import('mdast').RootContent} node
 */
function nodeText(node) {
  if (node.type === 'text') {
    return node.value;
  }
  if (node.type === 'html') {
    return node.value;
  }
  if (node.type === 'inlineCode') {
    return `\`${node.value}\``;
  }
  if (node.type === 'break') {
    return '\n';
  }
  if (node.type === 'strong' && 'children' in node) {
    return `**${node.children.map((child) => nodeText(child)).join('')}**`;
  }
  if (node.type === 'emphasis' && 'children' in node) {
    return `*${node.children.map((child) => nodeText(child)).join('')}*`;
  }
  if (node.type === 'delete' && 'children' in node) {
    return `~~${node.children.map((child) => nodeText(child)).join('')}~~`;
  }
  if (node.type === 'link' && 'children' in node) {
    const label = node.children.map((child) => nodeText(child)).join('');
    const title = node.title ? ` "${node.title}"` : '';
    return `[${label}](${node.url}${title})`;
  }
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map((child) => nodeText(child)).join('');
  }
  return '';
}

/**
 * @param {import('mdast').Paragraph} node
 * @returns {{ type: string, extraChildren: import('mdast').PhrasingContent[] | null } | null}
 */
function parseFenceOpener(node) {
  if (node.type !== 'paragraph' || !node.children?.length) {
    return null;
  }
  const first = node.children[0];
  if (first.type !== 'text' || !first.value.startsWith(':::')) {
    return null;
  }
  const firstLine = first.value.split('\n')[0].trim();
  const type = firstLine.slice(3).trim();
  if (!FENCE_TYPES[type]) {
    return null;
  }
  const afterNewline = first.value.indexOf('\n');
  if (afterNewline === -1 && node.children.length === 1) {
    return { type, extraChildren: null };
  }
  /** @type {import('mdast').PhrasingContent[]} */
  const extra = [];
  if (afterNewline !== -1) {
    const rest = first.value.slice(afterNewline + 1);
    if (rest) {
      extra.push({ type: 'text', value: rest });
    }
    extra.push(...node.children.slice(1));
  }
  return { type, extraChildren: extra.length ? extra : null };
}

/**
 * @param {import('mdast').RootContent} node
 * @returns {{ isCloser: boolean, prefixChildren: import('mdast').PhrasingContent[] | null }}
 */
function parseFenceCloser(node) {
  if (node.type !== 'paragraph' || !node.children?.length) {
    return { isCloser: false, prefixChildren: null };
  }
  const last = node.children[node.children.length - 1];
  if (last.type === 'text' && last.value.trim() === ':::' && node.children.length === 1) {
    return { isCloser: true, prefixChildren: null };
  }
  if (last.type === 'text' && last.value.endsWith('\n:::')) {
    const trimmed = last.value.slice(0, -4);
    /** @type {import('mdast').PhrasingContent[]} */
    const prefix = [...node.children.slice(0, -1)];
    if (trimmed) {
      prefix.push({ type: 'text', value: trimmed });
    }
    return { isCloser: true, prefixChildren: prefix.length ? prefix : null };
  }
  return { isCloser: false, prefixChildren: null };
}

/**
 * @param {string} variant
 * @param {string} title
 * @param {import('mdast').RootContent[]} body
 */
function createAdmonition(variant, title, body) {
  return {
    type: 'blockquote',
    data: {
      hName: 'aside',
      hProperties: {
        className: ['fe-admonition', `fe-admonition--${variant}`],
      },
    },
    children: [
      {
        type: 'paragraph',
        data: {
          hProperties: { className: ['fe-admonition__title'] },
        },
        children: [{ type: 'text', value: title }],
      },
      ...body,
    ],
  };
}

/**
 * @param {string} markdown
 * @returns {import('mdast').RootContent[]}
 */
function parseAdmonitionBody(markdown) {
  if (!markdown) {
    return [{ type: 'paragraph', children: [{ type: 'text', value: '' }] }];
  }

  nestedParser ??= unified().use(remarkParse).use(remarkGfm);
  const tree = nestedParser.parse(markdown);
  return tree.children;
}

/**
 * @param {import('mdast').Paragraph} node
 */
function parseInlineAdmonition(node) {
  if (node.type !== 'paragraph' || !node.children?.length) {
    return null;
  }

  const [first, ...rest] = node.children;
  if (first.type !== 'strong' || first.children?.length !== 1 || first.children[0].type !== 'text') {
    return null;
  }

  const label = first.children[0].value.replace(/:$/, '');
  const config = INLINE_LABELS[label];
  if (!config) {
    return null;
  }

  const body = rest.length
    ? [{ type: 'paragraph', children: rest }]
    : [{ type: 'paragraph', children: [{ type: 'text', value: '' }] }];

  return createAdmonition(config.variant, config.title, body);
}

/**
 * @param {import('mdast').Paragraph} node
 */
function parseSingleParagraphFence(node) {
  if (node.type !== 'paragraph') {
    return null;
  }

  const text = nodeText(node);
  const match = text.match(SINGLE_FENCE_PATTERN);
  if (!match) {
    return null;
  }

  const [, type, body] = match;
  const config = FENCE_TYPES[type];
  if (!config) {
    return null;
  }

  return createAdmonition(config.variant, config.title, parseAdmonitionBody(body.trim()));
}

/**
 * @param {import('mdast').RootContent[]} children
 */
function transformChildren(children) {
  /** @type {import('mdast').RootContent[]} */
  const result = [];

  for (let index = 0; index < children.length; index += 1) {
    const node = children[index];
    if (node.type !== 'paragraph') {
      result.push(node);
      continue;
    }

    const singleParagraphFence = parseSingleParagraphFence(node);
    if (singleParagraphFence) {
      result.push(singleParagraphFence);
      continue;
    }

    const fence = parseFenceOpener(node);
    if (fence) {
      const config = FENCE_TYPES[fence.type];
      /** @type {import('mdast').RootContent[]} */
      const body = fence.extraChildren ? [{ type: 'paragraph', children: fence.extraChildren }] : [];
      index += 1;
      while (index < children.length) {
        const closer = parseFenceCloser(children[index]);
        if (closer.isCloser) {
          if (closer.prefixChildren) {
            body.push({ type: 'paragraph', children: closer.prefixChildren });
          }
          break;
        }
        body.push(children[index]);
        index += 1;
      }
      result.push(createAdmonition(config.variant, config.title, body));
      continue;
    }

    const inline = parseInlineAdmonition(node);
    result.push(inline ?? node);
  }

  return result;
}

/** @returns {import('unified').Plugin} */
export default function remarkGuideAdmonitions() {
  return (tree) => {
    visit(tree, 'root', (node) => {
      node.children = transformChildren(node.children);
    });
  };
}
