const webpack = require('webpack');
const config = isDevBuild => {
    return {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /.jsx?$/, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        }
                    }
                },
                {test: /\.scss$/, use: 'style-loader!css-loader!sass-loader'}
            ]
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss']
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            })
        ],
        externals: [
            '@types/isomorphic-fetch',
            '@types/numeral',
            'abortcontroller-polyfill',
            'clone',
            'isomorphic-fetch',
            'json5',
            'moment',
            'numeral',
            'react',
            'react-fast-compare',
            'reflux',
            'uuid'
        ],
    }
};

module.exports = (env) => {
    const isDevBuild = !(env ? env.prod : process.env && process.env.NODE_ENV === 'production');

    return [
        Object.assign({}, config(isDevBuild), {
            name: 'optimajet-builder-shared',
            entry: './index.js',
            mode: isDevBuild ? 'development' : 'production',
            output: {
                filename: 'optimajet-builder-shared.js',
                path: __dirname + '/build',
                library: 'optimajet-builder-shared',
                libraryTarget: 'umd'
            },
        }),
    ];
};
