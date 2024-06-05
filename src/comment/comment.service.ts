import { User } from '@prisma/client'
import { CreateNotification } from '../../types'
import { getSinglePost } from '../post/post.service'
import { createNotification } from '../user/user.repository'
import * as repository from './comment.repository'

export const getAllCommentPost = async (postId: string) => {
  await getSinglePost(postId)
  const comments = await repository.findAllCommentPost(postId)
  return comments
}

export const addNewComment = async (postId: string, actorUser: User, commentText: string) => {
  const post = await getSinglePost(postId)
  const comment = await repository.createComment(postId, actorUser.id, commentText)
  if (post.userId !== actorUser.id) {
    const payload: CreateNotification = {
      message: `commented: ${commentText}`,
      type: 'comment',
      userId: post.userId,
      actorProfilePicUrl: actorUser.profilePicUrl || undefined,
      actorUsername: actorUser.username,
      additionalInfo: {
        postId,
        postCover: post.thumbnailUrl,
        commentId: comment.id,
      },
    }
    await createNotification(payload)
  }
}
