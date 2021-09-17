const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        app: './index.ts'
    },
    target: 'web',
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [
        '@types/react',
        'optimajet-builder-component-api',
        'react',
        'rsuite'
    ],
    plugins: [
    ],
    devServer: {
        static: {
            directory: __dirname,
        }
    }
};
