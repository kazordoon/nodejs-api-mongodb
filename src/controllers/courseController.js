module.exports = (app) => {
  const { Course } = app.models;

  const index = async (req, res) => {
    try {
      const courses = await Course.find({}, [], { sort: { nome: 1 } }).exec();
      return res.json(courses);
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu um erro ao listar os cursos' });
    }
  };

  const create = async (req, res) => {
    try {
      if (await Course.findOne(req.body)) {
        return res.status(400).json({ error: 'Este curso já existe' });
      }

      const course = await Course.create(req.body);
      return res.json(course).status(201);
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possível criar um novo curso' });
    }
  };

  const update = async (req, res) => {
    try {
      const { nome } = req.body;

      if (await Course.findOne({ nome })) {
        return res.status(400).json({ error: 'Já existe um curso com este nome' });
      }

      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!course) {
        return res.status(400).json({ error: 'Este curso não existe' });
      }

      return res.json(course);
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possível atualizar o curso' });
    }
  };

  const destroy = async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possível atualizar o curso' });
    }
  };

  return {
    index,
    create,
    update,
    destroy,
  };
};
