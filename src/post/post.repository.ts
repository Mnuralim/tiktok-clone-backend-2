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
      comments: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
