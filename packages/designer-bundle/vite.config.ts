import {readdirSync} from 'node:fs'
import {readFile, rmdir, unlink, writeFile} from 'node:fs/promises'
import path from 'path'
import type {ModuleFormat} from 'rolldown'
// @ts-ignore
import {fileURLToPath} from 'url'
import type {Plugin, ResolvedConfig} from 'vite'
import {defineConfig, mergeConfig} from 'vite'
import {inlineCssPlugin} from 'vite-inline-css-plugin'
import svgr from 'vite-plugin-svgr'

import base, {
  assertNonEsmImportMetaUrlPolyfill,
  createNonEsmImportMetaUrlConfig,
  designerLtrRtlCssStubs,
  readCss,
  replaceEmbeddedLtrRtlCssFromStubs,
  rsuiteLtrRtlCssStubs,
  writeComposedCss,
} from '../../vite.config.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const composeDesignerDistCssPlugin = (): Plugin => {
  let outDir = ''

  return {
    name: 'compose-designer-dist-css',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.build.outDir)
    },
    async closeBundle() {
      const rsuiteCssSrc = path.resolve(__dirname, '../designer/public/css')
      const rsuiteCssFiles = readdirSync(rsuiteCssSrc).filter(f => f.endsWith('.css'))

      // Copy rsuite CSS files to dist
      for (const file of rsuiteCssFiles) {
        const src = path.join(rsuiteCssSrc, file)
        const dest = path.join(outDir, file)
        await writeFile(dest, await readFile(src, 'utf8'), 'utf8')
      }

      const bundleCssPath = path.join(outDir, 'designer-bundle.css')
      const formengineRsuitePath = path.join(outDir, 'formengine-rsuite.css')
      const rsuiteLtrPath = path.join(outDir, 'rsuite-no-reset.min.css')
      const rsuiteRtlPath = path.join(outDir, 'rsuite-no-reset-rtl.min.css')

      const ltrOutputPath = path.join(outDir, 'designer-bundle-ltr.css')
      const rtlOutputPath = path.join(outDir, 'designer-bundle-rtl.css')

      const bundleCss = await readCss(bundleCssPath)
      const formengineRsuite = await readCss(formengineRsuitePath)
      const rsuiteLtr = await readCss(rsuiteLtrPath)
      const rsuiteRtl = await readCss(rsuiteRtlPath)

      await writeComposedCss(ltrOutputPath, [bundleCss, formengineRsuite, rsuiteLtr])
      await writeComposedCss(rtlOutputPath, [bundleCss, formengineRsuite, rsuiteRtl])

      await replaceEmbeddedLtrRtlCssFromStubs(outDir, ltrOutputPath, rtlOutputPath, [designerLtrRtlCssStubs, rsuiteLtrRtlCssStubs])
      await assertNonEsmImportMetaUrlPolyfill(outDir)

      // Remove intermediate files
      await unlink(path.join(outDir, 'css', 'rsuite-ltr.css'))
      await unlink(path.join(outDir, 'css', 'rsuite-rtl.css'))
      await rmdir(path.join(outDir, 'css'))
      await unlink(path.join(outDir, 'designer.ltr.css'))
      await unlink(path.join(outDir, 'designer.rtl.css'))
      await unlink(rsuiteLtrPath)
      await unlink(rsuiteRtlPath)
      await unlink(bundleCssPath)
      await unlink(formengineRsuitePath)
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
        name: 'FormEngineDesignerBundle',
        cssFileName: 'designer-bundle',
      },
    },
    plugins: [
      inlineCssPlugin(),
      svgr({
        include: '**/*.svg',
      }),
      composeDesignerDistCssPlugin(),
    ],
    resolve: {
      dedupe: ['react', 'react-dom', 'react-is'],
    },
  })
)
