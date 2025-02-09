const express = require("express")
const subCatagoryRouter = express.Router();
const SubCatagoryController = require("../controller/SubCatagoryController")
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")




// AuthRouter.get("/get" , userMiddelware , adminMiddelware ,CatagoryController.get );
subCatagoryRouter.get("/get", SubCatagoryController.get);
// subCatagoryRouter.get("/get/:id", SubCatagoryController.getById);
subCatagoryRouter.post("/create", SubCatagoryController.create);
// subCatagoryRouter.put("/update/:id", SubCatagoryController.update);
// subCatagoryRouter.delete("/delete/:id", SubCatagoryController.delete);




module.exports = subCatagoryRouter;