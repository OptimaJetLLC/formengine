import {execSync} from 'node:child_process'
import {existsSync} from 'node:fs'
import {readdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, join, resolve} from 'node:path'
import postcss from 'postcss'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import {fileURLToPath} from 'url'
import type {Plugin, ResolvedConfig} from 'vite'
import {defineConfig, mergeConfig} from 'vite'
import {inlineCssPlugin} from 'vite-inline-css-plugin'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

import base from '../../vite.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sourceMapCommentPattern = /\/\*# sourceMappingURL=.*?\*\/\s*$/gm

const repoRoot = resolve(__dirname, '../..')
const corePackageDir = join(repoRoot, 'packages', 'core')
const coreCssPath = join(corePackageDir, 'dist', 'assets', 'styles.css')

const readCss = async (cssPath: string) => {
  const css = await readFile(cssPath, 'utf8')
  return css.replace(sourceMapCommentPattern, '').trimEnd()
}

const composeCss = async (outputPath: string, parts: string[]) => {
  const composedCss = `${parts.join('\n')}\n`
  const result = await postcss([]).process(composedCss, {
    from: outputPath,
    to: outputPath,
    map: {inline: false, annotation: true}
  })

  await writeFile(outputPath, result.css, 'utf8')
  if (result.map) {
    await writeFile(`${outputPath}.map`, result.map.toString(), 'utf8')
  }
}

const getCoreCss = async () => {
  if (!existsSync(coreCssPath)) {
    execSync('npm run build', {cwd: corePackageDir, stdio: 'inherit'})
  }

  try {
    return await readCss(coreCssPath)
  } catch (error) {
    const suffix = error instanceof Error && error.message ? ` ${error.message}` : ''
    throw new Error(`@react-form-builder/core CSS was not generated at ${coreCssPath}.${suffix}`)
  }
}

const cssModuleFilePatterns = {
  ltr: /^designer\.ltr\.css-.*\.js$/,
  rtl: /^designer\.rtl\.css-.*\.js$/,
}

const toDataCssUrl = (css: string) => {
  const encoded = Buffer.from(css, 'utf8').toString('base64')
  return `data:text/css;base64,${encoded}`
}

const toCssUrlModuleContent = (href: string) => `const t = ${JSON.stringify(href)};
export {
  t as default
};
`

const replaceGeneratedCssUrlModule = async (outDir: string, direction: 'ltr' | 'rtl', href: string) => {
  const fileNames = await readdir(outDir)
  const pattern = cssModuleFilePatterns[direction]
  const moduleFileName = fileNames.find((fileName) => pattern.test(fileName))

  if (!moduleFileName) {
    throw new Error(`Could not find generated ${direction.toUpperCase()} CSS URL module in ${outDir}`)
  }

  await writeFile(join(outDir, moduleFileName), toCssUrlModuleContent(href), 'utf8')
}

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

      const coreCss = await getCoreCss()
      const generatedCss = await readCss(generatedCssPath)
      const commonCss = await readCss(commonCssPath)
      const ltrRsuiteCss = await readCss(ltrRsuiteCssPath)
      const rtlRsuiteCss = await readCss(rtlRsuiteCssPath)

      await composeCss(ltrOutputPath, [coreCss, generatedCss, commonCss, ltrRsuiteCss])
      await composeCss(rtlOutputPath, [coreCss, generatedCss, commonCss, rtlRsuiteCss])

      // Keep dynamic imports in StylesProvider intact, but replace their generated URL modules
      // with data URLs produced from the final composed CSS outputs.
      const ltrComposedCss = await readCss(ltrOutputPath)
      const rtlComposedCss = await readCss(rtlOutputPath)
      await replaceGeneratedCssUrlModule(outDir, 'ltr', toDataCssUrl(ltrComposedCss))
      await replaceGeneratedCssUrlModule(outDir, 'rtl', toDataCssUrl(rtlComposedCss))
    }
  }
}

export default defineConfig((env) => mergeConfig(base(env), {
  plugins: [
    dts({rollupTypes: true, tsconfigPath: './bundle.tsconfig.json'}),
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
    rollupOptions: {
      plugins: [
        excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})
      ]
    }
  },
}))
