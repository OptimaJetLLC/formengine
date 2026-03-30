#!/usr/bin/env node

/* eslint-disable import/no-nodejs-modules,no-console */

import {execSync} from 'child_process'
import {existsSync, readFileSync, rmSync, writeFileSync} from 'fs'
import {basename, dirname, join, resolve} from 'path'

interface PackageData {
  name: string
  version: string
}

function getScriptRoot(): string {
  const scriptPath = process.argv[1]
  if (!scriptPath) {
    throw new Error('Cannot determine the script directory from argv.')
  }
  return dirname(scriptPath)
}

function removeIfExists(path: string): void {
  if (existsSync(path)) {
    rmSync(path, {recursive: true, force: true})
  }
}

function getPackageData(path: string): PackageData {
  const packageJsonPath = join(path, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`File '${packageJsonPath}' not found`)
  }

  const json = JSON.parse(
    readFileSync(packageJsonPath, 'utf8')
  ) as { name: string, version: string }

  return {name: json.name, version: json.version}
}

function getPackageArchiveName(packageData: PackageData): string {
  const fullName = `${packageData.name}-${packageData.version}`
  return `${fullName}.tgz`.replace('@', '').replace('/', '-')
}

function installLocalPackage(appDir: string, packagePath: string, scriptRoot: string): void {
  const originalCwd = process.cwd()

  try {
    const packageData = getPackageData(packagePath)
    const packageArchive = getPackageArchiveName(packageData)
    const packageArchivePath = join(scriptRoot, packageArchive)

    removeIfExists(packageArchivePath)

    console.log(`🧱 Packing ${packageData.name} from ${packagePath}...`)
    process.chdir(packagePath)
    execSync('npm run pack', {stdio: 'inherit'})

    const builtArchive = join(packagePath, packageArchive)
    if (!existsSync(builtArchive)) {
      throw new Error(`Package archive not found: ${builtArchive}`)
    }

    execSync(`mv ${JSON.stringify(builtArchive)} ${JSON.stringify(scriptRoot)}`, {stdio: 'inherit'})

    process.chdir(appDir)
    removeIfExists('./node_modules/.cache')

    console.log(`📦 Installing ${basename(packageArchivePath)} into ${appDir}...`)
    execSync(`npm install ${JSON.stringify(packageArchivePath)} --force`, {stdio: 'inherit'})
  } finally {
    process.chdir(originalCwd)
  }
}

function removeFromPackageJson(appDir: string, dependency: string) {
  const filename = join(appDir, 'package.json')
  if (!existsSync(filename)) {
    return
  }

  const content = JSON.parse(
    readFileSync(filename, 'utf8')
  ) as { dependencies?: Record<string, string> }

  if (content.dependencies && dependency in content.dependencies) {
    delete content.dependencies[dependency]
  }

  writeFileSync(filename, `${JSON.stringify(content, null, 2)}\n`, {encoding: 'utf8'})
}

function updateTestAppPackageJson(appPath: string, packageArchive: string) {
  const packageJsonPath = join(appPath, 'package.json')
  if (!existsSync(packageJsonPath)) {
    return
  }

  const content = JSON.parse(
    readFileSync(packageJsonPath, 'utf8')
  ) as { dependencies?: Record<string, string> }


  const archiveName = basename(packageArchive)
  if (!content.dependencies) {
    content.dependencies = {}
  }
  content.dependencies['@react-form-builder/core'] = `file:../${archiveName}`

  writeFileSync(packageJsonPath, `${JSON.stringify(content, null, 2)}\n`, {encoding: 'utf8'})
}

function installIntoTestApps(scriptRoot: string, packageArchive: string) {
  const testApps = ['test-app-lite', 'test-app-full', 'test-app-full-rsbuild']
  const packageArchivePath = join(scriptRoot, packageArchive)

  for (const app of testApps) {
    const appPath = join(scriptRoot, app)
    if (!existsSync(appPath)) {
      continue
    }

    updateTestAppPackageJson(appPath, packageArchive)

    removeIfExists(join(appPath, 'node_modules/.cache'))
    console.log(`📦 Installing ${basename(packageArchivePath)} into ${appPath}...`)
    execSync(`npm install ${JSON.stringify(packageArchivePath)} --force`, {
      cwd: appPath,
      stdio: 'inherit',
    })
  }
}

function main() {
  const scriptRoot = getScriptRoot()
  const monorepoRoot = resolve(scriptRoot, '../..')
  const corePackagePath = join(monorepoRoot, 'src/packages/core')

  try {
    console.log('🧹 Cleaning local RFB dependency from core-tests package.json...')
    removeFromPackageJson(scriptRoot, '@react-form-builder/core')

    const packageData = getPackageData(corePackagePath)
    const packageArchive = getPackageArchiveName(packageData)

    // Install target must be a directory with package.json (same pattern as my-designer / rsbuild-test).
    installLocalPackage(scriptRoot, corePackagePath, scriptRoot)
    installIntoTestApps(scriptRoot, packageArchive)

    console.log('🧪 Running tests...')
    execSync('npm run test', {cwd: scriptRoot, stdio: 'inherit'})
  } catch (error) {
    console.error('❌ install-deps-and-run failed.', error)
    process.exitCode = 1
  }
}

main()

