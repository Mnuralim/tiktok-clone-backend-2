import { Router } from 'express'
import {
  followUser,
  getAllNotification,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
} from './user.controller'
import authentication from '../middlewares/authentication'
import upload from '../middlewares/uploadFile'

const router: Router = Router()

router.get('/', getAllUsers)
router.get('/notifications', authentication, getAllNotification)
router.get('/:id', authentication, getUserById)
router.get('/username/:username', authentication, getUserByUsername)
router.patch('/follow/:targetId', authentication, followUser)
router.patch('/:id', authentication, upload.single('image'), updateUser)

const userRouter = router
export default userRouter
