#!/usr/bin/env node

/**
 * Rewrites package-lock.json entries for @react-form-builder/* packages using registry-style
 * resolved URLs and sha512 integrity from release .tgz archives (before npm publish).
 *
 * Usage (from repository root):
 *   node scripts/patch-package-lock-from-archives.ts --archives-dir .archives --lockfile path/to/package-lock.json
 *   node scripts/patch-package-lock-from-archives.ts --archives-dir .archives --lockfile examples/foo/package-lock.json --package-json examples/foo/package.json
 */

import {existsSync, readdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {integrityForTgz} from './npm-tgz-integrity.ts'
import {NPM_ARCHIVE_FILENAME_PREFIX} from './release/constants.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_ROOT = join(__dirname, '..')
const PACKAGE_PREFIX = '@react-form-builder/'

function readLernaVersion(): string | undefined {
  const lernaPath = join(REPO_ROOT, 'lerna.json')
  if (!existsSync(lernaPath)) {
    return undefined
  }
  const lerna = JSON.parse(readFileSync(lernaPath, 'utf8')) as {version?: string}
  return lerna.version?.trim() || undefined
}

const DEPS_SECTIONS = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'] as const

type PackageJson = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  [key: string]: unknown
}

type ArchiveEntry = {
  packageName: string
  version: string
  integrity: string
}

/**
 * Returns the canonical npm registry tarball URL for a published scoped package.
 * @param packageName scoped name (e.g. @react-form-builder/core)
 * @param version exact semver from the lock entry
 */
function registryTarballUrl(packageName: string, version: string): string {
  const slash = packageName.indexOf('/')
  if (slash === -1 || !packageName.startsWith('@')) {
    throw new Error(`Expected scoped package name, got ${packageName}`)
  }
  const base = packageName.slice(slash + 1)
  return `https://registry.npmjs.org/${packageName}/-/${base}-${version}.tgz`
}

/**
 * Gets the package name when a package-lock key points directly to a Form Builder package.
 * @param lockKey the package-lock packages key.
 * @returns the package name, or undefined for unrelated and nested dependency entries.
 */
function getFormBuilderPackageNameFromLockKey(lockKey: string): string | undefined {
  const nodeModulesPrefix = 'node_modules/'
  const nodeModulesIndex = lockKey.lastIndexOf(nodeModulesPrefix)
  if (nodeModulesIndex === -1) {
    return undefined
  }
  const packageName = lockKey.slice(nodeModulesIndex + nodeModulesPrefix.length)
  if (!packageName.startsWith(PACKAGE_PREFIX)) {
    return undefined
  }
  return packageName.slice(PACKAGE_PREFIX.length).includes('/') ? undefined : packageName
}

/**
 * Maps react-form-builder-*.tgz filenames in an archives directory to package metadata.
 * @param archivesDir absolute path to `.archives/` (or similar)
 */
function loadArchivesIndex(archivesDir: string): Map<string, ArchiveEntry> {
  const lernaVersion = readLernaVersion()
  const index = new Map<string, ArchiveEntry>()
  for (const name of readdirSync(archivesDir)) {
    if (!name.startsWith(NPM_ARCHIVE_FILENAME_PREFIX) || !name.endsWith('.tgz')) {
      continue
    }
    if (lernaVersion && !name.endsWith(`-${lernaVersion}.tgz`)) {
      continue
    }
    const body = name.slice(NPM_ARCHIVE_FILENAME_PREFIX.length, -'.tgz'.length)
    const dash = body.lastIndexOf('-')
    if (dash <= 0) {
      continue
    }
    const version = body.slice(dash + 1)
    const shortName = body.slice(0, dash)
    const packageName = `@react-form-builder/${shortName}`
    const archivePath = join(archivesDir, name)
    index.set(packageName, {
      packageName,
      version,
      integrity: integrityForTgz(archivePath),
    })
  }
  return index
}

function readPackageJson(path: string): PackageJson {
  return JSON.parse(readFileSync(path, 'utf8')) as PackageJson
}

function parseArgs(argv: string[]): {archivesDir: string; lockfile: string; packageJson?: string; dryRun: boolean} {
  const dryRun = argv.includes('--dry-run')
  const archivesIdx = argv.indexOf('--archives-dir')
  const lockIdx = argv.indexOf('--lockfile')
  const pjIdx = argv.indexOf('--package-json')
  if (archivesIdx === -1 || !argv[archivesIdx + 1] || lockIdx === -1 || !argv[lockIdx + 1]) {
    throw new Error(
      'Usage: node scripts/patch-package-lock-from-archives.ts --archives-dir <dir> --lockfile <path> [--package-json <path>] [--dry-run]'
    )
  }
  return {
    archivesDir: resolve(argv[archivesIdx + 1]),
    lockfile: resolve(argv[lockIdx + 1]),
    packageJson: pjIdx !== -1 && argv[pjIdx + 1] ? resolve(argv[pjIdx + 1]) : undefined,
    dryRun,
  }
}

/**
 * Patches a package-lock.json in place using archive integrity metadata.
 * @param lockfile absolute path to package-lock.json
 * @param archives index of published tarballs
 * @param packageJson optional package.json to sync root dependency specs from
 * @param dryRun when true, do not write
 * @returns true when the lockfile was changed or would be changed
 */
function patchPackageLockFromArchives(
  lockfile: string,
  archives: Map<string, ArchiveEntry>,
  packageJson: string | undefined,
  dryRun: boolean
): boolean {
  if (!existsSync(lockfile)) {
    throw new Error(`Lockfile not found: ${lockfile}`)
  }
  const lock = JSON.parse(readFileSync(lockfile, 'utf8')) as {
    packages?: Record<string, Record<string, unknown>>
  }
  const packages = lock.packages
  if (!packages) {
    return false
  }
  let changed = false

  if (packageJson && existsSync(packageJson)) {
    const pj = readPackageJson(packageJson)
    const root = packages['']
    if (root) {
      for (const section of DEPS_SECTIONS) {
        const pjDeps = pj[section] as Record<string, string> | undefined
        const lockDeps = root[section] as Record<string, string> | undefined
        if (!pjDeps || !lockDeps) {
          continue
        }
        for (const key of Object.keys(pjDeps)) {
          if (!key.startsWith(PACKAGE_PREFIX)) {
            continue
          }
          if (lockDeps[key] !== pjDeps[key]) {
            lockDeps[key] = pjDeps[key]
            changed = true
          }
        }
      }
    }
  }

  for (const lockKey of Object.keys(packages)) {
    const pkgName = getFormBuilderPackageNameFromLockKey(lockKey)
    if (!pkgName) {
      continue
    }
    const archive = archives.get(pkgName)
    if (!archive) {
      continue
    }
    const entry = packages[lockKey] as {resolved?: string; version?: string; integrity?: string} | undefined
    if (!entry) {
      continue
    }
    const resolved = registryTarballUrl(pkgName, archive.version)
    if (entry.version !== archive.version) {
      entry.version = archive.version
      changed = true
    }
    if (entry.resolved !== resolved) {
      entry.resolved = resolved
      changed = true
    }
    if (entry.integrity !== archive.integrity) {
      entry.integrity = archive.integrity
      changed = true
    }
  }

  if (changed && !dryRun) {
    writeFileSync(lockfile, `${JSON.stringify(lock, undefined, 2)}\n`)
  }
  return changed
}

function main(): void {
  const {archivesDir, lockfile, packageJson, dryRun} = parseArgs(process.argv.slice(2))
  if (!existsSync(archivesDir)) {
    throw new Error(`Archives directory not found: ${archivesDir}`)
  }
  const archives = loadArchivesIndex(archivesDir)
  if (archives.size === 0) {
    throw new Error(`No ${NPM_ARCHIVE_FILENAME_PREFIX}*.tgz archives found in ${archivesDir}`)
  }
  const changed = patchPackageLockFromArchives(lockfile, archives, packageJson, dryRun)
  const rel = lockfile.startsWith(REPO_ROOT) ? lockfile.slice(REPO_ROOT.length + 1) : lockfile
  if (changed && dryRun) {
    console.log(`[dry-run] would patch package-lock.json at ${rel}`)
  } else if (changed) {
    console.log(`Patched package-lock.json at ${rel} from ${archives.size} archive(s)`)
  } else {
    console.log(`No changes needed for ${rel}`)
  }
}

try {
  main()
} catch (error) {
  console.error('❌ patch-package-lock-from-archives failed.', error)
  process.exitCode = 1
}
