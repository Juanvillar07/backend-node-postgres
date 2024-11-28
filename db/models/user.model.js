const { Model, DataTypes, Sequelize } = require('sequelize');

const { ROL_TABLE } = require('./role.model');

const USER_TABLE = 'users';

const UserSchema = {
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
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  clave: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  rolId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'rol_id',
    references: {
      model: ROL_TABLE,
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

class User extends Model {
  static associate(models) {
    this.hasMany(models.Progreso, {
      as: 'progresos',
      foreignKey: 'userId',
    });

    this.hasMany(models.Inventario, {
      as: 'inventarios',
      foreignKey: 'userId',
    });

    this.hasMany(models.Inscripcion, {
      as: 'inscripciones',
      foreignKey: 'userId',
    });

    this.belongsTo(models.Rol, {
      as: 'rol', // Alias para acceder al rol desde un usuario
      foreignKey: 'rolId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
