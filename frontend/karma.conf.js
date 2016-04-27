var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: [ 'Chrome' ], //run in Chrome
        singleRun: false, //just run once by default
        frameworks: [ 'mocha' ], //use the mocha test framework
        files: [
            'webpack.test.config.js' //just load this file
        ],
        preprocessors: {
            'webpack.test.config.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
        },
        reporters: [ 'dots' ], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' }
                ]
            }
        },
        webpackServer: {
            noInfo: false //please don't spam the console when running in karma!
        }
    });
};