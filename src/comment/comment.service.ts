import { getSinglePost } from '../post/post.service'
import * as repository from './comment.repository'

export const getAllCommentPost = async (postId: string) => {
  await getSinglePost(postId)
  const comments = await repository.findAllCommentPost(postId)
  return comments
}

export const addNewComment = async (postId: string, userId: string, commentText: string) => {
  await getSinglePost(postId)
  await repository.createComment(postId, userId, commentText)
}
