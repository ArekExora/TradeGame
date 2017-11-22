var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: './app',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js']
    }
};