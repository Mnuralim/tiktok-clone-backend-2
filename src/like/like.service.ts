import { getSinglePost } from '../post/post.service'
import * as repository from './like.repository'

export const likePost = async (postId: string, userId: string) => {
  await getSinglePost(postId)
  const alreadyLike = await repository.getSingleLikePost(postId, userId)
  if (alreadyLike) {
    await repository.deleteLikePost(alreadyLike.id)
  } else {
    await repository.createLikePost(postId, userId)
  }
}
