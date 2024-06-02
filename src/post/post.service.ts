import { PostBody } from '../../types'
import ApiError from '../utils/apiError'
import imagekit from '../utils/imagekit'
import * as repository from './post.repository'

export const addNewPost = async (
  data: PostBody,
  files:
    | {
        [fieldname: string]: Express.Multer.File[]
      }
    | Express.Multer.File[]
    | undefined,
  userId: string
) => {
  // @ts-ignore
  const thumbnail = files.thumbnail?.[0] as Express.Multer.File
  // @ts-ignore
  const video = files.video?.[0] as Express.Multer.File
  if (!thumbnail || !video) {
    throw new ApiError('Thumbnail and video are required', 400)
  }

  let thumbnailUrl: string = ''
  if (thumbnail) {
    const uploadFile = await imagekit.upload({
      file: thumbnail.buffer,
      fileName: `${thumbnail.originalname}-${userId}-${Date.now()}`,
      folder: `tiktok-clone-rebuild2/${userId}/post/thumbnail`,
    })
    thumbnailUrl = uploadFile.url
  }

  let videoUrl: string = ''
  if (video) {
    const uploadFile = await imagekit.upload({
      file: video.buffer,
      fileName: `${video.originalname}-${userId}-${Date.now()}`,
      folder: `tiktok-clone-rebuild2/${userId}/post/video`,
    })
    videoUrl = uploadFile.url
  }

  await repository.createPost(videoUrl, thumbnailUrl, data.caption, data.location, userId)
}

export const getAllPost = async () => {
  return await repository.findAllPost()
}

export const getSinglePost = async (id: string) => {
  const post = await repository.findPostById(id)
  if (!post) {
    throw new ApiError('Post not found', 404)
  }
  return post
}

export const savePost = async (postId: string, userId: string) => {
  const post = await getSinglePost(postId)

  const alreadySaved = post.savedBy.find((p) => p.userId === userId)
  let message: string = ''
  if (alreadySaved) {
    await repository.unSavedPost(postId, userId)
    message = 'post unsaved successfully'
  } else {
    await repository.savePost(postId, userId)
    message = 'post saved successfully'
  }

  return message
}
