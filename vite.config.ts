import react from '@vitejs/plugin-react'
import {existsSync, readdirSync} from 'node:fs'
import {readdir, readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {Script} from 'node:vm'
import type {PluginOption, UserConfig} from 'vite'
import {defineConfig} from 'vite'
import {analyzer} from 'vite-bundle-analyzer'
import svgr from 'vite-plugin-svgr'
import {appVersionMetaPlugin} from './vite-plugin-app-version.ts'
import {buildLicenseDefines} from './vite-license-defines.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const importMetaUrlPolyfillVariableName = '__import_meta_url__'
const importMetaUrlPolyfillIntro =
  "var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;" +
  `var ${importMetaUrlPolyfillVariableName} = ` +
  "(typeof document === 'undefined' && typeof location === 'undefined' " +
  "? require('u' + 'rl').pathToFileURL(__filename).href " +
  ": typeof document === 'undefined' ? location.href " +
  ": (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src " +
  "|| document.baseURI));"

/**
 * Creates compatibility settings for `import.meta.url` in UMD and IIFE bundles.
 * @returns the Vite compatibility configuration.
 */
export const createNonEsmImportMetaUrlConfig = (): UserConfig => ({
  define: {
    'import.meta.url': importMetaUrlPolyfillVariableName,
  },
  build: {
    rolldownOptions: {
      output: {
        intro: importMetaUrlPolyfillIntro,
      },
    },
  },
})

/**
 * Markers from {@link createNonEsmImportMetaUrlConfig} that survive Oxc minify.
 * The polyfill binding name itself may be renamed or dropped when unused.
 */
const importMetaUrlPolyfillMarkers = ['document.currentScript', 'document.baseURI', 'pathToFileURL'] as const

const cdnBundleJsFiles = ['index.umd.js', 'index.iife.js'] as const

/**
 * Fails the build when UMD/IIFE outputs are missing the `import.meta.url` polyfill intro,
 * or contain invalid classic-script syntax, including unresolved `import.meta` expressions.
 * @param outDir the Vite build output directory.
 */
export const assertNonEsmImportMetaUrlPolyfill = async (outDir: string): Promise<void> => {
  let checked = 0
  for (const file of cdnBundleJsFiles) {
    const filePath = path.join(outDir, file)
    if (!existsSync(filePath)) {
      continue
    }
    checked++
    const js = await readFile(filePath, 'utf8')
    const missingMarker = importMetaUrlPolyfillMarkers.find(marker => !js.includes(marker))
    if (missingMarker) {
      throw new Error(`${file} missing import.meta.url polyfill marker (${missingMarker})`)
    }
    try {
      // Compile without execution so diagnostic text is allowed and actual import.meta expressions are rejected.
      new Script(js, {filename: file})
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`${file} is not valid UMD/IIFE JavaScript: ${message}`)
    }
  }
  if (checked === 0) {
    throw new Error(`Expected index.umd.js or index.iife.js in ${outDir}`)
  }
}

/**
 * Fails the build when UMD/IIFE outputs do not embed exactly the composed LTR and RTL CSS data URLs.
 * @param outDir the Vite build output directory.
 * @param composedLtrCssPath the composed LTR CSS file path.
 * @param composedRtlCssPath the composed RTL CSS file path.
 */
export const assertEmbeddedComposedCssDataUrls = async (
  outDir: string,
  composedLtrCssPath: string,
  composedRtlCssPath: string,
): Promise<void> => {
  const expected = new Set([
    toDataCssUrl(await readCss(composedLtrCssPath)),
    toDataCssUrl(await readCss(composedRtlCssPath)),
  ])
  let checked = 0

  for (const file of cdnBundleJsFiles) {
    const filePath = path.join(outDir, file)
    if (!existsSync(filePath)) {
      continue
    }
    checked++
    const matches = (await readFile(filePath, 'utf8')).match(embeddedCssDataUrlPattern) ?? []
    const actual = new Set(matches)
    const unexpected = [...actual].filter(url => !expected.has(url))
    const missing = [...expected].filter(url => !actual.has(url))
    if (unexpected.length > 0 || missing.length > 0) {
      throw new Error(
        `${file} embedded CSS data URLs do not match composed LTR/RTL CSS `
        + `(unexpected=${unexpected.length}, missing=${missing.length})`,
      )
    }
  }

  if (checked === 0) {
    throw new Error(`Expected index.umd.js or index.iife.js in ${outDir}`)
  }
}

const sourceMapCommentPattern = /\/\*# sourceMappingURL=.*?\*\/\s*$/gm
const embeddedCssDataUrlPattern = /data:text\/css;base64,[A-Za-z0-9+/=]*/g

/**
 * Reads a CSS file and strips trailing sourceMappingURL comments.
 * @param cssPath the CSS file path.
 * @returns the CSS contents without source map comments.
 */
export const readCss = async (cssPath: string): Promise<string> => {
  const css = await readFile(cssPath, 'utf8')
  return css.replace(sourceMapCommentPattern, '').trimEnd()
}

/**
 * Writes composed CSS parts to an output file.
 * @param outputPath the destination CSS path.
 * @param parts the CSS fragments to join.
 */
export const writeComposedCss = async (outputPath: string, parts: readonly string[]): Promise<void> => {
  await writeFile(outputPath, `${parts.join('\n')}\n`, 'utf8')
}

/**
 * Encodes CSS as a `data:text/css;base64` URL.
 * @param css the CSS contents.
 * @returns the data URL.
 */
export const toDataCssUrl = (css: string): string => {
  const encoded = Buffer.from(css, 'utf8').toString('base64')
  return `data:text/css;base64,${encoded}`
}

const toCssUrlModuleContent = (href: string) => `const t = ${JSON.stringify(href)};
export {
  t as default
};
`

/**
 * Lists `.js` files under `outDir`, including nested chunk directories.
 * @param outDir the Vite build output directory.
 * @returns relative paths from `outDir` using the platform path separator.
 */
const listJsFilesRecursive = async (outDir: string): Promise<string[]> => {
  const names = await readdir(outDir, {recursive: true})
  return names.map(String).filter(name => name.endsWith('.js'))
}

/**
 * True when `content` looks like a CSS `?url` chunk that default-exports a string href.
 * @param content the JavaScript module source.
 * @returns whether the module is a CSS URL export chunk.
 */
const isCssUrlExportModule = (content: string): boolean =>
  /(?:const|let|var)\s+\w+\s*=\s*["'`][\s\S]*?["'`]\s*;?\s*export\s*\{[\s\S]*?\bas\s+default\b/.test(content)
  || /^\s*export\s+default\s+["'`]/.test(content)

/**
 * Locates a generated CSS `?url` chunk by stable module id in the file name or contents.
 * Searches nested output directories (for example `assets/`).
 * @param outDir the Vite build output directory.
 * @param moduleId the source CSS module id fragment, for example `designer.ltr.css`.
 * @returns the matching JS path relative to `outDir`.
 */
export const findGeneratedCssUrlModule = async (outDir: string, moduleId: string): Promise<string> => {
  const fileNames = await listJsFilesRecursive(outDir)
  const byName = fileNames.filter(name => path.basename(name).includes(moduleId))
  if (byName.length === 1) {
    return byName[0]
  }
  if (byName.length > 1) {
    throw new Error(`Found multiple CSS URL modules for ${moduleId} in ${outDir}: ${byName.join(', ')}`)
  }

  const byContent: string[] = []
  for (const name of fileNames) {
    const content = await readFile(path.join(outDir, name), 'utf8')
    if (content.includes(moduleId) && isCssUrlExportModule(content)) {
      byContent.push(name)
    }
  }
  if (byContent.length === 1) {
    return byContent[0]
  }
  if (byContent.length > 1) {
    throw new Error(`Found multiple CSS URL modules for ${moduleId} in ${outDir}: ${byContent.join(', ')}`)
  }

  throw new Error(`Could not find generated CSS URL module for ${moduleId} in ${outDir}`)
}

/**
 * Overwrites a generated CSS `?url` chunk with a data URL module.
 * @param outDir the Vite build output directory.
 * @param moduleId the source CSS module id fragment, for example `designer.ltr.css`.
 * @param href the data URL to export as the module default.
 */
export const replaceGeneratedCssUrlModule = async (
  outDir: string,
  moduleId: string,
  href: string,
): Promise<void> => {
  const moduleFileName = await findGeneratedCssUrlModule(outDir, moduleId)
  await writeFile(path.join(outDir, moduleFileName), toCssUrlModuleContent(href), 'utf8')
}

/**
 * An exact original→composed CSS data URL replacement pair.
 */
export type EmbeddedCssDataUrlReplacement = {
  readonly from: string
  readonly to: string
}

/**
 * A source LTR/RTL CSS stub pair inlined by `vite-inline-css-plugin`.
 */
export type LtrRtlCssStubPair = {
  readonly ltrCssPath: string
  readonly rtlCssPath: string
}

/**
 * RSuite CSS stubs imported by `ltrCssLoader` / `rtlCssLoader`.
 */
export const rsuiteLtrRtlCssStubs: LtrRtlCssStubPair = {
  ltrCssPath: path.resolve(__dirname, 'packages/views/rsuite/public/css/rsuite-ltr.css'),
  rtlCssPath: path.resolve(__dirname, 'packages/views/rsuite/public/css/rsuite-rtl.css'),
}

/**
 * Designer CSS stubs imported by the designer BiDi style loaders.
 */
export const designerLtrRtlCssStubs: LtrRtlCssStubPair = {
  ltrCssPath: path.resolve(__dirname, 'packages/designer/public/css/designer.ltr.css'),
  rtlCssPath: path.resolve(__dirname, 'packages/designer/public/css/designer.rtl.css'),
}

/**
 * Replaces embedded CSS data URLs by exact `from` match (order-independent).
 * @param outDir the Vite build output directory.
 * @param replacements the original→composed data URL pairs.
 */
export const replaceEmbeddedLtrRtlCssDataUrls = async (
  outDir: string,
  replacements: readonly EmbeddedCssDataUrlReplacement[],
): Promise<void> => {
  if (replacements.length === 0) {
    throw new Error('Expected at least one CSS data URL replacement')
  }

  const byFrom = new Map(replacements.map(({from, to}) => [from, to]))
  if (byFrom.size !== replacements.length) {
    throw new Error('Duplicate original CSS data URLs in replacements')
  }

  const allowedComposed = new Set(byFrom.values())

  const jsFiles = readdirSync(outDir).filter(fileName => fileName.endsWith('.js'))
  let filesWithEmbeddedCss = 0

  for (const jsFile of jsFiles) {
    const filePath = path.join(outDir, jsFile)
    let content = await readFile(filePath, 'utf8')

    const matches = content.match(embeddedCssDataUrlPattern)
    if (!matches || matches.length === 0) {
      continue
    }

    filesWithEmbeddedCss++
    for (const match of matches) {
      if (!byFrom.has(match) && !allowedComposed.has(match)) {
        throw new Error(`Unexpected embedded CSS data URL in ${jsFile}`)
      }
    }

    for (const [from, to] of byFrom) {
      content = content.replaceAll(from, to)
    }
    await writeFile(filePath, content, 'utf8')
  }

  if (filesWithEmbeddedCss === 0) {
    throw new Error(`No JS files in ${outDir} contained embedded CSS data URLs`)
  }
}

/**
 * Replaces inlined CSS stub data URLs with composed LTR/RTL data URLs.
 * Stub files are read verbatim (no trim) so they match `vite-inline-css-plugin` bytes.
 * @param outDir the Vite build output directory.
 * @param composedLtrCssPath the composed LTR CSS file path.
 * @param composedRtlCssPath the composed RTL CSS file path.
 * @param stubPairs the source stub CSS pairs that were inlined into the bundle.
 */
export const replaceEmbeddedLtrRtlCssFromStubs = async (
  outDir: string,
  composedLtrCssPath: string,
  composedRtlCssPath: string,
  stubPairs: readonly LtrRtlCssStubPair[],
): Promise<void> => {
  const composedLtrDataUrl = toDataCssUrl(await readCss(composedLtrCssPath))
  const composedRtlDataUrl = toDataCssUrl(await readCss(composedRtlCssPath))
  const replacements: EmbeddedCssDataUrlReplacement[] = []

  for (const {ltrCssPath, rtlCssPath} of stubPairs) {
    replacements.push(
      {from: toDataCssUrl(await readFile(ltrCssPath, 'utf8')), to: composedLtrDataUrl},
      {from: toDataCssUrl(await readFile(rtlCssPath, 'utf8')), to: composedRtlDataUrl},
    )
  }

  await replaceEmbeddedLtrRtlCssDataUrls(outDir, replacements)
  await assertEmbeddedComposedCssDataUrls(outDir, composedLtrCssPath, composedRtlCssPath)
}

const plugins: PluginOption = [
  react(),
  svgr({
    include: '**/*.svg',
  }),
  appVersionMetaPlugin(__dirname),
]

if (process.env.VITE_BUNDLE_ANALYZER === 'true') {
  plugins.push(
    analyzer({
      analyzerMode: 'static',
      summary: true
    }),
  )
}

export default defineConfig(({mode}): UserConfig => ({
  build: {
    cssMinify: 'lightningcss',
  },
  plugins,
  define: {
    ...buildLicenseDefines(mode, __dirname),
    'process.env.WDYR': `"${process.env.WDYR ? '1' : ''}"`
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    allowedHosts: ['formengine.local'],
    forwardConsole: true,
  },
}))
