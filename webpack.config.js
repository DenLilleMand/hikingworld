var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        application: './src/client/js/application/index.js',
        registration: './src/client/js/registration/registration.js'
    },
    output: {
        path: path.join(__dirname, 'static/'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].js'
    },
    module: {
        loaders: [{
            test:/\.(js|jsx)$/,
            loader: 'babel'
        }, {
            test:/\.json$/,
            loaders:['json-loader']
        }, {
            test:/\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }, {
            test:/\.(png|jpg)$/,
            loader:'url?limit=25000'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.(woff|woff2)/,
            loader:"url?prefix=font/&limit=5000"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css', {
           allChunks:true
        })
    ]
};


