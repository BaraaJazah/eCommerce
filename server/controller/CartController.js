const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CartValidation = require("../validation/CartValidation")

const CartModel = require("../model/Cart")
const AddressModel = require("../model/Address")
const BankCardModel = require("../model/BankCard")
const ProductModel = require("../model/Product");

class CartController {


    /****
     * @desc    get My Cart Product
     * @route   /api/cart/get
     * @method  GET
     * @access  private
     */


    static async get(req, res, next) {
        try {

            const customer_id = req.body.id
            const cartProducts = await CartModel.find({ customer_id: customer_id })
            if (cartProducts.length === 0) {

                const error = new Error("There Is No Products In Cart");
                error.status = 404;
                return next(error);

            } else {
                await Promise.all(
                    cartProducts.map(async (cartProduct, index) => {
                        const product = await ProductModel.findById(cartProduct.product_id);
                        cartProducts[index] = {
                            ...cartProduct._doc,
                            product: product || null,
                        };

                    })
                );
                const cartPlusTotalPrice = await CartController.totalPrice(cartProducts)

                return res.status(200).send({
                    success: true,
                    message: "Products From Cart Getting Successfully",
                    cartPlusTotalPrice,
                });
            }

        } catch (err) {

            const error = new Error("Error in Server");
            error.status = 500;
            return next(error);

        }
    }


    /****
     * @desc    create new Product in Cart
     * @route   /api/cart/create
     * @method  POST
     * @access  private
     */

    static async create(req, res, next) {
        try {

            const customer_id = req.body.id
            const { product_id, productPrice_id } = req.body;

            const { error } = CartValidation.getValidation({ customer_id, product_id, productPrice_id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findById(product_id)
            if (!product) {
                const error = new Error("Product Not Found");
                error.status = 404;
                return next(error);
            }

            const productInCart = await CartModel.find({ customer_id, product_id, productPrice_id })
            if (productInCart.length > 0) {

                if (productInCart[0].quantity < 20) {
                    await CartModel.findByIdAndUpdate(
                        productInCart[0].id,
                        { $inc: { quantity: 1 } },
                        { new: true }
                    )
                } else {
                    const error = new Error("You Can't Add More Than 20 Item From Same Product");
                    error.status = 400;
                    return next(error);

                }
            } else {
                const productInCart = await CartModel.create({
                    customer_id,
                    product_id,
                    productPrice_id,

                })
                if (productInCart)
                    return res.status(200).json({
                        success: true,
                        message: "product Added To Cart Successfully",
                        id: productInCart.id,
                        quantity: 1
                    })
            }

            if (productInCart) {
                return res.status(200).json({
                    success: true,
                    message: "product Added To Cart Successfully",
                    id: productInCart[0].id,
                    quantity: productInCart[0].quantity + 1
                })
            } else {
                const error = new Error("Error In Adding product To Cart API")
                error.status = 500
                return next(error)

            }

        } catch (err) {
            const error = new Error(err)
            error.status = 500
            return next(error)
        }
    }

    /****
     * @desc    get Qunatity for Cart Product
     * @route   /api/cart/getQunatity
     * @method  GET
     * @access  private
     */


    static async getQunatity(req, res, next) {
        try {
            const customer_id = req.body.id
            const cartProducts = await CartModel.find({ customer_id: customer_id })
            if (cartProducts.length === 0) {
                const error = new Error("There Is No Products In Cart");
                error.status = 404;
                return next(error);

            } else {
                let cartProductsQuantity = [];
                for (let index = 0; index < cartProducts.length; index++) {
                    const data = {
                        id: cartProducts[index].id,
                        quantity: cartProducts[index].quantity
                    }
                    cartProductsQuantity.push(data)
                }
                return res.status(200).send({
                    success: true,
                    message: "Products From Cart Getting Successfully",
                    data: cartProductsQuantity
                });
            }
        } catch (err) {
            const error = new Error("Error in Server");
            error.status = 500;
            return next(error);
        }
    }


    /****
     * @desc    Delete Product In Cart 
     * @route   /api/cart/delete
     * @method  DELETE
     * @access  private
     */

    static async delete(req, res, next) {
        try {

            const { id } = req.params;
            const { error } = CartValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const productInCart = await CartModel.findByIdAndDelete(id)

            if (!productInCart) {
                const error = new Error("TheThere Is No Product In Cart With This Id");
                error.status = 404;
                return next(error);

            } else {

                req.body.customer_id = productInCart.customer_id;  // from token
                CartController.get(req, res, next);
            }


        } catch (err) {
            const error = new Error("Error In Deleted Product From Cart API");
            error.status = 500;
            return next(error);
        }
    }


    /****
 * @desc    Delete Product In Cart 
 * @route   api/cart/deleteAllCard
 * @method  DELETE
 * @access  private
 */

    static async deleteAllCard(req, res, next) {
        try {

            const { id, cartIds } = req.body;

            const returnCartIds = cartIds.unSelectCartIds
            const cartId = cartIds.cartProductIds
            const { error } = CartValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            if (cartId.length > 0) {

                cartId.map(async (el) => {
                    const productInCart = await CartModel.findById(el)
                    if (productInCart) {
                        await CartModel.findByIdAndDelete(el)
                    }

                })

                return res.status(200).json({
                    result: "success",
                    unSelectCartIds: returnCartIds
                })

            } else {
                const error = new Error("Cart Is Empty");
                error.status = 404;
                return next(error);
            }


        } catch (err) {
            const error = new Error("Error In Deleted Product From Cart API");
            error.status = 500;
            return next(error);
        }
    }

    /****
     * @desc    Update Quantity for Product In Cart 
     * @route   /api/cart/updateQuan
     * @method  PUT
     * @access  private
     */

    static async updateQuantity(req, res, next) {
        try {
            const { id } = req.params;
            const { ope } = req.body
            const { error } = CartValidation.opeValidation({ id, ope });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const cartItem = await CartModel.findById(id);
            if (!cartItem) {
                const error = new Error("Cart item not found");
                error.status = 404;
                return next(error);
            }

            let opeNum;
            if (ope === "+" && cartItem.quantity < 20) {
                opeNum = 1;

            } else if (ope === "-" && cartItem.quantity > 1) {
                opeNum = -1;
            } else {
                opeNum = 0;
            }

            const cartProducts = await CartModel.findByIdAndUpdate(
                id,
                { $inc: { quantity: opeNum } },
                { new: true }
            )
            if (!cartProducts) {
                const error = new Error("Error In Selected Products From Cart API");
                error.status = 404;
                return next(error);
            } else {
                req.body.customer_id = cartProducts.customer_id;
                CartController.get(req, res, next);

            }


        } catch (err) {
            const error = new Error("Error In Selected Products From Cart API");
            error.status = 500;
            return next(error);

        }
    }

    /****
     * @desc    Calculate Totla Price For Product In Cart 
     * @route   No
     * @method  PUT
     * @access  Auto
     */

    static async totalPrice(cartProducts) {
        try {
            let totalPrice = 0;

            await Promise.all(
                cartProducts.map(async (cartProduct, index) => {

                    const quantity = cartProduct.quantity
                    const pricesTypeName = cartProduct.product.prices.typeKey;
                    const pricesTypeVlaue = cartProduct.product.prices.typeValue;
                    let priceDetials;


                    for (let i = 0; i < pricesTypeVlaue.length; i++) {
                        if (pricesTypeVlaue[i]._id.equals(cartProduct.productPrice_id)) {
                            priceDetials = pricesTypeVlaue[i];
                        }
                    }

                    const totalProductPrice = (quantity * priceDetials.price)
                    if (cartProduct.select == true) {

                        totalPrice = totalPrice + totalProductPrice
                    }

                    cartProduct["productPriceDetials"] = {
                        ...cartProduct._doc, // نسخ البيانات الأصلية للمراجعة
                        priceDetials: priceDetials || null,
                        pricesTypeName: pricesTypeName || null,
                        totalProductPrice: totalProductPrice || null,
                    };
                })
            );

            return {
                cartProducts: cartProducts,
                totalPrice: totalPrice
            }

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Error In Getting Products From Cart API",
                error,
            })

        }
    }


    /****
     * @desc    Select And Unselect Product In Cart  
     * @route    /api/cart/updateSelect/:id
     * @method  PUT
     * @access  private
     */

    static async updateSelect(req, res, next) {

        try {
            const { id } = req.params;
            const { select } = req.body

            const { error } = CartValidation.selectValidation({ id, select });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const cartItem = await CartModel.findById(id);
            if (!cartItem) {
                const error = new Error("Cart item not found");
                error.status = 404;
                return next(error);
            }


            const cartProducts = await CartModel.findByIdAndUpdate(
                id,
                { select },
                { new: true }
            )
            if (!cartProducts) {
                const error = new Error("Error In Selected Products From Cart API");
                error.status = 404;
                return next(error);

            } else {
                req.body.customer_id = cartProducts.customer_id;   // from token
                CartController.get(req, res, next);

            }


        } catch (err) {
            const error = new Error("Error In Selected Products From Cart API");
            error.status = 500;
            return next(error);
        }



    }


    /****
     * @desc    Select And Unselect Product In Cart  
     * @route    /api/cart/confirm
     * @method  GET
     * @access  private
     */

    static async confirm(req, res) {
        const { customer_id } = req.body    // get from Token
        const Addresses = await AddressModel.find({ customer_id: customer_id })
        const BankKarts = await BankCardModel.find({ customer_id: customer_id })

        req.body.Addresses = Addresses;
        req.body.BankKarts = BankKarts;

        const cartPlusTotalPrice = await CartController.get(req, res)
    }


}

module.exports = CartController