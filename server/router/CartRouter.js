const express = require("express")
const CartRouter = express.Router();
const CartController = require("../controller/CartController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




CartRouter.get("/get", userMiddelware, CartController.get);
CartRouter.get("/getQunatity", userMiddelware, CartController.getQunatity);
CartRouter.post("/create", userMiddelware, CartController.create);

CartRouter.put("/updateQuan/:id", userMiddelware, CartController.updateQuantity);
CartRouter.put("/updateSelect/:id", userMiddelware, CartController.updateSelect);

CartRouter.delete("/delete/:id", userMiddelware, CartController.delete);

CartRouter.post("/deleteAllCard", userMiddelware, CartController.deleteAllCard);


// CartRouter.get("/confirm" ,CartController.confirm );



module.exports = CartRouter;