import {defineConfig} from '@rsbuild/core'
import {pluginReact} from '@rsbuild/plugin-react'

const cspDirectives = [
  'default-src \'self\'',
  'script-src \'self\' \'unsafe-eval\'',
  'style-src \'self\' \'unsafe-inline\'',
  'img-src \'self\' data:',
  'font-src \'self\';',
  'object-src \'none\'',
  'base-uri \'self\'',
  'form-action \'self\'',
].join('; ')

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    headers: {
      'Content-Security-Policy': cspDirectives,
    },
  },
  html: {
    meta: {
      'Content-Security-Policy': {
        'http-equiv': 'Content-Security-Policy',
        content: cspDirectives,
      },
    },
  },
})
