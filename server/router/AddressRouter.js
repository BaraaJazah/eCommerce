const express = require("express")
const AddressRouter = express.Router();
const AddressController = require("../controller/AddressController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




AddressRouter.get("/get" ,AddressController.get );
AddressRouter.get("/get/:id" , AddressController.getById );
AddressRouter.post("/create" , AddressController.create );
AddressRouter.put("/update/:id" , AddressController.update );
AddressRouter.delete("/delete/:id" , AddressController.delete );




module.exports = AddressRouter ;