const express = require("express")
const UserController = require("../controller/userController")
const {encryptedPassword, authUser, checkToken} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.get("/user", UserController.getAllUsers)
router.get("/user/:id", UserController.getUserById)

router.post("/user", express.json(), encryptedPassword, UserController.createNewUser)
router.post("/user/login", express.json(), authUser, UserController.createToken)

router.put("/user", express.json(), checkToken, UserController.updateUser)
router.delete("/use/", express.json(), checkToken, UserController.deleteUserById)

module.exports = router