const express = require("express")
const UserController = require("../controller/userController")
const {encryptedPassword, authUser, checkToken} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.get("/", UserController.getAllUsers)
router.get("/:id", UserController.getUserById)

router.post("/", express.json(), encryptedPassword, UserController.createNewUser)
router.post("/login", express.json(), authUser, UserController.createToken)

router.put("/", express.json(), checkToken, UserController.updateUser)
router.delete("/", express.json(), checkToken, UserController.deleteUserById)

module.exports = router