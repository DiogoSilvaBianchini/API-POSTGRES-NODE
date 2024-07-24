const db = require("../database/models")

class Services{
    constructor(model){
        this.model = model
    }

    async findAll(options){
        try {
            const results = await db[this.model].findAll(options)
            return results
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOne(querry){
        try {
            const results = await db[this.model].findOne({where: querry})
            return results
        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(id, querry){
        try {
            const results = await db[this.model].findByPk(id, querry)
            return results
        } catch (error) {
            throw new Error(error)
        }
    }

    async createNewRegister(body){
        try {
            await db[this.model].create(body)
            return true
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, body){
        try {
            const update = await db[this.model].update(body, {where: {id}})
            return update
        } catch (error) {
            throw new Error(error)
        }
    }

    async removeById(id){
        try {
            await db[this.model].destroy({where: {id: Number(id)}})
            return true
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Services