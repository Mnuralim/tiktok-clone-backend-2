import * as repository from './comment.repository'

export const getAllCommentPost = async (postId: string) => {
  const comments = await repository.findAllCommentPost(postId)
  return comments
}

export const addNewComment = async (postId: string, userId: string, commentText: string) => {
  await repository.createComment(postId, userId, commentText)
}
