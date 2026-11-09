import {mkdtemp, rm, writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {assertNonEsmImportMetaUrlPolyfill} from '../../../vite.config.ts'

const polyfillIntro = 'var polyfilledUrl = document.currentScript || document.baseURI || require("url").pathToFileURL(__filename);'
const bundleFiles = ['index.umd.js', 'index.iife.js'] as const

describe('non-ESM bundle validation', () => {
  let outDir: string

  beforeEach(async () => {
    outDir = await mkdtemp(join(tmpdir(), 'formengine-bundle-validation-'))
  })

  afterEach(async () => {
    await rm(outDir, {recursive: true, force: true})
  })

  const writeBundle = (source: string, file: string = bundleFiles[0]) => writeFile(join(outDir, file), `${polyfillIntro}\n${source}`)

  it('accepts quoted worker diagnostics without executing the bundle', async () => {
    const source = [
      "/* The worker can't start. */",
      'function workerError(label) {',
      'return `Failed to load ${label}. Ensure modules referenced by "new URL(\'...?esm\', import.meta.url)".`;',
      '}',
      'throw new Error("The validator must not execute the bundle");',
    ].join('\n')
    await writeBundle(source)

    await expect(assertNonEsmImportMetaUrlPolyfill(outDir)).resolves.toBeUndefined()
  })

  it('accepts import.meta.url in comments and regular expression literals', async () => {
    await writeBundle('// import.meta.url\nconst pattern = /import.meta.url/;')

    await expect(assertNonEsmImportMetaUrlPolyfill(outDir)).resolves.toBeUndefined()
  })

  it.each(bundleFiles)('rejects unresolved import.meta.url in %s', async file => {
    await writeBundle('const worker = new URL("worker.js", import.meta.url);', file)

    await expect(assertNonEsmImportMetaUrlPolyfill(outDir)).rejects.toThrow(/import\.meta/)
  })

  it.each(bundleFiles)('rejects import.meta.url in template interpolation in %s', async file => {
    await writeBundle('const worker = `Worker URL: ${import.meta.url}`;', file)

    await expect(assertNonEsmImportMetaUrlPolyfill(outDir)).rejects.toThrow(/import\.meta/)
  })

  it('validates the IIFE output when the UMD output is valid', async () => {
    await writeBundle('const valid = true;')
    await writeBundle('const url = import.meta.url;', bundleFiles[1])

    await expect(assertNonEsmImportMetaUrlPolyfill(outDir)).rejects.toThrow(/index\.iife\.js/)
  })

  it('rejects a syntactically valid bundle without the polyfill', async () => {
    await writeFile(join(outDir, bundleFiles[0]), 'const valid = true;')

    await expect(assertNonEsmImportMetaUrlPolyfill(outDir)).rejects.toThrow(/missing import\.meta\.url polyfill marker/)
  })
})
