#!/usr/bin/env node

/* eslint-disable import-x/no-nodejs-modules, no-console */

/**
 * Checks deploy runtime license keys in the product root `.env` for expiry.
 * Logs labels and dates only — never raw keys.
 *
 * Canonical key storage lives in formengine-tools `tools/license/.secrets/`.
 * Copy that `.env` to this repo root for local demo/formbuilder builds.
 */

import {existsSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')
const ROOT_ENV_PATH = join(REPO_ROOT, '.env')

const EXPIRY_THRESHOLD_DAYS = 30

const DEPLOY_ENV_NAMES = ['FORMENGINE_DEMO_LICENSE_KEY', 'FORMENGINE_EXAMPLE_BUILDER_LICENSE_KEY'] as const

type LicenseSource = {
  label: string
  key: string
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
  return new Date(`${year}-${month}-${day}`)
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
 * Resolves a deploy key from process.env / root `.env`.
 * @param envName secret name
 * @returns source label + key
 */
function resolveDeployKey(envName: string): LicenseSource {
  const value = process.env[envName]?.trim()
  if (!value) {
    throw new Error(
      `Missing ${envName} in ${ROOT_ENV_PATH} (or process.env). ` + `Copy formengine-tools/tools/license/.secrets/.env to the product root.`
    )
  }
  return {label: `.env:${envName}`, key: value}
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

  if (daysRemaining < 0) {
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
  for (const envName of DEPLOY_ENV_NAMES) {
    try {
      if (!checkSource(resolveDeployKey(envName))) {
        ok = false
      }
    } catch (error) {
      ok = false
      console.error(`  ERROR: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (!ok) {
    console.error(
      '\nSome license keys are expired, expiring soon, or missing. ' +
        'Update formengine-tools/tools/license/.secrets and copy `.env` here before deploying.'
    )
    process.exitCode = 1
    return
  }

  console.log(`\nAll deploy license keys are valid for more than ${EXPIRY_THRESHOLD_DAYS} days.`)
}

const isMain = process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]

if (isMain) {
  checkLicenseExpiry()
}
