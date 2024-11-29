const express = require('express');
const passport = require('passport');

const CategoriaService = require('./../services/categoria.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategoriaSchema } = require('./../schemas/categoria.schema');
const { checkRoles } = require('./../middlewares/auth.handler');
const { verifyToken } = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new CategoriaService();


router.get(
  '/',
  async (req, res, next) => {
    try {
      const categorias = await service.find();
      res.json(categorias);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(createCategoriaSchema), async (req, res, next) => {
  try {
    const body = req.body;
    const newCategoria = await service.create(body);
    res.status(201).json(newCategoria);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  verifyToken,
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria = await service.findOne(id);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
