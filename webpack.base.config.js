var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: './index',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
            exclude: /node_modules/
        }]
    },

    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    }
};
