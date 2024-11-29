const Joi = require('joi');

const nombre = Joi.string();
const valor = Joi.number().integer();
const categoriaId = Joi.number().integer();

const createCursoSchema = Joi.object({
  nombre: nombre.required(),
  valor: valor.required(),
  categoriaId: categoriaId.required(),
});


module.exports = { createCursoSchema };
