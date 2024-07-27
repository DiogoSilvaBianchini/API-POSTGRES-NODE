const userRouter = require("./userRoutes")
const productRouter = require("./productRouter")
const categoryRouter = require("./categoryRoutes")
const morgan = require("morgan")
const { ValidationError } = require("express-validation")
const swaaggerUi = require("swagger-ui-express")
const swaggerConfig = require("../../swagger.json")

module.exports = routes = (app) => {
    //Routes da documentação
    app.use("/api-docs", swaaggerUi.serve, swaaggerUi.setup(swaggerConfig))

    //Routes de Serviço
    app.use(
        morgan("dev"), 
        userRouter, 
        productRouter, 
        categoryRouter)

    // Error handdle
    app.use((error, req, res, next) => {
        console.log(error)
        if(error instanceof ValidationError){
            const fieldError = error.details.body[0].path
            const typeError = error.details.body[0].type
            let msgError = `Erro o campo ${fieldError} está incorreto.`;

            if(typeError.includes("empty")){
                msgError = `O campo ${fieldError} não pode estar vazio.`
            }

            if(typeError.includes("min")){
                msgError = `O campo ${fieldError} precisar ter no minimo 8 caracteres.`
            }

            return res.status(error.statusCode).json({results: msgError, status: error.statusCode})
        }
        return res.status(500).json({results: "Algo de errado", status: 500})
    })

    // Error 404
    app.use((req,res,next) => {
        return res.status(404).json({results: "Rota inexistente", status: 404})
    })
}