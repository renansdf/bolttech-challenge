import UsersService from '../services/usersService.mjs' 
import ProjectsService from '../services/projectsService.mjs'
import TasksService from '../services/tasksService.mjs'
import AppError from '../utils/appError.mjs'

const usersService = new UsersService
const projectsService = new ProjectsService(usersService)
const tasksService = new TasksService(projectsService)

class TasksController {
  createTask = async (request, response) => {
    const {title, projectid} = request.body
  
    await tasksService.create(title, projectid)
  
    response.json({
      message: 'tarefa criada com sucesso',
    })
  }

  getTasks = async (request, response) => {
    const {id} = request.params

    const tasks = await tasksService.getTasksByProjectId(id)

    response.json({
      tasks
    })
  }

  getTaskById = async (request, response) => {
    const {id} = request.params

    const task = await tasksService.getTaskById(id)

    if(!task){
      throw new AppError('não foi encontrado uma tarefa com essa ID')
    }

    response.json({
      task
    })
  }

  updateTasks = async (request, response) => {
    const {title, id} = request.body
  
    await tasksService.updateTask(title, id)
  
    response.json({
      message: 'tarefa atualizada com sucesso',
    })
  }

  delete = async (request, response) => {
    const {id} = request.params

    await tasksService.deleteTaskById(id)

    response.json({
      message: 'tarefa deletada com sucesso',
    })
  }

  finishTask = async (request, response) => {
    const {id} = request.params

    await tasksService.finishTask(id)

    response.json({
      message: 'tarefa marcada como finalizada',
    })
  }
}

export default TasksController