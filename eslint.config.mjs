import {createFormEngineEslintConfig} from './eslint.base.mjs'

export default [
  {
    // Mirror legacy `.eslintignore` gitignore semantics (unprefixed names match in any directory).
    ignores: [
      '**/vite.config.ts',
      '**/vite.ssl.config.ts',
      '**/types/',
      '**/dist/',
      'documentation/',
      'designer-guide/',
      '**/scripts/',
      'examples/',
      'tests/',
      '**/*.d.ts',
      '**/*.mjs',
    ],
  },
  ...createFormEngineEslintConfig({
    tsconfigRootDir: import.meta.dirname,
    project: './tsconfig.json',
  }),
]
