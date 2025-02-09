const express = require("express")
const ReviewRouter = express.Router();
const ReviewController = require("../controller/ReviewController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




ReviewRouter.get("/get" ,ReviewController.get );
ReviewRouter.get("/get/:id" , ReviewController.getById );
ReviewRouter.post("/create" , ReviewController.create );
ReviewRouter.put("/update/:id" , ReviewController.update );  

// ReviewRouter.delete("/delete/:id" , ReviewController.delete );  // there is no delete review




module.exports = ReviewRouter ;