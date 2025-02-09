const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const WishListValidation = require("../validation/WishListValidation")
const CartController = require("../controller/CartController")

const WishListModel = require("../model/WishList")
const ProductModel = require("../model/Product")
const ReviewModel = require("../model/Review")



const mongoose = require('mongoose');

class ReviewController {

    /****
     * @desc    get all Product In My Wish List
     * @route   /api/wishList/get
     * @method  GET
     * @access  private
     */


    static async get(req, res) {
        try {
            const customer_id = req.body.id
            const wishListProducts = await WishListModel.find({ customer_id: customer_id })
            if (wishListProducts.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No Products Wishlist"
                })
            } else {

                await Promise.all(
                    wishListProducts.map(async (el, index) => {

                        let reviewsProduct = await ReviewModel.find({ product_id: el.product_id })
                        let reviewsValue = 0;

                        await Promise.all(
                            reviewsProduct.map(async (el) => {
                                reviewsValue += el.rating;
                            })
                        );

                        const product = await ProductModel.findById(el.product_id);
                        product.review = (reviewsValue / reviewsProduct.length).toFixed(1);
                        wishListProducts[index] = {
                            ...el._doc, // نسخ البيانات الأصلية للمراجعة
                            product: product || null,
                        };

                    })
                );

                return res.status(200).send({
                    success: true,
                    message: "Products From Wish List Getting Successfully",
                    wishListProducts,
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Getting Products From Wish List API",
                error,
            })

        }
    }


    /****
     * @desc    create new Product In Wish List
     * @route   /api/wishList/create
     * @method  POST
     * @access  private
     */

    static async create(req, res) {
        try {
            const customer_id = req.body.id
            const { product_id } = req.body;

            const { error } = WishListValidation.getValidation({ customer_id, product_id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findById(product_id)
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: "Product Not Found",
                    error,
                })
            }
            const isWishListproduct = await WishListModel.find({ customer_id: customer_id, product_id: product_id })
            if (isWishListproduct.length === 0) {
                const wishListproduct = await WishListModel.create({
                    customer_id,
                    product_id,
                })
                if (wishListproduct) {
                    return res.status(200).json({
                        success: true,
                        message: "product Added To Wishlist Successfully",
                        id: wishListproduct.product_id
                    })
                } else {
                    return res.status(400).json({
                        success: true,
                        message: "Error In Adding product To Wishlist API",
                    })
                }
            } else {
                const id = isWishListproduct[0].product_id
                const wishListproduct = await WishListModel.findByIdAndDelete(isWishListproduct[0].id)
                if (wishListproduct) {
                    return res.status(200).json({
                        success: true,
                        message: "product Deleted Sussecfully",
                        id: id
                    })
                }

            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Adding product To Wish List API",
                error,
            })

        }
    }




    /****
     * @desc    Delete Product from Wish List 
     * @route   /api/wishlist/delete/:id
     * @method  DELETE
     * @access  private
     */

    static async delete(req, res) {
        try {

            const { id } = req.params;
            const { error } = WishListValidation.idValidation({ id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const wishListproduct = await WishListModel.findByIdAndDelete(id)

            if (!wishListproduct) {
                return res.status(404).json({
                    success: false,
                    message: "There Is No product In Wishlist With This Id"
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "product Deleted From Wishlist Successfully",
                })
            }


        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Deleting product From Wishlist API",
                error,
            })

        }
    }


    /****
     * @desc    Add Product from Wish List To Cart 
     * @route   /api/wishlist/addToCart/:id
     * @method  POST
     * @access  private
     */

    static async addToCart(req, res) {
        try {

            const { id } = req.params;
            const { customer_id, product_id, productPrice_id } = req.body;

            const { error } = WishListValidation.addToCartValidation({ id, customer_id, product_id, productPrice_id });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            await CartController.create(req, res);

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In Deleting product From Wishlist API",
                error,
            })

        }
    }

}

module.exports = ReviewController