import {readdirSync} from 'node:fs'
import {readFile, unlink, writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import path from 'path'
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
        await writeFile(dest, await readFile(src, 'utf8'), 'utf8')
      }

      const bundleCssPath = path.join(outDir, 'viewer-bundle.css')
      const formengineRsuitePath = path.join(outDir, 'formengine-rsuite.css')
      const rsuiteLtrPath = path.join(outDir, 'rsuite-no-reset.min.css')
      const rsuiteRtlPath = path.join(outDir, 'rsuite-no-reset-rtl.min.css')

      const ltrOutputPath = path.join(outDir, 'viewer-bundle-ltr.css')
      const rtlOutputPath = path.join(outDir, 'viewer-bundle-rtl.css')

      const bundleCss = await readCss(bundleCssPath)
      const formengineRsuite = await readCss(formengineRsuitePath)
      const rsuiteLtr = await readCss(rsuiteLtrPath)
      const rsuiteRtl = await readCss(rsuiteRtlPath)

      await writeComposedCss(ltrOutputPath, [bundleCss, formengineRsuite, rsuiteLtr])
      await writeComposedCss(rtlOutputPath, [bundleCss, formengineRsuite, rsuiteRtl])

      await replaceEmbeddedLtrRtlCssFromStubs(outDir, ltrOutputPath, rtlOutputPath, [rsuiteLtrRtlCssStubs])
      await assertNonEsmImportMetaUrlPolyfill(outDir)

      // Remove intermediate rsuite stub files
      await unlink(path.join(outDir, 'rsuite-ltr.css'))
      await unlink(path.join(outDir, 'rsuite-rtl.css'))
      await unlink(bundleCssPath)
    },
  }
}

export default defineConfig(env =>
  mergeConfig(mergeConfig(base(env), createNonEsmImportMetaUrlConfig()), {
    // with this setting only the production version of React will be included in the bundle
    define: {'process.env.NODE_ENV': '"production"'},
    build: {
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['umd', 'iife'],
        fileName: (format: ModuleFormat) => `index.${format}.js`,
        name: 'FormEngineViewerBundle',
      },
    },
    plugins: [inlineCssPlugin(), composeViewerDistCssPlugin()],
    resolve: {
      dedupe: ['react', 'react-dom', 'react-is'],
    },
  })
)
