const { Model, DataTypes, Sequelize } = require('sequelize');

const { CURSO_TABLE } = require('./curso.model');

const LECCION_TABLE = 'lecciones';

const LeccionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  contenido: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  cursoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'curso_id',
    references: {
      model: CURSO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

}

class Leccion extends Model {
  static associate(models) {
    this.hasMany(models.Progreso, {
      as: 'progresos', // Alias para acceder a los progresos desde una lección
      foreignKey: 'leccionId', // Clave foránea en la tabla Progreso
    });

    this.belongsTo(models.Curso, {
      as: 'curso',
      foreignKey: 'cursoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LECCION_TABLE,
      modelName: 'Leccion',
      timestamps: false
    }
  }
}

module.exports = { LECCION_TABLE, LeccionSchema, Leccion };
