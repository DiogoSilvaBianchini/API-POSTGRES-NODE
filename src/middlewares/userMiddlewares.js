const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Service = require("../services/Services")
const service = new Service("User")

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

const authUser = async (req,res,next) => {
    const {email, password} = req.body

    try {
        const user = await service.findOne({email})
        if(!user) return res.status(401).json({results: "E-mail ou senha incorreto"})

        const compare = bcryptjs.compare(password, user.password)
        if(compare){
            const payload = {id: user.id, email: user.email}
            console.log(payload)
            next(payload)
        }else{
            return res.status(401).json({results: "E-mail ou senha incorreto"})
        }
    } catch (error) {
        next(error)
    }
}

const checkToken = async (req, res, next) => {
    const {token: userToken} = req.headers
    try {
        jwt.verify(userToken, process.env.SECRET_TOKEN)
        next()
    } catch (error) {
        return res.status(401).json({results: "Token inválido", status: 401})
    }
}


module.exports = {
    encryptedPassword,
    authUser,
    checkToken
}