import type { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/apiError'
import * as service from './auth.service'

export const loginGoogle = async (req: Request, res: Response, next: NextFunction) => {
  const tokenId = req.headers.authorization

  try {
    if (!tokenId) {
      throw new ApiError('Token id is required', 400)
    }

    const { accesToken, payloadData, refreshToken } = await service.loginGoogle(tokenId)
    res.cookie('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    res.status(200).json({
      success: true,
      message: 'Login success',
      data: { ...payloadData, accesToken },
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
