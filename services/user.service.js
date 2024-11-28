const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(user) {

    const hashedPassword = await bcrypt.hash(user.clave, 10);
    user.clave = hashedPassword;

    const newUser = await models.User.create(user);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { correo: email },
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
}

module.exports = UserService;
