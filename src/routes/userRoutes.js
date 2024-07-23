const express = require("express")
const UserController = require("../controller/userController")
const {encryptedPassword, authUser} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.get("/", UserController.getAllUsers)
router.get("/:id", UserController.getUserById)

router.post("/", express.json(), encryptedPassword, UserController.createNewUser)
router.post("/login", express.json(), authUser, UserController.createToken)

router.put("/:id", express.json(), UserController.updateUser)
router.delete("/:id", express.json(), UserController.deleteUserById)

module.exports = router