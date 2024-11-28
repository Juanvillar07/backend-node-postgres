const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class RolService {
  constructor() {}

  async create(rol) {
    const newRol = await models.Rol.create(rol);
    return newRol;
  }

  async find() {
    const rta = await models.Rol.findAll();
    return rta;
  }

  async findOne(id) {
    const rol = await models.Rol.findByPk(id);
    if (!rol) {
      throw boom.notFound('User not found');
    }
    return rol;
  }
}

module.exports = RolService;
