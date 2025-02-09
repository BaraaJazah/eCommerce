const express = require("express")
const OrderRouter = express.Router();
const OrderController = require("../controller/OrderController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")


OrderRouter.get("/get", userMiddelware, OrderController.get);
OrderRouter.get("/get/:id", userMiddelware, OrderController.getById);



// payment
OrderRouter.post("/payment", userMiddelware, OrderController.payment);






module.exports = OrderRouter;