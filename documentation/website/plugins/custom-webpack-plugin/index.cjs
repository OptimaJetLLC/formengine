const path = require('node:path')

/**
 * Resolves a file under an installed package, bypassing package "exports".
 * @param packageJsonId package.json require id (for example '@mui/x-date-pickers/package.json')
 * @param relativeFile path under the package root
 * @returns absolute file path
 */
function packageFile(packageJsonId, relativeFile) {
  return path.join(path.dirname(require.resolve(packageJsonId)), relativeFile)
}

module.exports = function () {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            // Rspack (Docusaurus future.faster) resolves AdapterDayjs to
            // ./AdapterDayjs/index.js, which MUI X v9 does not export.
            '@mui/x-date-pickers/AdapterDayjs': packageFile(
              '@mui/x-date-pickers/package.json',
              'AdapterDayjs/index.mjs'
            ),
          },
        },
      }
    },
  }
}
