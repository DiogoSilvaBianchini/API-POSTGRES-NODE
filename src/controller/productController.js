const Services = require("../services/Services")
const services = new Services("Product")

const removeImgByKey = require("../utils/removeImgByKey")
const db = require("../database/models/index")
const { query } = require("express")

const populateCategory = {
    include: {
        model: db.Category,
        attributes: ["name"]
    }
}

const agreeNewImages = async (id, newImgs) => {
    try {
        const product = await services.findById(id, query)
        const newListImgs = product.imgs
        for(let img of newImgs){
            newListImgs.push(img.key)
        }

        return newListImgs
    } catch (error) {
        removeImgByKey(newImgs)
        throw new Error(error)
    }
}

class ProductController{
    static async findById(req, res, next){
        const {id} = req.params
        try {
            const product = await services.findById(id, populateCategory)
            if(!product) return res.status(400).json({results: "Produto não encontrado", status: 400})
            return res.status(200).json({results: product, status: 200})
        } catch (error) {
            next(error)
        }
    } 

    static async findAllProduct(req, res, next){
        try {
            const products = await services.findAll(populateCategory)
            return res.status(200).json({results: products, stauts: 200})
        } catch (error) {
            next(error)
        }
    }

    static async findByCategory(req,res,next){
        const {categoryId} = req.params

        try {
            let products = await services.findAll({where: {
                categoryId: categoryId
            }})

            if(products.length == 0){
                products = "Nenhum produto encontrado"
            }

            return res.status(200).json({results: products, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async createNewProduct(req,res,next){
        const {title, describe, price, categoryId} = req.body
        const imgsKeyAws = req.files.map(img => img.key)
        
        try {
            await services.createNewRegister({title, describe, price, categoryId: Number(categoryId), imgs: imgsKeyAws})
            return res.status(200).json({results: "Produto adicionado com sucesso", status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req,res,next){
        const {title, describe, price} = req.body
        const imgs = req.files
        const {id} = req.params
        const payload = {}

        try {

            if(title){
                payload.title = title
            }

            if(describe){
                payload.describe = describe
            }

            if(price){
                payload.price = price
            }

            if(imgs){
                const newImgList = await agreeNewImages(id, imgs)
                payload.imgs = newImgList
            }

            if(Object.keys(payload).length > 0){
                await services.updateById(id, payload)
                return res.status(201).json({results: "Produto atualizado com sucesso", status: 201})
            }else{
                return res.status(401).json({results: "Campo de Produto incorreto ou Nulo", status: 401})
            }
        } catch (error) {
            removeImgByKey(imgs)
            next(error) 
        }
    }

    static async removeProduct(req,res,next){
        const {id} = req.params
        try {
            const product = await services.findById(id)
            removeImgByKey(product.imgs)
            await services.removeById(id)
            return res.status(201).json({results: "Produto removido com sucesso!", status: 201})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController