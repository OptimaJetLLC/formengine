import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'
import {readFileSync, writeFileSync} from 'node:fs'
import {executeCommand} from './execute-command.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packagePrefix = '@react-form-builder/'

const packageList = [
  'src/packages/apps/demo',
  'src/packages/apps/formengine',
  'src/packages/apps/example-builder',
  'src/packages/apps/example-viewer',
  'src/packages/core',
  'src/packages/designer',
  'src/packages/designer-bundle',
  'src/packages/indexed-db-form-storage',
  'src/packages/viewer-bundle',
  'src/packages/views/antd',
  'src/packages/views/default',
  'src/packages/views/rsuite',
  'src/packages/views/signature',
  'examples/with-formik',
  'examples/with-nextjs/with-nextjs-v15',
  'examples/with-remix/with-remix-v2',
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

  const patchedContent = JSON.stringify(packageJson, undefined, 2) + '\n'
  writeFileSync(path, patchedContent)
}

export function updateDependenciesVersion(version) {
  packageList.forEach(packagePath => patchPackageVersion(packagePath, version))

  // update package-lock.json
  const path = join(__dirname, '..', '..', '..', 'src')
  executeCommand('npm install', path)
}
