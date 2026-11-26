import './scripts/load-website-env.ts'
import type * as Preset from '@docusaurus/preset-classic'
import type {Config} from '@docusaurus/types'
import {resolve} from 'node:path'
import {env} from 'node:process'
import {themes as prismThemes} from 'prism-react-renderer'
import remarkDesignerGuideLinks from './src/remark/designerGuideLinks.mjs'
import {getDesignerGuideBase, SITE_HOME_URL} from './src/constants/siteLinks'

const docusaurusPluginTypedocConfig = [
  'docusaurus-plugin-typedoc',
  // Options
  {
    plugin: [resolve(__dirname, './scripts/typedoc-union-sorter.mjs')],
    entryPoints: [
      '../../packages/core',
      '../../packages/designer',
      '../../packages/designer-bundle',
      '../../packages/json-schema-generator',
      '../../packages/viewer-bundle',
      '../../packages/viewer-bundle-premium',
      '../../packages/views/fast-qr',
      '../../packages/views/google-map',
      '../../packages/views/material-ui',
      '../../packages/views/print',
      '../../packages/views/rich-text',
      '../../packages/views/rsuite',
      '../../packages/views/rsuite-table',
      '../../packages/views/signature',
      '../../packages/views/sortable-list',
      '../../packages/views/uploader'
    ],
    entryPointStrategy: 'packages',
    tsconfig: '../../tsconfig.json',
    out: '../docs/api-reference',
    name: 'API reference',
    disableSources: true,
    readme: 'none',
    sidebar: {
      autoConfiguration: true,
      pretty: true,
    },
  },
]

const config: Config = {
  future: {
    faster: true,
    v4: true
  },
  title: 'Documentation | FormEngine',
  tagline: 'Lightweight, React-based, Drag&Drop, Customizable, JavaScript',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // Set the production url of your site here
  url: 'https://formengine.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Optimajet Limited', // Usually your GitHub org/user name.
  projectName: 'formengine', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  customFields: {
    designerGuideBaseUrl: getDesignerGuideBase(),
  },

  scripts: [
    '/documentation/js/analytics.js?id=GTM-PPS66XRX'
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
    // future.v4 turns the MDX1 compatibility features off by default, but the docs use the
    // `{#custom-id}` heading syntax, which requires mdx1Compat.headingIds.
    mdx1Compat: {
      headingIds: true,
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    '@docusaurus/theme-live-codeblock',
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          exclude: ['**/AGENTS.md', '**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**'],
          remarkPlugins: [[remarkDesignerGuideLinks, {baseUrl: getDesignerGuideBase()}]],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'Optimajet Limited',
        url: 'https://optimajet.com/',
        logo: '/documentation/img/optimajet-logo.png',
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://formengine.io/documentation/',
        'url': 'https://formengine.io/documentation/',
        'name': 'FormEngine documentation',
        'description': 'Documentation for libraries and tools for creating forms from JSON FormEngine',
        'publisher': {
          '@id': 'https://optimajet.com/company/',
        },
        'inLanguage': 'en-EN',
      }),
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: 'https://formengine.io/documentation/img/og-image.jpg',
      }
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '9D8BD6B92E959FD6',
      }
    },
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: 'FormBuilder Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
        href: 'https://formengine.io/',
        target: '_self',
      },
      items: [
        {
          label: 'Demo',
          to: 'https://demo.formengine.io/',
          position: 'right',
          target: '_self',
          className: 'demo-link'
        },
      ],
    },
    footer: {
      logo: {
        alt: 'OptimaJet Logo',
        src: 'img/optimajet-logo.png',
        href: 'https://optimajet.com',
        width: 50,
        height: 50,
      },
      style: 'dark',
      links: [
        {
          title: 'Contacts',
          items: [
            {
              label: 'sales@optimajet.com',
              to: 'mailto:sales@optimajet.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              to: 'https://github.com/OptimaJetLLC/formengine',
              target: '_blank',
            },
            {
              label: 'Form Builder Demo',
              to: 'https://demo.formengine.io/',
              target: '_blank',
            },
          ],
        },
        {
          title: 'Products',
          items: [
            {
              label: 'Workflow Engine',
              to: 'https://workflowengine.io',
              target: '_blank',
            },
            {
              label: 'Workflow Server',
              to: 'https://workflowserver.io',
              target: '_blank',
            },
          ],
        },
        {
          title: 'LLMs.txt',
          items: [
            {
              label: 'llms.txt',
              to: 'https://formengine.io/documentation/llms.txt',
              target: '_blank',
            },
            {
              label: 'llms-full.txt',
              to: 'https://formengine.io/documentation/llms-full.txt',
              target: '_blank',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Optimajet Limited. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'scss'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block custom-code-highlight',
          line: '&att',
          block: {start: '&att>', end: '<&att'},
        },
        {
          className: 'code-block-new custom-code-highlight',
          line: '&new',
          block: {start: '&new>', end: '<&new'},
        },
        {
          className: 'code-block-changed custom-code-highlight',
          line: '&chg',
          block: {start: '&chg>', end: '<&chg'},
        },
        {
          className: 'code-block-deleted custom-code-highlight',
          line: '&del',
          block: {start: '&del>', end: '<&del'},
        },
      ],
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
      },
    },
    docsearch: {
      appId: 'BSTQ9Y9FKD',
      apiKey: '57c17069324f3e887215dc916098a63f',
      indices: [{name: 'FormEngine documentation crawler'}],
      contextualSearch: false,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteTitle: 'This is the documentation for the FormEngine packages.',
        siteDescription: 'It contains detailed manuals, components, and utilities for creating user interfaces.',
        depth: 2,
        onRouteError: 'throw',
        content: {
          relativePaths: false,
          includeBlog: false,
          includePages: false,
          enableLlmsFullTxt: true,
          includeVersionedDocs: false,
          enableMarkdownFiles: false,
        }
      }
    ],
    require.resolve('./plugins/custom-webpack-plugin/index.cjs'),
    require.resolve('docusaurus-plugin-image-zoom'),
    '@docsearch/docusaurus-adapter',
  ],
}

if (env.ENABLE_TYPEDOC === 'true') {
  config.plugins.push(docusaurusPluginTypedocConfig)
}

export default config
