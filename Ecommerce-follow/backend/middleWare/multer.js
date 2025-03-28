const multer = require("multer");
const path = require("path"); 

const userImageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/userImages")); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});

const productImagesStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/productImages")); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, and JPG formats are allowed"), false);
    }
    cb(null, true);
};

const userImage = multer({ 
    storage: userImageStore,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});

const productImages = multer({ 
    storage: productImagesStore,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});

module.exports = { userImage, productImages };
