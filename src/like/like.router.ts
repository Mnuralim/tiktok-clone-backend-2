import { Router } from 'express'
import authentication from '../middlewares/authentication'
import { likePost } from './like.controller'

const router: Router = Router()

router.patch('/', authentication, likePost)

const likeRouter = router
export default likeRouter
