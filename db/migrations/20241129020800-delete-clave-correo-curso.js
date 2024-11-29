'use strict';

const { CURSO_TABLE } = require('../models/curso.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn(CURSO_TABLE, 'correo');
    await queryInterface.removeColumn(CURSO_TABLE, 'clave');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(CURSO_TABLE, 'correo', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.addColumn(CURSO_TABLE, 'clave', {
      allowNull: false,
      type: Sequelize.STRING,
    });
  }
};
