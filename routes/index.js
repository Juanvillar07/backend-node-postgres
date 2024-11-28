const express = require('express');

const userRouter = require('./users.router');
const rolRouter = require('./roles.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', userRouter)
    router.use('/roles', rolRouter)
}

module.exports = routerApi;
