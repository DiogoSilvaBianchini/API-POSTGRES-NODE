const userRouter = require("./userRoutes")


module.exports = routes = (app) => {
    app.use(userRouter)
}