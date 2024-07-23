const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Service = require("../services/Services")
const service = new Service("User")

class UserController{
    static async getAllUsers(req,res,next){
        try {
            const users = await service.findAll()
            return res.status(200).json({results: users, status: 200}) 
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req,res,next){
        const {id} = req.params
        try {
            const user = await service.findById(id)
            return res.status(200).json({results: user, status: 200})
        } catch (error) {
            
        }
    }

    static async createToken (payload, req,res,next){
        try {
            console.log(payload)
            const token = await jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: "4h"})
            return res.status(200).json({results: token, status: 200})
        } catch (error) {
            next(error)   
        }
    }

    static async createNewUser(hash, req, res, next){
        const {name, email} = req.body
        try {
            await service.createNewRegister({name, email, password: hash})
            return res.status(201).json({results: "Usuario criado com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUserById(token,req,res,next){
        try {
            await service.removeById(token.id)
            return res.status(201).json({message: "Usuario removido com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(token, req, res, next){
        const {email, password} = req.body
        const payload = {}
        
        if(email){
            payload.email = email
        }
        if(password){
            const salt = await bcryptjs.genSalt(10)
            const hash = await bcryptjs.hash(password, salt)
            payload.password = hash
        }

        if(Object.keys(payload).length == 0){
            return res.status(401).json({results: "Dados inválidos", status: 401})
        }

        try {
            const update = await service.updateById(token.id, payload)
            if(update == 0){
                return res.status(401).json({results: "Usuario não existe", status: 401})
            }else{
                return res.status(201).json({results: "Dados atualizados com sucesso!", status: 201})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController