import {defineConfig} from '@rsbuild/core'
import {pluginReact} from '@rsbuild/plugin-react'

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      main: {
        import: ['./src/main.tsx'],
        library: {
          type: 'module'
        },
        html: false,
      },
      lite: {
        import: ['./src/lite.tsx'],
        library: {
          type: 'module'
        },
        html: false,
      },
    },
  },
  output: {
    externals: ['react', 'react-dom', 'react-is'],
    filename: {
      js: '[name].bundle.js',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  tools: {
    rspack: {
      output: {
        module: true
      }
    }
  }
})
