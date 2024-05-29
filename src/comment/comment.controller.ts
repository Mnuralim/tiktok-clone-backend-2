import type { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/apiError'
import * as service from './comment.service'

export const getAllCommentPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params

  try {
    if (!postId) {
      throw new ApiError('Post id is required', 400)
    }

    const comments = await service.getAllCommentPost(postId)

    res.status(200).json({
      success: true,
      data: comments,
      message: 'Success get comments data',
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}

export const addNewComment = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { commentText }: { commentText: string } = req.body
  try {
    if (!postId || !commentText) {
      throw new ApiError('Post id &7 comment text are required', 400)
    }

    await service.addNewComment(postId, req.user.id, commentText)

    res.status(200).json({
      success: true,
      message: 'Success add new comment',
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}
