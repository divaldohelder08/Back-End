import multer from "fastify-multer"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/data/uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.fieldname)
  },
})
//@ts-ignore
const fileFilter = (req, file, cb) => {
  const extensions = ["image/png", "image/jpg", "image/jpeg"].find(
    (formato) => formato === file.mimetype
  )
  if (extensions) {
    return cb(null, true)
  }
  return cb(null, false)
}
// fileFilter,

const multerMiddleware = multer({
  storage,
 })

export default multerMiddleware