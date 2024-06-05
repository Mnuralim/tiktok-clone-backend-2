import { db } from '../db'

export const findAllCommentPost = async (postId: string) => {
  const comments = await db.comment.findMany({
    where: {
      videoId: postId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return comments
}

export const createComment = async (postId: string, userId: string, commentText: string) => {
  return await db.comment.create({
    data: {
      commentText,
      userId,
      videoId: postId,
    },
  })
}
