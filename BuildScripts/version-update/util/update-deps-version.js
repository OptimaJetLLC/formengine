import {readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {executeCommand} from './execute-command.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packagePrefix = '@react-form-builder/'

const packageList = [
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

  'examples/with-angular-forms/step1-reactive-forms',
  'examples/with-angular-forms/step2-formengine',
  'examples/with-angular-forms/step3-template-forms',
  'examples/with-angular-forms/step4-designer',
]

const depsSections = ['dependencies', 'devDependencies', 'peerDependencies', 'bundleDependencies', 'optionalDependencies']

function patchPackageVersion(packagePath, version) {
  console.log(`Updating package dependencies '${packagePath}' to version '${version}'`)

  const path = join(__dirname, '..', '..', '..', packagePath, 'package.json')
  const packageJsonContent = readFileSync(path, 'utf-8')
  const packageJson = JSON.parse(packageJsonContent)
  const coreMeta = packageJson?.peerDependenciesMeta?.['@react-form-builder/core'] || {}
  const coreRequired = coreMeta?.optional === false

  let patched = false
  depsSections.forEach(section => {
    const deps = packageJson[section]
    if (!deps) return
    Object.entries(deps).forEach(([key]) => {
      if (key.startsWith(packagePrefix)) {
        if (key === '@react-form-builder/core' && coreRequired) {
          deps[key] = version
        } else {
          deps[key] = version === '*' ? version : `^${version}`
        }
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
