import type {KnipConfig} from 'knip'

const config: KnipConfig = {
  vite: {
    config: ['vite.config.{js,mjs,ts,cjs,mts,cts}', '**/*.vite.config.ts'],
  },
  vitest: true,
  typescript: true,
  tags: ['-knipignore'],
  ignoreWorkspaces: ['documentation/**', 'scripts/**'],
  ignore: [
    'knip.config.ts'
  ],
}

export default config
