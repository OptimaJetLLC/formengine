// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation | FormBuilder',
  tagline: 'Lightweight, React-based, Drag&Drop, Customizable, JavaScript',
  url: 'https://formbuilder.dev',
  baseUrl: '/documentation/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Optimajet Limited', // Usually your GitHub org/user name.
  projectName: 'formbuilder', // Usually your repo name.

  scripts: [
    'https://formbuilder.dev/js/analytics.js',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

    ({
      navbar: {
        logo: {
          alt: 'FormBuilder Logo',
          src: 'img/logo.svg',
          href: 'https://formbuilder.dev/',
          target: '_self',
        },
        items: [
          {
            label: 'Features',
            to: 'https://formbuilder.dev/features/',
            position: 'right',
            target: '_self',
          },
          {
            label: 'Documentation',
            to: '/',
            position: 'right',
          },
          {
            label: 'Downloads',
            to: 'https://formbuilder.dev/downloads/',
            position: 'right',
            target: '_self',
          },
          {
            label: 'Pricing',
            to: 'https://formbuilder.dev/pricing/',
            position: 'right',
            target: '_self',
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
            title: 'Agreements',
            items: [
              {
                label: 'License Agreement',
                to: 'https://formbuilder.dev/agreements/eula/',
                target: '_self',
              },
              {
                label: 'Customer Support Agreement',
                to: 'https://formbuilder.dev/agreements/csa/',
                target: '_self',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Optimajet Limited. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
    }),
  plugins: [
    'plugin-image-zoom',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        docsRouteBasePath: "/",
        docsDir: "../docs",
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
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: [
          '../../packages/core',
          '../../packages/form-builder',
          '../../packages/form-viewer'
        ],
        entryPointStrategy: 'packages',
        tsconfig: '../../tsconfig.json',
        out: '../../docs/api-reference',
        sidebar: {
          categoryLabel: 'API Reference',
          collapsed: false,
          position: 10,
          fullNames: false,
        },
      },
    ],
  ],
};

module.exports = config;
