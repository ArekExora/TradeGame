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
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    }
};
