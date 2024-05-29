import { db } from '../db'

export const createLikePost = async (postId: string, userId: string) => {
  await db.like.create({
    data: {
      videoId: postId,
      userId,
    },
  })
}

export const deleteLikePost = async (likeId: string) => {
  await db.like.delete({
    where: {
      id: likeId,
    },
  })
}

export const getSingleLikePost = async (postId: string, userId: string) => {
  const like = await db.like.findFirst({
    where: {
      userId,
      videoId: postId,
    },
  })

  return like
}
