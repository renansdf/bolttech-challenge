import UsersService from '../services/usersService.mjs' 
import ProjectsService from '../services/projectsService.mjs'
import AppError from '../utils/appError.mjs'

const usersService = new UsersService
const projectsService = new ProjectsService(usersService)

class ProjectsController {
  createProject = async (request, response) => {
    const {userid} = request.user
    const {name} = request.body
  
    await projectsService.create(name, userid)
  
    response.json({
      message: 'projeto criado com sucesso',
    })
  }

  getProjects = async (request, response) => {
    const {userid} = request.user

    const projects = await projectsService.getProjectsByUserId(userid)

    response.json({
      projects
    })
  }

  getProjectById = async (request, response) => {
    const {id} = request.params

    const project = await projectsService.getProjectById(id)

    if(!project){
      throw new AppError('não foi encontrado um projeto com essa ID')
    }

    response.json({
      project
    })
  }

  updateProject = async (request, response) => {
    const {userid} = request.user
    const {name, id} = request.body
  
    await projectsService.updateProjectById(name, id, userid)
  
    response.json({
      message: 'projeto atualizado com sucesso',
    })
  }

  delete = async (request, response) => {
    const {userid} = request.user
    const {id} = request.body

    await projectsService.deleteProjectById(id)

    response.json({
      message: 'projeto deletado com sucesso',
    })
  }
}

export default ProjectsController