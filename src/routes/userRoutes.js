const express = require("express")
const UserController = require("../controller/userController")
const {authUser, checkToken, userRegisterFormValidation} = require("../middlewares/userMiddlewares")
const {validate} = require("express-validation")
const router = express.Router()

router.get("/user", UserController.getAllUsers)
router.get("/user/:id", UserController.getUserById)

router.post("/user", express.json(), validate(userRegisterFormValidation, {}, {}), UserController.createNewUser)
router.post("/user/login", express.json(), authUser, UserController.createToken)

router.put("/user", express.json(), checkToken, UserController.updateUser)
router.delete("/user/:id", express.json(), UserController.deleteUserById)

router.get("/test", checkToken)

module.exports = router