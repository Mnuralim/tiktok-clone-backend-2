import multer, { type Multer } from 'multer'
import { type Request } from 'express'
import ApiError from '../utils/apiError'

const multerFiltering = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true)
  } else {
    // @ts-expect-error : Unreachable code error
    cb(new ApiError('Wrong file format', 400), false)
  }
}

const upload: Multer = multer({
  fileFilter: multerFiltering,
  limits: {
    fileSize: 2000000,
  },
})

export default upload
