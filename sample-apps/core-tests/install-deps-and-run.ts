#!/usr/bin/env node

import {execSync} from 'node:child_process'
import {existsSync, readFileSync, writeFileSync} from 'node:fs'
import {basename, join, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

interface CliLibRuntime {
  packAndInstallLocalPackage: (
    appDir: string,
    packagePath: string,
    scriptRoot: string,
    workspaceCliLibPath?: string
  ) => void
  readPackageIdentity: (packagePath: string) => {name: string; version: string}
  removeDependencyFromPackageJson: (appDir: string, dependency: string) => void
  removeIfExists: (path: string) => void
  tarballFilename: (pkg: {name: string; version: string}) => string
  ensureAppDependenciesInstalled: (appDir: string) => void
}

async function loadCliLibRuntime(repoRoot: string): Promise<CliLibRuntime> {
  try {
    const [installMod, npmPackMod] = await Promise.all([
      import('@react-form-builder/cli-lib/install-local-package'),
      import('@react-form-builder/cli-lib/npm-pack'),
    ])
    return {
      packAndInstallLocalPackage: installMod.packAndInstallLocalPackage,
      readPackageIdentity: installMod.readPackageIdentity,
      removeDependencyFromPackageJson: installMod.removeDependencyFromPackageJson,
      removeIfExists: installMod.removeIfExists,
      tarballFilename: npmPackMod.tarballFilename,
      ensureAppDependenciesInstalled: installMod.ensureAppDependenciesInstalled,
    }
  } catch {
    const [installMod, npmPackMod] = await Promise.all([
      import(pathToFileURL(join(repoRoot, 'src/scripts/cli-lib/install-local-package.ts')).href),
      import(pathToFileURL(join(repoRoot, 'src/scripts/cli-lib/npm-pack.ts')).href),
    ])
    return {
      packAndInstallLocalPackage: installMod.packAndInstallLocalPackage,
      readPackageIdentity: installMod.readPackageIdentity,
      removeDependencyFromPackageJson: installMod.removeDependencyFromPackageJson,
      removeIfExists: installMod.removeIfExists,
      tarballFilename: npmPackMod.tarballFilename,
      ensureAppDependenciesInstalled: installMod.ensureAppDependenciesInstalled,
    }
  }
}

async function updateTestAppPackageJson(appPath: string, packageArchive: string): Promise<void> {
  const packageJsonPath = join(appPath, 'package.json')
  if (!existsSync(packageJsonPath)) {
    return
  }

  const content = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as { dependencies?: Record<string, string> }

  const archiveName = basename(packageArchive)
  if (!content.dependencies) {
    content.dependencies = {}
  }
  content.dependencies['@react-form-builder/core'] = `file:../${archiveName}`

  writeFileSync(packageJsonPath, `${JSON.stringify(content, null, 2)}\n`, {encoding: 'utf8'})
}

async function installIntoTestApps(
  scriptRoot: string,
  packageArchive: string,
  removeIfExists: (path: string) => void,
  ensureAppDependenciesInstalled: (appDir: string) => void
): Promise<void> {
  const testApps = ['test-app-lite', 'test-app-full', 'test-app-full-rsbuild']
  const packageArchivePath = join(scriptRoot, packageArchive)

  for (const app of testApps) {
    const appPath = join(scriptRoot, app)
    if (!existsSync(appPath)) {
      continue
    }

    await updateTestAppPackageJson(appPath, packageArchive)

    removeIfExists(join(appPath, 'node_modules', '.cache'))
    if (!existsSync(join(appPath, 'node_modules'))) {
      ensureAppDependenciesInstalled(appPath)
    } else {
      console.log(`📦 Installing ${basename(packageArchivePath)} into ${appPath}...`)
      execSync(`npm install ${JSON.stringify(packageArchivePath)} --force`, {
        cwd: appPath,
        stdio: 'inherit',
      })
    }
  }
}

async function main(): Promise<void> {
  const scriptRoot = fileURLToPath(new URL('.', import.meta.url))
  const monorepoRoot = resolve(scriptRoot, '../..')
  const corePackagePath = join(monorepoRoot, 'src/packages/core')
  const workspaceCliLibPath = join(monorepoRoot, 'src/scripts/cli-lib')
  const {
    packAndInstallLocalPackage,
    readPackageIdentity,
    removeDependencyFromPackageJson,
    removeIfExists,
    tarballFilename,
    ensureAppDependenciesInstalled,
  } = await loadCliLibRuntime(monorepoRoot)

  console.log('🧹 Cleaning local RFB dependency from core-tests package.json...')
  await removeDependencyFromPackageJson(scriptRoot, '@react-form-builder/core')

  const identity = readPackageIdentity(corePackagePath)
  const packageArchive = tarballFilename(identity)

  packAndInstallLocalPackage(scriptRoot, corePackagePath, scriptRoot, workspaceCliLibPath)
  await installIntoTestApps(scriptRoot, packageArchive, removeIfExists, ensureAppDependenciesInstalled)

  ensureAppDependenciesInstalled(scriptRoot)

  console.log('🧪 Running tests...')
  execSync('npm run test', {cwd: scriptRoot, stdio: 'inherit'})
}

try {
  await main()
} catch (error) {
  console.error('❌ install-deps-and-run failed.', error)
  process.exitCode = 1
}
