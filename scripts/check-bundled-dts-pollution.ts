#!/usr/bin/env node

/* eslint-disable no-console */

import {existsSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {checkBundledDtsPollution} from './cli-lib/check-bundled-dts-pollution.ts'
import {findNpmWorkspacePackages} from './cli-lib/workspace-packages.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')

function main(): void {
  const packageDirs = findNpmWorkspacePackages(REPO_ROOT)
    .map(workspacePackage => workspacePackage.dir)
    .filter(packageDir => existsSync(join(packageDir, 'dist', 'index.d.ts')))

  if (packageDirs.length === 0) {
    console.error('❌ No packages/*/dist/index.d.ts found. Run a package build (or npm run build) before this check.')
    process.exitCode = 1
    return
  }

  const failures: string[] = []

  for (const packageDir of packageDirs) {
    try {
      checkBundledDtsPollution(packageDir)
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error))
    }
  }

  if (failures.length === 0) {
    console.log(`✅ Checked ${packageDirs.length} package(s); no ambient type pollution in rolled-up declarations.`)
    return
  }

  console.error(`❌ Ambient type pollution in ${failures.length} package(s):`)
  for (const failure of failures) {
    console.error(failure)
    console.error('')
  }
  process.exitCode = 1
}

try {
  main()
} catch (error) {
  console.error('❌ check-bundled-dts-pollution failed.', error)
  process.exitCode = 1
}
