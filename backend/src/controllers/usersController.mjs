import UsersService from '../services/usersService.mjs' 
import AppError from '../utils/appError.mjs'

const usersService = new UsersService

class UsersController {
  createUser = async (request, response) => {
    const {full_name, email, password} = request.body
  
    await usersService.create(full_name, email, password)
  
    response.json({
      message: 'usuário criado com sucesso',
    })
  }

  getUserById = async (request, response) => {
    const {id} = request.params

    const user = await usersService.getUserById(id)

    if(!user){
      throw new AppError('Não foi encontrado nenhum usuário com essa ID.')
    }

    response.json({
      user
    })
  }

  getAllUsers = async (request, response) => {
    const users = await usersService.getUsers()

    response.json({
      users
    })
  }

  delete = async (request, response) => {
    const {id} = request.body

    await usersService.deleteUserById(id)

    response.json({
      message: 'usuário deletado com sucesso',
    })
  }
}

export default UsersController