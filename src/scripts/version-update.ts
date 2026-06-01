#!/usr/bin/env node

import {execSync} from 'node:child_process'
import {readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {allVersionTargetPaths} from '@react-form-builder/cli-lib/workspace-package-paths'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_ROOT = join(__dirname, '..', '..')
const SRC_ROOT = join(REPO_ROOT, 'src')

const PACKAGE_PREFIX = '@react-form-builder/'

/**
 * Workspace-only packages (not published); must stay on `*` so npm resolves the local workspace, not the registry.
 * `bundle-size-shared` is the local example workspace under `examples/community/bundle-size/shared`, not a published semver.
 */
const WORKSPACE_ONLY_INTERNAL_PACKAGES = new Set(['@react-form-builder/cli-lib', '@react-form-builder/bundle-size-shared'])

const DEPS_SECTIONS = ['dependencies', 'devDependencies', 'peerDependencies', 'bundleDependencies', 'optionalDependencies'] as const

const LERNA_JSON_PATH = join(SRC_ROOT, 'lerna.json')

/**
 * Reads the monorepo version from `src/lerna.json` (Lerna `version` field).
 */
function readLernaVersion(): string {
  const content = readFileSync(LERNA_JSON_PATH, 'utf8')
  const lernaJson = JSON.parse(content) as {version?: string}
  const version = lernaJson.version?.trim()

  if (!version) {
    throw new Error(`"version" is missing or empty in ${LERNA_JSON_PATH}`)
  }

  return version
}

function patchPackageVersion(packagePath: string, version: string): void {
  const packageJsonPath = join(REPO_ROOT, packagePath, 'package.json')
  const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent) as {
    peerDependenciesMeta?: Record<string, {optional?: boolean}>
    [key: string]: unknown
  }

  const coreMeta = packageJson.peerDependenciesMeta?.['@react-form-builder/core'] ?? {}
  const coreRequired = coreMeta.optional === false

  let patched = false

  for (const section of DEPS_SECTIONS) {
    const deps = packageJson[section] as Record<string, string> | undefined
    if (!deps) {
      continue
    }

    for (const key of Object.keys(deps)) {
      if (!key.startsWith(PACKAGE_PREFIX)) {
        continue
      }

      if (WORKSPACE_ONLY_INTERNAL_PACKAGES.has(key)) {
        if (!deps[key].startsWith('file:')) {
          deps[key] = '*'
          patched = true
        }
        continue
      }

      if (key === '@react-form-builder/core' && coreRequired) {
        deps[key] = version
      } else {
        deps[key] = version === '*' ? version : `^${version}`
      }

      patched = true
    }
  }

  if (!patched) {
    return
  }

  const patchedContent = `${JSON.stringify(packageJson, undefined, 2)}\n`
  writeFileSync(packageJsonPath, patchedContent)
}

function updateDependenciesVersion(targetVersion: string): void {
  const packageList = allVersionTargetPaths(REPO_ROOT)
  for (const packagePath of packageList) {
    console.log(`Updating package dependencies '${packagePath}' to version '${targetVersion}'`)
    patchPackageVersion(packagePath, targetVersion)
  }

  // Refresh root lockfile so that dependency versions stay consistent.
  console.log('▶ npm install (cwd=src) to refresh package-lock.json')
  execSync('npm install', {cwd: SRC_ROOT, stdio: 'inherit'})
}

function updateLernaVersion(targetVersion: string): void {
  const args = [targetVersion, `--preid ${targetVersion}`]
  const command = `npx lerna version ${args.join(' ')} --no-git-tag-version --yes`

  console.log(`▶ ${command} (cwd=src)`)
  execSync(command, {cwd: SRC_ROOT, stdio: 'inherit'})

  // Lerna can rewrite lerna.json without a trailing newline, which fails biome format checks.
  ensureTrailingNewline(join(SRC_ROOT, 'lerna.json'))
}

function ensureTrailingNewline(filePath: string): void {
  const content = readFileSync(filePath, 'utf8')
  if (content.endsWith('\n')) {
    return
  }
  writeFileSync(filePath, `${content}\n`)
}

async function updateReleaseDate(): Promise<void> {
  // This script mutates common-designer config on import (side effects only).
  const scriptPath = join(SRC_ROOT, 'packages', 'apps', 'common-designer', 'scripts', 'update-release-date.ts')
  console.log(`▶ Updating common-designer release date via ${scriptPath}`)
  const scriptUrl = pathToFileURL(scriptPath).href
  await import(scriptUrl)
}

function updateAssemblyDate(): void {
  const assemblyDatePath = join(SRC_ROOT, 'packages', 'designer', 'src', 'features', 'license', 'assemblyDate.ts')
  const assemblyDate = new Date().getTime()
  const modifiedContent = `// DO NOT CHANGE THIS FILE\nexport const assemblyDate = new Date(${assemblyDate})\n`
  writeFileSync(assemblyDatePath, modifiedContent)
}

async function main(): Promise<void> {
  const targetVersion = readLernaVersion()
  // 1) Temporarily set all internal deps to "*" to avoid conflicts during lerna version bump.
  updateDependenciesVersion('*')

  // 2) Update lerna-managed package versions.
  updateLernaVersion(targetVersion)
  // 3) Set concrete versions for internal deps based on `version` in lerna.json.
  updateDependenciesVersion(targetVersion)
  // 4) Update common-designer release date to force IndexedDB updates in public demo.
  await updateReleaseDate()

  // 5) Update assembly date in designer package.
  updateAssemblyDate()
}

try {
  await main()
} catch (error) {
  console.error('❌ version-update script failed.', error)
  process.exitCode = 1
}
