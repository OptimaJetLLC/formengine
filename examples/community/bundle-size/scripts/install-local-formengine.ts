#!/usr/bin/env node

import {existsSync} from 'fs'
import {dirname, join, resolve} from 'path'
import {fileURLToPath} from 'url'
import {installLocalPackage, removeFromPackageJson} from './utils.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const scriptRoot = __dirname

process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  console.error('Unhandled rejection:', reason)
  process.exit(1)
})

function printUsage(exitCode = 0): void {
  const script = process.argv[1] ?? 'install-local-formengine.ts'
  console.warn(`Usage: node ${script} <target-project-dir>

Example:
  node ${script} ../../sample-apps/my-designer

This will:
- Remove local RFB dependencies from the target package.json
- Pack and install local core + rsuite packages
`)
  process.exit(exitCode)
}

/**
 * Main execution function.
 * @param targetDir target directory to run the script in
 */
function main(targetDir: string): void {
  const originalCwd = process.cwd()

  try {
    process.chdir(targetDir)

    removeFromPackageJson('@react-form-builder/core')
    removeFromPackageJson('@react-form-builder/components-rsuite')
    removeFromPackageJson('@react-form-builder/components-material-ui')

    const packagesRoot = resolve(scriptRoot, '../../../../src/packages')
    installLocalPackage(targetDir, join(packagesRoot, 'core'))
    installLocalPackage(targetDir, join(packagesRoot, 'views/rsuite'))
    installLocalPackage(targetDir, join(packagesRoot, 'views/material-ui'))
  } finally {
    process.chdir(originalCwd)
  }
}

const args = process.argv.slice(2)
if (args.includes('-h') || args.includes('--help')) {
  printUsage(0)
}

const targetDirInput = args[0]
if (!targetDirInput) {
  console.error('❌ Missing target directory.')
  printUsage(1)
}

const targetDir = resolve(targetDirInput)

if (!existsSync(targetDir)) {
  console.error(`❌ Target directory does not exist: ${targetDir}`)
  printUsage(1)
}

main(targetDir)
