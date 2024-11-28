const { Model, DataTypes, Sequelize } = require('sequelize');

const { CURSO_TABLE } = require('./curso.model');
const { USER_TABLE } = require('./user.model');
const { INSCRIPCION_TABLE } = require('./inscripcion.model');

const INVENTARIO_TABLE = 'inventarios';

const InventarioSchema = {
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
  inscripcionId: {
    allowNull: true, // Opcional para cursos gratuitos
    type: DataTypes.INTEGER,
    field: 'inscripcion_id',
    references: {
      model: INSCRIPCION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  valorPago: {
    allowNull: false, // 0 para cursos gratuitos
    type: DataTypes.INTEGER,
    field: 'valor_pago',
  },
  estado: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

}

class Inventario extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.belongsTo(models.Inscripcion, {
      as: 'inscripcion',
      foreignKey: 'inscripcionId', // Nueva clave foránea
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVENTARIO_TABLE,
      modelName: 'Inventario',
      timestamps: false
    }
  }
}

module.exports = { INVENTARIO_TABLE, InventarioSchema, Inventario };
