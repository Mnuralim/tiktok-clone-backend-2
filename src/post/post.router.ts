import { Router } from 'express'
import { addNewPost, getAllPost, getSinglePost, savePost } from './post.controller'
import authentication from '../middlewares/authentication'
import upload from '../middlewares/uploadFile'

const router: Router = Router()

router.post(
  '/',
  authentication,
  upload.fields([
    {
      name: 'thumbnail',
      maxCount: 1,
    },
    {
      name: 'video',
      maxCount: 1,
    },
  ]),
  addNewPost
)

router.get('/', authentication, getAllPost)
router.get('/:id', authentication, getSinglePost)
router.patch('/save/:id', authentication, savePost)

const postRouter = router
export default postRouter
