const ProductModel = require("../model/Product")
const CatagoryModel = require("../model/Catagory")
const SubCatagoryModel = require("../model/SubCatagory")
const WishlistModel = require("../model/WishList")
const ReviewModel = require("../model/Review")
const UserModel = require("../model/User")




const ProductValidation = require("../validation/ProductValidation")


class ProductController {


    /****
     * @desc    get products
     * @route   /api/product/get
     * @method  GET
     * @access  public
     */


    static async get(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const products = await ProductModel.find({ active: true, deleted: false })
                .skip((page - 1) * limit)
                .limit(parseInt(limit));
            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No products"
                })
            } else {

                const lastProduct = await Promise.all(

                    products.map(async (el) => {
                        const reviewsProduct = await ReviewModel.find({ product_id: el.id })
                        let reviewsValue = 0;
                        for await (const el of reviewsProduct) {
                            reviewsValue += el.rating;
                        }
                        el.review = (reviewsValue / reviewsProduct.length).toFixed(1)

                        return {
                            id: el.id,
                            name: el.name,
                            subCatagory_id: el.subCatagory_id,
                            image: el.images[0],
                            review: el.review,
                            numCostomer: el.numConstomer,
                            prices: {
                                typeKey: el.prices.typeKey,
                                typeValue: el.prices.typeValue[0]
                            },
                        }
                    })
                )

                return res.status(200).send({
                    success: true,
                    message: "products Getting Successfully",
                    products: lastProduct,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting products API",
                error,
            })

        }
    }


    /****
     * @desc    get product by Id
     * @route   /api/product/get/:id
     * @method  Get
     * @access  public
     */

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const { error } = ProductValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findById(id)
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No product With This Id"
                })
            } else {
                const wishlistProduct = await WishlistModel.find({ product_id: product.id })
                let reviewsProduct = await ReviewModel.find({ product_id: product.id })

                let reviewsValue = 0;
                reviewsProduct = await Promise.all(
                    reviewsProduct.map(async (el) => {
                        reviewsValue += el.rating;
                        const reviewerData = await UserModel.findById(el.customer_id);
                        el.id = undefined
                        el.customer_id = undefined
                        el.product_id = undefined
                        if (reviewerData) {
                            const { name, surname } = reviewerData;
                            return {
                                ...el.toObject(),
                                reviewerData: { name, surname },
                            };
                        }


                        return el.toObject();
                    })
                );

                product.review = (reviewsValue / reviewsProduct.length).toFixed(1)
                product.love = wishlistProduct.length
                product.sex = undefined
                product.createdAt = undefined
                product.updatedAt = undefined
                product.deleted = undefined
                product.__v = undefined
                // product .review

                return res.status(200).send({
                    success: true,
                    message: "product Getting Successfully",
                    product,
                    reviewsProduct
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting product API",
                error,
            })

        }
    }


    /****
     * @desc    get product by sex type ( "man" , "woman" , "baby" , "unisex")
     * @route   /api/product/getType/
     * @method  Get
     * @access  public
     */

    static async getByType(req, res) {
        try {
            const { sex } = req.body;
            const { error } = ProductValidation.sexValidation({ sex });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const products = await ProductModel.find({ sex: sex })
            if (!products) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No products With This Type"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "products Getting Successfully",
                    products,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting products API",
                error,
            })

        }
    }



    /****
     * @desc    get product by subCatagory 
     * @route   /api/product/getByCatagory/
     * @method  Get
     * @access  public
     */

    static async getByCatagory(req, res) {
        try {
            const id = req.params.id;
            const { error } = ProductValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const products = await ProductModel.find({ subCatagory_id: id, active: true, deleted: false })
            if (products.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "There Is No products With This Type"
                })
            } else {

                const lastProduct = await Promise.all(
                    products.map(async (el) => {
                        const reviewsProduct = await ReviewModel.find({ product_id: el.id })
                        let reviewsValue = 0;
                        for await (const el of reviewsProduct) {
                            reviewsValue += el.rating;
                        }
                        el.review = (reviewsValue / reviewsProduct.length).toFixed(1)
                        return {
                            id: el.id,
                            name: el.name,
                            subCatagory_id: el.subCatagory_id,
                            image: el.images[0],
                            review: el.review,
                            numCostomer: el.numConstomer,
                            prices: {
                                typeKey: el.prices.typeKey,
                                typeValue: el.prices.typeValue[0]
                            },
                        }
                    })
                )

                return res.status(200).send({
                    success: true,
                    message: "products Getting Successfully",
                    products: lastProduct,
                });
            }


        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting products API",
                error,
            })

        }
    }



    /****
     * @desc    get product by search of name
     * @route   /api/product/search
     * @method  POST
     * @access  public
     */


    static async search(req, res) {
        try {
            const { name } = req.body;
            const { error } = ProductValidation.nameValidation({ name });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const products = await ProductModel.find({ name: { $regex: name, $options: 'i' } })   // i : لا تفرق بين الاحرف الكبيرة والصغيرة
            // اي ابحث عن الاسماء التي تحتوي على هذا الاسم

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No products Contain This Name"
                })
            } else {
                const lastProduct = await Promise.all(
                    products.map(async (el) => {
                        const reviewsProduct = await ReviewModel.find({ product_id: el.id })
                        let reviewsValue = 0;
                        for await (const el of reviewsProduct) {
                            reviewsValue += el.rating;
                        }
                        el.review = (reviewsValue / reviewsProduct.length).toFixed(1)
                        return {
                            id: el.id,
                            name: el.name,
                            subCatagory_id: el.subCatagory_id,
                            image: el.images[0],
                            review: el.review,
                            numCostomer: el.numConstomer,
                            prices: {
                                typeKey: el.prices.typeKey,
                                typeValue: el.prices.typeValue[0]
                            },
                        }
                    })
                )

                return res.status(200).send({
                    success: true,
                    message: "products Getting Successfully",
                    products: lastProduct,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting products API",
                error,
            })

        }
    }


    /****
     * @desc    create product
     * @route   /api/product/create
     * @method  POST
     * @access  private
     */

    static async create(req, res) {
        try {
            const { subCatagory_id, name, desc, images, prices, sex, details } = req.body;

            const { error } = ProductValidation.getValidation({ subCatagory_id, name, desc, images, prices, sex, details });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const catagory = await SubCatagoryModel.findById(subCatagory_id)

            if (!catagory) {
                return res.status(404).send({
                    success: false,
                    message: "Catagory Not Found",
                })
            }
            const product = await ProductModel.create({
                subCatagory_id,
                name,
                desc,
                images,
                prices,
                sex,
                details,

            })
            return res.status(201).json({
                success: true,
                message: "Product Created Successfully",

            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Creating Product API",
                error,
            })

        }
    }


    /****
     * @desc    update product
     * @route   /api/product/update/:id
     * @method  PUT
     * @access  private
     */

    static async update(req, res) {
        try {

            const { id } = req.params;
            const { catagory_id, name, desc, images, prices, sex, details } = req.body;

            const { error } = ProductValidation.getByIdValidation({ id, catagory_id, name, desc, images, prices, sex, details });
            if (error) {
                return res.status(400).json(error.details);
            }
            const catagory = await SubCatagoryModel.findById(catagory_id)

            if (!catagory) {
                return res.status(404).send({
                    success: false,
                    message: "Catagory Not Found",
                })
            }

            const product = await ProductModel.findByIdAndUpdate(
                id,
                { catagory_id, name, desc, images, prices, sex, details },
                { new: true }   // return catagory after update
            )

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No product With This Id"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "product Updated Successfully",
                    product,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Updating product API",
                error,
            })

        }
    }


    /****
     * @desc    delete product
     * @route   /api/product/delete/:id
     * @method  DELETE
     * @access  private
     */

    static async delete(req, res) {
        try {

            const { id } = req.params;
            const { error } = ProductValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const productData = await ProductModel.findById(id)

            if (!productData) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No Product With This Id"
                })
            } else {
                const num = productData.numConstomer + productData.review + productData.love;
                if (num === 0) {
                    const product = await ProductModel.findByIdAndDelete(id)
                } else {
                    const product = await ProductModel.findByIdAndUpdate(
                        id,
                        { deleted: true, active: false },
                        { new: true }   // return catagory after update
                    )
                }

                return res.status(200).send({
                    success: true,
                    message: "Product Deleted Successfully",
                });
            }


        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Deleted Product API",
                error,
            })

        }
    }

    /****
     * @desc    active product
     * @route   /api/product/active/:id
     * @method  PUT 
     * @access  private
     */

    static async active(req, res) {
        try {

            const { id } = req.params;

            const { error } = ProductValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findByIdAndUpdate(
                id,
                { active: true },
                { new: true }   // return catagory after update
            )

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No product With This Id"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "product Updated Successfully",
                    product,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Updating product API",
                error,
            })

        }
    }



    /****
     * @desc    disActive product
     * @route   /api/product/disActive/:id
     * @method  PUT
     * @access  private
     */

    static async disActive(req, res) {
        try {

            const { id } = req.params;

            const { error } = ProductValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findByIdAndUpdate(
                id,
                { active: false },
                { new: true }   // return catagory after update
            )

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No product With This Id"
                })
            } else {

                return res.status(200).send({
                    success: true,
                    message: "product Updated Successfully",
                    product,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Updating product API",
                error,
            })

        }
    }



    /****
     * @desc    delete array of products
     * @route   No
     * @method  No
     * @access  private
     */

    static async deleteProducts(products) {
        try {
            if (!Array.isArray(products)) {
                throw new Error("Invalid products array");
            }

            const results = [];

            for (const item of products) {
                const productData = await ProductModel.findById(item.id);

                if (!productData) {
                    results.push({ id: item.id, status: "not found" });
                } else {
                    const num = productData.numConstomer + productData.review + productData.love;

                    if (num === 0) {
                        await ProductModel.findByIdAndDelete(item.id);
                        results.push({ id: item.id, status: "deleted" });
                    } else {
                        await ProductModel.findByIdAndUpdate(
                            item.id,
                            { deleted: true, active: false },
                        );
                        results.push({ id: item.id, status: "updated" });
                    }
                }
            }

            return results;

        } catch (error) {
            console.error("Error during product processing:", error);
            throw error; // إعادة الخطأ للتعامل معه خارجياً
        }
    }

}

module.exports = ProductController;