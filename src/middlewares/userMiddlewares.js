const bcryptjs = require("bcryptjs")

const encryptedPassword = async (req,res,next) => {
    const {password} = req.body
    let hash = null
    try {
        if(password){
            const salt = await bcryptjs.genSalt(10)
            hash = await bcryptjs.hash(password, salt)
        }
        next(hash)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    encryptedPassword
}