const express = require("express")
const router = express.Router()
const ProductController = require("../controller/productController")
const uploadImage = require("../middlewares/multerUploadAws")

router.post("/product", uploadImage.array("imgs"), ProductController.createNewProduct)

module.exports = router