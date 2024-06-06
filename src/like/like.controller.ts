import type { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/apiError'
import * as service from './like.service'

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId }: { postId: string } = req.body

  try {
    if (!postId) {
      throw new ApiError('Post id is required', 400)
    }

    await service.likePost(postId, req.user)

    res.status(200).json({
      success: true,
      message: 'Success add like post',
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      next(new ApiError(error.message, error.statusCode))
    } else {
      next(new ApiError('Internal server error', 500))
    }
  }
}
