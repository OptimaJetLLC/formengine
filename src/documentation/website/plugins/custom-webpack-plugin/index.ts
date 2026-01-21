const path = require('path');

module.exports = function () {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(_config, isServer, utils) {
      return {
        resolve: {
          alias: {
            'react': path.resolve(__dirname, '../../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
          },
          // Vega requires these Node.js polyfills to be set to false for browser builds
          fallback: {
            fs: false,
            path: false,
            crypto: false,
          },
        },
      }
    },
  }
}
