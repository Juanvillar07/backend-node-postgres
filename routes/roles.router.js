const express = require('express');

const RolService = require('../services/rol.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createRolSchema } = require('./../schemas/rol.schema');

const router = express.Router();
const service = new RolService();

router.get('/', async (req, res, next) => {
  try {
    const roles = await service.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createRolSchema), async (req, res, next) => {
  try {
    const body = req.body;
    const newRol = await service.create(body);
    res.status(201).json(newRol);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
