#!/usr/bin/env node

import {existsSync, readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {PACKAGE_LICENSE_EULA} from './license/eula-config.ts'
import {PACKAGE_LICENSE_SPDX_MIT, renderLicenseFileContent} from './license/license-policy.ts'
import {getLicenseTargets, LICENSE_FILE_NAME, type LicenseTarget} from './license/license-targets.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')

type PackageJson = {
  license?: string
}

/**
 * Validates LICENSE file content and package.json license field for one package target.
 * @returns validation problems; empty when the target conforms to repository policy
 */
function collectPackageLicenseProblems(target: LicenseTarget, licenseContent: string, packageJson: PackageJson | undefined): string[] {
  const problems: string[] = []
  const expectedContent = renderLicenseFileContent(target.licenseType, target.licensedWork)

  if (licenseContent !== expectedContent) {
    problems.push(`LICENSE file does not match expected ${target.licenseType} template`)
  }

  if (!target.hasPackageJson) {
    return problems
  }

  const declaredLicense = packageJson?.license ?? 'MISSING'
  if (declaredLicense !== target.licenseType) {
    problems.push(`package.json license is "${declaredLicense}", expected "${target.licenseType}"`)
  }

  return problems
}

function validatePackageTarget(target: LicenseTarget, errors: string[]): void {
  const licensePath = join(target.dir, LICENSE_FILE_NAME)
  if (!existsSync(licensePath)) {
    errors.push(`${target.licensedWork}: missing LICENSE file (${licensePath})`)
    return
  }

  const licenseContent = readFileSync(licensePath, 'utf8')
  let packageJson: PackageJson | undefined

  if (target.hasPackageJson) {
    const packageJsonPath = join(target.dir, 'package.json')
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJson
  }

  const problems = collectPackageLicenseProblems(target, licenseContent, packageJson)
  if (problems.length > 0) {
    errors.push(`${target.licensedWork}: ${problems.join('; ')}`)
  }
}

function main(): void {
  const targets = getLicenseTargets(REPO_ROOT)
  const errors: string[] = []
  let mitCount = 0
  let eulaCount = 0

  for (const target of targets) {
    validatePackageTarget(target, errors)
    if (target.licenseType === PACKAGE_LICENSE_SPDX_MIT) {
      mitCount += 1
    } else {
      eulaCount += 1
    }
  }

  if (errors.length > 0) {
    console.error('License validation failed:')
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    console.error('Run "npm run sync:license-files" to regenerate LICENSE files and package.json fields.')
    throw Error('License files or package.json license fields are out of sync with the license policy.')
  }

  console.log(`All ${targets.length} package targets validated: ${mitCount} MIT, ${eulaCount} ${PACKAGE_LICENSE_EULA}.`)
}

try {
  main()
} catch (error) {
  console.error('❌ check-licenses script failed.', error)
  process.exitCode = 1
}
