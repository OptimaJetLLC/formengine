import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import rehypeRaw from 'rehype-raw';
import { minifyInlineScriptsIntegration } from './integrations/minify-inline-scripts.mjs';
import { navigationIntegration } from './integrations/navigation.mjs';
import { sitemapIntegration } from './integrations/sitemap.mjs';
import { siteBase } from './site-paths.mjs';
import { rehypeGuideLinks } from './src/guide-links.mjs';
import { rehypeGuideImages, rehypeThemeImages } from './src/theme-images.mjs';
import remarkGuideAdmonitions from './src/remark/guideAdmonitions.mjs';
import remarkRewriteDemoLinks from './src/remark/rewriteDemoLinks.mjs';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const mode = process.env.MODE ?? process.env.NODE_ENV ?? 'development';
const env = loadEnv(mode, rootDir, '');

// Expose Vite-loaded `.env*` values to Node modules (remark/rehype, main-docs-base, demo-base).
for (const [key, value] of Object.entries(env)) {
  if (process.env[key] === undefined) {
    process.env[key] = value;
  }
}

const demoUrl = process.env.DEMO_URL?.trim();
/** Local demo links during dev; production URLs for `astro build`. */
const isDev =
  mode !== 'production' && (!demoUrl || !/demo\.formengine\.io/i.test(demoUrl));

/**
 * Shiki transformer that adds a `language-*` class to every `<code>` element so that
 * code blocks pass accessibility and lint checks that require a language tag.
 */
const shikiAddLanguageClass = {
  name: 'add-language-class',
  code(node) {
    const lang = this.options.lang;
    if (lang) {
      const className = `language-${lang}`;
      if (Array.isArray(node.properties.className)) {
        node.properties.className.push(className);
      } else {
        node.properties.className = [className];
      }
    }
  },
};

const markdownProcessor = unified({
  remarkPlugins: [remarkGuideAdmonitions, [remarkRewriteDemoLinks, { isDev }]],
  rehypePlugins: [
    rehypeRaw,
    [rehypeGuideImages, { base: siteBase }],
    [rehypeThemeImages, { base: siteBase }],
    [rehypeGuideLinks, { base: siteBase, isDev }],
  ],
  gfm: true,
  smartypants: true,
});

export default defineConfig({
  site: 'https://learn.formengine.io',
  base: siteBase,
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [mdx(), sitemapIntegration(), navigationIntegration(), minifyInlineScriptsIntegration()],
  markdown: {
    processor: markdownProcessor,
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [shikiAddLanguageClass],
    },
  },
  build: {
    format: 'directory',
  },
  server: {
    allowedHosts: ['formengine.local', 'learn.formengine.local'],
  },
});
