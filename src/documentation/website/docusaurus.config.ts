import type * as Preset from '@docusaurus/preset-classic'
import type {Config} from '@docusaurus/types'
import {env} from 'node:process'
import {themes as prismThemes} from 'prism-react-renderer'

const docusaurusPluginTypedocConfig = [
  'docusaurus-plugin-typedoc',
  // Options
  {
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
      '../../packages/views/rich-text',
      '../../packages/views/rsuite',
      '../../packages/views/rsuite-table',
      '../../packages/views/signature',
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
    experimental_faster: true,
    v4: true
  },
  title: 'Documentation | FormBuilder',
  tagline: 'Lightweight, React-based, Drag&Drop, Customizable, JavaScript',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://formengine.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Optimajet Limited', // Usually your GitHub org/user name.
  projectName: 'formbuilder', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  scripts: [
    '/documentation/js/analytics.js?id=GTM-PPS66XRX'
  ],

  markdown: {
    mermaid: true
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
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
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
        {
          label: 'Build Form with AI',
          to: 'https://formengine.io/ai-form-builder/',
          position: 'right',
          target: '_self',
          className: 'ai-button'
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
              to: 'https://github.com/optimajet/formengine',
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
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteTitle: 'This is the documentation for the FormEngine packages.',
        siteDescription: 'It contains detailed manuals, components, and utilities for creating user interfaces.',
        depth: 2,
        content: {
          relativePaths: false,
          includeBlog: false,
          includePages: false,
          enableLlmsFullTxt: true,
          includeVersionedDocs: false,
        }
      }
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        docsRouteBasePath: '/',
        docsDir: '../docs',
        indexBlog: false,
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      },
    ],
  ],
}

if (env.ENABLE_TYPEDOC === 'true') {
  config.plugins.push(docusaurusPluginTypedocConfig)
}

export default config
