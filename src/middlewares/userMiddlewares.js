const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Service = require("../services/Services")
const { Joi } = require("express-validation")
const service = new Service("User")

const encryptedPassword = async (password) => {
    try {
        const salt = await bcryptjs.genSalt(10)
        hash = await bcryptjs.hash(password, salt)
        return hash
    } catch (error) {
        throw new Error(error)
    }
}

const authUser = async (req,res,next) => {
    const {email, password} = req.body

    try {
        const user = await service.findOne({email})
        if(!user) return res.status(401).json({results: "E-mail ou senha incorreto"})

        const compare = await bcryptjs.compare(password, user.password)
        
        if(compare){
            const payload = {id: user.id, email: user.email}
            req.payload = payload
            next()
        }else{
            return res.status(401).json({results: "E-mail ou senha incorreto"})
        }
    } catch (error) {
        next(error)
    }
}

const checkToken = async (req, res, next) => {
    const {authorization} = req.headers
    
    try {
        const bearerToken = authorization.split(" ", 2)[1]
        const token = await jwt.verify(bearerToken, process.env.SECRET_TOKEN)
        req.token = token
        next()
    } catch (error) {
        return res.status(401).json({results: "Token inválido", status: 401})
    }
}

const userRegisterFormValidation = {
    body: Joi.object({
        name: 
            Joi.string()
            .required(),
        email: 
            Joi.string()
            .email()
            .required(),
        password:
            Joi.string()
            .min(8)
            .max(30)
            .regex(/[a-zA-Z0-9]/)
            .required()
    })
}

module.exports = {
    encryptedPassword,
    authUser,
    checkToken,
    userRegisterFormValidation
}