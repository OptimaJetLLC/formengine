import react from '@vitejs/plugin-react'
import {mergeConfig} from 'vite'
import base from '../vite.config.ts'

export default mergeConfig(base, {
  plugins: [react()],
  resolve: {
    dedupe: ['react-is'], // MUI
    alias: {
      lodash: 'lodash-es',
    },
  },
})
