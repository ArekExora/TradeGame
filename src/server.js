import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.dev.config.js';

const DEFAULT_PORT = 5000;
const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_FILE = path.join(DIST_DIR, 'index.html');
const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';
const compiler = webpack(config);

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
    app.get('/', function(request, response, next) {
        compiler.outputFileSystem.readFile(INDEX_FILE, function(error, result) {
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
    app.get('/', function(request, response) {
        response.sendFile(INDEX_FILE);
    });
}

//Start listening.
app.listen(app.get('port'), function(error) {
    console.log('Running ' + (isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION') + ' server on port ' + app.get('port'));
});
