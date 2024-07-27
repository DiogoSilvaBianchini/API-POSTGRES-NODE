const express = require("express")
const router = express.Router()
const ProductController = require("../controller/productController")
const uploadImage = require("../middlewares/multerUploadAws")
const { checkToken } = require("../middlewares/userMiddlewares")
const { registerFormValidation } = require("../middlewares/productMiddlewares")
const {validate} = require("express-validation")

router.get("/product", ProductController.findAllProduct)
router.get("/product/filter", ProductController.findForFilter)

router.post("/product", uploadImage.array("imgs"), validate(registerFormValidation, {} , {}), checkToken, ProductController.createNewProduct)
router.put("/product/:id", uploadImage.array("imgs"), checkToken, ProductController.updateProduct)
router.delete("/product/:id", checkToken, ProductController.removeProduct)

module.exports = router