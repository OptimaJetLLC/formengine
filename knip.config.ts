import type {KnipConfig} from 'knip'

const config: KnipConfig = {
  vite: true,
  vitest: true,
  typescript: true,
  tags: ['-knipignore'],
  ignoreWorkspaces: ['documentation/**', 'scripts/**'],
  ignore: [
    'knip.config.ts'
  ],
}

export default config
