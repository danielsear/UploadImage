const multer = require('multer')
const path = require('path')

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public'))
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + '_' + file.originalname)
    }
  }),
  fileFilter: (req, file, cb) => {
    const extensionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
      acceptedFormat => acceptedFormat == file.mimetype
    )

    if (extensionImg) {
      return cb(null, true)
    }
    return cb(null, false)
  }
})
