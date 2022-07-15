const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images') //папка куди складуємо всі файли
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname) //а тут унікальні назви файлів
  },
})

const allowedTypes = ['images/jpg', 'images/jpeg', 'images/png'] //лімітуємо розширення завантажених файлів

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({ storage, fileFilter })
