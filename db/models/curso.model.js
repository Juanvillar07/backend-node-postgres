const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORIA_TABLE } = require('./categoria.model');

const CURSO_TABLE = 'cursos';

const CursoSchema = {
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
  valorCurso: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'valor_curso',
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
  categoriaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'categoria_id',
    references: {
      model: CATEGORIA_TABLE,
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

class Curso extends Model {
  static associate(models) {
    this.belongsTo(models.Categoria, {
      as: 'categoria',
      foreignKey: 'categoriaId',
    });

    this.hasMany(models.Leccion, {
      as: 'lecciones',
      foreignKey: 'cursoId',
    });

    this.hasMany(models.Inscripcion, {
      as: 'inscripciones',
      foreignKey: 'cursoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CURSO_TABLE,
      modelName: 'Curso',
      timestamps: false
    }
  }
}

module.exports = { CURSO_TABLE, CursoSchema, Curso };
