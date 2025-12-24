import {execSync} from 'child_process'
import {existsSync, readFileSync, renameSync, rmSync, statSync, writeFileSync} from 'fs'
import {join} from 'path'

/**
 * Remove directory or file if it exists.
 * @param path path to remove
 */
function removeIfExists(path: string): void {
  if (existsSync(path)) {
    rmSync(path, {force: true, recursive: true})
  }
}

/**
 * Get package name and version from package.json.
 * @param packagePath path to package directory
 * @returns tuple of [name, version]
 */
function getPackageData(packagePath: string): [string, string] {
  const packageJsonPath = join(packagePath, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`File '${packageJsonPath}' not found`)
  }

  const content = readFileSync(packageJsonPath, 'utf-8')
  const json = JSON.parse(content)
  return [json.name, json.version]
}

/**
 * Install local package by packing and installing it.
 * @param packagePath path to package directory
 */
export function installLocalPackage(targetPath: string, packagePath: string): void {
  const originalCwd = process.cwd()
  try {
    process.chdir(targetPath)

    const [packageName, packageVersion] = getPackageData(packagePath)
    const fullPackageName = `${packageName}-${packageVersion}`
    const packageArchive = fullPackageName.replace('@', '').replace('/', '-') + '.tgz'
    removeIfExists(packageArchive)

    process.chdir(packagePath)
    execSync('npm run pack', {stdio: 'inherit'})

    const sourceArchive = join(packagePath, packageArchive)
    const destArchive = join(targetPath, packageArchive)
    if (existsSync(sourceArchive)) {
      renameSync(sourceArchive, destArchive)
    } else {
      throw new Error(`Package archive '${sourceArchive}' was not created`)
    }

    process.chdir(targetPath)
    removeIfExists('./node_modules/.cache')

    execSync(`npm install ${packageArchive} --force`, {stdio: 'inherit'})
  } finally {
    process.chdir(originalCwd)
  }
}

/**
 * Remove dependency from package.json.
 * @param dependency dependency name to remove
 */
export function removeFromPackageJson(dependency: string): void {
  const filename = 'package.json'
  const content = readFileSync(filename, 'utf-8')
  const json = JSON.parse(content)

  if (json.dependencies && json.dependencies[dependency]) {
    delete json.dependencies[dependency]
    writeFileSync(filename, JSON.stringify(json, null, 2) + '\n')
  }
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

export function getActualFileSize(distPath: string, filename: string): number {
  const filePath = join(distPath, filename)
  if (!existsSync(filePath)) {
    return 0
  }

  try {
    return statSync(filePath).size
  } catch {
    return 0
  }
}
