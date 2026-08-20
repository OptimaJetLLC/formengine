#!/usr/bin/env node

import {existsSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {
  findNestedPackageRootsUnderRelativeDirs,
  findNpmWorkspacePackages,
  type WorkspacePackageInfo,
} from '@react-form-builder/cli-lib/workspace-packages'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')

const LICENSE_CANDIDATES = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENSE.html']

const EXTRA_LICENSE_DIRS: string[] = ['examples']

function hasLicenseFile(dir: string): boolean {
  for (const candidate of LICENSE_CANDIDATES) {
    if (existsSync(join(dir, candidate))) {
      return true
    }
  }
  return false
}

function main(): void {
  const workspacePackages = findNpmWorkspacePackages(REPO_ROOT)
  const extraPackages = findNestedPackageRootsUnderRelativeDirs(REPO_ROOT, EXTRA_LICENSE_DIRS)

  if (workspacePackages.length === 0 && extraPackages.length === 0) {
    console.warn('No workspace packages or extra directories found. Nothing to check.')
    return
  }

  const allTargets: WorkspacePackageInfo[] = [...workspacePackages, ...extraPackages]
  const missing: WorkspacePackageInfo[] = []

  for (const pkg of allTargets) {
    if (!hasLicenseFile(pkg.dir)) {
      missing.push(pkg)
    }
  }

  if (missing.length > 0) {
    console.error('The following packages or directories are missing a LICENSE file:')
    for (const pkg of missing) {
      console.error(`- ${pkg.name} (${pkg.dir})`)
    }
    throw Error('Each checked package or directory must include a license file (one of: LICENSE, LICENSE.md, LICENSE.txt, LICENSE.html).')
  }

  console.log(`All ${allTargets.length} packages/directories have a license file.`)
}

try {
  main()
} catch (error) {
  console.error('❌ check-licenses script failed.', error)
  process.exitCode = 1
}
