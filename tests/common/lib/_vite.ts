// eslint-disable-next-line
import {PluginOption, ViteDevServer} from 'vite'

/**
 * Rewrite index file with different one
 * @param replacement location of replacement file
 */
export const indexPlugin = (replacement: string): PluginOption => ({
  name: 'indexReplacementPlugin',
  configureServer: (server: ViteDevServer) => {
    server.middlewares.use(
      (req, res, next) => {
        console.log(req.url)
        if (req.url === '/') {
          req.url = '/viewer.html'
        }
      }
    )
  }
})
