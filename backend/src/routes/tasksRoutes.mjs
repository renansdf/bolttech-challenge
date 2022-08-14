import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate';
import TasksController from '../controllers/tasksController.mjs'
import ensureAuthenticated from '../utils/ensureAuthenticated.mjs'

const tasksRouter = Router()
tasksRouter.use(ensureAuthenticated)
const controller = new TasksController

tasksRouter.post('/', celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    projectid: Joi.number().required(),
  }
}), controller.createTask)

tasksRouter.get('/project/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}), controller.getTasks)

tasksRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}), controller.getTaskById)

tasksRouter.put('/', celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    id: Joi.number().required(),
  }
}), controller.updateTasks)

tasksRouter.delete('/', celebrate({
  [Segments.BODY]: {
    id: Joi.number().required(),
  }
}), controller.delete)

tasksRouter.put('/finish/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}), controller.finishTask)

export default tasksRouter