var webpack = require ('webpack');
var baseConfig = require("./webpack.base.config.js");

baseConfig.entry = ['webpack-hot-middleware/client', './app'];

baseConfig.output.publicPath = '/';

baseConfig.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

module.exports = baseConfig;