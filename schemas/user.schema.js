const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const nombre = Joi.string();
const username = Joi.string().min(5).max(20);
const clave = Joi.string().min(8);
const rolId = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  nombre: nombre.required(),
  username: username.required(),
  clave: clave.required(),
  rolId: rolId,
});

const updateUserSchema = Joi.object({
  email: email,
  rolId: rolId,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
