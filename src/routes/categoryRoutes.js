const express = require("express")
const router = express.Router()
const CategoryController = require("../controller/categoryController")

router
    .get("/category", CategoryController.getAllCategorys)
    .post("/category", express.json(),CategoryController.createNewCategory)
    .put("/category/:id", express.json(), CategoryController.updateCategory)
    .delete("/category/:id", express.json(), CategoryController.removeCategory)

module.exports = router