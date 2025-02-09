const express = require("express")

const OrderModel = require("../model/Order")
const ProductModel = require("../model/Product");
const { default: Stripe } = require("stripe");
const { ObjectId } = require("mongodb");
class OrderController {



    /****
     * @desc    Get orders
     * @route    /api/order/get
     * @method  GET
     * @access  private
     */


    static async get(req, res, next) {
        try {
            const customer_id = req.body.id
            const orderProducts = await OrderModel.find({ customer_id: customer_id })
            if (orderProducts.length === 0) {
                const error = new Error("There Is No Products In Order");
                error.status = 404;
                return next(error);

            } else {

                return res.status(200).send({
                    success: true,
                    message: "Products From Order Getting Successfully",
                    orderProducts,
                });
            }

        } catch (err) {
            const error = new Error("Error in Server");
            error.status = 500;
            return next(error);

        }

    }


    /****
     * @desc    Get One order detials
     * @route    /api/order/get:id
     * @method  GET
     * @access  private
     */

    static async getById(req, res) {

    }

    /****
     * @desc    Make Payment
     * @route    /api/order/payment
     * @method  POST
     * @access  private
     */

    static async payment(req, res) {
        try {
            const { Address, cartProducts, totalPrice, id } = req.body

            const products = await Promise.all(
                cartProducts.map(async (el) => {
                    const productInCart = await ProductModel.findById(el.id)
                    if (!productInCart) return null; // تأكد من أن المنتج موجود


                    const product = await ProductModel.findByIdAndUpdate(
                        el.id,
                        { $inc: { numConstomer: 1 } },
                        { new: true }
                    )

                    const detialKey = productInCart.prices.typeKey
                    const detialVlaue = productInCart.prices?.typeValue || [];

                    let detialVlaueSize = null
                    let detialVlauePrice = null
                    detialVlaue.map((el2) => {
                        if (new ObjectId(el.price).equals(el2._id)) {
                            detialVlaueSize = el2.size
                            detialVlauePrice = el2.price
                        }
                    })
                    return {
                        ...el,
                        price: {
                            price: detialVlauePrice,
                            detail: {
                                key: detialKey,
                                value: detialVlaueSize
                            }
                        }
                    }

                })
            )
            const order = await OrderModel.create({
                customer_id: id,
                products: products,
                address: Address,
                totalPrice: totalPrice,
                status: "Processing"
            })
            if (order) {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
                const { paymentMethodId, amount } = req.body;
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount * 100,
                    currency: "usd",
                    payment_method: paymentMethodId,
                    confirm: true,
                    automatic_payment_methods: {
                        enabled: true,
                        allow_redirects: "never", // ⬅️ يمنع Stripe من محاولة إعادة التوجيه
                    },
                });
            }
            res.status(200).json({ success: true });

        } catch (error) {
            console.error("Error : ", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = OrderController