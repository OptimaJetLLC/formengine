import type {KnipConfig} from 'knip'

const config: KnipConfig = {
  vite: false,
  vitest: true,
  typescript: true,
  tags: ['-knipignore'],
  ignore: [
    'knip.config.ts',
    '**/index.ts',
    '**/index-lite.ts',
    '**/*.config.ts',
    '**/view.ts',
    'packages/**/config/**',
  ],
}

export default config
