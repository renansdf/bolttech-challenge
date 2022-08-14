import jwt from 'jsonwebtoken'
import AppError from './appError.mjs'
import authConfig from '../config/auth.mjs'

export default function ensureAuthenticated(request, response, next) {
  const token = request.headers.authorization

  if (!token) {
    throw new AppError('JWT Token is missing.', 401)
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret)

    const { userid } = decoded

    request.user = {
      userid,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token', 401)
  }
}
