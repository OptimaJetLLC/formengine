import {execFileSync} from 'node:child_process'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const CLI_LIB_PACKAGE_NAME = '@react-form-builder/cli-lib'

const __filename = fileURLToPath(import.meta.url)

/**
 * Reads package.json from an npm tarball without extracting the full archive.
 * @param tarballPath absolute path to a `.tgz` file
 */
export function readTarballPackageJson(tarballPath: string): Record<string, unknown> {
  const stdout = execFileSync('tar', ['-xOf', tarballPath, 'package/package.json'], {encoding: 'utf8'})
  return JSON.parse(stdout) as Record<string, unknown>
}

/**
 * Ensures an npm archive was produced by config/pack.ts staging, not raw workspace `npm pack`.
 * @param tarballPath absolute path to a `.tgz` file
 */
export function assertPublicationTarball(tarballPath: string): void {
  const packageJson = readTarballPackageJson(tarballPath)

  if (packageJson.scripts) {
    throw new Error(`${tarballPath} includes scripts; expected config/pack.ts output, not raw workspace npm pack`)
  }

  const devDependencies = packageJson.devDependencies
  if (devDependencies && typeof devDependencies === 'object') {
    if (CLI_LIB_PACKAGE_NAME in (devDependencies as Record<string, unknown>)) {
      throw new Error(`${tarballPath} must not declare devDependency ${CLI_LIB_PACKAGE_NAME}`)
    }
  }

  const main = packageJson.main
  if (typeof main === 'string' && main.includes('/src/')) {
    throw new Error(`${tarballPath} publishes a src entry point (${main}); expected dist output`)
  }
}

const isMainModule = process.argv[1] !== undefined && resolve(process.argv[1]) === __filename

if (isMainModule) {
  const tarballPath = process.argv[2]
  if (!tarballPath) {
    console.error('Usage: node scripts/release/validate-publication-tarball.ts <path.tgz>')
    process.exitCode = 1
  } else {
    try {
      assertPublicationTarball(tarballPath)
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }
  }
}
