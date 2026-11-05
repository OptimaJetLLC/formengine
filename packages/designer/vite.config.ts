import {unlink, writeFile} from 'node:fs/promises'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import postcss from 'postcss'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import type {Plugin, ResolvedConfig} from 'vite'
import {defineConfig, mergeConfig} from 'vite'
import {inlineCssPlugin} from 'vite-inline-css-plugin'
import svgr from 'vite-plugin-svgr'
import base, {readCss, replaceGeneratedCssUrlModule, toDataCssUrl} from '../../vite.config.ts'
import {libDts} from '../../vite-plugin-api-extractor.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const composeCss = async (outputPath: string, parts: string[]) => {
  const composedCss = `${parts.join('\n')}\n`
  const result = await postcss([]).process(composedCss, {
    from: outputPath,
    to: outputPath,
    map: false,
  })

  await writeFile(outputPath, result.css, 'utf8')
}

const cssUrlModuleIds = {
  ltr: 'designer.ltr.css',
  rtl: 'designer.rtl.css',
} as const

const composeDesignerDistCssPlugin = (): Plugin => {
  let outDir = ''

  return {
    name: 'compose-designer-dist-css',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = resolve(config.build.outDir)
    },
    async closeBundle() {
      const assetsDir = join(outDir, 'assets')
      const cssDir = join(outDir, 'css')
      const generatedCssPath = join(assetsDir, 'styles.css')
      const ltrOutputPath = join(assetsDir, 'designer.ltr.min.css')
      const rtlOutputPath = join(assetsDir, 'designer.rtl.min.css')
      const commonCssPath = join(cssDir, 'formengine-rsuite.css')
      const ltrRsuiteCssPath = join(cssDir, 'rsuite-no-reset.min.css')
      const rtlRsuiteCssPath = join(cssDir, 'rsuite-no-reset-rtl.min.css')

      // Read CSS that was already inlined by cross-module-css plugin
      const generatedCss = await readCss(generatedCssPath)
      const commonCss = await readCss(commonCssPath)
      const ltrRsuiteCss = await readCss(ltrRsuiteCssPath)
      const rtlRsuiteCss = await readCss(rtlRsuiteCssPath)

      await composeCss(ltrOutputPath, [generatedCss, commonCss, ltrRsuiteCss])
      await composeCss(rtlOutputPath, [generatedCss, commonCss, rtlRsuiteCss])

      // Keep dynamic imports in StylesProvider intact, but replace their generated URL modules
      // with data URLs produced from the final composed CSS outputs.
      const ltrComposedCss = await readCss(ltrOutputPath)
      const rtlComposedCss = await readCss(rtlOutputPath)
      await replaceGeneratedCssUrlModule(outDir, cssUrlModuleIds.ltr, toDataCssUrl(ltrComposedCss))
      await replaceGeneratedCssUrlModule(outDir, cssUrlModuleIds.rtl, toDataCssUrl(rtlComposedCss))

      // Remove the intermediate styles.css file after successful composition
      await unlink(generatedCssPath)

      await unlink(join(cssDir, 'designer.ltr.css'))
      await unlink(join(cssDir, 'designer.rtl.css'))
    },
  }
}

export default defineConfig(env =>
  mergeConfig(base(env), {
    plugins: [
      libDts(),
      svgr({
        include: '**/*.svg',
      }),
      inlineCssPlugin(),
      composeDesignerDistCssPlugin(),
    ],
    build: {
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, './index.ts'),
        formats: ['es'],
        fileName: 'index',
        cssFileName: 'assets/styles',
      },
      rolldownOptions: {
        plugins: [excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})],
      },
    },
  })
)
