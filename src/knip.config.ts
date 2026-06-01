import type {KnipConfig} from 'knip'

const config: KnipConfig = {
  vite: false,
  vitest: true,
  typescript: true,
  tags: ['-knipignore'],
  ignore: [
    'knip.config.ts'
  ],
}

export default config
