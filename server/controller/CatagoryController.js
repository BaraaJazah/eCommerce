const CatagoryModel = require("../model/Catagory")
const SubCatagoryModel = require("../model/SubCatagory")
const ProductModel = require("../model/Product")
const ProductController = require("./ProductController")


const CatagoryValidation = require("../validation/CatagoryValidation")

class CatagoryController {


    /****
     * @desc    create Catagory
     * @route   /api/Catagory/create
     * @method  POST
     * @access  Private
     */

    static async create(req, res) {
        try {
            const { name } = req.body;
            const { error } = CatagoryValidation.getValidation({ name });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const catagory = await CatagoryModel.create({
                name
            })
            if (catagory)
                return res.status(200).json({
                    success: true,
                    message: "Catagory Created Successfully",
                })
            else {
                return res.status(404).json({
                    success: true,
                    message: "olmadi",
                })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Creating Catagory API",
                error,
            })

        }
    }


    /****
     * @desc    get all Catagory
     * @route   /api/Catagory/get
     * @method  GET
     * @access  public
     */


    static async get(req, res) {
        try {

            const catagories = await CatagoryModel.find({})
            if (catagories.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "There Is No Catagory"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "Catagories Getting Successfully",
                    catagories,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting Catagory API",
                error,
            })

        }
    }



    /****
     * @desc    get all Catagory With there subCatagory
     * @route   /api/catagory/getWithSub
     * @method  GET
     * @access  public
     */


    static async getWithSub(req, res) {
        try {

            const catagories = await CatagoryModel.find({ deleted: false })
            if (catagories.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "There Is No Catagory"
                })
            } else {


                const UpdatedCatagory = await Promise.all(
                    catagories.map(async (el) => {
                        const subCategories = await SubCatagoryModel.find({ catagory_id: el.id, deleted: false });
                        const lastCatagories = {
                            name: el.name,
                        };
                        const lastSubCategories = subCategories.map((el) => {
                            return { id: el.id, name: el.name, }
                        })

                        return { catagory: lastCatagories, subCatagories: lastSubCategories };
                    })
                )

                return res.status(200).send({
                    success: true,
                    message: "Catagories Getting Successfully",
                    Catagories: UpdatedCatagory,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting Catagory API",
                error,
            })

        }
    }



    /****
     * @desc    get one Catagory by Id
     * @route   /api/Catagory/get/:id
     * @method  GET
     * @access  public
     */


    static async getById(req, res) {
        try {
            const { id } = req.params;
            const { error } = CatagoryValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const catagory = await CatagoryModel.findById(id)

            // res.send(catagories)

            if (!catagory) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No Catagory With This Id"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "Catagory Getting Successfully",
                    catagory,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting Catagory API",
                error,
            })

        }
    }

    /****
     * @desc    update Catagory 
     * @route   /api/Catagory/update/:id
     * @method  PUT
     * @access  private
     */

    static async update(req, res) {
        try {

            const { id } = req.params;
            const { name } = req.body;


            const { error } = CatagoryValidation.getByIdValidation({ id, name });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const catagory = await CatagoryModel.findByIdAndUpdate(
                id,
                { name },
                { new: true }   // return catagory after update
            )

            if (!catagory) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No Catagory With This Id"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "Catagory Updated Successfully",
                    catagory,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Updating Catagory API",
                error,
            })

        }
    }


    /****
     * @desc    delete Catagory 
     * @route   /api/Catagory/delete/:id
     * @method  DELETE
     * @access  private
     */

    static async delete(req, res) {
        try {

            const { id } = req.params;

            const { error } = CatagoryValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const products = await ProductModel.find({ catagory_id: id })
            if (products.length !== 0) {

                const result = await ProductController.deleteProducts(products);
                const products2 = await ProductModel.find({ catagory_id: id })

                if (products2.length === 0) {
                    await CatagoryModel.findByIdAndDelete(id)
                } else {
                    await CatagoryModel.findByIdAndUpdate(
                        id,
                        { deleted: true },
                        { new: true }
                    );
                }

                return res.status(200).send({
                    success: true,
                    message: "Catagory Deleted Successfully",
                });
            } else {

                await CatagoryModel.findByIdAndDelete(id)
                return res.status(200).send({
                    success: true,
                    message: "Catagory Deleted Successfully",
                });
            }


        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Deleted Catagory API",
                error,
            })

        }
    }




}

module.exports = CatagoryController