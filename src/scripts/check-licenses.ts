#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */

import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs'
import {basename, dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..', '..')
const SRC_ROOT = join(REPO_ROOT, 'src')

const LICENSE_CANDIDATES = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENSE.html']

const EXTRA_LICENSE_DIRS: string[] = ['examples', 'sample-apps']

interface WorkspacePackage {
  dir: string
  name: string
}

function resolveWorkspaceDirs(pattern: string): string[] {
  const absolutePattern = join(SRC_ROOT, pattern)

  if (!pattern.includes('*')) {
    return [absolutePattern]
  }

  const parent = dirname(absolutePattern)
  if (!existsSync(parent)) {
    return []
  }

  const entries = readdirSync(parent, {withFileTypes: true})
  return entries.filter(entry => entry.isDirectory()).map(entry => join(parent, entry.name))
}

function findWorkspacePackages(): WorkspacePackage[] {
  const rootPackageJsonPath = join(SRC_ROOT, 'package.json')
  const rootPackageJson = JSON.parse(readFileSync(rootPackageJsonPath, 'utf8')) as {
    workspaces?: string[]
  }

  const workspaces = rootPackageJson.workspaces ?? []
  const packages: WorkspacePackage[] = []

  for (const pattern of workspaces) {
    const dirs = resolveWorkspaceDirs(pattern)
    for (const dir of dirs) {
      const packageJsonPath = join(dir, 'package.json')
      if (!existsSync(packageJsonPath)) {
        continue
      }

      const stat = statSync(packageJsonPath)
      if (!stat.isFile()) {
        continue
      }

      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
        name?: string
      }
      const name = pkg.name ?? basename(dir)
      packages.push({dir, name})
    }
  }

  return packages
}

function hasLicenseFile(dir: string): boolean {
  for (const candidate of LICENSE_CANDIDATES) {
    if (existsSync(join(dir, candidate))) {
      return true
    }
  }
  return false
}

function findExtraPackages(): WorkspacePackage[] {
  const result: WorkspacePackage[] = []

  for (const relativeDir of EXTRA_LICENSE_DIRS) {
    const baseDir = join(REPO_ROOT, relativeDir)
    if (!existsSync(baseDir)) {
      continue
    }

    const stack: string[] = [baseDir]

    while (stack.length > 0) {
      const currentDir = stack.pop() as string
      const entries = readdirSync(currentDir, {withFileTypes: true})

      for (const entry of entries) {
        if (!entry.isDirectory()) {
          continue
        }

        if (entry.name === 'node_modules') {
          continue
        }

        const dir = join(currentDir, entry.name)
        const packageJsonPath = join(dir, 'package.json')

        if (existsSync(packageJsonPath)) {
          result.push({
            dir,
            name: entry.name,
          })
          // Do not recurse further under this directory; treat it as a package root.
          continue
        }

        stack.push(dir)
      }
    }
  }

  return result
}

function main(): void {
  const workspacePackages = findWorkspacePackages()
  const extraPackages = findExtraPackages()

  if (workspacePackages.length === 0 && extraPackages.length === 0) {
    console.warn('No workspace packages or extra directories found. Nothing to check.')
    return
  }

  const allTargets = [...workspacePackages, ...extraPackages]
  const missing: WorkspacePackage[] = []

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
    console.error('')
    console.error(
      'Each checked package or directory must include a license file (one of: LICENSE, LICENSE.md, LICENSE.txt, LICENSE.html).',
    )
    process.exitCode = 1
    return
  }

  console.log(`All ${allTargets.length} packages/directories have a license file.`)
}

main()

