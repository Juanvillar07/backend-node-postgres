const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');
const { createUserSchema } = require('../schemas/user.schema');
const validationHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new AuthService();


router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/register',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const result = await service.register(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
