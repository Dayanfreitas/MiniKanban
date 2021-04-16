const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ProjectController = require('../controllers/ProjectController');
const TaskController = require('../controllers/TaskController');

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World, Dya');
});

router.get('/project/progress', ProjectController.getProgressCompleted);
router.get('/project', ProjectController.getAll);
router.get('/project/:id', ProjectController.getId);
router.post('/project', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().trim().error(new Error('Nome é obrigatório !')),
        data_inicial: Joi.string().required().trim().error(new Error('Data inicial é obrigatório !')),
        data_final: Joi.string().required().trim().error(new Error('Data final é obrigatório !')),
    })
}), ProjectController.create);
router.put('/project', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        nome: Joi.string().required().trim().error(new Error('Nome é obrigatório !')),
        data_inicial: Joi.string().required().trim().error(new Error('Data inicial é obrigatório !')),
        data_final: Joi.string().required().trim().error(new Error('Data final é obrigatório !')),
        progresso: Joi.number().required(),
        status: Joi.string().required().trim().error(new Error('Status é obrigatório !')),
        atrasado: Joi.number().required()
    })
}), ProjectController.update);
router.put('/project/delete', ProjectController.delete);


router.get('/task', TaskController.getAll);
router.get('/task/:id', TaskController.getId);
router.post('/task', celebrate({
    [Segments.BODY]: Joi.object().keys({
        descricao: Joi.string().required().trim().error(new Error('Descrição é obrigatório !')),
        id_projeto: Joi.required().error(new Error('Projeto é obrigatório !')),
        data_inicio: Joi.string().required().trim().error(new Error('Data de inicio é obrigatório !')),
        data_fim: Joi.string().required().trim().error(new Error('Data de fim é obrigatório !')),
    })
}), TaskController.create);

router.put('/task', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().required(),
        descricao: Joi.string().trim().required().error(new Error('Descrição é obrigatório !')),
        id_projeto: Joi.required().error(new Error('Projeto é obrigatório !')),
        data_inicio: Joi.string().trim().required().error(new Error('Data de inicio é obrigatório !')),
        data_fim: Joi.string().trim().required().error(new Error('Data de fim é obrigatório !')),
        finalizada: Joi.number().required(),
        status: Joi.string().trim().required(),
    })
}) , TaskController.update);
router.put('/task/delete', TaskController.update);

module.exports = router;