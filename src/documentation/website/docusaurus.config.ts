import type * as Preset from '@docusaurus/preset-classic'
import type {Config} from '@docusaurus/types'
import fs from 'node:fs'
import path from 'node:path'
import {themes as prismThemes} from 'prism-react-renderer'

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
    'https://formengine.io/js/analytics.js?id=GTM-PPS66XRX',
  ],

  markdown: {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],

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
          label: 'Features',
          to: 'https://formengine.io/features/',
          position: 'right',
          target: '_self',
        },
        {
          label: 'Demo',
          to: 'https://demo.formengine.io/',
          position: 'right',
          target: '_self',
          className: 'demo-link'
        },
        {
          label: 'Pricing',
          to: 'https://formengine.io/pricing/',
          position: 'right',
          target: '_self',
        },
        {
          label: 'Documentation',
          to: '/',
          position: 'right',
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
    [
      'docusaurus-plugin-typedoc',
      // Options
      {
        entryPoints: [
          '../../packages/core',
          '../../packages/designer',
          '../../packages/designer-bundle',
          '../../packages/viewer-bundle',
          '../../packages/views/fast-qr',
          '../../packages/views/rich-text',
          '../../packages/views/google-map',
          '../../packages/views/rsuite',
          '../../packages/views/signature',
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
    ],
    // original https://github.com/prisma/docs/blob/main/docusaurus.config.ts#L95
    async function pluginLlmsTxt(context) {
      return {
        name: 'llms-txt-plugin',
        loadContent: async () => {
          const {siteDir} = context
          const contentDir = path.join(siteDir, '..', 'docs')
          const allMdx: string[] = []

          // recursive function to get all mdx files
          const getMdxFiles = async (dir: string) => {
            const entries = await fs.promises.readdir(dir, {withFileTypes: true})

            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name)
              if (entry.isDirectory()) {
                await getMdxFiles(fullPath)
              } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
                const content = await fs.promises.readFile(fullPath, 'utf8')

                // extract title from frontmatter if it exists
                const titleMatch = content.match(
                  /^---\n(?:.*\n)*?title:\s*["']?([^"'\n]+)["']?\n(?:.*\n)*?---\n/
                )
                const title = titleMatch ? titleMatch[1] : ''

                // Get the relative path for URL construction
                const relativePath = path.relative(contentDir, fullPath)

                // Convert file path to URL path by:
                // 1. Removing numeric prefixes (like 100-, 01-, etc.)
                // 2. Removing the .mdx extension
                let urlPath = relativePath
                  .replace(/^\d+-/, '')
                  .replace(/\/\d+-/g, '/')
                  .replace(/\.mdx$/, '')

                // Construct the full URL
                const fullUrl = `https://formengine.io/documentation/${urlPath}`

                // strip frontmatter
                const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '')

                // combine title and content with URL
                const contentWithTitle = title
                  ? `# ${title}\n\nURL: ${fullUrl}\n${contentWithoutFrontmatter}`
                  : contentWithoutFrontmatter

                allMdx.push(contentWithTitle)
              }
            }
          }

          await getMdxFiles(contentDir)
          return {allMdx}
        },
        postBuild: async ({content, routes, outDir}) => {
          const {allMdx} = content as { allMdx: string[] }

          // Write concatenated MDX content
          const concatenatedPath = path.join(outDir, 'llms-full.txt')
          await fs.promises.writeFile(concatenatedPath, allMdx.join('\n---\n\n'))

          // we need to dig down several layers:
          // find PluginRouteConfig marked by plugin.name === "docusaurus-plugin-content-docs"
          const docsPluginRouteConfig = routes.filter(
            (route) => route.plugin.name === 'docusaurus-plugin-content-docs'
          )[0]

          // docsPluginRouteConfig has a routes property has a record with the path "/" that contains all docs routes.
          const allDocsRouteConfig = docsPluginRouteConfig.routes?.filter(
            (route) => route.path === '/documentation/'
          )[0]

          // A little type checking first
          if (!allDocsRouteConfig?.props?.version) {
            return
          }

          // this route config has a `props` property that contains the current documentation.
          const currentVersionDocsRoutes = (
            allDocsRouteConfig.props.version as Record<string, unknown>
          ).docs as Record<string, Record<string, unknown>>

          // for every single docs route we now parse a path (which is the key) and a title
          const docsRecords = Object.entries(currentVersionDocsRoutes).map(([path, record]) => {
            return `- [${record.title}](${path}): ${record.description}`
          })

          // Build up llms.txt file
          const llmsTxt = `# ${context.siteConfig.title}\n\n## Docs\n\n${docsRecords.join('\n')}`

          // Write llms.txt file
          const llmsTxtPath = path.join(outDir, 'llms.txt')
          await fs.promises.writeFile(llmsTxtPath, llmsTxt)
        },
      }
    },
  ],
}

export default config
