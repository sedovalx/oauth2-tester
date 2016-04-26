var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'bootstrap-loader/extractStyles',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks(module, count) {
                return (
                    module.resource &&
                    module.resource.indexOf(path.resolve('node_modules')) === 0
                )
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Boot React',
            template: path.join(__dirname, 'assets/index-template.html'),
            favicon: 'assets/oauth-2-sm.png'
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    resolve: {
        extensions: ['', '.js'],
        root: path.join(__dirname, 'src')
    },
    module: {
        preLoaders: [
            {
                test: /\.css$/,
                loader: 'stripcomment'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.json/,
                loaders: ['json-loader']
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file'
            },
            // Bootstrap 3
            { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
        ]
    }
};