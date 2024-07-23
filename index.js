require("dotenv").config()
const express = require("express")
const router = require("./src/routes")

const app = express()
const PORT = process.env.PORT || 8082

router(app)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))