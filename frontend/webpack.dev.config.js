var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'bootstrap-loader',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'OAuth 2.0 tester (DEV)',
            template: path.join(__dirname, 'assets/index-template.html')
        })
    ],
    resolve: {
        extensions: ['', '.js'],
        root: path.join(__dirname, 'src')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?cacheDirectory'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.json/,
                loaders: ['json-loader']
            },
            { test: /\.css$/, loaders: [ 'style', 'css' ] },
            { test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
            },
            // Bootstrap 3
            { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' }
        ]
    }
};