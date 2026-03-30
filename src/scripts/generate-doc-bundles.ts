#!/usr/bin/env node

import {execSync} from 'node:child_process'
import {readFileSync, renameSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

interface PackageJson {
  name: string
  version: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const docDir = join(rootDir, 'documentation', 'website')
const packagesDir = join(rootDir, 'packages')
const viewsDir = join(packagesDir, 'views')

const packages: Record<string, string> = {
  '@react-form-builder/core': join(packagesDir, 'core'),
  '@react-form-builder/components-material-ui': join(viewsDir, 'material-ui'),
  '@react-form-builder/components-mantine': join(viewsDir, 'mantine'),
  '@react-form-builder/components-rsuite': join(viewsDir, 'rsuite'),
  '@react-form-builder/components-rsuite-table': join(viewsDir, 'rsuite-table'),
  '@react-form-builder/components-uploader': join(viewsDir, 'uploader'),
}

function packAndInstall(folder: string): void {
  execSync('npm run pack', {cwd: folder, stdio: 'inherit'})

  const packageJsonPath = join(folder, 'package.json')
  const buffer = readFileSync(packageJsonPath, 'utf8')
  const data = JSON.parse(buffer) as PackageJson

  const filename = `${data.name}-${data.version}.tgz`.replace('@', '').replace('/', '-')
  const withoutVersionName = `${data.name}.tgz`.replace('@', '').replace('/', '-')

  renameSync(join(folder, filename), join(docDir, 'packages', withoutVersionName))

  execSync(`npm install ./packages/${withoutVersionName}`, {cwd: docDir, stdio: 'inherit'})
}

function uninstallPackages(): void {
  const packageNames = Object.keys(packages).join(' ')
  console.info(`Uninstalling packages '${packageNames}'`)
  execSync(`npm uninstall ${packageNames}`, {cwd: docDir, stdio: 'inherit'})
}

function updatePackages(): void {
  uninstallPackages()
  for (const dir of Object.values(packages)) {
    packAndInstall(dir)
  }
}

// We need to create archives to integrate the product into the documentation.
// If the documentation refers to packages in the mono repository, then when the documentation is assembled,
// the product packages will be compiled using another package builder (Rspack/Webpack) that is not configured.
// To avoid problems with packaging, packages are assembled and copied to the documentation folder in advance.
updatePackages()

