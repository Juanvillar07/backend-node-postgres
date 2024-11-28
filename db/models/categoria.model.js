const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIA_TABLE = 'categorias';

const CategoriaSchema = {
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
  IdCategoriaPadre: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'id_categoria_padre',
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

class Categoria extends Model {
  static associate(models) {
    this.hasMany(models.Categoria, {
      as: 'subcategorias', // Alias para las categorías hijas
      foreignKey: 'IdCategoriaPadre'
    });

    this.belongsTo(models.Categoria, {
      as: 'categoriaPadre', // Alias para la categoría padre
      foreignKey: 'IdCategoriaPadre'
    });

    this.hasMany(models.Curso, {
      as: 'cursos',
      foreignKey: 'categoriaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIA_TABLE,
      modelName: 'Categoria',
      timestamps: false
    }
  }
}

module.exports = { CATEGORIA_TABLE, CategoriaSchema, Categoria };
