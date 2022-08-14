import AuthenticateUserService from '../services/authenticateUserService.mjs';
import UsersService from '../services/usersService.mjs' 

const userService = new UsersService
const authenticateUser = new AuthenticateUserService(userService)

export default class SessionsController {
  create = async (request, response) => {
    const { email, password } = request.body;

    const { user, token } = await authenticateUser.execute( email, password );

    return response.json({ user, token });
  }
}
