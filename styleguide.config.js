const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const webpackConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'docs'),
    },
    entry: path.resolve(__dirname, 'src/index.js'),
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
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
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

module.exports = {
    title: `React Component v${pkg.version}`,
    sections: [
        {
            name: 'Repeatable',
            content: path.resolve(__dirname, 'styleguide/examples/README.md'),
        }
    ],
    require: [
        '@babel/polyfill',
        path.resolve(__dirname, 'styleguide/setup.js'),
        path.resolve(__dirname, 'styleguide/styles.css'),
    ],
    ribbon: {
        url: pkg.homepage,
        text: 'Fork me on GitHub'
    },
    serverPort: 8080,
    exampleMode: 'collapse',
    usageMode: 'expand',
    showSidebar: true,
    styleguideComponents: {
        StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuideRenderer.jsx'),
        Wrapper: path.join(__dirname, 'styleguide/components/Wrapper.jsx'),
    },
    styleguideDir: 'docs/',
    webpackConfig: webpackConfig
};
