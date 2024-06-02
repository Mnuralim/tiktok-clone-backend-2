import { db } from '../db'

export const createPost = async (
  videoUrl: string,
  thumbnailUrl: string,
  caption: string,
  location: string,
  userId: string
) => {
  await db.post.create({
    data: {
      videoUrl,
      thumbnailUrl,
      caption,
      userId,
      location,
    },
  })
}

export const findAllPost = async () => {
  return await db.post.findMany({
    include: {
      user: true,
      likes: true,
      savedBy: {
        select: {
          userId: true,
        },
      },
      _count: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const findPostById = async (id: string) => {
  return db.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      likes: true,
      savedBy: {
        select: {
          userId: true,
        },
      },
      _count: true,
    },
  })
}

export const unSavedPost = async (postId: string, userId: string) => {
  await db.userSavedVideo.deleteMany({
    where: {
      userId,
      videoId: postId,
    },
  })
}

export const savePost = async (postId: string, userId: string) => {
  await db.userSavedVideo.create({
    data: {
      userId,
      videoId: postId,
    },
  })
}
