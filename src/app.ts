import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import errorHandler from './utils/errorHandler'
import ApiError from './utils/apiError'
import authRouter from './auth/auth.router'
import postRouter from './post/post.router'
import likeRouter from './like/like.router'
import commentRouter from './comment/comment.router'
import userRouter from './user/user.router'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(cookieParser())

app.use('/api/v1/auths', authRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/likes', likeRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404))
})
app.use(errorHandler)

export default app
