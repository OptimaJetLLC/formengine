#!/usr/bin/env node

import {execSync} from 'node:child_process'
import {join, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const DEPENDENCIES_TO_CLEAR = [
  '@react-form-builder/core',
  '@react-form-builder/designer',
  '@react-form-builder/components-fast-qr',
  '@react-form-builder/components-google-map',
  '@react-form-builder/components-material-ui',
  '@react-form-builder/components-rich-text',
  '@react-form-builder/components-rsuite',
  '@react-form-builder/components-rsuite-table',
  '@react-form-builder/components-signature',
  '@react-form-builder/components-uploader',
  '@react-form-builder/indexed-db-form-storage',
] as const

const PACK_PATHS = [
  'src/packages/core',
  'src/packages/designer',
  'src/packages/views/fast-qr',
  'src/packages/views/google-map',
  'src/packages/views/material-ui',
  'src/packages/views/rich-text',
  'src/packages/views/rsuite',
  'src/packages/views/rsuite-table',
  'src/packages/views/signature',
  'src/packages/views/uploader',
  'src/packages/indexed-db-form-storage',
] as const

interface CliLibRuntime {
  packAndInstallLocalPackage: (
    appDir: string,
    packagePath: string,
    scriptRoot: string,
    workspaceCliLibPath?: string
  ) => void
  removeDependencyFromPackageJson: (appDir: string, dependency: string) => void
}

async function loadCliLibRuntime(repoRoot: string): Promise<CliLibRuntime> {
  try {
    const mod = await import('@react-form-builder/cli-lib/install-local-package')
    return {
      packAndInstallLocalPackage: mod.packAndInstallLocalPackage,
      removeDependencyFromPackageJson: mod.removeDependencyFromPackageJson,
    }
  } catch {
    const installLocalPackageUrl = pathToFileURL(join(repoRoot, 'src/scripts/cli-lib/install-local-package.ts')).href
    const mod = await import(installLocalPackageUrl)
    return {
      packAndInstallLocalPackage: mod.packAndInstallLocalPackage,
      removeDependencyFromPackageJson: mod.removeDependencyFromPackageJson,
    }
  }
}

async function main(): Promise<void> {
  const scriptRoot = fileURLToPath(new URL('.', import.meta.url))
  const appDir = scriptRoot
  const repoRoot = resolve(scriptRoot, '../..')
  const workspaceCliLibPath = join(repoRoot, 'src/scripts/cli-lib')
  const {packAndInstallLocalPackage, removeDependencyFromPackageJson} = await loadCliLibRuntime(repoRoot)

  console.log('🧹 Cleaning local RFB dependencies from package.json...')
  for (const dep of DEPENDENCIES_TO_CLEAR) {
    await removeDependencyFromPackageJson(appDir, dep)
  }

  console.log('📦 Installing local packages...')
  for (const rel of PACK_PATHS) {
    packAndInstallLocalPackage(appDir, join(repoRoot, rel), scriptRoot, workspaceCliLibPath)
  }

  console.log('📥 Installing dependencies...')
  execSync('npm install', {cwd: appDir, stdio: 'inherit'})

  console.log('🚀 Starting app...')
  execSync('npm run start', {cwd: appDir, stdio: 'inherit'})
}

try {
  await main()
} catch (error) {
  console.error('❌ install-deps-and-run failed.', error)
  process.exitCode = 1
}
