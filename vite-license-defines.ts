/* eslint-disable import-x/no-nodejs-modules, import-x/no-extraneous-dependencies */
import {existsSync, readFileSync} from 'node:fs'
import {join} from 'node:path'
import {loadEnv} from 'vite'

/** Runtime license env vars injected via Vite `define`. */
const RUNTIME_LICENSE_ENV_NAMES = [
  'FORMENGINE_DEMO_LICENSE_KEY',
  'FORMENGINE_EXAMPLE_BUILDER_LICENSE_KEY',
  'FORMENGINE_TEST_LICENSE_KEY',
  'FORMENGINE_FORMS_WITH_VERSIONS_LICENSE_KEY',
] as const

const ENV_TEST_LICENSE_MATRIX = 'FORMENGINE_TEST_LICENSE_KEYS_JSON'

const TEST_LICENSE_KEYS_MODULE = 'tests/common/test-licenses.ts'
const TEST_LICENSE_DEFINE_RE = /__FORMENGINE_TEST_LICENSE_(\w+)__/g

type TestLicenseMatrixJson = {
  keys?: Record<string, string>
}

/**
 * Discovers test-license export names from the keys module (single source of truth for define seeds).
 * Missing when production Earthly images omit `tests/` (bundle / build-apps-and-views).
 * @param envDir product repository root
 * @returns export names referenced by Vite define placeholders
 */
function discoverTestLicenseExportNames(envDir: string): string[] {
  const modulePath = join(envDir, TEST_LICENSE_KEYS_MODULE)
  if (!existsSync(modulePath)) {
    return []
  }
  const source = readFileSync(modulePath, 'utf8')
  const names = new Set<string>()
  for (const match of source.matchAll(TEST_LICENSE_DEFINE_RE)) {
    names.add(match[1])
  }
  return [...names].sort((a, b) => a.localeCompare(b))
}

/**
 * Normalizes a license value to a string for Vite define.
 * Missing or whitespace-only values become an empty string (not a blank define token).
 * @param value raw env or matrix value
 * @returns license key or empty string
 */
function normalizeLicenseValue(value: string | undefined): string {
  if (typeof value !== 'string') {
    return ''
  }
  return value.trim()
}

/**
 * Vite `define` replacement for a string literal (always quoted, including empty `""`).
 * @param value license key or empty
 * @returns define replacement source
 */
function defineStringLiteral(value: string): string {
  return JSON.stringify(value)
}

/**
 * Parses the combined test-license matrix from `.env`.
 * @param raw JSON string from FORMENGINE_TEST_LICENSE_KEYS_JSON
 * @returns export name to license key map
 */
function parseTestLicenseMatrix(raw: string | undefined): Record<string, string> {
  if (!raw) {
    return {}
  }
  try {
    const parsed = JSON.parse(raw) as TestLicenseMatrixJson
    if (!parsed.keys || typeof parsed.keys !== 'object') {
      return {}
    }
    return parsed.keys
  } catch {
    return {}
  }
}

/**
 * Builds Vite `define` entries for runtime license keys from root `.env` and process.env.
 * Missing values are always the empty string literal `""` (never an empty define token).
 * @param mode Vite mode
 * @param envDir directory that contains `.env` (product repository root)
 * @returns define map for vite.config.ts
 */
export function buildLicenseDefines(mode: string, envDir: string): Record<string, string> {
  const fileEnv = loadEnv(mode, envDir, '')
  const env: Record<string, string | undefined> = {...fileEnv}
  for (const envName of [...RUNTIME_LICENSE_ENV_NAMES, ENV_TEST_LICENSE_MATRIX]) {
    const fromProcess = process.env[envName]
    if (fromProcess !== undefined) {
      env[envName] = fromProcess
    }
  }
  const defines: Record<string, string> = {}

  for (const envName of RUNTIME_LICENSE_ENV_NAMES) {
    defines[`__${envName}__`] = defineStringLiteral(normalizeLicenseValue(env[envName]))
  }

  for (const exportName of discoverTestLicenseExportNames(envDir)) {
    defines[`__FORMENGINE_TEST_LICENSE_${exportName}__`] = defineStringLiteral('')
  }

  for (const [exportName, key] of Object.entries(parseTestLicenseMatrix(env[ENV_TEST_LICENSE_MATRIX]))) {
    defines[`__FORMENGINE_TEST_LICENSE_${exportName}__`] = defineStringLiteral(normalizeLicenseValue(key))
  }

  return defines
}
