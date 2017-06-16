const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.(js|jsx)$/,
            loader: 'babel'
        },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     output: { comments: false },
        //     sourcemap: false,
        //     minimize: false,
        //     mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] },
        // }),
        new ExtractTextPlugin('src/public/stylesheets/app.css', {
            allChunks: true
        }),
        new BrowserSyncPlugin(
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3001,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                proxy: 'http://localhost:8080/'
            },
            {
                reload: false
            }
        )
    ]
};

module.exports = config;