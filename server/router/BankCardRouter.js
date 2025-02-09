const express = require("express")
const BankCardRouter = express.Router();
const BankCardController = require("../controller/BankCardController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




BankCardRouter.get("/get" ,BankCardController.get );
BankCardRouter.get("/get/:id" , BankCardController.getById );
BankCardRouter.post("/create" , BankCardController.create );
// BankCardRouter.put("/update/:id" , BankCardController.update );  // threre is no update for this
BankCardRouter.delete("/delete/:id" , BankCardController.delete );




module.exports = BankCardRouter ;