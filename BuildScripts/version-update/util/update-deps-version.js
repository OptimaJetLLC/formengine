import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'
import {readFileSync, writeFileSync} from 'node:fs'
import {executeCommand} from './execute-command.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packagePrefix = '@react-form-builder/'

const packageList = [
  'packages/apps/demo',
  'packages/apps/example-builder',
  'packages/apps/example-viewer',
  'packages/core',
  'packages/designer',
  'packages/designer-bundle',
  'packages/indexed-db-form-storage',
  'packages/viewer-bundle',
  'packages/views/antd',
  'packages/views/default',
  'packages/views/rsuite',
]

const depsSections = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'bundleDependencies',
  'optionalDependencies',
]

function patchPackageVersion(packagePath, version) {
  console.log(`Updating package dependencies '${packagePath}' to version '${version}'`)

  const path = join(__dirname, '..', '..', '..', packagePath, 'package.json')
  const packageJsonContent = readFileSync(path, 'utf-8')
  const packageJson = JSON.parse(packageJsonContent)

  let patched = false
  depsSections.forEach(section => {
    const deps = packageJson[section]
    if (!deps) return
    Object.entries(deps).forEach(([key]) => {
      if (key.startsWith(packagePrefix)) {
        deps[key] = version === '*' ? version : `^${version}`
        patched = true
      }
    })
  })

  if (!patched) return

  const patchedContent = JSON.stringify(packageJson, undefined, 4) + '\n'
  writeFileSync(path, patchedContent)
}

export function updateDependenciesVersion(version) {
  packageList.forEach(packagePath => patchPackageVersion(packagePath, version))

  // update package-lock.json
  const path = join(__dirname, '..', '..')
  executeCommand('npm install', path)
}
