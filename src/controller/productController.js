const Services = require("../services/Services")
const services = new Services("Product")
const removeImgByKey = require("../utils/removeImgByKey")

class ProductController{
    static async findAllProduct(req, res, next){
        try {
            const products = await services.findAll()
            return res.status(200).json({results: products, stauts: 200})
        } catch (error) {
            next(error)
        }
    }

    static async createNewProduct(req,res,next){
        const {title, describe, price} = req.body
        const files = req.files.map(img => img.key)
        
        try {
            return res.status(200).json({results: "ok", status: 200})
        } catch (error) {
            removeImgByKey(files)
            next(error)
        }
    }
}

module.exports = ProductController