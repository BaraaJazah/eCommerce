const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BankCardValidation = require("../validation/BankCardValidation")
const BankCardModel = require("../model/BankCard")
const UserModel = require("../model/User")


class AddressController {

    /****
     * @desc    get Bank Card
     * @route   /api/bankCard/get
     * @method  GET
     * @access  private
     */


    static async get (req , res) {
        try{
            const bankCards = await BankCardModel.find({})  
            if ( bankCards.length === 0) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Bank Cards"
                })
            }else {
                
                return res.status(200).send({
                    success: true,
                    message: "Bank Cards Getting Successfully",
                    bankCards,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Getting Bank Cards API",
            error,
            })
    
        }
    }


    /****
     * @desc    create Bank Card
     * @route   /api/bankCard/create
     * @method  POST
     * @access  private
     */

    static async create (req , res ){
        try{
            // after middleware will send the user id in req.body so will be as 
            // const { id , cardName , cardNumber , month , year , cvv } = req.body ;
            // OR
            // const {customer_id } = req.body.id

            const { customer_id ,  cardName , cardNumber , month , year , cvv } = req.body ;
            
            const {error} = BankCardValidation.getValidation({ customer_id ,  cardName , cardNumber , month , year , cvv });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const bankCard = await BankCardModel.create({
                customer_id ,  
                cardName , 
                cardNumber , 
                month , 
                year , 
                cvv
                
            })
            return res.status(201).json({
                success : true ,
                message : "Bank Card Created Successfully" , 
                
            })

        }catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Creating Bank Card API",
            error,
            })

        }   
    }


    /****
     * @desc    get Bank Card By Id 
     * @route   /api/bankCard/getById
     * @method  GET
     * @access  private
     */


    static async getById (req , res){
        try{
            const { id } = req.params ;
            const {error} = BankCardValidation.idValidation({ id });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const bankCard = await BankCardModel.findById(id)  
            if ( !bankCard ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Bank Card With This Id"
                })
            }else {
                
                return res.status(200).send({
                    success: true,
                    message: "Bank Card Getting Successfully",
                    bankCard,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Getting Bank Card API",
            error,
            })
    
        }   
    }


    /****
     * @desc    Update Bank Card 
     * @route   /api/bankCard/update
     * @method  PUT
     * @access  private
     */

    
    // static async update (req , res) {
    //     try{

    //         // const {customer_id} = req.body.id      // from token 
    //         const { id } = req.params ;
    //         const { customer_id ,  cardName , cardNumber , month , year , cvv } = req.body ;
            
    //         const {error} = BankCardValidation.getByIdValidation({id , customer_id ,  cardName , cardNumber , month , year , cvv   });
    //         if(error){
    //             return res.status(400).json(error.details[0].message);
    //         }
 
    //         const bankCard = await BankCardModel.findByIdAndUpdate(
    //             id ,
    //             { customer_id ,  cardName , cardNumber , month , year , cvv  },
    //             { new: true }   // return Address after update
    //         )  

    //         if ( !bankCard ) {
    //             return res.status(404).json({
    //                 success : false ,
    //                 message : "There Is No Bank Card With This Id"
    //             })
    //         }else {
             
    //             return res.status(200).send({
    //                 success: true,
    //                 message: "Bank Card Updated Successfully",
    //                 bankCard,
    //                 });
    //             }
            
    //     } catch (error){
    //         console.log(error);
    //         return res.status(500).send({
    //         success: false,
    //         message: "Error In Updating Bank Card API",
    //         error,
    //         })

    //     }   
    // }



    /****
     * @desc    Delete Bank Card 
     * @route   /api/bankCard/delete
     * @method  DELETE
     * @access  private
     */
    
    static async delete (req , res) {
        try{

            const { id } = req.params ;

            const {error} = BankCardValidation.idValidation({ id });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const bankCard = await BankCardModel.findByIdAndDelete( id )     

            if ( !bankCard ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Bank Card With This Id"
                })
            }else {
                return res.status(404).json({
                    success : false ,
                    message: "Bank Card Deleted Successfully",
                })
            }

            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Deleted Bank Card API",
            error,
            })

        }   
    }


}

module.exports = AddressController