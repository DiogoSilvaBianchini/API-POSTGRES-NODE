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

const userLoginFormValidation = {
    body: Joi.object({
        email: 
            Joi.string()
            .email()
            .required(),
        password:
            Joi.string()
            .required()
    })
}

module.exports = {
    encryptedPassword,
    authUser,
    checkToken,
    userRegisterFormValidation,
    userLoginFormValidation
}