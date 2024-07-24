const express = require("express")
const router = express.Router()
const ProductController = require("../controller/productController")
const uploadImage = require("../middlewares/multerUploadAws")

router.get("/product", ProductController.findAllProduct)
router.get("/product/:id", ProductController.findById)
router.post("/product", uploadImage.array("imgs"), ProductController.createNewProduct)
router.put("/product/:id", uploadImage.array("imgs"), ProductController.updateProduct)
router.delete("/product/:id", ProductController.removeProduct)

module.exports = router