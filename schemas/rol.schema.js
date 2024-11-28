const Joi = require('joi');

const nombre = Joi.string();

const createRolSchema = Joi.object({
  nombre: nombre.required(),
});

module.exports = { createRolSchema };
