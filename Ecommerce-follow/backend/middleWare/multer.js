const multer = require('multer');

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname, '../userImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const uploadUserImage = multer({ storage: storage1 })

module.exports = uploadUserImage;