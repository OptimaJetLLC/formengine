import path from 'node:path'
import type {Plugin, UserConfig} from 'vite'

// must be imported by relative path only https://github.com/vitejs/vite/issues/5370

/**
 * Rewrite index file with different one
 * @param replacement location of replacement file
 * @returns undefined
 */
export const indexPlugin = (replacement: string): Plugin => ({
  name: 'indexReplacementPlugin',
  configureServer: server => {
    server.middlewares.use((req, _res, next) => {
      const url = req.url ?? ''
      if (url === '/' || url.startsWith('/?')) {
        req.url = `${replacement}${url.slice(1)}`
      }
      next()
    })
  },
})

/**
 * Pin react, react-dom, and scheduler to a test package's local node_modules.
 * Used by react-18/19 test hosts so Vitest does not resolve a different React version.
 * @param dirname absolute path of the test package directory
 * @returns resolve config with react aliases
 * @see https://github.com/facebook/react/issues/13991
 */
export function reactVersionAliases(dirname: string): NonNullable<UserConfig['resolve']> {
  return {
    alias: {
      react: path.resolve(dirname, 'node_modules/react'),
      'react-dom': path.resolve(dirname, 'node_modules/react-dom'),
      scheduler: path.resolve(dirname, 'node_modules/scheduler'),
    },
  }
}

/**
 * Server config so nested test packages can read files outside their directory.
 */
export const monorepoServerConfig: UserConfig['server'] = {
  fs: {
    strict: false,
    allow: ['..'],
  },
}
