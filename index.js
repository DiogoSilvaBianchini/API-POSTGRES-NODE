require("dotenv").config()
const express = require("express")
const router = require("./src/routes")
const {sequelize} = require("./src/database/models")


const app = express()
const PORT = process.env.PORT || 8082

sequelize.sync({after: true}).then(() => {
    console.log("Banco de dados connectado")
}).catch(err => console.log(err)) 

router(app)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))