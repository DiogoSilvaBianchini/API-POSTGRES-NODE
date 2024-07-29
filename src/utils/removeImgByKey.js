const s3 = require("../config/awsConfig")
const { DeleteObjectCommand } = require("@aws-sdk/client-s3")

module.exports = removeImageByKey = async (files) => {
    try {
        for(let key of files){
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            }))
        }
    } catch (error) {
        return error
    }
}