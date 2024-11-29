const express = require('express');
const passport = require('passport');

const CursoService = require('../services/curso.service');

const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createCursoSchema } = require('./../schemas/curso.schema');

const router = express.Router();
const service = new CursoService();

router.get('/', async (req, res, next) => {
  try {
    const cursos = await service.find();
    res.json(cursos);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(createCursoSchema),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCurso = await service.create(body);
      res.status(201).json(newCurso);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
