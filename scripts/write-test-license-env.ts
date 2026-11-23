#!/usr/bin/env node

/* eslint-disable no-console */

/**
 * Writes root `.env` for CI tests from GitHub Actions / Earthly secrets (test keys only).
 * Deploy keys (demo/example) are not written here.
 */

import {writeFileSync} from 'node:fs'
import {join} from 'node:path'
import {assertTestLicenseMatrixComplete, discoverTestLicenseExportNames, parseTestLicenseMatrix} from '../vite-license-defines.ts'

const ENV_TEST = 'FORMENGINE_TEST_LICENSE_KEY'
const ENV_MATRIX = 'FORMENGINE_TEST_LICENSE_KEYS_JSON'
const ENV_FORMS_VERSIONS = 'FORMENGINE_FORMS_WITH_VERSIONS_LICENSE_KEY'

const GHA_TEST_LICENSE_ENV_NAMES = [ENV_TEST, ENV_MATRIX, ENV_FORMS_VERSIONS] as const

/**
 * Escapes a value for a single-quoted dotenv entry.
 * Vite `loadEnv` does not unescape `\"` in double-quoted values, so JSON matrices must use single quotes.
 * @param value raw secret value
 * @returns quoted dotenv value
 */
function quoteDotenvValue(value: string): string {
  if (value.includes("'")) {
    throw new Error('dotenv values must not contain single quotes (Vite loadEnv single-quote literal)')
  }
  return `'${value}'`
}

const repoRoot = process.cwd()
const testKey = process.env[ENV_TEST]?.trim()
const matrixRaw = process.env[ENV_MATRIX]?.trim()

if (!testKey || !matrixRaw) {
  console.error(`❌ ${ENV_TEST} and ${ENV_MATRIX} must be set for CI tests`)
  process.exit(1)
}

try {
  const keys = parseTestLicenseMatrix(matrixRaw)
  assertTestLicenseMatrixComplete(keys, discoverTestLicenseExportNames(repoRoot))
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
}

const lines: string[] = ['# Written by scripts/write-test-license-env.ts for CI tests.', '']

for (const envName of GHA_TEST_LICENSE_ENV_NAMES) {
  const value = process.env[envName]?.trim()
  if (value) {
    lines.push(`${envName}=${quoteDotenvValue(value)}`)
  }
}

writeFileSync(join(repoRoot, '.env'), `${lines.join('\n')}\n`, 'utf8')
console.log(`Wrote ${join(repoRoot, '.env')} (test license keys only)`)
