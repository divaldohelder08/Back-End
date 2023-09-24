import { FastifyRequest } from "fastify"
import multer from "fastify-multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload/images/prato")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now())
  },
})

const fileFilter = (req, file, cb) => {
  const extensions = ["image/png", "image/jpg", "image/jpeg"].find(
    (formato) => formato === file.mimetype
  )
  if (extensions) {
    return cb(null, true)
  }
  return cb(null, false)
}

const multerMiddleware = multer({
  storage,
  fileFilter,
})

let imagupload = multerMiddleware.single("image")

const uploadImage = async (req) => {
  console.log(req.file)
}

export { imagupload, uploadImage, multer }

export default multerMiddleware
