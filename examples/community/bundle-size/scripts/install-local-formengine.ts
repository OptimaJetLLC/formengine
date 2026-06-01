#!/usr/bin/env node

import {packAndInstallLocalPackage, removeDependencyFromPackageJson} from '@react-form-builder/cli-lib/install-local-package'
import {existsSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function printUsage(exitCode = 0): void {
  const script = process.argv[1] ?? 'install-local-formengine.ts'
  console.warn(`Usage: node ${script} <target-project-dir>

Example:
  node ${script} ../../sample-apps/my-designer

This will:
- Remove local RFB dependencies from the target package.json
- Pack and install local core + rsuite + material-ui + mantine packages
`)
  process.exitCode = exitCode
}

/**
 * Main execution function.
 * @param targetDir target directory to run the script in
 */
function run(targetDir: string): void {
  const packagesRoot = resolve(__dirname, '../../../../src/packages')

  removeDependencyFromPackageJson(targetDir, '@react-form-builder/core')
  removeDependencyFromPackageJson(targetDir, '@react-form-builder/components-rsuite')
  removeDependencyFromPackageJson(targetDir, '@react-form-builder/components-material-ui')
  removeDependencyFromPackageJson(targetDir, '@react-form-builder/components-mantine')

  packAndInstallLocalPackage(targetDir, join(packagesRoot, 'core'), targetDir)
  packAndInstallLocalPackage(targetDir, join(packagesRoot, 'views/rsuite'), targetDir)
  packAndInstallLocalPackage(targetDir, join(packagesRoot, 'views/material-ui'), targetDir)
  packAndInstallLocalPackage(targetDir, join(packagesRoot, 'views/mantine'), targetDir)
}

function parseArgs(): string | undefined {
  const args = process.argv.slice(2)
  if (args.includes('-h') || args.includes('--help')) {
    printUsage(0)
    return undefined
  }

  const targetDirInput = args[0]
  if (!targetDirInput) {
    throw new Error('Missing target directory.')
  }

  const targetDir = resolve(targetDirInput)
  if (!existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`)
  }

  return targetDir
}

function main(): void {
  const targetDir = parseArgs()
  if (!targetDir) {
    return
  }
  run(targetDir)
}

try {
  main()
} catch (error) {
  console.error('install-local-formengine failed.')
  console.error(error)
  process.exitCode = 1
}
