const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ReviewValidation = require("../validation/ReviewValidation")

const ReviewModel = require("../model/Review")
const UserModel = require("../model/User")
const ProductModel = require("../model/Product")

const mongoose = require('mongoose');

class ReviewController {

    /****
     * @desc    get all My Review
     * @route   /api/review/get
     * @method  GET
     * @access  private
     */


    static async get (req , res) {
        try{
            const customerId = "6781f53f4660dec2163d0dcb" // get from Token
            const reviews = await ReviewModel.find({customer_id : customerId})  
            if ( reviews.length === 0) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Reviews"
                })
            }else {
                
                await Promise.all(
                    reviews.map(async (review , index) => {

                        const product = await ProductModel.findById(review.product_id);
                        reviews[index] = {
                            ...review._doc, // نسخ البيانات الأصلية للمراجعة
                            product: product || null, 
                        };
                                    
                    })
                  );
                
                return res.status(200).send({
                    success: true,
                    message: "Reviews Getting Successfully",
                    reviews,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Getting Reviews API",
            error,
            })
    
        }
    }


    /****
     * @desc    create new Review
     * @route   /api/review/create
     * @method  POST
     * @access  private
     */

    static async create (req , res ){
        try{
            // after middleware will send the user id in req.body so will be as 
            // const { id , cardName , cardNumber , month , year , cvv } = req.body ;
            // OR
            // const {customer_id } = req.body.id

            const { customer_id ,  product_id , rating , comment , images  } = req.body ;
            
            const {error} = ReviewValidation.getValidation({ customer_id ,  product_id , rating , comment , images  });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findById(product_id)
            if(!product){
                return res.status(404).send({
                    success: false,
                    message: "Product Not Found",
                    error,
                })
            }
            const review = await ReviewModel.create({
                customer_id ,  
                product_id , 
                rating , 
                comment , 
                images 
                
            })
            return res.status(201).json({
                success : true ,
                message : "Review Created Successfully" , 
                
            })

        }catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Creating Review API",
            error,
            })

        }   
    }


    /****
     * @desc    get Review By Id 
     * @route   /api/review/getById
     * @method  GET
     * @access  private
     */


    static async getById (req , res){
        try{
            const { id } = req.params ;
            const {error} = ReviewValidation.idValidation({ id });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            let review = await ReviewModel.findById(id)  
            if ( !review ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Review With This Id"
                })
            }else {
                
                const product = await ProductModel.findById(review.product_id);
                review = {
                    ...review._doc, // نسخ البيانات الأصلية للمراجعة
                    product: product || null, 
                };

                return res.status(200).send({
                    success: true,
                    message: "Reviews Getting Successfully",
                    review,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Getting Review API",
            error,
            })
    
        }   
    }


    /****
     * @desc    Update Review 
     * @route   /api/review/update
     * @method  PUT
     * @access  private
     */

    
    static async update (req , res) {
        try{

            // const {customer_id} = req.body.id      // from token 
            const { id } = req.params ;
            const { customer_id ,  product_id , rating , comment , images  } = req.body ;
            
            const {error} = ReviewValidation.getByIdValidation({id , customer_id ,  product_id , rating , comment , images   });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const product = await ProductModel.findById(product_id)
            if(!product){
                return res.status(404).send({
                    success: false,
                    message: "Product Not Found",
                    error,
                })
            }
 
            let review = await ReviewModel.findByIdAndUpdate(
                id ,
                { customer_id ,  product_id , rating , comment , images },
                { new: true }   // return Address after update
            )  

            if ( !review ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Review With This Id"
                })
            }else {
             
                const product = await ProductModel.findById(review.product_id);
                review = {
                    ...review._doc, // نسخ البيانات الأصلية للمراجعة
                    product: product || null, 
                };
                return res.status(200).send({
                    success: true,
                    message: "Review Updated Successfully",
                    review,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Updating Review API",
            error,
            })

        }   
    }


    /****
     * @desc    Delete Review 
     * @route   /api/review/delete
     * @method  DELETE
     * @access  private
     */
    
    // static async delete (req , res) {
    //     try{

    //         const { id } = req.params ;
    //         const {error} = ReviewValidation.idValidation({ id });
    //         if(error){
    //             return res.status(400).json(error.details[0].message);
    //         }

    //         const review = await ReviewModel.findByIdAndDelete( id )     

    //         if ( !review ) {
    //             return res.status(404).json({
    //                 success : false ,
    //                 message : "There Is No Review With This Id"
    //             })
    //         }else {
    //             return res.status(404).json({
    //                 success : false ,
    //                 message: "Review Deleted Successfully",
    //             })
    //         }

            
    //     } catch (error){
    //         console.log(error);
    //         return res.status(500).send({
    //         success: false,
    //         message: "Error In Deleted Review API",
    //         error,
    //         })

    //     }   
    // }


}

module.exports = ReviewController