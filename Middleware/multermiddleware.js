const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`productImg-${file.originalname}`)
    }
})

const multerMiddleware = multer({
    storage
})

module.exports = multerMiddleware