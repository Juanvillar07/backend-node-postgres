const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.clave);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.clave;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.rolId,
    };

    const options = {
      expiresIn: '5m' // Expiración en 1 hora
    };

    const token = jwt.sign(payload, config.jwtSecret, options);
    return {
      user,
      token,
    };
  }

  async register(data) {
    const { correo, clave, ...rest } = data;

    if (clave !== data.confirmClave) {
      throw boom.badRequest('Las contraseñas no coinciden');
    }

    const existingUser = await service.findByEmail(correo);
    if (existingUser) {
      throw boom.conflict('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(clave, 10);

    const newUser = await service.create({
      ...rest,
      correo,
      clave: hashedPassword,
      rolId: 1
    });

    return this.signToken(newUser);
  }


}

module.exports = AuthService;
