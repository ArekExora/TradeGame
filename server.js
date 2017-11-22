var express = require ('express');
var webpack = require ('webpack');
var path = require ('path');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.dev.config.js');

var DEFAULT_PORT = 5000;
var DIST_DIR = path.join(__dirname, 'dist');
var INDEX_FILE = path.join(DIST_DIR, 'index.html');
var app = express();
var isDevelopment = process.env.NODE_ENV !== 'production';
var compiler = webpack(config);

//Set the port to use.
app.set('port', process.env.PORT || DEFAULT_PORT);

if (isDevelopment) {
    //Use webpack middleware and allow hot module reloads.
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));

    //Read the index file from memory and send it to the user (gives control to the client app).
    app.get('/', function (request, response) {
        compiler.outputFileSystem.readFile(INDEX_FILE, function (error, result) {
            if (error) {
                return next(error);
            }
            response.set('content-type', 'text/html');
            response.send(result);
            response.end();
        });
    });
} else {
    //Expose the distribution dir as static.
    app.use(express.static(DIST_DIR));

    //Send the index file to the user (gives control to the client app).
    app.get('/', function (request, response) {
        response.sendFile(HTML_FILE);
    });
}

//Start listening.
app.listen(app.get('port'), function(error){
    console.log('Running ' + (isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION') + ' server on port ' + app.get('port'));
});