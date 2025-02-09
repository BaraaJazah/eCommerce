const express = require("express")
const ProductRouter = express.Router();
const userMiddelware = require("../middleware/userMiddelware")
const adminMiddelware = require("../middleware/adminMiddelware")
const ProductController = require("../controller/ProductController")




ProductRouter.get("/get", ProductController.get);
ProductRouter.get("/get/:id", ProductController.getById);
ProductRouter.get("/getType/", ProductController.getByType);
ProductRouter.get("/getByCatagory/:id", ProductController.getByCatagory);


ProductRouter.post("/search", ProductController.search);

ProductRouter.post("/create", ProductController.create);

ProductRouter.put("/update/:id", ProductController.update);
ProductRouter.put("/active/:id", ProductController.active);
ProductRouter.put("/disActive/:id", ProductController.disActive);

ProductRouter.delete("/delete/:id", ProductController.delete);




module.exports = ProductRouter;