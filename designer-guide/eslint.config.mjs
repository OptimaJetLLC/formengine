import tseslint from 'typescript-eslint'

import {createFormEngineEslintConfig} from '../eslint.base.mjs'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'public/**',
      'content/**',
      '.astro/**',
      'node_modules/**',
      '**/*.astro',
      'eslint.config.mjs',
    ],
  },
  ...createFormEngineEslintConfig({
    tsconfigRootDir: import.meta.dirname,
    project: './tsconfig.json',
  }),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: null,
      },
    },
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
      'no-secrets/no-secrets': 'off',
      'import-x/no-nodejs-modules': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/extensions': [
        'error',
        {
          ts: 'never',
          tsx: 'never',
          'd.ts': 'never',
          js: 'always',
          mjs: 'always',
          cjs: 'always',
          jsx: 'always',
          json: 'always',
          css: 'always',
        },
      ],
      '@typescript-eslint/init-declarations': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/check-tag-names': 'off',
      'jsdoc/escape-inline-tags': 'off',
      'unicorn/no-useless-spread': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
      'import-x/extensions': [
        'error',
        {
          ts: 'never',
          tsx: 'never',
          'd.ts': 'never',
          js: 'always',
          mjs: 'always',
          jsx: 'always',
          json: 'always',
          css: 'always',
        },
      ],
    },
  },
)
