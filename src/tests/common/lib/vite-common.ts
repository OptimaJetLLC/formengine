import type {Plugin} from 'vite'

// must be imported by relative path only https://github.com/vitejs/vite/issues/5370

/**
 * Rewrite index file with different one
 * @param replacement location of replacement file
 * @returns undefined
 */
export const indexPlugin = (replacement: string): Plugin => ({
  name: 'indexReplacementPlugin',
  configureServer: (server) => {
    server.middlewares.use(
      (req, _res, next) => {
        if (req.url === '/') {
          req.url = replacement
        }
        next()
      }
    )
  }
})
