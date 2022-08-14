import dbConnection from '../config/database.mjs'
import AppError from '../utils/appError.mjs'

class TasksService {
  constructor(projectsService){
    this.projectsService = projectsService
  }

  create = async (title, projectid) => {
    const projectExists = await this.projectsService.getProjectById(projectid)

    if(!projectExists){
      throw new AppError('Este projeto não existe. Forneça uma ID de projeto válida.')
    }
  
    const query = {
      text: 'INSERT INTO tasks(title, status, project_id) VALUES($1, $2, $3)',
      values: [title, "TODO", projectid],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result
    } catch (err) {
      throw new AppError(`erro ao criar a tarefa: ${err}`)
    }
  }

  getTaskById = async (id) => {
    const query = {
      text: 'SELECT * FROM tasks WHERE id = $1',
      values: [id],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result.rows[0]
    } catch (err) {
      throw new AppError(`erro ao encontrar a tarefa: ${err}`)
    }
  }

  getTasksByProjectId = async (projectid) => {
    const projectExists = await this.projectsService.getProjectById(projectid)

    if(!projectExists){
      throw new AppError('Este projeto não existe. Forneça uma ID de projeto válida.')
    }

    const query = {
      text: 'SELECT * FROM tasks WHERE project_id = $1',
      values: [projectid],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao procurar tarefas: ${err}`)
    }
  }

  updateTask = async (title, id) => {
    const taskExists = await this.getTaskById(id)

    if(!taskExists){
      throw new AppError('Tarefa não encontrada. Forneça uma ID de tarefa válida.')
    }

    const query = {
      text: 'UPDATE tasks SET title = $1, updated_at = NOW() WHERE id = $2',
      values: [title, id],
    }

    try{
      await dbConnection.query(query)
    } catch (err) {
      throw new AppError(`erro ao atualizar a tarefa: ${err}`)
    }
  }

  deleteTaskById = async (id) => {
    const taskExists = await this.getTaskById(id)

    if(!taskExists){
      throw new AppError('Tarefa não encontrada. Forneça uma ID de tarefa válida.')
    }

    const query = {
      text: 'DELETE FROM tasks WHERE id = $1',
      values: [id],
    }

    try{
      const result = await dbConnection.query(query)
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao deletar a tarefa: ${err}`)
    }
  }

  finishTask = async (id) => {
    const taskExists = await this.getTaskById(id)

    if(!taskExists){
      throw new AppError('Tarefa não encontrada. Forneça uma ID de tarefa válida.')
    }

    const query = {
      text: 'UPDATE tasks SET status = $1, finished_at = NOW() WHERE id = $2',
      values: ["DONE", id],
    }

    try{
      const result = await dbConnection.query(query)
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao marcar a tarefa como finalizada: ${err}`)
    }
  }
}

export default TasksService
