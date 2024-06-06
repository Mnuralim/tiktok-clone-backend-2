import type { Response, NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/apiError'
import { db } from '../db'
import { User } from '@prisma/client'
import { AuthenticationPayload } from '../../types'

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization

  if (!bearerToken) {
    return next(new ApiError('No token', 401))
  }

  const token = bearerToken.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticationPayload

    const user = await db.user.findUnique({
      where: {
        id: payload.id,
      },
    })

    if (!user) {
      return next(new ApiError('User not found', 404))
    }

    req.user = user as User
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new ApiError('Token expired', 401))
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError('Invalid token', 401))
    }
    return next(new ApiError('Authentication error', 500))
  }
}

export default authentication
