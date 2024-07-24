const Services = require("../services/Services")
const service = new Services("Category")

class CategoryController{
    static async getAllCategorys(req,res,next){
        try {
            const categorys = await service.findAll()
            return res.status(200).json({results: categorys, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async createNewCategory(req,res,next){
        try {
            const {category} = req.body
            await service.createNewRegister({name: category.toLowerCase()})
            return res.status(201).json({results: "Nova categoria adicionada com sucesso", status: 201})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController