const bcryptjs = require("bcryptjs")
const Service = require("../services/Services")

const service = new Service("User")

class UserController{
    static async createNewUser(hash, req, res, next){
        const {name, email} = req.body
        try {
            await service.createNewRegister({name, email, password: hash})
            return res.status(201).json({results: "Usuario criado com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req,res,next){
        try {
            const users = await service.findAll()
            return res.status(200).json({results: users, status: 200}) 
        } catch (error) {
            next(error)
        }
    }

    static async deleteUserById(req,res,next){
        const {id} = req.params
        try {
            await service.removeById(id)
            return res.status(201).json({message: "Usuario removido com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next){
        const {email, password} = req.body
        const {id} = req.params
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
            const update = await service.updateById(id, payload)
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