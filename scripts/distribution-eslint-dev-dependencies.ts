/**
 * Root ESLint toolchain packages shipped into distribution archives.
 * Keep in sync with `eslint.base.mjs` / root `package.json` eslint-related deps.
 */
const ESLINT_DEV_DEPENDENCY_PACKAGES = [
  '@eslint/js',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@typescript-eslint/typescript-estree',
  'eslint',
  'eslint-import-resolver-typescript',
  'eslint-plugin-import',
  'eslint-plugin-jsdoc',
  'eslint-plugin-no-secrets',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-react-perf',
  'eslint-plugin-unicorn',
  'eslint-plugin-unused-imports',
  'typescript-eslint',
] as const

/**
 * Returns root ESLint devDependency package names required by the flat ESLint config.
 */
export function readEslintDevDependencyNames(_srcRoot: string): string[] {
  return [...ESLINT_DEV_DEPENDENCY_PACKAGES]
}
