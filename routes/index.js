const express = require('express');

const userRouter = require('./users.router');
const rolRouter = require('./roles.router');
const authRouter = require('./auth.router');
const cursoRouter = require('./curso.router');
const categoriaRouter = require('./categorias.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter)
    router.use('/users', userRouter)
    router.use('/roles', rolRouter)
    router.use('/cursos', cursoRouter)
    router.use('/categorias', categoriaRouter)
}

module.exports = routerApi;
