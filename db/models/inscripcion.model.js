const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { CURSO_TABLE } = require('./curso.model');

const INSCRIPCION_TABLE = 'inscripciones';

const InscripcionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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

class Inscripcion extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.hasOne(models.Inventario, {
      as: 'inventario',
      foreignKey: 'inscripcionId', // Nueva clave foránea en Inventario
    });

    this.belongsTo(models.Curso, {
      as: 'curso',
      foreignKey: 'cursoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSCRIPCION_TABLE,
      modelName: 'Inscripcion',
      timestamps: false
    }
  }
}

module.exports = { INSCRIPCION_TABLE, InscripcionSchema, Inscripcion };
