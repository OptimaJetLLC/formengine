const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = (isDevBuild, isWebBuild) => {
    const plugins = [
        '@babel/plugin-proposal-class-properties'
    ];
   
    return {
        module: {
            rules: [
                {
                    test: /.(js|jsx)?$/, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: plugins,
                        }
                    }
                },
                { test: /\.scss$/, use: 'style-loader!css-loader!sass-loader' }
            ]
        },
        devtool: 'inline-source-map',
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,                    
                })
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss']
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ],
        externals: [
            'clone',
            'deepmerge',
            'json5',
            'moment',
            'numeral',
            'react',
            'react-dom',
            'react-fast-compare',
            'react-native',
            'react-native-autocomplete-input',
            'react-native-elements',
            'react-native-sectioned-multi-select',
            'react-native-slick',
            'react-native-vector-icons',
            'react-native-web',
            'react-native-webview',
            'react-number-format',
            'react-scripts',
            'reflux',
            'uuid',
            'react-native-render-html',
            '@eva-design/eva',
            '@ui-kitten/components',
            '@ui-kitten/eva-icons',
            'react-native-web-hooks',
            'react-native-modal-datetime-picker',
            '@react-native-community/datetimepicker'
        ],
    };
};


const configReactNativeWeb = (isDevBuild) => {
    return {
        resolve: {
            alias: {
              'react-native$': 'react-native-web',
              'react-native-svg': 'react-native-svg-web'
            }
        },
        module: {
            rules: [
                {
                    test: /.(js|jsx|ts|tsx)?$/, 
                    exclude: [
                        /\.json$/
                    ],
                    include: [
                        path.resolve(__dirname, '/'),
                        path.resolve(__dirname, 'node_modules', 'react-native-web'),
                        path.resolve(__dirname, 'node_modules', 'react-native-elements'),
                        path.resolve(__dirname, 'node_modules', 'react-native-ratings'),
                        path.resolve(__dirname, 'node_modules', 'react-native-autocomplete-input'),
                        path.resolve(__dirname, 'node_modules', 'react-native-sectioned-multi-select'),
                        path.resolve(__dirname, 'node_modules', 'react-native-slick'),
                        path.resolve(__dirname, 'node_modules', 'react-native-webview'),
                        path.resolve(__dirname, 'node_modules', 'react-native-render-html'),
                        path.resolve(__dirname, 'node_modules', 'react-native-web-hooks'),
                        path.resolve(__dirname, 'node_modules', '@ui-kitten'),
                        path.resolve(__dirname, 'node_modules', '@ui-kitten', 'eva-icons'),
                        path.resolve(__dirname, 'node_modules', '@eva-design', 'eva'),
                        path.resolve(__dirname, 'node_modules', 'react-native-vector-icons'),
                        path.resolve(__dirname, 'node_modules', 'react-native-modal-datetime-picker '),
                        path.resolve(__dirname, 'node_modules', '@react-native-community/datetimepicker')
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                ['react-native-web', { commonjs: true }]                                
                            ]
                        }                           
                    }
                },
                {
                    test: /\.(gif|jpe?g|png|svg)$/,
                    use: {
                      loader: 'url-loader',
                      options: {
                        name: '[name].[ext]'
                      }
                    }
                }
            ],
        }
    };
};

module.exports = (env) => {
    const isDevBuild = !(env ? env.prod : process.env && process.env.NODE_ENV === 'production');

    return [
        Object.assign({}, config(isDevBuild, true), {
            name: 'optimajet-mobile-builder',
            entry: './index.js',
            mode: isDevBuild ? 'development' : 'production',
            output: {
                filename: 'optimajet-mobile-builder.js',
                path: __dirname + '/build',
                library: 'optimajet-mobile-builder',
                libraryTarget: 'umd'
            },
        }),

        Object.assign({}, config(isDevBuild, false), {
            name: 'optimajet-mobile-form',
            entry: './form.js',
            mode: isDevBuild ? 'development' : 'production',
            output: {
                filename: 'optimajet-mobile-form.js',
                path: __dirname + '/build',
                library: 'optimajet-mobile-nform',
                libraryTarget: 'umd'
            },
        }),
        Object.assign({}, configReactNativeWeb(isDevBuild), {
            name: 'optimajet-mobile-web',
            entry: ["@babel/polyfill", "./index.web.js"],
            mode: isDevBuild ? 'development' : 'production',
            output: {
                filename: 'optimajet-mobile-web.js',
                path: __dirname + '/build',
                library: 'optimajet-mobile-web',
                libraryTarget: 'umd'
            }
        })
    ];
};
