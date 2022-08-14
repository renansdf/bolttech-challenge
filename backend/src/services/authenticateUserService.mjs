import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.mjs'
import AppError from '../utils/appError.mjs'

class AuthenticateUserService {
  constructor(usersService) {
    this.usersSevice = usersService
  }

  execute = async (email, password) => {
    const user = await this.usersSevice.getUserByEmail(email);

    if (!user) {
      throw new AppError('usuário não encontrado.');
    }

    const checkPasswordMatched = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatched) {
      throw new AppError('senha incorreta.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({
      userid: user.id,
      expiresIn,
    }, secret );

    delete user.password

    return { user, token };
  }
}

export default AuthenticateUserService;
