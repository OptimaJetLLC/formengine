const webpack = require('webpack');

var config = {
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: '/node_modules/'
        },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          sourceMaps: true,
          cacheDirectory: true,
          presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-throw-expressions",
            "babel-plugin-react-scoped-css"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          // You have to put it after `css-loader` and before any `pre-precessing loader`
          { loader: 'scoped-css-loader' },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: {
          loader: "style-loader!css-loader!sass-loader"
        }
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss', '.less']
  },
  plugins: [
    new webpack.EnvironmentPlugin({RUN_ENV: 'none'})
  ]
};

var appConfig = Object.assign({}, config, {
    name: "app",
    entry: './index.js',
    output: {
      filename: 'optimajet-builder.js',
      path: __dirname + "/build"
    },
    externals: [
        'clone',
        'draft-convert',
        'draft-js',
        'jquery',
        'json5',
        'moment',
        'numeral',
        'react',
        'react-dom',
        'react-dropzone-component',
        'react-fast-compare',
        'react-number-format',
        'react-slick',
        'react-split',
        'reflux',
        'semantic-ui-react',
        'uuid',
        'rsuite'
    ]
  });

var wrapperConfig = Object.assign({}, config, {
    name: "app",
    entry: ["babel-polyfill", "./javascript-wrapper.js"],
    output: {
        filename: 'optimajet-formbuilder-javascript.js',
        path: __dirname + "/build"
    }
});

var builderBasicConfig = Object.assign({}, config, {
  name: "app",
  entry: ["babel-polyfill", "./builder-basic.js"],
  output: {
      filename: 'builder-basic.js',
      path: __dirname + "/build"
  }
});

var builderCustomConfig = Object.assign({}, config, {
  name: "app",
  entry: ["babel-polyfill", "./builder-custom.js"],
  output: {
      filename: 'builder-custom.js',
      path: __dirname + "/build"
  }
});

var formBasicConfig = Object.assign({}, config, {
  name: "app",
  entry: ["babel-polyfill", "./form-basic.js"],
  output: {
      filename: 'form-basic.js',
      path: __dirname + "/build"
  }
});

var formCustomConfig = Object.assign({}, config, {
  name: "app",
  entry: ["babel-polyfill", "./form-custom.js"],
  output: {
      filename: 'form-custom.js',
      path: __dirname + "/build"
  }
});

var modules = [
  appConfig, builderBasicConfig, builderCustomConfig, formBasicConfig, formCustomConfig,
  wrapperConfig
];

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        appConfig.devtool = 'eval-source-map';
        return modules;
    } else {
        appConfig.target = ['web', 'es5'];
        wrapperConfig.target = ['web', 'es5'];
        return modules;
    }
};
