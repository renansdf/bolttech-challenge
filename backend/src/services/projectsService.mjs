import dbConnection from '../config/database.mjs'
import AppError from '../utils/appError.mjs'

class ProjectsService {
  constructor(usersService){
    this.usersService = usersService
  }

  create = async (name, userid) => {
    const userExists = await this.usersService.getUserById(userid)

    if(!userExists){
      throw new AppError('Este usuário não existe. Forneça uma ID de usuário válida.')
    }
  
    const query = {
      text: 'INSERT INTO projects(name, user_id) VALUES($1, $2)',
      values: [name, userid],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result
    } catch (err) {
      throw new AppError(`erro ao criar o projeto: ${err}`)
    }
  }

  getProjectById = async (id) => {
    const query = {
      text: 'SELECT * FROM projects WHERE id = $1',
      values: [id],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result.rows[0]
    } catch (err) {
      throw new AppError(`erro ao encontrar o projeto: ${err}`)
    }
  }

  getProjectsByUserId = async (userid) => {
    const userExists = await this.usersService.getUserById(userid)

    if(!userExists){
      throw new AppError('Este usuário não existe. Forneça uma ID de usuário válida.')
    }

    const query = {
      text: 'SELECT * FROM projects WHERE user_id = $1',
      values: [userid],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao procurar projetos: ${err}`)
    }
  }

  updateProjectById = async (name, id, userid) => {
    const projectExists = await this.getProjectById(id)

    if(!projectExists){
      throw new AppError('Projeto não encontrado. Forneça uma ID de projeto válida.')
    }

    const query = {
      text: 'UPDATE projects SET name = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3',
      values: [name, id, userid],
    }

    try{
      await dbConnection.query(query)
    } catch (err) {
      throw new AppError(`erro ao atualizar o projeto: ${err}`)
    }
  }

  deleteProjectById = async (id) => {
    const projectExists = await this.getProjectById(id)

    if(!projectExists){
      throw new AppError('Projeto não encontrado. Forneça uma ID de projeto válida.')
    }

    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id],
    }

    try{
      const result = await dbConnection.query(query)
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao deletar o projeto: ${err}`)
    }
  }
}

export default ProjectsService
