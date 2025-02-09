const express = require("express")
const AuthRouter = express.Router();
const AuthController = require("../controller/AuthController")
const userMiddelware = require("../middleware/userMiddelware")


AuthRouter.post("/register", AuthController.Register);
AuthRouter.post("/login", AuthController.Login);





module.exports = AuthRouter;