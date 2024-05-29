import { addNewUser, findUserByEmail } from './auth.repository'
import ApiError from '../utils/apiError'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

export const loginGoogle = async (tokenId: string) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
  const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

  const ticket = await client.verifyIdToken({
    idToken: tokenId.slice(7),
    audience: GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if (payload?.aud != GOOGLE_CLIENT_ID) {
    throw new ApiError('Token id is not valid', 400)
  }
  const isRegistered = await findUserByEmail(payload?.email as string)

  let userId
  if (!isRegistered) {
    const username = payload?.email?.split('@')[0]
    const user = await addNewUser(payload?.email as string, username as string, payload?.picture as string)
    userId = user.id
  }

  const payloadData = {
    email: payload?.email as string,
    id: isRegistered ? isRegistered.id : userId,
    username: payload?.name as string,
  }

  const accesToken = jwt.sign(payloadData, process.env.JWT_SECRET as string, {
    expiresIn: '3d',
  })

  const refreshToken = jwt.sign(payloadData, process.env.REFRESHTOKEN_SECRET as string, {
    expiresIn: '7d',
  })

  return {
    payloadData,
    accesToken,
    refreshToken,
  }
}
