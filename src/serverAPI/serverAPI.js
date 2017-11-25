'use strict';

import express from 'express';

const apiRouter = express.Router();
apiRouter.get('/', function (request, response) {
    response.json({ message: 'I am alive !!' });
});
apiRouter.get('/:num', function (request, response) {
    response.json({ message: 'Sigo aqui !!', code: request.params.num });
});

module.exports = apiRouter;
