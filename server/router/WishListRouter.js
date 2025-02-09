const express = require("express")
const WishlistRouter = express.Router();
const WishListController = require("../controller/WishListController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




WishlistRouter.get("/get", userMiddelware, WishListController.get);

WishlistRouter.post("/create", userMiddelware, WishListController.create);
// WishlistRouter.post("/addToCart/:id" ,WishListController.addToCart );

WishlistRouter.delete("/delete/:id", userMiddelware, WishListController.delete);




module.exports = WishlistRouter;