const db = require("../database/models")

class Services{
    constructor(model){
        this.model = model
    }

    async findAll(){
        try {
            const results = await db[this.model].findAll()
            return results
        } catch (error) {
            return error
        }
    }

    async findOne(querry){
        try {
            const results = await db[this.model].findOne({where: querry})
            return results
        } catch (error) {
            return error
        }
    }

    async findById(id){
        try {
            const results = await db[this.model].findByPk(id)
            return results
        } catch (error) {
            return error
        }
    }

    async createNewRegister(body){
        try {
            await db[this.model].create(body)
            return true
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async updateById(id, body){
        try {
            const update = await db[this.model].update(body, {where: {id}})
            return update
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async removeById(id){
        try {
            await db[this.model].destroy({where: {id: Number(id)}})
            return true
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = Services