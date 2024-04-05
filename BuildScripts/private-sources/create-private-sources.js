import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'
import fse from 'fs-extra'
import findRemoveSync from 'find-remove'
import {zip} from 'zip-a-folder'
import {exit} from 'node:process'
import {execSync} from 'child_process'
import AdmZip from 'adm-zip'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function mkDirIfNotExists(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, {recursive: true})
  }
}

function rmIfExists(path) {
  if (existsSync(path)) {
    rmSync(path, {recursive: true, force: true})
  }
}

function patchPackageJson(path) {
  const buffer = readFileSync(path, 'utf8')
  const data = JSON.parse(buffer)

  data.scripts = {
    'build': 'npx lerna run build',
    'bundle': 'npx lerna run bundle',
    'start': 'npx lerna run start',
  }

  data.workspaces = [
    'packages/*',
    'packages/apps/*',
    'packages/views/*',
  ]

  const patchedData = JSON.stringify(data, undefined, 4)
  writeFileSync(path, patchedData, 'utf8')
}

function copySources(srcPath, dstPath) {
  rmIfExists(dstPath)
  mkDirIfNotExists(dstPath)

  const filesToCopy = [
    'packages/apps/example-builder',
    'packages/apps/example-viewer',
    'packages/core',
    'packages/designer',
    'packages/indexed-db-form-storage',
    'packages/views/antd',
    'packages/views/rsuite',
    '.editorconfig',
    'lerna.json',
    'LICENSE.md',
    'nx.json',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
  ]

  filesToCopy.forEach(item => fse.copySync(join(srcPath, item), join(dstPath, item)))
  fse.copySync(join(__dirname, 'includes', 'README.md'), join(dstPath, 'README.md'))

  patchPackageJson(join(dstPath, 'package.json'))

  const filesToRemove = [
    'packages/apps/example-builder/.swc',
    'packages/apps/example-builder/node_modules',
    'packages/apps/example-viewer/.swc',
    'packages/apps/example-viewer/node_modules',
    'packages/core/dist',
    'packages/designer/dist',
    'packages/views/antd/dist',
    'packages/views/rsuite/.swc',
    'packages/views/rsuite/dist',
  ]

  filesToRemove.forEach(file => rmIfExists(join(dstPath, file)))
  findRemoveSync(dstPath, {extensions: ['.tgz']})
  findRemoveSync(dstPath, {files: '.*\.spec\.tsx', regex: true})
}

function errorHandler(e) {
  console.error(e)
  exit(1)
}

function testCommand(cmd, workDir) {
  console.info(`Running command '${cmd}' in folder ${workDir}`)
  const output = execSync(cmd, {cwd: workDir})
  console.info('' + output)
}

function testSources(zipPath, output) {
  const zip = new AdmZip(zipPath)
  zip.extractAllTo(output, true, true, undefined)

  testCommand('npm install', output)
  testCommand('npm run build', output)
  testCommand('npm run bundle', output)
  console.log('The sources have been successfully tested.')
  try {
    rmIfExists(output)
  } catch (e) {
    console.info(`There was an error deleting the folder '${output}', try deleting the folder again.`)
  }
  rmIfExists(output)
}

const rootPath = join(__dirname, '..', '..')
const archivesPath = join(rootPath, '.archives')
const destPath = join(archivesPath, 'private-github')

copySources(rootPath, destPath)

const zipPath = join(archivesPath, 'formenginesupport.zip')
zip(destPath, zipPath)
  .then(() => {
    console.log('The sources have been successfully packaged.')
    rmIfExists(destPath)
    testSources(zipPath, join(archivesPath, `${new Date().getTime()}`))
  })
  .catch(errorHandler)
