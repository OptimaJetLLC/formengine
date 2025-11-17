import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'
import {readFileSync, renameSync} from 'node:fs'
import {execSync} from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __rootDir = join(__dirname, '..')

const docDir = join(__rootDir, 'documentation', 'website')
const packagesDir = join(__rootDir, 'packages')

const packages = {
  '@react-form-builder/core': join(packagesDir, 'core'),
  '@react-form-builder/components-rsuite': join(packagesDir, 'views', 'rsuite'),
  '@react-form-builder/components-rsuite-table': join(packagesDir, 'views', 'rsuite-table'),
}

const createArchive = folder => {
  execSync('npm run bundle', {cwd: folder})

  const packageJson = join(folder, 'package.json')
  const buffer = readFileSync(packageJson, 'utf8')
  const data = JSON.parse(buffer)
  const filename = `${data.name}-${data.version}.tgz`.replace('@', '').replace('/', '-')
  const withoutVersionName = `${data.name}.tgz`.replace('@', '').replace('/', '-')

  renameSync(join(folder, filename), join(docDir, 'packages', withoutVersionName))

  execSync(`npm install ./packages/${withoutVersionName}`, {cwd: docDir})
}

const uninstallPackages = () => {
  const packageNames = Object.keys(packages).join(' ')
  console.info(`Uninstalling packages '${packageNames}'`)
  execSync(`npm uninstall ${packageNames}`, {cwd: docDir})
}

const updatePackages = () => {
  uninstallPackages()
  Object.values(packages).forEach(dir => createArchive(dir))
}

// We need to create archives to integrate the product into the documentation.
// If the documentation refers to packages in the mono repository, then when the documentation is assembled,
// the product packages will be compiled using another package builder (RsPack/WebPack) that is not configured.
// To avoid problems with packaging, packages are assembled and copied to the documentation folder in advance.
updatePackages()
