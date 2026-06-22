import {createRequire} from 'node:module'
import {join} from 'node:path'

type EslintConfig = {
  extends?: string[]
  plugins?: string[]
  parser?: string
}

const ESLINT_SHORT_PLUGIN_TO_PACKAGE: Record<string, string> = {
  '@typescript-eslint': '@typescript-eslint/eslint-plugin',
  import: 'eslint-plugin-import',
  'unused-imports': 'eslint-plugin-unused-imports',
  'react-hooks': 'eslint-plugin-react-hooks',
  'no-secrets': 'eslint-plugin-no-secrets',
  unicorn: 'eslint-plugin-unicorn',
  react: 'eslint-plugin-react',
  jsdoc: 'eslint-plugin-jsdoc',
  'react-perf': 'eslint-plugin-react-perf',
}

/**
 * Maps an ESLint plugin short name or scoped package name to an npm devDependency name.
 */
function eslintPluginNameToPackageName(pluginName: string): string {
  if (pluginName.startsWith('@') && pluginName.includes('/')) {
    return pluginName
  }

  const mapped = ESLINT_SHORT_PLUGIN_TO_PACKAGE[pluginName]
  if (!mapped) {
    throw new Error(`Unknown ESLint plugin "${pluginName}" in .eslintrc.cjs; extend ESLINT_SHORT_PLUGIN_TO_PACKAGE.`)
  }

  return mapped
}

/**
 * Extracts plugin short names from ESLint `extends` entries such as `plugin:react-hooks/recommended`.
 */
function pluginNameFromExtend(extend: string): string | undefined {
  if (!extend.startsWith('plugin:')) {
    return undefined
  }

  return extend.slice('plugin:'.length).split('/')[0]
}

/**
 * Reads root ESLint devDependency package names required by `.eslintrc.cjs`.
 */
export function readEslintDevDependencyNames(srcRoot: string): string[] {
  const eslintConfigPath = join(srcRoot, '.eslintrc.cjs')
  const require = createRequire(eslintConfigPath)
  const config = require(eslintConfigPath) as EslintConfig

  const pluginNames = new Set<string>()

  for (const plugin of config.plugins ?? []) {
    pluginNames.add(plugin)
  }

  for (const extend of config.extends ?? []) {
    const pluginName = pluginNameFromExtend(extend)
    if (pluginName) {
      pluginNames.add(pluginName)
    }
  }

  const packageNames = new Set<string>(['eslint', 'eslint-import-resolver-typescript'])

  if (typeof config.parser === 'string') {
    packageNames.add(eslintPluginNameToPackageName(config.parser))
  }

  for (const pluginName of pluginNames) {
    packageNames.add(eslintPluginNameToPackageName(pluginName))
  }

  if (packageNames.has('@typescript-eslint/eslint-plugin')) {
    packageNames.add('@typescript-eslint/parser')
    packageNames.add('@typescript-eslint/typescript-estree')
  }

  return [...packageNames].sort((left, right) => left.localeCompare(right))
}
