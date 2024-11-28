'use strict';

const { CategoriaSchema,CATEGORIA_TABLE } = require('./../models/categoria.model');
const { CursoSchema,CURSO_TABLE } = require('./../models/curso.model');
const { InscripcionSchema, INSCRIPCION_TABLE } = require('./../models/inscripcion.model');
const { InventarioSchema, INVENTARIO_TABLE } = require('./../models/inventario.model');
const { LeccionSchema, LECCION_TABLE } = require('./../models/leccion.model');
const { ProgresoSchema, PROGRESO_TABLE } = require('./../models/progreso.model');
const { RolSchema, ROL_TABLE } = require('./../models/role.model');
const { UserSchema, USER_TABLE } = require('./../models/user.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROL_TABLE, RolSchema);
    await queryInterface.createTable(CATEGORIA_TABLE, CategoriaSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CURSO_TABLE, CursoSchema);
    await queryInterface.createTable(INSCRIPCION_TABLE, InscripcionSchema);
    await queryInterface.createTable(INVENTARIO_TABLE, InventarioSchema);
    await queryInterface.createTable(LECCION_TABLE, LeccionSchema);
    await queryInterface.createTable(PROGRESO_TABLE, ProgresoSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ROL_TABLE);
    await queryInterface.dropTable(PROGRESO_TABLE);
    await queryInterface.dropTable(LECCION_TABLE);
    await queryInterface.dropTable(INVENTARIO_TABLE);
    await queryInterface.dropTable(INSCRIPCION_TABLE);
    await queryInterface.dropTable(CURSO_TABLE);
    await queryInterface.dropTable(CATEGORIA_TABLE);
  }
};
