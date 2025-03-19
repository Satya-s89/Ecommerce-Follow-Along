const multer = require('multer');
const path = require('path');

const userImageStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/userImages'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const ProductImageStore = multer.diskStorage({
  destination: function(req,file,cb) { 
    cb(null, path.join(__dirname, "../uploads/productImages"));
  },
  filename: function(req,file,cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})

const uploadUserImage = multer({
  storage: userImageStore,
  limits:{fileSize: 5*1024*1024},
  fileFilter:(req, file, cb) => {
    const extensions = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    const allowedExtensions = {
      jpeg: true,
      png: true,
      jpg: true
    }

    const allowedMimetype = {
      'image/jpeg': true,
      'image/png': true,
      'image/jpg': true
    } 

    if(!allowedExtensions[extensions] && !allowedMimetype[mimetype]){
      cb(new Error["File extention are not Allowed"]);
    }else{
      cd(null,true);
    }
  }
})

const productImages = multer({
  storage: ProductImageStore,
  limits:{fileSize: 5*1024*1024},
  fileFilter:(req, file, cb) => {
    const extensions = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    const allowedExtensions = {
      jpeg: true,
      png: true,
      jpg: true
    }

    const allowedMimetype = {
      'image/jpeg': true,
      'image/png': true,
      'image/jpg': true
    } 

    if(!allowedExtensions[extensions] && !allowedMimetype[mimetype]){
      cb(new Error["File extention are not Allowed"]);
    }else{
      cd(null,true);
    }
  }
})


module.exports = {uploadUserImage, productImages};