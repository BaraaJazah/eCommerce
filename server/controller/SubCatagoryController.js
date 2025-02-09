const SubCatagoryModel = require("../model/SubCatagory")
const ProductModel = require("../model/Product")
const ProductController = require("./ProductController")


const SubCatagoryValidation = require("../validation/SubCatagoryValidation")

class SubCatagoryController {

    /****
     * @desc    create subCatagory
     * @route   /api/subCatagory/create
     * @method  POST
     * @access  Private
     */

    static async create(req, res) {
        try {
            const { catagory_id, name } = req.body;

            const { error } = SubCatagoryValidation.getValidation({ catagory_id, name });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const subCatagory = await SubCatagoryModel.create({
                catagory_id,
                name,
            })
            return res.status(201).json({
                success: true,
                message: "SubCatagory Created Successfully",
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Creating SubCatagory API",
                error,
            })

        }
    }


    /****
     * @desc    get all subCatagory
     * @route   /api/subCatagory/get
     * @method  GET
     * @access  public
     */


    static async get(req, res, next) {
        try {

            const catagories = await SubCatagoryModel.find({})
            if (catagories.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "There Is No Catagory"
                })

                // throw { status: 404, message: "There Is No SubCatagory" };

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
            // next(error);
        }
    }


    /****
     * @desc    get one subCatagory by Id
     * @route   /api/subCatagory/get/:id
     * @method  GET
     * @access  public
     */


    static async getById(req, res) {
        try {
            const { id } = req.params;
            const { error } = SubCatagoryValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const catagory = await SubCatagoryModel.findById(id)
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
     * @desc    update subCatagory 
     * @route   /api/subCatagory/update/:id
     * @method  PUT
     * @access  private
     */

    static async update(req, res) {
        try {

            const { id } = req.params;
            const { name, desc } = req.body;


            const { error } = SubCatagoryValidation.getByIdValidation({ id, name, desc });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const catagory = await SubCatagoryModel.findByIdAndUpdate(
                id,
                { name, desc },
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
     * @desc    delete subCatagory 
     * @route   /api/subCatagory/delete/:id
     * @method  DELETE
     * @access  private
     */

    static async delete(req, res) {
        try {

            const { id } = req.params;

            const { error } = SubCatagoryValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const products = await ProductModel.find({ catagory_id: id })
            if (products.length !== 0) {

                const result = await ProductController.deleteProducts(products);
                const products2 = await ProductModel.find({ catagory_id: id })

                if (products2.length === 0) {
                    await SubCatagoryModel.findByIdAndDelete(id)
                } else {
                    await SubCatagoryModel.findByIdAndUpdate(
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

                await SubCatagoryModel.findByIdAndDelete(id)
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

module.exports = SubCatagoryController