const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { LECCION_TABLE } = require('./leccion.model');

const PROGRESO_TABLE = 'progresos';

const ProgresoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  completado: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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
  leccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'leccion_id',
    references: {
      model: LECCION_TABLE,
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

class Progreso extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.belongsTo(models.Leccion, {
      as: 'leccion', // Alias para acceder a la lección desde un progreso
      foreignKey: 'leccionId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROGRESO_TABLE,
      modelName: 'Progreso',
      timestamps: false
    }
  }
}

module.exports = { PROGRESO_TABLE, ProgresoSchema, Progreso };
