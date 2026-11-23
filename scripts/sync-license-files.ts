#!/usr/bin/env node

import {readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {PACKAGE_LICENSE_EULA} from './license/eula-config.ts'
import {renderLicenseFileContent} from './license/license-policy.ts'
import {getLicenseTargets, LICENSE_FILE_NAME} from './license/license-targets.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')

type PackageJson = {
  license?: string
}

/**
 * Writes LICENSE files and updates package.json license fields per package policy.
 */
function syncLicenseFiles(repoRoot: string = REPO_ROOT): void {
  const targets = getLicenseTargets(repoRoot)

  for (const target of targets) {
    const licensePath = join(target.dir, LICENSE_FILE_NAME)
    const expectedContent = renderLicenseFileContent(target.licenseType, target.licensedWork)
    writeFileSync(licensePath, expectedContent)

    if (!target.hasPackageJson) {
      continue
    }

    const packageJsonPath = join(target.dir, 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJson
    if (packageJson.license === target.licenseType) {
      continue
    }

    packageJson.license = target.licenseType
    writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, undefined, 2)}\n`)
  }
}

try {
  syncLicenseFiles()
  const targets = getLicenseTargets(REPO_ROOT)
  const mitCount = targets.filter(target => target.licenseType === 'MIT').length
  const eulaCount = targets.length - mitCount
  console.log(`✅ Synced LICENSE files: ${mitCount} MIT, ${eulaCount} EULA (${PACKAGE_LICENSE_EULA}).`)
} catch (error) {
  console.error('❌ sync-license-files failed.', error)
  process.exitCode = 1
}
