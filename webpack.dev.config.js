var webpack = require ('webpack');
var baseConfig = require("./webpack.base.config.js");

baseConfig.entry = [
    '@babel/polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './index'
];

baseConfig.output.publicPath = '/';

baseConfig.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

module.exports = baseConfig;
