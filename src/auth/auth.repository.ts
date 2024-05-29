import { db } from '../db'

export const findUserByEmail = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  })

  return user
}

export const addNewUser = async (email: string, username: string, imageProfile: string) => {
  const user = await db.user.create({
    data: {
      email,
      username,
      profilePicUrl: imageProfile,
    },
  })

  return user
}
