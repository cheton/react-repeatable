const path = require('path');
const findImports = require('find-imports');
const webpack = require('webpack');
const pkg = require('./package.json');
const babelConfig = require('./babel.config');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        [pkg.name]: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    externals: []
        .concat(findImports(['src/**/*.{js,jsx}'], { flatten: true }))
        .concat(Object.keys(pkg.peerDependencies))
        .concat(Object.keys(pkg.dependencies)),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: babelConfig
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify('production')
            }
        }),
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
};
