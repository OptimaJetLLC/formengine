/**
 * Rewrite index file with different one
 * @param replacement location of replacement file
 */
export const indexPlugin = (replacement) => ({
  name: 'indexReplacementPlugin',
  configureServer: (server) => {
    server.middlewares.use(
      (req, res, next) => {
        if (req.url === '/') {
          req.url = replacement
        }
        next()
      }
    )
  }
})
