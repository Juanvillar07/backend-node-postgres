const { Categoria, CategoriaSchema } = require('./categoria.model');
const { User, UserSchema } = require('./user.model')
const { Inscripcion, InscripcionSchema } = require('./inscripcion.model')
const { Progreso, ProgresoSchema } = require('./progreso.model')
const { Inventario, InventarioSchema } = require('./inventario.model')
const { Leccion, LeccionSchema } = require('./leccion.model')
const { Curso, CursoSchema } = require('./curso.model')
const { Rol, RolSchema } = require('./role.model')

function setupModels(sequelize) {
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Inscripcion.init(InscripcionSchema, Inscripcion.config(sequelize));
  Progreso.init(ProgresoSchema, Progreso.config(sequelize));
  Inventario.init(InventarioSchema, Inventario.config(sequelize));
  Curso.init(CursoSchema, Curso.config(sequelize));
  Rol.init(RolSchema, Rol.config(sequelize));
  Leccion.init(LeccionSchema, Leccion.config(sequelize));

  Categoria.associate(sequelize.models);
  User.associate(sequelize.models);
  Inscripcion.associate(sequelize.models);
  Progreso.associate(sequelize.models);
  Inventario.associate(sequelize.models);
  Curso.associate(sequelize.models);
  Rol.associate(sequelize.models);
  Leccion.associate(sequelize.models);
}

module.exports = setupModels;
