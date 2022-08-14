import bcrypt from 'bcrypt'

import dbConnection from '../config/database.mjs'
import AppError from '../utils/appError.mjs'

class UsersService {
  create = async (full_name, email, password) => {
    const emailExists = await this.getUserByEmail(email)

    if(emailExists){
      throw new AppError('Este email já está sendo utilizado.')
    }
  
    const encryptedPassword = await bcrypt.hash(password, 5);
  
    const query = {
      text: 'INSERT INTO users(full_name, email, password) VALUES($1, $2, $3)',
      values: [full_name, email, encryptedPassword],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result
    } catch (err) {
      throw new AppError(`erro ao criar o usuário: ${err}`)
    }
  }

  getUserByEmail = async (email) => {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result.rows[0]
    } catch (err) {
      throw new AppError(`erro ao encontrar o usuário: ${err}`)
    }
  }

  getUserById = async (id) => {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    }
  
    try{
      const result = await dbConnection.query(query)
      return result.rows[0]
    } catch (err) {
      throw new AppError(`erro ao encontrar o usuário: ${err}`)
    }
  }

  getUsers = async () => {
    try{
      const result = await dbConnection.query('SELECT id, full_name, email FROM users')
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao listar os usuário: ${err}`)
    }
  }

  deleteUserById = async (id) => {
    const userExists = await this.getUserById(id)

    if(!userExists){
      throw new AppError('usuário não encontrado no banco de dados')
    }

    const query = {
      text: 'DELETE FROM users WHERE id = $1',
      values: [id],
    }

    try{
      const result = await dbConnection.query(query)
      return result.rows
    } catch (err) {
      throw new AppError(`erro ao deletar o usuário: ${err}`)
    }
  }
}

export default UsersService
