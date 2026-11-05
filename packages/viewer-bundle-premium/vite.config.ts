import {readdirSync} from 'node:fs'
import {copyFile, unlink} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import type {ModuleFormat} from 'rolldown'
import type {Plugin, ResolvedConfig} from 'vite'
import {defineConfig, mergeConfig} from 'vite'
import {inlineCssPlugin} from 'vite-inline-css-plugin'

import base, {
  assertNonEsmImportMetaUrlPolyfill,
  createNonEsmImportMetaUrlConfig,
  readCss,
  replaceEmbeddedLtrRtlCssFromStubs,
  rsuiteLtrRtlCssStubs,
  writeComposedCss,
} from '../../vite.config.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const composeViewerDistCssPlugin = (): Plugin => {
  let outDir = ''

  return {
    name: 'compose-viewer-dist-css',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.build.outDir)
    },
    async closeBundle() {
      const rsuiteCssSrc = path.resolve(__dirname, '../views/rsuite/public/css')
      const rsuiteCssFiles = readdirSync(rsuiteCssSrc).filter(f => f.endsWith('.css'))

      // Copy rsuite CSS files to dist
      for (const file of rsuiteCssFiles) {
        const src = path.join(rsuiteCssSrc, file)
        const dest = path.join(outDir, file)
        await copyFile(src, dest)
      }

      const bundleCssPath = path.join(outDir, 'viewer-bundle-premium.css')
      const formengineRsuitePath = path.join(outDir, 'formengine-rsuite.css')
      const rsuiteLtrPath = path.join(outDir, 'rsuite-no-reset.min.css')
      const rsuiteRtlPath = path.join(outDir, 'rsuite-no-reset-rtl.min.css')

      const ltrOutputPath = path.join(outDir, 'viewer-bundle-premium-ltr.css')
      const rtlOutputPath = path.join(outDir, 'viewer-bundle-premium-rtl.css')

      const bundleCss = await readCss(bundleCssPath)
      const formengineRsuite = await readCss(formengineRsuitePath)
      const rsuiteLtr = await readCss(rsuiteLtrPath)
      const rsuiteRtl = await readCss(rsuiteRtlPath)

      await writeComposedCss(ltrOutputPath, [bundleCss, formengineRsuite, rsuiteLtr])
      await writeComposedCss(rtlOutputPath, [bundleCss, formengineRsuite, rsuiteRtl])

      await replaceEmbeddedLtrRtlCssFromStubs(outDir, ltrOutputPath, rtlOutputPath, [rsuiteLtrRtlCssStubs])
      await assertNonEsmImportMetaUrlPolyfill(outDir)

      await unlink(path.join(outDir, 'rsuite-ltr.css'))
      await unlink(path.join(outDir, 'rsuite-rtl.css'))
      await unlink(bundleCssPath)
    },
  }
}

export default defineConfig(env =>
  mergeConfig(mergeConfig(base(env), createNonEsmImportMetaUrlConfig()), {
    plugins: [inlineCssPlugin(), composeViewerDistCssPlugin()],
    // with this setting only the production version of React will be included in the bundle
    define: {'process.env.NODE_ENV': '"production"'},
    build: {
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['umd', 'iife'],
        fileName: (format: ModuleFormat) => `index.${format}.js`,
        name: 'FormEngineViewerBundle',
        cssFileName: 'viewer-bundle-premium',
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'react-is'],
    },
  })
)
