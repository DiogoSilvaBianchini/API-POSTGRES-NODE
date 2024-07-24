const express = require("express")
const router = express.Router()
const CategoryController = require("../controller/categoryController")

router
    .get("/category", CategoryController.getAllCategorys)
    .post("/category", express.json(),CategoryController.createNewCategory)

module.exports = router