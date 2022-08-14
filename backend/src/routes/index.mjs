import { Router } from 'express'
import userRouter from './userRoutes.mjs'
import projectsRouter from './projectsRoutes.mjs'
import tasksRouter from './tasksRoutes.mjs'
import sessionsRouter from './sessionRoutes.mjs'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/projects', projectsRouter)
routes.use('/tasks', tasksRouter)
routes.use('/sessions', sessionsRouter)

export default routes