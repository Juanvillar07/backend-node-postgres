const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CursoService {
  async find() {
    const rta = await models.Curso.findAll();
    return rta;
  }

  async create(curso) {
    const newCurso = await models.Curso.create(curso);
    return newCurso;
  }

  async findOne(id) {
    const curso = await models.Curso.findByPk(id);
    if (!curso) {
      throw boom.notFound('Curso not found');
    }
    return curso;
  }

  async update(id, changes) {
    const curso = await this.findOne(id);
    const rta = await curso.update(changes);
    return rta;
  }

}


module.exports = CursoService;
