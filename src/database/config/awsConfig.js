const {S3Client} = require("@aws-sdk/client-s3")

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET,
        accessKeyId: process.env.AWS_PUBLIC
    }
})

module.exports = s3