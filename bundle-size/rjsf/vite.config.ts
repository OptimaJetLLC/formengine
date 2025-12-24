import react from '@vitejs/plugin-react-swc'
import {mergeConfig} from 'vite'

import bundleSizeBase from '../vite.config'

export default mergeConfig(bundleSizeBase, {
  plugins: [react()],
})
