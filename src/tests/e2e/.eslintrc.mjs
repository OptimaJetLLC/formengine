import playwright from 'eslint-plugin-playwright';

/* eslint-env node */

module.exports = {
  extends: [
    '../../.eslintrc.cjs'
  ],
  // ...playwright.configs['flat/recommended'],
  overrides: [{
    ...playwright.configs['recommended'],
    files: ['tests/**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'import/no-extraneous-dependencies': 'off'
    }
  }],
};
