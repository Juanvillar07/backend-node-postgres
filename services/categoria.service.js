const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoriaService {
  async create(categoria) {
    const { idCategoriaPadre } = categoria;

    if (idCategoriaPadre) {
      const categoriaPadre = await models.Categoria.findByPk(idCategoriaPadre);
      if (!categoriaPadre) {
        throw boom.badRequest('CategoriaPadreId does not exist');
      }
    }
    const newCategoria = await models.Categoria.create({
      ...categoria,
      IdCategoriaPadre: idCategoriaPadre || null, // Asegurar que se guarde `null` si no hay padre
    });

    return newCategoria;
  }

  async find() {
    const rta = await models.Categoria.findAll();
    return rta;
  }

  async findOne(id) {
    const categoria = await models.Categoria.findByPk(id);
    if (!categoria) {
      throw boom.notFound('User not found');
    }
    return categoria;
  }
}

module.exports = CategoriaService;
