import { Router } from 'express'
import authentication from '../middlewares/authentication'
import { addNewComment, getAllCommentPost } from './comment.controller'

const router: Router = Router()

router.get('/:postId', authentication, getAllCommentPost)
router.post('/:postId', authentication, addNewComment)

const commentRouter = router
export default commentRouter
