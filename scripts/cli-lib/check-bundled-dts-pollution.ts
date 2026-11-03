/* eslint-disable no-console */
import {existsSync, readFileSync} from 'node:fs'
import {join, relative, resolve} from 'node:path'

import {readPackageJson} from './view-pack-tools.ts'

/**
 * Signatures that only appear when unplugin-dts/API Extractor appends Outside-emitted
 * ambient declarations (TypeScript lib, Vitest globals, etc.) into the rolled-up package API.
 */
const POLLUTION_MARKERS = [
  {
    id: 'typescript-lib',
    pattern: /\/\/\/\s*<reference\s+no-default-lib="true"\s*\/>/,
    hint: 'TypeScript standard library declarations',
  },
  {
    id: 'typescript-webassembly',
    pattern: /\bdeclare namespace WebAssembly\b/,
    hint: 'TypeScript WebAssembly lib declarations',
  },
  {
    id: 'nodejs-types',
    pattern: /\bdeclare namespace NodeJS\b/,
    hint: 'Node.js ambient type declarations',
  },
  {
    id: 'undici-types',
    pattern: /\bUndiciError\b/,
    hint: 'Node Undici type declarations',
  },
  {
    id: 'vitest-globals',
    pattern: /typeof import\(['"]vitest['"]\)/,
    hint: 'Vitest test globals',
  },
  {
    id: 'vitest-hooks',
    pattern: /\b(?:onTestFinished|aroundAll|aroundEach|expectTypeOf|assertType)\b/,
    hint: 'Vitest hook/assertion globals',
  },
] as const

/** Primary rolled-up declaration entries published by workspace packages. */
const ENTRY_DECLARATION_NAMES = ['index.d.ts', 'index-lite.d.ts'] as const

/**
 * Fails when a package's rolled-up entry `.d.ts` embeds ambient type dumps that are not part of
 * the public API (the "type bomb" seen when hoisted node_modules .d.ts pass the dts filter).
 * @param packageDir package root that contains dist/
 */
export function checkBundledDtsPollution(packageDir: string): void {
  const absolutePackageDir = resolve(packageDir)
  const distDir = join(absolutePackageDir, 'dist')
  if (!existsSync(distDir)) {
    return
  }

  const entryDeclarationFiles = ENTRY_DECLARATION_NAMES.map(name => join(distDir, name)).filter(existsSync)

  if (entryDeclarationFiles.length === 0) {
    return
  }

  const packageJson = readPackageJson(absolutePackageDir)
  const failures: string[] = []

  console.log('🔍 Checking rolled-up declarations for ambient type pollution...')

  for (const filePath of entryDeclarationFiles) {
    const source = readFileSync(filePath, 'utf8')
    const file = relative(absolutePackageDir, filePath).replaceAll('\\', '/')
    const matched = POLLUTION_MARKERS.filter(marker => marker.pattern.test(source)).map(marker => `${marker.id} (${marker.hint})`)

    if (matched.length > 0) {
      failures.push(`  ${file}: ${matched.join(', ')}`)
    }
  }

  if (failures.length === 0) {
    console.log('✅ Rolled-up declarations do not embed ambient type dumps.')
    return
  }

  throw new Error(
    `Ambient type pollution in bundled declarations for ${packageJson.name}:\n${failures.join('\n')}\n` +
      'External .d.ts content was rolled into the public API. Tighten unplugin-dts include/exclude ' +
      '(see libDts) so hoisted node_modules declarations are not transformed into the bundle.'
  )
}
