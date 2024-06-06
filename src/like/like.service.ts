import { User } from '@prisma/client'
import { CreateNotification } from '../../types'
import { getSinglePost } from '../post/post.service'
import * as repository from './like.repository'
import { createNotification } from '../user/user.repository'

export const likePost = async (postId: string, user: User) => {
  const post = await getSinglePost(postId)
  const alreadyLike = await repository.getSingleLikePost(postId, user.id)
  if (alreadyLike) {
    await repository.deleteLikePost(alreadyLike.id)
  } else {
    await repository.createLikePost(postId, user.id)
    if (post.userId !== user.id) {
      const payload: CreateNotification = {
        message: `liked your video`,
        type: 'like',
        userId: post.userId,
        actorProfilePicUrl: user.profilePicUrl || undefined,
        actorUsername: user.username,
        additionalInfo: {
          postId,
          postCover: post.thumbnailUrl,
        },
      }
      await createNotification(payload)
    }
  }
}
