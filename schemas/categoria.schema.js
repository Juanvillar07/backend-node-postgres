const Joi = require('joi');

const nombre = Joi.string();
const CategoriaPadreId = Joi.number().integer();

const createCategoriaSchema = Joi.object({
  nombre: nombre.required(),
  idCategoriaPadre: CategoriaPadreId,
});


module.exports = { createCategoriaSchema };
