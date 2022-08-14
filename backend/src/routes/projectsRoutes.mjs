import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate';
import ProjectsController from '../controllers/projectsController.mjs'
import ensureAuthenticated from '../utils/ensureAuthenticated.mjs'

const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)
const controller = new ProjectsController

projectsRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), controller.createProject)

projectsRouter.get('/user/', controller.getProjects)

projectsRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}), controller.getProjectById)

projectsRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    id: Joi.number().required(),
  }
}), controller.updateProject)

projectsRouter.delete('/', celebrate({
  [Segments.BODY]: {
    id: Joi.number().required(),
  }
}), controller.delete)

export default projectsRouter