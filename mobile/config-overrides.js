const path = require('path');
const { override, addBabelPlugins, addBabelPresets, babelInclude, disableChunk, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    ...addBabelPresets(
        [
            '@babel/preset-env', 
            {
                modules: 'commonjs'
            }
        ],
        '@babel/preset-react'
    ),
    ...addBabelPlugins(
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-throw-expressions',
        ['react-native-web', { commonjs: true }],
    ),
    //For icons
    // addWebpackModuleRule(
    //     {
    //         test: /\.ttf$/,
    //         loader: 'file-loader',
    //         include: path.resolve(__dirname, './static/media/[name].[ext]'),
    //     }
    // ),
    babelInclude([
        path.resolve(__dirname, 'node_modules/react-native-elements'),
        path.resolve(__dirname, 'node_modules/react-native-ratings'),
        path.resolve(__dirname, 'node_modules/react-native-sectioned-multi-select'),
        path.resolve(__dirname, 'node_modules/react-native-autocomplete-input'),
        path.resolve(__dirname, 'node_modules/react-native-slick'),
        path.resolve(__dirname, 'node_modules/react-native-web'),
        path.resolve(__dirname, 'node_modules/react-native-render-html'),
        path.resolve(__dirname, 'node_modules/react-native-svg'),        
        path.resolve(__dirname, 'node_modules/@eva-design/eva'),
        path.resolve(__dirname, 'node_modules/@ui-kitten/components'),
        path.resolve(__dirname, 'node_modules/@ui-kitten/eva-icons'),
        path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        path.resolve(__dirname, 'node_modules/react-native-modal-datetime-picker'),   
        path.resolve(__dirname, 'node_modules/@react-native-community/datetimepicker'),   
        path.resolve(__dirname, '../shared'),
        path.resolve(__dirname, 'src'),
    ]),
    // disableChunk() todo uncomment
);
