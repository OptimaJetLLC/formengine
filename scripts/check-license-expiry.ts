#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')

const EXPIRY_THRESHOLD_DAYS = 30

const LICENSE_FILES = ['packages/apps/common-designer/src/utils/licenseKey.ts', 'packages/apps/example-builder/src/utils/license.ts']

/**
 * Extracts the JSON payload from a license key string.
 * Format: PREFIX-BASE64_PAYLOAD:SIGNATURE
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
  const json = Buffer.from(base64Data, 'base64').toString('utf-8')
  return JSON.parse(json) as Record<string, unknown>
}

/**
 * Parses the MM.DD.YYYY date string used in license keys.
 */
function parseLicenseDate(dateStr: string): Date {
  const parts = dateStr.split('.')
  if (parts.length !== 3) {
    throw new Error(`Invalid license date format: ${dateStr}`)
  }
  const [month, day, year] = parts
  return new Date(`${year}-${month}-${day}`)
}

function extractLicenseKeyFromFile(filePath: string): string {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/['"`]([A-Za-z0-9_]+-[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+)['"`]/)
  if (!match) {
    throw new Error(`Could not extract license key from ${filePath}`)
  }
  return match[1]
}

function checkFile(file: string): boolean {
  const filePath = join(REPO_ROOT, file)
  const licenseKey = extractLicenseKeyFromFile(filePath)
  const payload = decodeLicensePayload(licenseKey)
  const licenseEndDate = payload.licenseEndDate as string
  const expiresAt = parseLicenseDate(licenseEndDate)
  const daysUntilExpiry = Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  if (daysUntilExpiry <= 0) {
    console.error(`  EXPIRED: ${file} - expired on ${licenseEndDate}`)
    return false
  }

  if (daysUntilExpiry <= EXPIRY_THRESHOLD_DAYS) {
    console.warn(`  EXPIRING SOON: ${file} - expires ${licenseEndDate} (${daysUntilExpiry} days remaining)`)
    return false
  }

  console.log(`  OK: ${file} - expires ${licenseEndDate} (${daysUntilExpiry} days remaining)`)
  return true
}

function main(): void {
  let allOk = true

  for (const file of LICENSE_FILES) {
    try {
      if (!checkFile(file)) {
        allOk = false
      }
    } catch (e) {
      console.error(`  ERROR: ${file} - ${(e as Error).message}`)
      allOk = false
    }
  }

  if (!allOk) {
    console.error('\nSome license keys are expired or expiring soon. Update them before deploying.')
    process.exitCode = 1
  } else {
    console.log('\nAll license keys are valid for more than 30 days.')
  }
}

main()
