#!/usr/bin/env node

import {readFileSync} from 'node:fs'
import {dirname, join, relative} from 'node:path'
import {fileURLToPath} from 'node:url'

import {findNpmWorkspacePackages} from './cli-lib/workspace-packages.ts'
import {NPM_PACKAGE_PATHS} from './release/constants.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')

/** npm profile: https://www.npmjs.com/~ojroot */
const PUBLISHED_PACKAGE_RELATIVE_PATHS = new Set<string>(NPM_PACKAGE_PATHS)

type PackageJson = {
  name?: string
  private?: boolean
}

function toPosixRelativePath(repoRoot: string, absoluteDir: string): string {
  return relative(repoRoot, absoluteDir).replaceAll('\\', '/')
}

function readPackageJson(packageDir: string): PackageJson {
  return JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')) as PackageJson
}

/**
 * Validates package.json private field against the published-package whitelist.
 * @returns validation problems; empty when every workspace package conforms
 */
function collectPackagePrivacyProblems(repoRoot: string): string[] {
  const problems: string[] = []
  const rootPackageJson = readPackageJson(repoRoot)

  if (rootPackageJson.private !== true) {
    problems.push('root package.json must have "private": true')
  }

  for (const workspacePackage of findNpmWorkspacePackages(repoRoot)) {
    const relativePath = toPosixRelativePath(repoRoot, workspacePackage.dir)
    const packageJson = readPackageJson(workspacePackage.dir)
    const packageName = packageJson.name ?? workspacePackage.name
    const isPublished = PUBLISHED_PACKAGE_RELATIVE_PATHS.has(relativePath)
    const isPrivate = packageJson.private === true

    if (isPublished && isPrivate) {
      problems.push(`${packageName} (${relativePath}): published npm package must not have "private": true`)
      continue
    }

    if (!isPublished && !isPrivate) {
      problems.push(`${packageName} (${relativePath}): internal workspace package must have "private": true`)
    }
  }

  return problems
}

function main(): void {
  const problems = collectPackagePrivacyProblems(REPO_ROOT)

  if (problems.length > 0) {
    console.error('Package privacy validation failed:')
    for (const problem of problems) {
      console.error(`- ${problem}`)
    }
    console.error(
      `Published packages are defined in scripts/release/constants.ts (NPM_PACKAGE_PATHS), aligned with https://www.npmjs.com/~ojroot`
    )
    throw Error('package.json private fields are out of sync with the published-package whitelist.')
  }

  console.log(
    `All ${findNpmWorkspacePackages(REPO_ROOT).length} workspace packages validated: ${PUBLISHED_PACKAGE_RELATIVE_PATHS.size} published, ${
      findNpmWorkspacePackages(REPO_ROOT).length - PUBLISHED_PACKAGE_RELATIVE_PATHS.size
    } internal.`
  )
}

try {
  main()
} catch (error) {
  console.error('❌ check-package-privacy script failed.', error)
  process.exitCode = 1
}
