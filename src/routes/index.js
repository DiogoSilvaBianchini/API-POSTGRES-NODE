const userRouter = require("./userRoutes")
const productRouter = require("./productRouter")
const categoryRouter = require("./categoryRoutes")
const morgan = require("morgan")

module.exports = routes = (app) => {
    //Routes
    app.use(
        morgan("dev"), 
        userRouter, 
        productRouter, 
        categoryRouter)

    // Error handdle
    app.use((error, req, res, next) => {
        console.log(error)
        return res.status(500).json({results: "Algo de errado", status: 500})
    })

    // Error 404
    app.use((req,res,next) => {
        return res.status(404).json({results: "Rota inexistente", status: 404})
    })
}