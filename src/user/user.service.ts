import { Prisma, User } from '@prisma/client'
import ApiError from '../utils/apiError'
import * as repository from './user.repository'
import { db } from '../db'
import imagekit from '../utils/imagekit'
import { CreateNotification } from '../../types'

export const getAllUsers = async (query: string) => {
  const users = await repository.findAllUsers(query)
  return users
}

export const getUserById = async (userId: string) => {
  const user = await repository.findUserById(userId)
  if (!user) {
    throw new ApiError('User not found', 404)
  }

  return user
}

export const followUser = async (targetId: string, currentUser: User) => {
  if (targetId === currentUser.id) {
    throw new ApiError("Can't follow your self", 400)
  }
  const targetUser = await getUserById(targetId)
  const currentUserLogin = await getUserById(currentUser.id)
  const isFollow = targetUser.followers.find((f) => f.followerId === currentUserLogin.id)

  let message: string = ''
  if (isFollow) {
    await repository.deleteUserFollower(isFollow.followerId, isFollow.followesId)
    message = 'Unfollow success'
  } else {
    await repository.addUserFollower(targetId, currentUserLogin.id)
    const payload: CreateNotification = {
      message: `started following you`,
      type: 'follow',
      userId: targetId,
      actorProfilePicUrl: currentUserLogin.profilePicUrl || undefined,
      actorUsername: currentUserLogin.username,
      additionalInfo: {
        user: currentUserLogin,
      },
    }
    await repository.createNotification(payload)
    message = 'Follow success'
  }

  return message
}

export const getUserByUsername = async (username: string) => {
  const user = await repository.findUserByUsername(username)
  if (!user) {
    throw new ApiError('User not found', 404)
  }

  return user
}

export const updateUser = async (id: string, body: User, file: Express.Multer.File | undefined) => {
  await getUserById(id)

  let imgUrl: string = ''
  if (file) {
    const uploadFile = await imagekit.upload({
      file: file.buffer,
      fileName: `${file.originalname}-${id}-${Date.now()}`,
      folder: `tiktok-clone-rebuild2/${id}/profile`,
    })
    imgUrl = uploadFile.url
  }

  const bodies = { ...body }
  if (imgUrl) {
    bodies.profilePicUrl = imgUrl
  }

  await repository.updateUserById(id, bodies)
}

export const getAllNotification = async (userId: string) => {
  return await repository.findAllNotificationUser(userId)
}
