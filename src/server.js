'use strict';

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import http from 'http';
import sockets from 'socket.io';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.dev.config.js';

import apiRouter from './serverAPI/serverAPI';

const DEFAULT_PORT = 5500;
const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_FILE = path.join(DIST_DIR, 'index.html');
const app = express();
const server = http.createServer(app);
const io = sockets(server);
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
    app.get('/', (request, response, next) => {
        compiler.outputFileSystem.readFile(INDEX_FILE, (error, result) => {
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
    app.get('/', (request, response) => {
        response.sendFile(INDEX_FILE);
    });
}

app.use('/API', apiRouter);
app.use(express.static('static'));

let count = 0;
io.on('connection', (socket) => {
    count++;

    io.emit('news', { msg: 'One more person is online', count: count });
    socket.emit('private', { msg: 'Welcome you are the ' + count + ' person here' });

    socket.on('private', (data) => {
        console.log('In private', data);
    });

    socket.on('chat', (msg) => {
        console.log('chat: ', msg);
        io.emit('chat', msg);
    });

    socket.on('disconnect', () => {
        count--;
        io.emit('news', { msg: 'Someone went home', count: count });
    });
});

//Start listening.
server.listen(app.get('port'), (error) => {
    console.log('Running ' + (isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION') + ' server on port ' + app.get('port'));
});
