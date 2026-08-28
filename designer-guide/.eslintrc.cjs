/* eslint-env node */
module.exports = {
  root: true,
  extends: ['../.eslintrc.cjs'],
  ignorePatterns: [
    'dist/',
    'public/',
    'content/',
    '.astro/',
    'node_modules/',
    '**/*.astro',
    '.eslintrc.cjs',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs}'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      env: {
        node: true,
        es2022: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: null,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      rules: {
        'no-console': 'off',
        'no-undef': 'off',
        'no-secrets/no-secrets': 'off',
        'import/no-nodejs-modules': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': [
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
        'import/no-nodejs-modules': 'off',
        'import/extensions': [
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
  ],
};
