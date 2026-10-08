import path from 'node:path'
import {fileURLToPath} from 'node:url'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import {defineConfig, mergeConfig} from 'vite'
import base from '../../../vite.config'
import {libDts} from '../../../vite-plugin-api-extractor.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// The public API exposes google.maps types, so the reference must survive into the rolled-up declarations.
// vite-plugin-dts drops triple-slash directives while rewriting imports, therefore it is re-added here.
const googleMapsTypesReference = '/// <reference types="google.maps" />'

export default defineConfig(env =>
  mergeConfig(base(env), {
    plugins: [
      libDts({
        beforeWriteFile(filePath, content) {
          const needsGoogleMapsTypes = filePath.endsWith('.d.ts') && content.includes('google.maps')
          if (!needsGoogleMapsTypes || content.startsWith(googleMapsTypesReference)) {
            return {filePath, content}
          }

          return {filePath, content: `${googleMapsTypesReference}\n${content}`}
        },
      }),
    ],
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
        fileName: 'index',
        cssFileName: 'assets/styles',
      },
      rollupOptions: {
        plugins: [excludeDependenciesFromBundle({dependencies: true, peerDependencies: true})],
      },
    },
  })
)
