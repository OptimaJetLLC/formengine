#!/usr/bin/env node

/* eslint-disable import-x/no-nodejs-modules, no-console */

/**
 * Checks runtime license keys in the product root `.env` for expiry.
 * Logs labels and dates only — never raw keys.
 *
 * Canonical key storage lives in formengine-tools `tools/license/.secrets/`.
 * Copy that `.env` to this repo root for local checks and demo/formbuilder builds.
 * Keep the checked matrix export list aligned with
 * formengine-tools `tools/license/runtime-license-targets.ts`.
 */

import {existsSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')
const ROOT_ENV_PATH = join(REPO_ROOT, '.env')

const EXPIRY_THRESHOLD_DAYS = 30

const EXPIRY_CHECKED_ENV_NAMES = [
  'FORMENGINE_DEMO_LICENSE_KEY',
  'FORMENGINE_EXAMPLE_BUILDER_LICENSE_KEY',
  'FORMENGINE_TEST_LICENSE_KEY',
  'FORMENGINE_FORMS_WITH_VERSIONS_LICENSE_KEY',
] as const

const ENV_MATRIX = 'FORMENGINE_TEST_LICENSE_KEYS_JSON'

/**
 * Matrix export names that must stay calendar-valid (WFE-2140).
 * Skip *2024*, invalidLicenseKey, and legacy trial 2024 — intentional fixtures.
 */
const EXPIRY_CHECKED_MATRIX_EXPORT_NAMES = [
  'testLicense',
  'licenseBusiness2030AnyDomain',
  'licenseBusiness2030MultipleDomains',
  'licenseBusiness2030NoDomain',
  'licenseBusinessStrict2030AnyDomain',
  'licenseBusinessStrict2030MultipleDomains',
  'licenseBusinessStrict2030NoDomain',
  'licenseEnterprise2030AnyDomain',
  'licenseEnterprise2030MultipleDomains',
  'licenseEnterprise2030NoDomain',
  'licenseEnterpriseStrict2030AnyDomain',
  'licenseEnterpriseStrict2030MultipleDomains',
  'licenseEnterpriseStrict2030NoDomain',
  'licenseLegacyCompany2030',
  'licenseLegacyCompanyStrict2030',
] as const

type LicenseSource = {
  label: string
  key: string
}

type CombinedLicensesJson = {
  keys?: Record<string, string>
}

/**
 * Extracts the JSON payload from a license key string.
 * Format: PREFIX-BASE64_PAYLOAD:SIGNATURE
 * @param licenseKey license key
 * @returns decoded payload object
 */
function decodeLicensePayload(licenseKey: string): Record<string, unknown> {
  const prefixEnd = licenseKey.indexOf('-')
  if (prefixEnd === -1) {
    throw new Error('Invalid license key: missing prefix separator')
  }

  const rest = licenseKey.slice(prefixEnd + 1)
  const signatureStart = rest.indexOf(':')
  if (signatureStart === -1) {
    throw new Error('Invalid license key: missing data/signature separator')
  }

  const base64Data = rest.slice(0, signatureStart)
  const decoded = Buffer.from(base64Data, 'base64').toString('utf-8')
  return JSON.parse(decoded) as Record<string, unknown>
}

/**
 * Parses the MM.DD.YYYY date string used in license keys.
 * @param dateStr license date string
 * @returns Date
 */
function parseLicenseDate(dateStr: string): Date {
  const parts = dateStr.split('.')
  if (parts.length !== 3) {
    throw new Error(`Invalid license date format: ${dateStr}`)
  }
  const [month, day, year] = parts
  const expiresAt = new Date(`${year}-${month}-${day}`)
  if (Number.isNaN(expiresAt.getTime())) {
    throw new Error(`Invalid license date value: ${dateStr}`)
  }
  return expiresAt
}

/**
 * Loads product root `.env` without overriding existing process.env values.
 */
function loadRootEnv(): void {
  if (!existsSync(ROOT_ENV_PATH)) {
    return
  }
  process.loadEnvFile(ROOT_ENV_PATH)
}

/**
 * Resolves a runtime key from process.env / root `.env`.
 * @param envName secret name
 * @returns source label + key
 */
function resolveRuntimeKey(envName: string): LicenseSource {
  const value = process.env[envName]?.trim()
  if (!value) {
    throw new Error(
      `Missing ${envName} in ${ROOT_ENV_PATH} (or process.env). ` + `Copy formengine-tools/tools/license/.secrets/.env to the product root.`
    )
  }
  return {label: `.env:${envName}`, key: value}
}

/**
 * Parses the test-license matrix from env.
 * @returns label + keys map
 */
function resolveMatrixKeys(): {label: string; keys: Record<string, string>} {
  const raw = process.env[ENV_MATRIX]?.trim()
  if (!raw) {
    throw new Error(
      `Missing ${ENV_MATRIX} in ${ROOT_ENV_PATH} (or process.env). ` +
        `Copy formengine-tools/tools/license/.secrets/.env to the product root.`
    )
  }
  const parsed = JSON.parse(raw) as CombinedLicensesJson
  if (!parsed.keys || typeof parsed.keys !== 'object') {
    throw new Error(`${ENV_MATRIX}: missing keys object`)
  }
  return {label: `.env:${ENV_MATRIX}`, keys: parsed.keys}
}

/**
 * Checks one license source for expiry.
 * @param source license source
 * @returns whether the key is valid for more than the threshold
 */
function checkSource(source: LicenseSource): boolean {
  const payload = decodeLicensePayload(source.key)
  const licenseEndDate = payload.licenseEndDate as string
  if (!licenseEndDate) {
    throw new Error(`${source.label}: missing licenseEndDate`)
  }

  const end = parseLicenseDate(licenseEndDate)
  const daysRemaining = Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const formatted = licenseEndDate

  if (daysRemaining <= 0) {
    console.error(`  EXPIRED: ${source.label} — expired ${formatted} (${Math.abs(daysRemaining)} days ago)`)
    return false
  }
  if (daysRemaining <= EXPIRY_THRESHOLD_DAYS) {
    console.error(`  EXPIRING: ${source.label} — expires ${formatted} (${daysRemaining} days remaining)`)
    return false
  }

  console.log(`  OK: ${source.label} — expires ${formatted} (${daysRemaining} days remaining)`)
  return true
}

/**
 * Entry point for CLI and programmatic deploy checks.
 */
export function checkLicenseExpiry(): void {
  loadRootEnv()

  let ok = true
  for (const envName of EXPIRY_CHECKED_ENV_NAMES) {
    try {
      if (!checkSource(resolveRuntimeKey(envName))) {
        ok = false
      }
    } catch (error) {
      ok = false
      console.error(`  ERROR: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  try {
    const matrix = resolveMatrixKeys()
    for (const exportName of EXPIRY_CHECKED_MATRIX_EXPORT_NAMES) {
      const key = matrix.keys[exportName]
      if (typeof key !== 'string' || key.trim().length === 0) {
        ok = false
        console.error(`  ERROR: ${matrix.label}.keys.${exportName} — missing`)
        continue
      }
      if (!checkSource({label: `${matrix.label}.keys.${exportName}`, key})) {
        ok = false
      }
    }
  } catch (error) {
    ok = false
    console.error(`  ERROR: ${error instanceof Error ? error.message : String(error)}`)
  }

  if (!ok) {
    console.error(
      '\nSome app or test license keys are expired, expiring soon, or missing. ' +
        'Update formengine-tools/tools/license/.secrets and copy `.env` here before deploying.'
    )
    process.exitCode = 1
    return
  }

  console.log(`\nAll app and test license keys are valid for more than ${EXPIRY_THRESHOLD_DAYS} days.`)
}

const isMain = process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]

if (isMain) {
  checkLicenseExpiry()
}
