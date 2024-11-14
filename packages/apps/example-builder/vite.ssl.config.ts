import svgr from 'vite-plugin-svgr'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'

import base from '../../../vite.config'

export default defineConfig(({command}) => ({
  ...base,
  plugins: [
    react({jsxImportSource: '@emotion/react'}),
    svgr({
      include: '**/*.svg?react',
    }),
    basicSsl({
      /** name of certification */
      name: 'test',
      /** custom trust domains */
      domains: ['*.custom.com'],
      /** custom certification directory */
      certDir: '.devServer/cert'
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
}))
