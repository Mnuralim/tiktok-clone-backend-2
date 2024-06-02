import type { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/apiError'
import { PostBody } from '../../types'
import * as service from './post.service'

export const addNewPost = async (req: Request, res: Response, next: NextFunction) => {
  const { caption, location }: PostBody = req.body
  const userId = req.user.id
  const files = req.files
  try {
    if (!caption || !location) {
      throw new ApiError('Caption and location are required', 400)
    }

    await service.addNewPost({ caption, location }, files, userId)

    res.status(201).json({ success: true, message: 'Success add new post' })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await service.getAllPost()

    res.status(200).json({
      success: true,
      message: 'Success add new post',
      data: posts,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    if (!id) {
      throw new ApiError('Id is required', 400)
    }
    const post = await service.getSinglePost(id)

    res.status(200).json({
      success: true,
      message: 'Success add new post',
      data: post,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const savePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    if (!id) {
      throw new ApiError('Id is required', 400)
    }
    const message = await service.savePost(id, req.user.id)

    res.status(200).json({
      success: true,
      message,
    })
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}
