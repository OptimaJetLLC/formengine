#!/usr/bin/env node

/* eslint-disable no-console */

import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {
  buildExpectedDistributionPackageJsons,
  DISTRIBUTION_VARIANTS,
  type DistributionVariant,
  findUnclassifiedRootDevDependencies,
  serializePackageJson,
} from './sync-distribution-package-json.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')

function checkDistributionPackageJsons(): void {
  const unclassified = findUnclassifiedRootDevDependencies(REPO_ROOT)
  if (unclassified.length > 0) {
    console.error('❌ Unclassified root devDependencies for distribution packaging:')
    for (const dependencyName of unclassified) {
      console.error(`  - ${dependencyName}`)
    }
    console.error(
      'Add each dependency to DISTRIBUTION_BASE_DEV_DEPENDENCIES, DEV_MONOREPO_ONLY_DEPENDENCIES, or scripts/distribution-eslint-dev-dependencies.ts.'
    )
    process.exitCode = 1
    return
  }

  const expected = buildExpectedDistributionPackageJsons(REPO_ROOT)
  const mismatches: string[] = []

  for (const variant of Object.keys(DISTRIBUTION_VARIANTS) as DistributionVariant[]) {
    const outputFileName = DISTRIBUTION_VARIANTS[variant].outputFileName
    const outputPath = join(REPO_ROOT, outputFileName)
    const expectedContent = serializePackageJson(expected[variant])
    const actualContent = readFileSync(outputPath, 'utf8')

    if (actualContent !== expectedContent) {
      mismatches.push(outputFileName)
    }
  }

  if (mismatches.length === 0) {
    console.log('✅ Distribution package manifests are in sync with package.json')
    return
  }

  console.error('❌ Distribution package manifests are out of sync:')
  for (const fileName of mismatches) {
    console.error(`  - ${fileName}`)
  }
  console.error('Run "npm run sync:distribution-package-json" from the repository root to update them.')
  process.exitCode = 1
}

try {
  checkDistributionPackageJsons()
} catch (error) {
  console.error('❌ check-distribution-package-json failed.', error)
  process.exitCode = 1
}
