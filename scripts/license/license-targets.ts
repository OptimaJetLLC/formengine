import {existsSync} from 'node:fs'
import {basename, join} from 'node:path'

import {readJson} from '@react-form-builder/cli-lib/json-fs'
import {
  findAllPackageJsonDirectoriesUnderRelativeDirs,
  findNpmWorkspacePackages,
  type WorkspacePackageInfo,
} from '@react-form-builder/cli-lib/workspace-packages'

import type {PackageLicenseType} from './license-policy.ts'
import {getPackageLicenseType} from './license-policy.ts'

/** Directories that must ship a LICENSE file but are not npm workspace roots. */
export const EXTRA_LICENSE_RELATIVE_DIRS = ['examples'] as const

export const LICENSE_FILE_NAME = 'LICENSE' as const

export interface LicenseTarget {
  /** Absolute path to the directory that owns the LICENSE file. */
  dir: string
  /** Label used in license validation output (package name or directory). */
  licensedWork: string
  /** Whether a package.json exists in dir. */
  hasPackageJson: boolean
  /** MIT for community packages; FormEngine EULA for all others. */
  licenseType: PackageLicenseType
}

function resolveLicensedWork(dir: string): string {
  const packageJsonPath = join(dir, 'package.json')
  if (existsSync(packageJsonPath)) {
    const pkg = readJson<{name?: string}>(packageJsonPath)
    if (pkg.name) {
      return pkg.name
    }
  }

  return basename(dir)
}

function toLicenseTarget(repoRoot: string, pkg: WorkspacePackageInfo): LicenseTarget {
  return {
    dir: pkg.dir,
    licensedWork: resolveLicensedWork(pkg.dir),
    hasPackageJson: existsSync(join(pkg.dir, 'package.json')),
    licenseType: getPackageLicenseType(repoRoot, pkg.dir),
  }
}

/**
 * Returns every directory that must contain a LICENSE file.
 * @param repoRoot absolute monorepo root
 */
export function getLicenseTargets(repoRoot: string): LicenseTarget[] {
  const workspacePackages = findNpmWorkspacePackages(repoRoot).map(pkg => toLicenseTarget(repoRoot, pkg))
  const examplePackageDirs = findAllPackageJsonDirectoriesUnderRelativeDirs(repoRoot, [...EXTRA_LICENSE_RELATIVE_DIRS])
  const examplePackages = examplePackageDirs.map(dir => toLicenseTarget(repoRoot, {dir, name: basename(dir)}))

  const byDir = new Map<string, LicenseTarget>()
  for (const target of [...workspacePackages, ...examplePackages]) {
    byDir.set(target.dir, target)
  }

  return [...byDir.values()].sort((left, right) => left.dir.localeCompare(right.dir))
}
