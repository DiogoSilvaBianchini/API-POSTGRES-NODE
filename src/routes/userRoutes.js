const express = require("express")
const UserController = require("../controller/userController")
const {encryptedPassword, authUser, checkToken, userLoginFormValidation, userRegisterFormValidation} = require("../middlewares/userMiddlewares")
const {validate} = require("express-validation")
const router = express.Router()
const bodyParser = require("body-parser")

router.get("/user", UserController.getAllUsers)
router.get("/user/:id", UserController.getUserById)

router.post("/user", express.json(), validate(userRegisterFormValidation, {}, {}), UserController.createNewUser)
router.post("/user/login", express.json(), authUser, UserController.createToken)

router.put("/user", express.json(), checkToken, UserController.updateUser)
router.delete("/use/", express.json(), checkToken, UserController.deleteUserById)

module.exports = router