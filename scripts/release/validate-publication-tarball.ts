import {execFileSync} from 'node:child_process'

import {NPM_PACKAGE_PATHS, PUBLISHED_PACKAGE_REPOSITORY_URL} from './constants.ts'

const CLI_LIB_PACKAGE_NAME = '@react-form-builder/cli-lib'

type PackageRepository = {
  type?: string
  url?: string
  directory?: string
}

/**
 * Reads package.json from an npm tarball without extracting the full archive.
 * @param tarballPath absolute path to a `.tgz` file
 */
function readTarballPackageJson(tarballPath: string): Record<string, unknown> {
  const stdout = execFileSync('tar', ['-xOf', tarballPath, 'package/package.json'], {encoding: 'utf8'})
  return JSON.parse(stdout) as Record<string, unknown>
}

/**
 * Ensures an npm archive was produced by config/pack.ts staging, not raw workspace `npm pack`.
 * @param tarballPath absolute path to a `.tgz` file
 */
function assertPublicationTarball(tarballPath: string): void {
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

  const repository = packageJson.repository as PackageRepository | undefined
  if (!repository || typeof repository !== 'object') {
    throw new Error(`${tarballPath} is missing repository metadata`)
  }
  if (repository.type !== 'git') {
    throw new Error(`${tarballPath} repository.type must be "git"`)
  }
  if (repository.url !== PUBLISHED_PACKAGE_REPOSITORY_URL) {
    throw new Error(`${tarballPath} repository.url must be ${PUBLISHED_PACKAGE_REPOSITORY_URL} (got ${String(repository.url)})`)
  }
  if (typeof repository.directory !== 'string' || !repository.directory.startsWith('packages/')) {
    throw new Error(`${tarballPath} repository.directory must be a packages/* path`)
  }
  if (!(NPM_PACKAGE_PATHS as readonly string[]).includes(repository.directory)) {
    throw new Error(`${tarballPath} repository.directory ${repository.directory} is not in NPM_PACKAGE_PATHS`)
  }
}

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
