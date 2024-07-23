const express = require("express")
const UserController = require("../controller/userController")
const {encryptedPassword} = require("../middlewares/userMiddlewares")
const router = express.Router()

router.get("/", UserController.getAllUsers)
router.post("/", express.json(), encryptedPassword, UserController.createNewUser)
router.put("/:id", express.json(), UserController.updateUser)
router.delete("/:id", express.json(), UserController.deleteUserById)

module.exports = router