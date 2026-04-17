const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add Monaco Editor webpack plugin
      webpackConfig.plugins.push(
        new MonacoEditorWebpackPlugin({
          languages: ['json', 'css', 'html', 'typescript', 'javascript'],
        }),
      )

      return webpackConfig
    },
  },
  devServer: (devServerConfig) => {
    return devServerConfig
  },
}
