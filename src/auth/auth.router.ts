import { Router } from 'express'
import { loginGoogle } from './auth.controller'

const router: Router = Router()

router.post('/login-google', loginGoogle)

const authRouter = router
export default authRouter
