import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import UsersController from '../controllers/usersController.mjs'
import ensureAuthenticated from '../utils/ensureAuthenticated.mjs'

const userRouter = Router()
const controller = new UsersController

userRouter.post('/', celebrate({
  [Segments.BODY]: {
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), controller.createUser)

userRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
}), ensureAuthenticated, controller.getUserById)

userRouter.get('/', ensureAuthenticated, controller.getAllUsers)

userRouter.delete('/', celebrate({
  [Segments.BODY]: {
    id: Joi.number().required(),
  }
}), ensureAuthenticated, controller.delete)

export default userRouter