#!/usr/bin/env node

/**
 * Packs publishable @react-form-builder packages into scripts/.examples-local-packs/, temporarily rewrites
 * example package.json entries to file: tarballs, runs npm install, then restores package.json to
 * ^monorepo version from lerna.json so committed manifests stay semver-based. package-lock.json is
 * then rewritten so root dependency specs match package.json and @react-form-builder/* entries use
 * registry tarball URLs (integrity is preserved from the local pack). Unpublished example-only packages
 * such as @react-form-builder/bundle-size-shared keep file: resolutions.
 *
 * Usage (from repository root):
 *   node scripts/examples-install-local-packages.ts
 *   node scripts/examples-install-local-packages.ts --dry-run
 *   node scripts/examples-install-local-packages.ts --no-install
 *   node scripts/examples-install-local-packages.ts --from-archives .archives
 *   node scripts/examples-install-local-packages.ts --restore-registry
 *
 * Prerequisites: run `npm install` at the repository root so package builds (vite, etc.) succeed.
 */

import {execSync} from 'node:child_process'
import {copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs'
import {basename, dirname, join, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {integrityForTgz} from './npm-tgz-integrity.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_ROOT = join(__dirname, '..')
const STAGING_DIR = join(__dirname, '.examples-local-packs')
const PACKAGE_PREFIX = '@react-form-builder/'

/**
 * Packed for examples but not published to npm; lockfile normalization leaves file: resolutions for these.
 */
const PACKAGES_EXCLUDED_FROM_REGISTRY_LOCK = new Set<string>(['@react-form-builder/bundle-size-shared', '@react-form-builder/cli-lib'])
const EXCLUDED_PACKAGE_RESTORE_SPEC: Record<string, string> = {
  '@react-form-builder/bundle-size-shared': '*',
}

/** Paths under REPO_ROOT for packages that support `npm run pack` (or plain `npm pack` for bundle-size-shared). */
const PACKAGE_SOURCE: Record<string, string> = {
  '@react-form-builder/core': 'packages/core',
  '@react-form-builder/designer': 'packages/designer',
  '@react-form-builder/designer-bundle': 'packages/designer-bundle',
  '@react-form-builder/indexed-db-form-storage': 'packages/indexed-db-form-storage',
  '@react-form-builder/viewer-bundle': 'packages/viewer-bundle',
  '@react-form-builder/viewer-bundle-premium': 'packages/viewer-bundle-premium',
  '@react-form-builder/components-rsuite': 'packages/views/rsuite',
  '@react-form-builder/components-material-ui': 'packages/views/material-ui',
  '@react-form-builder/components-mantine': 'packages/views/mantine',
  '@react-form-builder/components-fast-qr': 'packages/views/fast-qr',
  '@react-form-builder/components-google-map': 'packages/views/google-map',
  '@react-form-builder/components-rich-text': 'packages/views/rich-text',
  '@react-form-builder/components-rsuite-table': 'packages/views/rsuite-table',
  '@react-form-builder/components-signature': 'packages/views/signature',
  '@react-form-builder/components-uploader': 'packages/views/uploader',
  '@react-form-builder/bundle-size-shared': 'examples/community/bundle-size/shared',
}

/** Same example app paths as scripts/version-update.ts (only examples/). */
const EXAMPLE_PATHS: string[] = [
  'examples/community/formdata',
  'examples/community/bundle-size/formengine',
  'examples/premium/formengine',
  'examples/premium/with-formik',
  'examples/premium/with-nextjs/with-nextjs-v16',
  'examples/premium/with-remix/with-remix-v2',
  'examples/premium/with-angular-forms/step1-reactive-forms',
  'examples/premium/with-angular-forms/step2-formengine',
  'examples/premium/with-angular-forms/step3-template-forms',
  'examples/premium/with-angular-forms/step4-designer',
]

const DEPS_SECTIONS = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'] as const

type PackageJson = {
  name?: string
  version?: string
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  [key: string]: unknown
}

function readPackageJson(path: string): PackageJson {
  return JSON.parse(readFileSync(path, 'utf8')) as PackageJson
}

function writePackageJson(path: string, data: PackageJson): void {
  writeFileSync(path, `${JSON.stringify(data, undefined, 2)}\n`)
}

/**
 * Reads the monorepo version from `lerna.json` (Lerna `version` field).
 */
function readLernaVersion(): string | undefined {
  const lernaPath = join(REPO_ROOT, 'lerna.json')
  if (!existsSync(lernaPath)) {
    return undefined
  }

  const lerna = JSON.parse(readFileSync(lernaPath, 'utf8')) as {version?: string}
  return lerna.version?.trim() || undefined
}

type ArchiveMetadata = {
  packageName: string
  version: string
  integrity: string
  filename: string
}

/**
 * Resolves the workspace root used when patching example package.json files.
 * @param argv process arguments
 * @returns absolute path to the directory that contains the `examples/` tree
 */
function parsePatchRoot(argv: string[]): string {
  const patchRootIndex = argv.indexOf('--patch-root')
  if (patchRootIndex !== -1 && argv[patchRootIndex + 1]) {
    return argv[patchRootIndex + 1]
  }

  return REPO_ROOT
}

/**
 * Resolves the npm release archives directory for `--from-archives`.
 * @param argv process arguments
 * @returns absolute path when `--from-archives` is set
 */
function parseArchivesDir(argv: string[]): string | undefined {
  const archivesIndex = argv.indexOf('--from-archives')
  if (archivesIndex === -1 || !argv[archivesIndex + 1]) {
    return undefined
  }
  return resolve(argv[archivesIndex + 1])
}

function tarballBaseName(packageName: string, version: string): string {
  return `${packageName}-${version}.tgz`.replace('@', '').replace('/', '-')
}

function collectDirectExampleDeps(): Set<string> {
  const names = new Set<string>()
  for (const rel of EXAMPLE_PATHS) {
    const pjPath = join(REPO_ROOT, rel, 'package.json')
    if (!existsSync(pjPath)) {
      continue
    }
    const pj = readPackageJson(pjPath)
    for (const section of DEPS_SECTIONS) {
      const deps = pj[section] as Record<string, string> | undefined
      if (!deps) {
        continue
      }
      for (const key of Object.keys(deps)) {
        if (key.startsWith(PACKAGE_PREFIX) && PACKAGE_SOURCE[key]) {
          names.add(key)
        }
      }
    }
  }
  return names
}

/**
 * Expands to all @react-form-builder packages required by peers/deps of the closure (e.g. uploader for material-ui).
 */
function expandPackageClosure(seed: Set<string>): Set<string> {
  const result = new Set<string>(seed)
  let changed = true
  while (changed) {
    changed = false
    for (const pkgName of result) {
      const rel = PACKAGE_SOURCE[pkgName]
      if (!rel) {
        continue
      }
      const pjPath = join(REPO_ROOT, rel, 'package.json')
      if (!existsSync(pjPath)) {
        continue
      }
      const pj = readPackageJson(pjPath)
      for (const section of DEPS_SECTIONS) {
        const deps = pj[section] as Record<string, string> | undefined
        if (!deps) {
          continue
        }
        for (const key of Object.keys(deps)) {
          if (key.startsWith(PACKAGE_PREFIX) && PACKAGE_SOURCE[key] && !result.has(key)) {
            result.add(key)
            changed = true
          }
        }
      }
    }
  }
  return result
}

function expectedArchiveBaseName(packageName: string): string {
  const rel = PACKAGE_SOURCE[packageName]
  const abs = join(REPO_ROOT, rel)
  const pj = readPackageJson(join(abs, 'package.json'))
  const version = pj.version
  const name = pj.name
  if (!version || !name || name !== packageName) {
    throw new Error(`Unexpected package name/version in ${abs}: expected ${packageName}, got ${name} @ ${version}`)
  }
  return tarballBaseName(name, version)
}

function packPackage(packageName: string, dryRun: boolean): string {
  const rel = PACKAGE_SOURCE[packageName]
  const abs = join(REPO_ROOT, rel)
  const archiveBase = expectedArchiveBaseName(packageName)
  const archivePath = join(abs, archiveBase)

  if (dryRun) {
    console.log(`[dry-run] would pack ${packageName} -> ${archiveBase}`)
    return archiveBase
  }

  if (existsSync(archivePath)) {
    rmSync(archivePath)
  }

  const pj = readPackageJson(join(abs, 'package.json'))
  const hasPackScript = pj.scripts?.pack !== undefined
  if (hasPackScript) {
    execSync('npm run pack', {cwd: abs, stdio: 'inherit'})
  } else {
    execSync('npm pack', {cwd: abs, stdio: 'inherit'})
  }

  if (!existsSync(archivePath)) {
    throw new Error(`Pack did not produce ${archivePath}`)
  }

  const dest = join(STAGING_DIR, archiveBase)
  if (existsSync(dest)) {
    rmSync(dest)
  }
  renameSync(archivePath, dest)
  console.log(`Packed ${packageName} -> scripts/.examples-local-packs/${archiveBase}`)
  return archiveBase
}

/**
 * Copies a release npm archive into the staging directory for example installs.
 * @param archivesDir absolute path to `.archives/`
 * @param packageName scoped package name
 * @param releaseArchives index built from the archives directory
 * @param dryRun when true, do not copy
 * @returns tarball filename under {@link STAGING_DIR}
 */
function stageReleaseArchive(archivesDir: string, packageName: string, dryRun: boolean): {filename: string; metadata: ArchiveMetadata} {
  const expected = expectedArchiveBaseName(packageName)
  const src = join(archivesDir, expected)
  if (!dryRun && !existsSync(src)) {
    throw new Error(`Missing release archive ${expected} for ${packageName} in ${archivesDir}`)
  }
  const rel = PACKAGE_SOURCE[packageName]
  const pj = readPackageJson(join(REPO_ROOT, rel, 'package.json'))
  const version = pj.version
  if (!version) {
    throw new Error(`Missing version for ${packageName}`)
  }
  const metadata: ArchiveMetadata = {
    packageName,
    version,
    integrity: dryRun ? '' : integrityForTgz(src),
    filename: expected,
  }
  if (dryRun) {
    console.log(`[dry-run] would stage ${expected} from ${archivesDir}`)
    return {filename: expected, metadata}
  }
  const dest = join(STAGING_DIR, expected)
  copyFileSync(src, dest)
  console.log(`Staged ${packageName} from ${relative(REPO_ROOT, archivesDir)}/${expected}`)
  return {filename: expected, metadata}
}

function declaresFormEngineDep(pj: PackageJson, depName: string): boolean {
  for (const section of DEPS_SECTIONS) {
    const deps = pj[section] as Record<string, string> | undefined
    if (deps && Object.prototype.hasOwnProperty.call(deps, depName)) {
      return true
    }
  }
  return false
}

/**
 * Installs packed peers (e.g. components-uploader for components-material-ui) as file: dependencies when missing.
 */
function injectPackedPeerDependencies(pj: PackageJson, exampleDir: string, archives: Map<string, string>): boolean {
  let injected = false
  let changed = true
  while (changed) {
    changed = false
    const active = new Set<string>()
    for (const section of DEPS_SECTIONS) {
      const deps = pj[section] as Record<string, string> | undefined
      if (!deps) {
        continue
      }
      for (const key of Object.keys(deps)) {
        if (key.startsWith(PACKAGE_PREFIX) && archives.has(key)) {
          active.add(key)
        }
      }
    }
    for (const pkgName of active) {
      const rel = PACKAGE_SOURCE[pkgName]
      if (!rel) {
        continue
      }
      const innerPath = join(REPO_ROOT, rel, 'package.json')
      if (!existsSync(innerPath)) {
        continue
      }
      const inner = readPackageJson(innerPath)
      const peers = inner.peerDependencies as Record<string, string> | undefined
      if (!peers) {
        continue
      }
      for (const peerName of Object.keys(peers)) {
        if (!peerName.startsWith(PACKAGE_PREFIX) || !archives.has(peerName)) {
          continue
        }
        if (PACKAGES_EXCLUDED_FROM_REGISTRY_LOCK.has(peerName)) {
          continue
        }
        if (declaresFormEngineDep(pj, peerName)) {
          continue
        }
        if (!pj.dependencies) {
          pj.dependencies = {}
        }
        const archiveName = archives.get(peerName)!
        const fileSpec = relative(exampleDir, join(STAGING_DIR, archiveName)).split('\\').join('/')
        if (!fileSpec.startsWith('.')) {
          throw new Error(`file: path must be relative (got ${fileSpec} from ${exampleDir})`)
        }
        pj.dependencies[peerName] = `file:${fileSpec}`
        injected = true
        changed = true
      }
    }
  }
  return injected
}

function patchExampleToFileDeps(exampleRel: string, archives: Map<string, string>, dryRun: boolean): boolean {
  const exampleDir = join(REPO_ROOT, exampleRel)
  const pjPath = join(exampleDir, 'package.json')
  if (!existsSync(pjPath)) {
    return false
  }
  const pj = readPackageJson(pjPath)
  let patched = false

  for (const section of DEPS_SECTIONS) {
    const deps = pj[section] as Record<string, string> | undefined
    if (!deps) {
      continue
    }
    for (const key of Object.keys(deps)) {
      if (!key.startsWith(PACKAGE_PREFIX) || !archives.has(key)) {
        continue
      }
      if (PACKAGES_EXCLUDED_FROM_REGISTRY_LOCK.has(key)) {
        continue
      }
      const archiveName = archives.get(key)!
      const fileSpec = relative(exampleDir, join(STAGING_DIR, archiveName)).split('\\').join('/')
      if (!fileSpec.startsWith('.')) {
        throw new Error(`file: path must be relative (got ${fileSpec} from ${exampleDir})`)
      }
      deps[key] = `file:${fileSpec}`
      patched = true
    }
  }

  if (patched) {
    const injected = injectPackedPeerDependencies(pj, exampleDir, archives)
    if (injected) {
      patched = true
      console.log(`Injected packed peer dependencies in ${exampleRel}`)
    }
  }

  if (patched && !dryRun) {
    writePackageJson(pjPath, pj)
    console.log(`Patched ${exampleRel} to file: tarballs`)
  } else if (patched && dryRun) {
    console.log(`[dry-run] would patch ${exampleRel}`)
  }
  return patched
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
 * Rewrites example package-lock.json so @react-form-builder/* uses registry-style resolved URLs and the
 * root package entry matches package.json semver specs.
 * @param exampleDir absolute path to the example directory
 * @param dryRun when true, do not write
 * @returns true when the lockfile was changed or would be changed
 */
function normalizeExamplePackageLock(exampleDir: string, dryRun: boolean, releaseArchives?: Map<string, ArchiveMetadata>): boolean {
  const lockPath = join(exampleDir, 'package-lock.json')
  const pjPath = join(exampleDir, 'package.json')
  if (!existsSync(lockPath) || !existsSync(pjPath)) {
    return false
  }
  const lock = JSON.parse(readFileSync(lockPath, 'utf8')) as {
    packages?: Record<string, Record<string, unknown>>
  }
  const packages = lock.packages
  if (!packages) {
    return false
  }
  let changed = false

  function syncLockPackageSpecsFromPackageJson(lockEntry: Record<string, unknown> | undefined, packageJsonPath: string): void {
    if (!lockEntry) {
      return
    }
    const sourcePj = readPackageJson(packageJsonPath)
    for (const section of DEPS_SECTIONS) {
      const pjDeps = sourcePj[section] as Record<string, string> | undefined
      const lockDeps = lockEntry[section] as Record<string, string> | undefined
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

  syncLockPackageSpecsFromPackageJson(packages[''], pjPath)

  for (const lockKey of Object.keys(packages)) {
    if (!lockKey || lockKey.includes('node_modules')) {
      continue
    }
    const workspacePjPath = join(exampleDir, lockKey, 'package.json')
    if (!existsSync(workspacePjPath)) {
      continue
    }
    syncLockPackageSpecsFromPackageJson(packages[lockKey], workspacePjPath)
  }

  for (const lockKey of Object.keys(packages)) {
    if (lockKey === '' || !lockKey.includes('@react-form-builder/')) {
      continue
    }
    const idx = lockKey.indexOf('@react-form-builder/')
    const rest = lockKey.slice(idx + '@react-form-builder/'.length)
    const pkgName = `@react-form-builder/${rest.split('/')[0]}`
    if (PACKAGES_EXCLUDED_FROM_REGISTRY_LOCK.has(pkgName)) {
      continue
    }
    const entry = packages[lockKey] as {resolved?: string; version?: string; integrity?: string} | undefined
    if (!entry?.version) {
      continue
    }
    const archive = releaseArchives?.get(pkgName)
    const targetVersion = archive?.version ?? entry.version
    const targetResolved = registryTarballUrl(pkgName, targetVersion)
    const fromFile = entry.resolved?.startsWith('file:')
    const needsRegistryUrl = fromFile || entry.resolved !== targetResolved
    const needsIntegrity = archive !== undefined && entry.integrity !== archive.integrity
    if (!needsRegistryUrl && !needsIntegrity) {
      continue
    }
    if (needsRegistryUrl) {
      entry.resolved = targetResolved
      changed = true
    }
    if (archive) {
      if (entry.version !== archive.version) {
        entry.version = archive.version
        changed = true
      }
      if (entry.integrity !== archive.integrity) {
        entry.integrity = archive.integrity
        changed = true
      }
    }
  }

  if (changed && !dryRun) {
    writeFileSync(lockPath, `${JSON.stringify(lock, undefined, 2)}\n`)
    console.log(`Normalized package-lock.json (registry URLs) in ${relative(REPO_ROOT, exampleDir)}`)
  } else if (changed && dryRun) {
    console.log(`[dry-run] would normalize package-lock.json in ${relative(REPO_ROOT, exampleDir)}`)
  }
  return changed
}

/**
 * When an example is an npm workspace package, the lockfile may live in the parent directory; normalize it too.
 * @param exampleDir absolute path to the example directory (workspace member)
 * @param dryRun when true, do not write
 */
function normalizeWorkspaceParentLockIfNeeded(exampleDir: string, dryRun: boolean, releaseArchives?: Map<string, ArchiveMetadata>): void {
  const memberName = basename(exampleDir)
  const parentDir = dirname(exampleDir)
  const parentPjPath = join(parentDir, 'package.json')
  if (!existsSync(parentPjPath)) {
    return
  }
  const parentPj = readPackageJson(parentPjPath)
  const ws = parentPj.workspaces
  if (!Array.isArray(ws) || !ws.some(entry => String(entry) === memberName)) {
    return
  }
  normalizeExamplePackageLock(parentDir, dryRun, releaseArchives)
}

/**
 * Sets every @react-form-builder dependency in an example package.json to ^npmVersion (registry style).
 * @param exampleRel path relative to repo root
 * @param npmVersion monorepo version from lerna.json
 * @param dryRun when true, do not write
 * @returns true when package.json was updated or would be updated
 */
function restoreExampleRegistrySemver(exampleRel: string, npmVersion: string, dryRun: boolean, patchRoot: string = REPO_ROOT): boolean {
  const pjPath = join(patchRoot, exampleRel, 'package.json')
  if (!existsSync(pjPath)) {
    return false
  }
  const pj = readPackageJson(pjPath)
  let patched = false
  for (const section of DEPS_SECTIONS) {
    const deps = pj[section] as Record<string, string> | undefined
    if (!deps) {
      continue
    }
    for (const key of Object.keys(deps)) {
      if (!key.startsWith(PACKAGE_PREFIX)) {
        continue
      }
      if (PACKAGES_EXCLUDED_FROM_REGISTRY_LOCK.has(key)) {
        const excludedSpec = EXCLUDED_PACKAGE_RESTORE_SPEC[key]
        if (excludedSpec && deps[key] !== excludedSpec) {
          deps[key] = excludedSpec
          patched = true
        }
        continue
      }
      deps[key] = `^${npmVersion}`
      patched = true
    }
  }
  if (patched && !dryRun) {
    writePackageJson(pjPath, pj)
    console.log(`Restored package.json semver ^${npmVersion} in ${exampleRel}`)
  }
  return patched
}

function patchExamplesToRegistry(version: string, dryRun: boolean, patchRoot: string = REPO_ROOT): void {
  for (const exampleRel of EXAMPLE_PATHS) {
    restoreExampleRegistrySemver(exampleRel, version, dryRun, patchRoot)
  }
}

function runNpmInstall(exampleRel: string, dryRun: boolean, patchRoot: string = REPO_ROOT): void {
  if (dryRun) {
    console.log(`[dry-run] would npm install in ${exampleRel}`)
    return
  }
  const dir = join(patchRoot, exampleRel)
  const lock = join(dir, 'package-lock.json')
  const modules = join(dir, 'node_modules')
  if (existsSync(lock)) {
    console.log(`▶ rm package-lock.json (cwd=${exampleRel})`)
    rmSync(lock, {force: true})
  }
  if (existsSync(modules)) {
    console.log(`▶ rm -rf node_modules (cwd=${exampleRel})`)
    rmSync(modules, {recursive: true, force: true})
  }
  console.log(`▶ npm install --package-lock-only (cwd=${exampleRel})`)
  execSync('npm install --package-lock-only', {cwd: dir, stdio: 'inherit'})
}

function installExamplesWithArchives(
  archives: Map<string, string>,
  npmVersion: string,
  dryRun: boolean,
  releaseArchives: Map<string, ArchiveMetadata> | undefined,
  patchRoot: string = REPO_ROOT
): void {
  for (const exampleRel of EXAMPLE_PATHS) {
    const patched = patchExampleToFileDeps(exampleRel, archives, dryRun)
    if (patched && !dryRun) {
      const exampleDir = join(patchRoot, exampleRel)
      runNpmInstall(exampleRel, false, patchRoot)
      restoreExampleRegistrySemver(exampleRel, npmVersion, false, patchRoot)
      normalizeExamplePackageLock(exampleDir, false, releaseArchives)
      normalizeWorkspaceParentLockIfNeeded(exampleDir, false, releaseArchives)
    }
  }
}

function printUsage(): void {
  console.log(`Usage: node scripts/examples-install-local-packages.ts [options]

Options:
  --dry-run            Log actions without packing, patching, or installing.
  --no-install         Pack only into ${STAGING_DIR}; do not change examples.
  --from-archives <dir>  Use react-form-builder-*.tgz from a release archives directory (CI).
  --restore-registry   Deprecated alias; requires --from-archives (does not fetch from npm).
  --patch-root <dir>   Patch examples under <dir> instead of the repository root (for release archive staging).

Packs into ${STAGING_DIR} (gitignored). Requires npm install before first run.`)
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes('-h') || argv.includes('--help')) {
    printUsage()
    return
  }

  const dryRun = argv.includes('--dry-run')
  const noInstall = argv.includes('--no-install')
  const restore = argv.includes('--restore-registry')
  const archivesDir = parseArchivesDir(argv)
  const patchRoot = parsePatchRoot(argv)

  if (restore && !archivesDir) {
    console.error('❌ --restore-registry requires --from-archives <dir> with release .tgz files (unpublished versions are not on npm).')
    process.exitCode = 1
    return
  }

  const npmVersion = readLernaVersion()
  if (!npmVersion) {
    console.error('❌ Monorepo version missing. Expected lerna.json to include a non-empty "version" field.')
    process.exitCode = 1
    return
  }

  if (restore) {
    patchExamplesToRegistry(npmVersion, dryRun, patchRoot)
  }

  const seed = collectDirectExampleDeps()
  if (seed.size === 0) {
    console.warn('No @react-form-builder dependencies found in example package.json files.')
    return
  }
  const closure = expandPackageClosure(seed)
  console.log(`Packages to stage (${closure.size}): ${[...closure].sort().join(', ')}`)

  let releaseArchives: Map<string, ArchiveMetadata> | undefined
  if (archivesDir) {
    if (!existsSync(archivesDir)) {
      console.error(`❌ Archives directory not found: ${archivesDir}`)
      process.exitCode = 1
      return
    }
    releaseArchives = new Map()
  }

  if (!dryRun) {
    rmSync(STAGING_DIR, {recursive: true, force: true})
    mkdirSync(STAGING_DIR, {recursive: true})
  }

  const archives = new Map<string, string>()
  for (const pkg of [...closure].sort()) {
    if (archivesDir) {
      const expected = expectedArchiveBaseName(pkg)
      const src = join(archivesDir, expected)
      if (dryRun || existsSync(src)) {
        const {filename, metadata} = stageReleaseArchive(archivesDir, pkg, dryRun)
        archives.set(pkg, filename)
        releaseArchives!.set(pkg, metadata)
        continue
      }
      console.warn(`Archive ${expected} not in ${archivesDir}; packing ${pkg} locally`)
    }
    const base = packPackage(pkg, dryRun)
    archives.set(pkg, base)
  }

  if (noInstall) {
    console.log('▶ Skipping example installs (--no-install). Tarballs are in scripts/.examples-local-packs/')
    return
  }

  installExamplesWithArchives(archives, npmVersion, dryRun, releaseArchives, patchRoot)
}

try {
  await main()
} catch (error) {
  console.error('❌ examples-install-local-packages script failed.', error)
  process.exitCode = 1
}
