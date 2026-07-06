#!/usr/bin/env node

import {readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {readEslintDevDependencyNames} from './distribution-eslint-dev-dependencies.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DEFAULT_SRC_ROOT = join(__dirname, '..')
const ROOT_PACKAGE_JSON_FILE = 'package.json'

export type DistributionVariant = 'public' | 'private'

export type RootPackageJson = {
  name: string
  private: boolean
  type: string
  scripts: Record<string, string>
  workspaces: string[]
  devDependencies: Record<string, string>
  dependencies: Record<string, string>
  overrides?: Record<string, string>
}

export type DistributionPackageJson = {
  name: string
  private: boolean
  type: string
  scripts: Record<string, string>
  workspaces: string[]
  devDependencies: Record<string, string>
  dependencies: Record<string, string>
  overrides: Record<string, string>
}

export type DistributionVariantConfig = {
  startScope: string
  workspaces: readonly string[]
  includeCliLibDevDep: boolean
  outputFileName: string
}

/**
 * Per-variant policy for GitHub distribution archives copied from Earthfile.
 * Workspace globs resolve against packages present in each archive staging tree;
 * lockfiles are regenerated there during packaging, not in the dev monorepo.
 */
export const DISTRIBUTION_VARIANTS = {
  public: {
    startScope: '@react-form-builder/example-viewer',
    workspaces: ['scripts/cli-lib', 'packages/*', 'packages/apps/*', 'packages/views/*'],
    includeCliLibDevDep: false,
    outputFileName: 'package.public.json',
  },
  private: {
    startScope: '@react-form-builder/example-builder',
    workspaces: ['packages/*', 'packages/apps/*', 'packages/views/*', 'scripts/cli-lib'],
    includeCliLibDevDep: true,
    outputFileName: 'package.private.json',
  },
} as const satisfies Record<DistributionVariant, DistributionVariantConfig>

/**
 * Non-ESLint root devDependencies required to build and lint distribution archives.
 */
const DISTRIBUTION_BASE_DEV_DEPENDENCIES = [
  '@types/node',
  '@types/react',
  '@types/react-dom',
  '@vitejs/plugin-react-swc',
  '@vitest/browser-playwright',
  'lerna',
  'lightningcss',
  'npm-run-all',
  'rimraf',
  'rollup-plugin-exclude-dependencies-from-bundle',
  'typescript',
  'vite',
  'vite-bundle-analyzer',
  'vite-plugin-cp',
  'vite-plugin-dts',
  'vite-plugin-svgr',
  'vitest',
] as const

/**
 * Root devDependencies used only in the dev monorepo and never shipped to distribution archives.
 */
export const DEV_MONOREPO_ONLY_DEPENDENCIES = [
  '@biomejs/biome',
  '@testing-library/dom',
  '@testing-library/jest-dom',
  '@testing-library/react',
  '@vitest/browser',
  '@vitest/ui',
  'axe-core',
  'dotenv-cli',
  'jsdom',
  'klona',
  'lefthook',
  'knip',
  'leasot',
  'madge',
  'vitest-fail-on-console',
] as const

const DISTRIBUTION_SCRIPT_TEMPLATES = {
  build: 'npx lerna run build',
  pack: 'npx lerna run pack',
  clean: 'lerna exec -- npx rimraf node_modules dist build *.tgz && rimraf node_modules',
  'check:tsc': 'tsc --noEmit --emitDeclarationOnly false',
  eslint: 'npx eslint .',
  'eslint-fix': 'npx eslint . --fix',
} as const

/**
 * Builds the allowlist of root devDependencies that may appear in a distribution manifest.
 */
export function buildDistributionDevDependencyAllowlist(srcRoot: string, config: DistributionVariantConfig): Set<string> {
  const allowlist = new Set<string>([...DISTRIBUTION_BASE_DEV_DEPENDENCIES, ...readEslintDevDependencyNames(srcRoot)])

  if (config.includeCliLibDevDep) {
    allowlist.add('@react-form-builder/cli-lib')
  }

  return allowlist
}

/**
 * Returns root devDependencies that are neither allowed for distribution nor classified as dev-monorepo-only.
 */
export function findUnclassifiedRootDevDependencies(srcRoot: string = DEFAULT_SRC_ROOT): string[] {
  const source = readRootPackageJson(srcRoot)
  const distributionCapable = new Set<string>([
    ...DISTRIBUTION_BASE_DEV_DEPENDENCIES,
    ...readEslintDevDependencyNames(srcRoot),
    '@react-form-builder/cli-lib',
  ])
  const classified = new Set<string>([...distributionCapable, ...DEV_MONOREPO_ONLY_DEPENDENCIES])

  return Object.keys(source.devDependencies)
    .filter(name => !classified.has(name))
    .sort((left, right) => left.localeCompare(right))
}

/**
 * Reads the dev monorepo root package.json.
 */
export function readRootPackageJson(srcRoot: string = DEFAULT_SRC_ROOT): RootPackageJson {
  const content = readFileSync(join(srcRoot, ROOT_PACKAGE_JSON_FILE), 'utf8')
  return JSON.parse(content) as RootPackageJson
}

/**
 * Serializes a package manifest with stable formatting for diff checks.
 */
export function serializePackageJson(packageJson: DistributionPackageJson): string {
  return `${JSON.stringify(packageJson, undefined, 2)}\n`
}

/**
 * Filters root devDependencies down to what distribution archives need to build and lint.
 */
function filterDistributionDevDependencies(
  source: Record<string, string>,
  config: DistributionVariantConfig,
  srcRoot: string
): Record<string, string> {
  const allowlist = buildDistributionDevDependencyAllowlist(srcRoot, config)
  const devDependencies: Record<string, string> = {}

  for (const [name, version] of Object.entries(source)) {
    if (!allowlist.has(name)) {
      continue
    }

    devDependencies[name] = version
  }

  return Object.fromEntries(Object.entries(devDependencies).sort(([left], [right]) => left.localeCompare(right)))
}

/**
 * Distribution archives pin React type packages via overrides instead of the root typescript override.
 */
function buildDistributionOverrides(devDependencies: Record<string, string>): Record<string, string> {
  const overrides: Record<string, string> = {}

  const reactTypes = '@types/react'
  if (devDependencies[reactTypes]) {
    overrides[reactTypes] = devDependencies[reactTypes]
  }

  const reactDomTypes = '@types/react-dom'
  if (devDependencies[reactDomTypes]) {
    overrides[reactDomTypes] = devDependencies[reactDomTypes]
  }

  return overrides
}

/**
 * Builds a distribution root package.json from the dev monorepo root package.json.
 */
export function buildDistributionPackageJson(
  source: RootPackageJson,
  config: DistributionVariantConfig,
  srcRoot: string = DEFAULT_SRC_ROOT
): DistributionPackageJson {
  const devDependencies = filterDistributionDevDependencies(source.devDependencies, config, srcRoot)

  return {
    name: source.name,
    private: source.private,
    type: source.type,
    scripts: {
      start: `npx lerna run dev --scope=${config.startScope}`,
      ...DISTRIBUTION_SCRIPT_TEMPLATES,
    },
    workspaces: [...config.workspaces],
    devDependencies,
    dependencies: {...source.dependencies},
    overrides: buildDistributionOverrides(devDependencies),
  }
}

/**
 * Builds expected distribution manifests for all variants.
 */
export function buildExpectedDistributionPackageJsons(
  srcRoot: string = DEFAULT_SRC_ROOT
): Record<DistributionVariant, DistributionPackageJson> {
  const source = readRootPackageJson(srcRoot)

  return {
    public: buildDistributionPackageJson(source, DISTRIBUTION_VARIANTS.public, srcRoot),
    private: buildDistributionPackageJson(source, DISTRIBUTION_VARIANTS.private, srcRoot),
  }
}

/**
 * Syncs `package.public.json` and `package.private.json` from the dev monorepo root `package.json`.
 */
export function syncDistributionPackageJsons(srcRoot: string = DEFAULT_SRC_ROOT): void {
  const expected = buildExpectedDistributionPackageJsons(srcRoot)

  for (const variant of Object.keys(DISTRIBUTION_VARIANTS) as DistributionVariant[]) {
    const outputPath = join(srcRoot, DISTRIBUTION_VARIANTS[variant].outputFileName)
    console.log(`▶ Syncing ${outputPath}`)
    writeFileSync(outputPath, serializePackageJson(expected[variant]))
  }
}

const isMainModule = process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]

if (isMainModule) {
  try {
    syncDistributionPackageJsons()
  } catch (error) {
    console.error('❌ sync-distribution-package-json failed.', error)
    process.exitCode = 1
  }
}
