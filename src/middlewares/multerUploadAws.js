const s3Config = require("../config/awsConfig")
const multer = require("multer")
const multerS3 = require("multer-s3")

module.exports = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const fileName = `products/${Math.floor(Math.random() * 1E9)}-${Date.now()}-${file.originalname}`
            cb(null, fileName)
        }
    })
})