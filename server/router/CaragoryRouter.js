const express = require("express")
const CatagoryRouter = express.Router();
const CatagoryController = require("../controller/CatagoryController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




// CatagoryRouter.get("/get" , userMiddelware , adminMiddelware ,CatagoryController.get );
CatagoryRouter.get("/get", CatagoryController.get);
CatagoryRouter.get("/getWithSub", CatagoryController.getWithSub);

// CatagoryRouter.get("/get/:id" , CatagoryController.getById );
CatagoryRouter.post("/create", CatagoryController.create);
// CatagoryRouter.put("/update/:id" , CatagoryController.update );
// CatagoryRouter.delete("/delete/:id" , CatagoryController.delete );




module.exports = CatagoryRouter;