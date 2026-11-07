import js from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import importX from 'eslint-plugin-import-x'
import jsdoc from 'eslint-plugin-jsdoc'
import noSecrets from 'eslint-plugin-no-secrets'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPerf from 'eslint-plugin-react-perf'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

/**
 * Shared FormEngine ESLint flat config blocks (without ignores).
 *
 * @param {{tsconfigRootDir: string, project: string}} options Type-aware parser paths.
 * @returns {import('typescript-eslint').ConfigArray}
 */
export function createFormEngineEslintConfig({tsconfigRootDir, project}) {
  return tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintReact.configs.recommended,
    reactHooks.configs.flat.recommended,
    jsdoc.configs['flat/recommended-typescript-error'],
    reactPerf.configs.flat.all,
    {
      languageOptions: {
        parserOptions: {
          project,
          tsconfigRootDir,
        },
      },
      settings: {
        'import-x/resolver': {
          typescript: {
            project,
          },
        },
      },
      plugins: {
        'import-x': importX,
        'unused-imports': unusedImports,
        'no-secrets': noSecrets,
        unicorn,
      },
      rules: {
        // Keep Hook diagnostics in eslint-plugin-react-hooks so its configured severities
        // and existing react-hooks/* suppressions apply without duplicate reports.
        '@eslint-react/error-boundaries': 'off',
        '@eslint-react/exhaustive-deps': 'off',
        '@eslint-react/purity': 'off',
        '@eslint-react/rules-of-hooks': 'off',
        '@eslint-react/set-state-in-effect': 'off',
        '@eslint-react/set-state-in-render': 'off',
        '@eslint-react/unsupported-syntax': 'off',
        '@eslint-react/use-memo': 'off',
        // FormEngine resolves view components from the form model at render time.
        // react-hooks/static-components still covers real create-during-render bugs.
        '@eslint-react/static-components': 'off',
        // Packages peer React ^18 || ^19; skip React 19-only migrations.
        '@eslint-react/no-context-provider': 'off',
        '@eslint-react/no-forward-ref': 'off',
        '@eslint-react/no-use-context': 'off',
        '@eslint-react/rsc-function-definition': 'off',
        '@eslint-react/dom-no-use-form-state': 'off',
        '@eslint-react/dom-no-unsafe-target-blank': 'error',
        'eqeqeq': ['error', 'always'],
        'no-restricted-syntax': ['error', {
          selector: "CallExpression[callee.name='customizableObserver'] > ArrowFunctionExpression.arguments",
          message: 'never pass anonymous react components',
        }, {
          selector: "CallExpression[callee.name='customizable'] > ArrowFunctionExpression.arguments",
          message: 'never pass anonymous react components',
        }, {
          selector: "CallExpression[callee.name='namedObserver'] > ArrowFunctionExpression.arguments",
          message: 'never pass anonymous react components',
        }],
        'no-secrets/no-secrets': 'error',
        'no-console': ['error', {allow: ['warn', 'error']}],
        'no-extra-semi': 'off',
        'no-warning-comments': ['error', {
          terms: ['todo', 'fixme', 'wtf'],
          location: 'anywhere',
        }],
        'one-var': ['error', 'never'],
        'react-hooks/exhaustive-deps': ['error', {
          additionalHooks: '',
        }],
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/prefer-spread': 'error',
        '@typescript-eslint/ban-ts-comment': ['error', {'ts-ignore': 'allow-with-description'}],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        'import-x/no-extraneous-dependencies': ['error', {
          devDependencies: false,
          optionalDependencies: false,
          bundledDependencies: false,
        }],
        'import-x/no-deprecated': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-absolute-path': 'error',
        'import-x/no-nodejs-modules': 'error',
        'import-x/no-relative-packages': 'error',
        'import-x/no-useless-path-segments': 'error',
        'import-x/consistent-type-specifier-style': 'error',
        'import-x/first': 'error',
        'import-x/newline-after-import': 'error',
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@*/**/src/**'],
                message: 'Do not import from package internal src paths; use the package public API.',
              },
            ],
          },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        'init-declarations': 'off',
        '@typescript-eslint/init-declarations': ['error', 'always'],
        'import-x/extensions': ['error', {
          ignorePackages: true,
          pattern: {
            'ts': 'never',
            'tsx': 'never',
            'd.ts': 'never',
            'js': 'always',
            'jsx': 'always',
            'json': 'always',
            'css': 'always',
          },
        }],
        'unused-imports/no-unused-imports': 'error',
        'jsdoc/require-jsdoc': ['error',
          {
            publicOnly: true,
            exemptEmptyConstructors: false,
            require: {
              ArrowFunctionExpression: true,
              ClassDeclaration: true,
              ClassExpression: true,
              FunctionDeclaration: true,
              FunctionExpression: true,
              MethodDefinition: true,
            },
            contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration', 'TSEnumDeclaration', 'TSPropertySignature'],
          },
        ],
        'jsdoc/no-multi-asterisks': 'off',
        // Keep `typed: true` from `plugin:jsdoc/recommended-typescript-error`; add tool-specific tags.
        'jsdoc/check-tag-names': ['error', {
          typed: true,
          definedTags: ['knipignore'],
        }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
      },
    },
    {
      files: ['**/config/*.ts'],
      rules: {
        'import-x/no-nodejs-modules': 'off',
        'no-console': 'off',
        'jsdoc/require-jsdoc': 'off',
        'import-x/no-extraneous-dependencies': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/require-await': 'off',
        'no-inner-declarations': 'off',
      },
    },
    {
      files: [
        'scripts/*.ts',
        'scripts/**/*.ts',
        'documentation/website/scripts/*.ts',
        'documentation/website/scripts/**/*.ts',
      ],
      rules: {
        '@typescript-eslint/require-await': 'off',
        'no-console': 'off',
        'import-x/no-nodejs-modules': 'off',
      },
    },
  )
}
