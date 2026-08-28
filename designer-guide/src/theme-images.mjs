/**
 * Theme-aware guide screenshot helpers and rehype plugins.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteBase } from '../site-paths.mjs';

const GUIDE_ASSET_PREFIX = '/assets/guide/';
const publicRoot = join(dirname(fileURLToPath(import.meta.url)), '../public');

/**
 * @param base Astro base path, e.g. `/`
 * @param src public-root path such as `/assets/guide/foo.png`
 */
function prefixPublicUrl(base, src) {
  if (typeof src !== 'string' || !src.startsWith('/assets/')) {
    return src;
  }
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${src.slice(1)}`;
}

/**
 * @param [base]
 */
function resolvePluginBase(base = siteBase) {
  return base.endsWith('/') ? base : `${base}/`;
}

function toThemedScreenshotSrc(src, theme) {
  if (!src.endsWith('.png')) {
    return src;
  }
  if (src.endsWith('.light.png') || src.endsWith('.dark.png')) {
    return src;
  }
  return `${src.slice(0, -4)}.${theme}.png`;
}

function isGuideScreenshotSrc(src) {
  return (
    typeof src === 'string' &&
    src.includes(GUIDE_ASSET_PREFIX) &&
    src.endsWith('.png') &&
    !src.endsWith('.light.png') &&
    !src.endsWith('.dark.png')
  );
}

/**
 * @param pngPublicSrc
 * @param variant
 * @returns
 */
function webpSrcForPublicPath(pngPublicSrc, variant) {
  const relative = pngPublicSrc.startsWith('/') ? pngPublicSrc.slice(1) : pngPublicSrc;
  const suffix = variant === 'preview' ? '.preview.webp' : '.full.webp';
  const webpPath = join(publicRoot, relative.replace(/\.png$/, suffix));
  if (!existsSync(webpPath)) {
    return null;
  }
  return `/${relative.replace(/\.png$/, suffix)}`;
}

/**
 * @param value
 * @param extra
 */
function mergeClassName(value, extra) {
  if (!value) {
    return extra;
  }
  if (Array.isArray(value)) {
    return [...value, extra].join(' ');
  }
  return `${value} ${extra}`;
}

/**
 * @param node
 * @param visit
 */
function walk(node, visit) {
  if (!node || typeof node !== 'object') {
    return;
  }
  visit(node);
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child, visit);
    }
  }
}

/**
 * @param src PNG path under /assets/guide/
 * @param alt
 * @param className
 * @param variantClass
 * @param base
 */
function createGuideImageNode(src, alt, className, variantClass, base) {
  const resolvedPng = prefixPublicUrl(base, src);
  const previewWebp = webpSrcForPublicPath(src, 'preview');
  const inlineSrc = previewWebp ? prefixPublicUrl(base, previewWebp) : resolvedPng;
  const imgProps = {
    alt,
    src: inlineSrc,
    loading: 'lazy',
    decoding: 'async',
    className: mergeClassName(className, variantClass),
  };

  if (!previewWebp) {
    return {
      type: 'element',
      tagName: 'img',
      properties: imgProps,
      children: [],
    };
  }

  return {
    type: 'element',
    tagName: 'picture',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'source',
        properties: { srcset: inlineSrc, type: 'image/webp' },
        children: [],
      },
      {
        type: 'element',
        tagName: 'img',
        properties: imgProps,
        children: [],
      },
    ],
  };
}

/**
 * @param src
 * @param base
 */
function resolveFullWebpUrl(src, base) {
  const fullWebp = webpSrcForPublicPath(src, 'full');
  if (fullWebp) {
    return prefixPublicUrl(base, fullWebp);
  }
  return prefixPublicUrl(base, src);
}

/**
 * Adds lazy-loading and preview WebP for non-themed guide images.
 * @param options
 */
export function rehypeGuideImages(options = {}) {
  const base = resolvePluginBase(options.base);
  return (tree) => {
    if (!tree) {
      return;
    }
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'img' || !node.properties) {
        return;
      }

      const src = node.properties.src;
      if (typeof src !== 'string' || !src.includes(GUIDE_ASSET_PREFIX) || !src.endsWith('.png')) {
        return;
      }

      if (isGuideScreenshotSrc(src)) {
        return;
      }

      const alt = node.properties.alt ?? '';
      const className = node.properties.className;
      const previewWebp = webpSrcForPublicPath(src, 'preview');
      const fullWebp = webpSrcForPublicPath(src, 'full');

      if (!previewWebp) {
        node.properties.src = prefixPublicUrl(base, src);
        node.properties.loading ??= 'lazy';
        node.properties.decoding ??= 'async';
        return;
      }

      const imageNode = createGuideImageNode(src, alt, className, '', base);
      if (fullWebp) {
        node.tagName = 'span';
        node.properties = {
          className: 'fe-guide-image',
          'data-fe-full-src': prefixPublicUrl(base, fullWebp),
        };
        node.children = [imageNode];
        return;
      }

      Object.assign(node, imageNode);
    });
  };
}

/**
 *
 * @param options
 */
export function rehypeThemeImages(options = {}) {
  const base = resolvePluginBase(options.base);
  return (tree) => {
    if (!tree) {
      return;
    }
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'img' || !node.properties) {
        return;
      }

      const src = node.properties.src;
      if (!isGuideScreenshotSrc(src)) {
        return;
      }

      const alt = node.properties.alt ?? '';
      const className = node.properties.className;
      const lightSrc = toThemedScreenshotSrc(src, 'light');
      const darkSrc = toThemedScreenshotSrc(src, 'dark');

      node.tagName = 'span';
      node.properties = {
        className: 'fe-theme-image',
        'data-fe-full-light': resolveFullWebpUrl(lightSrc, base),
        'data-fe-full-dark': resolveFullWebpUrl(darkSrc, base),
      };
      node.children = [
        createGuideImageNode(lightSrc, alt, className, 'fe-theme-image__variant fe-theme-image__light', base),
        createGuideImageNode(darkSrc, alt, className, 'fe-theme-image__variant fe-theme-image__dark', base),
      ];
    });
  };
}
