import { User } from '@prisma/client'
import { db } from '../db'

export const findAllUsers = async (query: string) => {
  const users = await db.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      followers: true,
      following: true,
    },
  })
  return users
}

export const findUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      followers: true,
      following: true,
    },
  })

  return user
}

export const findUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      followers: true,
      following: true,
      videos: true,
      savedVideos: {
        select: {
          video: true,
        },
      },
      likes: {
        select: {
          video: true,
        },
      },
    },
  })

  return user
}

export const addUserFollower = async (targetUser: string, currentUser: string) => {
  await db.follower.create({
    data: {
      followerId: currentUser,
      followesId: targetUser,
    },
  })

  await db.following.create({
    data: {
      followingId: currentUser,
      followingsId: targetUser,
    },
  })
}

export const deleteUserFollower = async (followerId: string, followingId: string) => {
  await db.follower.deleteMany({
    where: {
      followerId,
      followesId: followingId,
    },
  })

  await db.following.deleteMany({
    where: {
      followingsId: followingId,
      followingId: followerId,
    },
  })
}

export const updateUserById = async (id: string, body: User) => {
  await db.user.update({
    where: {
      id,
    },
    data: body,
  })
}
