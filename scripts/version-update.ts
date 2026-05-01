#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */

import {execSync} from 'node:child_process'
import {readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_ROOT = join(__dirname, '..')
const SRC_ROOT = join(REPO_ROOT, 'src')

const PACKAGE_PREFIX = '@react-form-builder/'
const EXCLUDED_INTERNAL_PACKAGES = new Set(['@react-form-builder/bundle-size-shared'])
const BUNDLE_SIZE_SHARED_PACKAGE_JSON_PATH = join(REPO_ROOT, 'examples', 'community', 'bundle-size', 'shared', 'package.json')

const PACKAGE_LIST: string[] = [
  'src/packages/apps/common',
  'src/packages/apps/common-designer',
  'src/packages/apps/demo',
  'src/packages/apps/example-builder',
  'src/packages/apps/example-viewer',
  'src/packages/core',
  'src/packages/designer',
  'src/packages/designer-bundle',
  'src/packages/indexed-db-form-storage',
  'src/packages/viewer-bundle',
  'src/packages/viewer-bundle-premium',
  'src/packages/views/antd',
  'src/packages/views/default',
  'src/packages/views/rsuite',
  'src/packages/views/mantine',
  'src/packages/views/material-ui',

  'src/packages/views/fast-qr',
  'src/packages/views/google-map',
  'src/packages/views/rich-text',
  'src/packages/views/rsuite-table',
  'src/packages/views/signature',
  'src/packages/views/uploader',

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

const DEPS_SECTIONS = ['dependencies', 'devDependencies', 'peerDependencies', 'bundleDependencies', 'optionalDependencies'] as const

type VersionsMap = Record<string, string>

function readPackageVersion(packageJsonPath: string): string {
  const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent) as {version?: string}
  if (!packageJson.version) {
    throw new Error(`Package version is missing in ${packageJsonPath}`)
  }
  return packageJson.version
}

function writePackageVersion(packageJsonPath: string, version: string): void {
  const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent) as {version?: string}
  packageJson.version = version
  const patchedContent = `${JSON.stringify(packageJson, undefined, 2)}\n`
  writeFileSync(packageJsonPath, patchedContent)
}

function readVersions(): VersionsMap {
  const path = join(REPO_ROOT, 'scripts', 'version.txt')
  const content = readFileSync(path, 'utf8')
  const lines = content.split('\n')
  const versions: VersionsMap = {}

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || !trimmed.includes('=')) {
      continue
    }
    const [key, value] = trimmed.split('=')
    versions[key.trim()] = (value ?? '').trim()
  }

  return versions
}

function patchPackageVersion(packagePath: string, version: string): void {
  const packageJsonPath = join(REPO_ROOT, packagePath, 'package.json')
  const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent) as {
    peerDependenciesMeta?: Record<string, { optional?: boolean }>
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
      if (EXCLUDED_INTERNAL_PACKAGES.has(key)) {
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
  for (const packagePath of PACKAGE_LIST) {
    console.log(`Updating package dependencies '${packagePath}' to version '${targetVersion}'`)
    patchPackageVersion(packagePath, targetVersion)
  }

  // Refresh root lockfile so that dependency versions stay consistent.
  console.log('▶ npm install (cwd=src) to refresh package-lock.json')
  execSync('npm install', {cwd: SRC_ROOT, stdio: 'inherit'})
}

function updateLernaVersion(versions: VersionsMap): void {
  const npmVersion = versions.NpmVersion
  const npmTag = versions.NpmPublishTag

  if (!npmVersion) {
    throw new Error('NpmVersion is not defined in scripts/version.txt')
  }

  const args = [npmVersion]
  if (npmTag) {
    args.push(`--preid ${npmTag}`)
  }

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

async function updateReleaseDate() {
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

async function main() {
  try {
    const versions = readVersions()
    const bundleSizeSharedInitialVersion = readPackageVersion(BUNDLE_SIZE_SHARED_PACKAGE_JSON_PATH)

    // 1) Temporarily set all internal deps to "*" to avoid conflicts during lerna version bump.
    updateDependenciesVersion('*')

    // 2) Update lerna-managed package versions.
    updateLernaVersion(versions)
    writePackageVersion(BUNDLE_SIZE_SHARED_PACKAGE_JSON_PATH, bundleSizeSharedInitialVersion)

    // 3) Set concrete versions for internal deps based on NpmVersion.
    updateDependenciesVersion(versions.NpmVersion)

    // 4) Update common-designer release date to force IndexedDB updates in public demo.
    await updateReleaseDate()

    // 5) Update assembly date in designer package.
    updateAssemblyDate()
  } catch (error) {
    console.error('❌ version-update script failed.', error)
    process.exitCode = 1
  }
}

main().catch(console.error)
