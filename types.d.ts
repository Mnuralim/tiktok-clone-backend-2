import { User } from '@prisma/client'

export interface RegisterBody {
  username: string
  email: string
  password: string
}

interface PostBody {
  caption: string
  location: string
}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

interface AuthenticationPayload {
  email: string
  id: string
  username: string
  iat: number
  exp: number
}
