import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'
import {analyzer} from 'vite-bundle-analyzer'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({command}) => ({
  plugins: [
    analyzer({
      analyzerMode: 'static',
      summary: true
    }),
    react({jsxImportSource: '@emotion/react'}),
    svgr({
      include: '**/*.svg',
    })
  ],
  define: {
    'process.env.WDYR': `"${process.env.WDYR ? '1' : ''}"`
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
}))
