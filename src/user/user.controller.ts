import type { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/apiError'
import * as service from './user.service'
import { User } from '@prisma/client'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { q } = req.query
  try {
    let query = ''
    if (q) {
      query = q as string
    }
    const users = await service.getAllUsers(query)
    res.status(200).json({ success: true, message: 'Success fetch users data', data: users })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const user = await service.getUserById(id)
    res.status(200).json({ success: true, message: 'Success fetch user data', data: user })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const { targetId } = req.params
  try {
    if (!targetId) {
      throw new ApiError('Target id is required', 400)
    }
    const message: string = await service.followUser(targetId, req.user.id)
    res.status(200).json({ success: true, message })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params
  try {
    const user = await service.getUserByUsername(username)
    res.status(200).json({ success: true, message: 'Success fetch user data', data: user })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { body }: { body: User } = req
  const file = req.file
  try {
    await service.updateUser(id, body, file)
    res.status(200).json({ success: true, message: 'Success updated user data' })
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}
