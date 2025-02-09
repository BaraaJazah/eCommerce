const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AddressValidation = require("../validation/AddressValidation")
const AddressModel = require("../model/Address")
const UserModel = require("../model/User")


class AddressController {

    /****
     * @desc    get adderss
     * @route   /api/address/get
     * @method  GET
     * @access  private
     */


    static async get (req , res) {
        try{
            const addresses = await AddressModel.find({})  
            if ( addresses.length === 0) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Addresses"
                })
            }else {
                
                return res.status(200).send({
                    success: true,
                    message: "Addresses Getting Successfully",
                    addresses,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Getting Address API",
            error,
            })
    
        }
    }


    /****
     * @desc    create adderss
     * @route   /api/address/create
     * @method  POST
     * @access  private
     */

    static async create (req , res ){
        try{
            // after middleware will send the user id in req.body so will be as 
            // const { id ,  city , region , district , address , addressHead } = req.body ;
            // const {customer_id } = req.body.id

            const { customer_id ,  city , region , district , address , addressHead } = req.body ;
            
            const {error} = AddressValidation.getValidation({ customer_id ,  city , region , district , address , addressHead });
            if(error){
                return res.status(400).json(error.details[0].message);
            }
            const user = await UserModel.findById(customer_id)

            if(!user){
                return res.status(404).send({
                success: false,
                message: "Address Not Found",
            })
            }
            const Address = await AddressModel.create({
                customer_id ,  
                city , 
                region , 
                district , 
                address , 
                addressHead 
                
            })
            return res.status(200).json({
                success : true ,
                message : "Address Created Successfully" , 
                
            })

        }catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Creating Address API",
            error,
            })

        }   
    }


    /****
     * @desc    get adderss By Id 
     * @route   /api/address/getById
     * @method  GET
     * @access  private
     */


    static async getById (req , res){
        try{
            const { id } = req.params ;
            const {error} = AddressValidation.idValidation({ id });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const address = await AddressModel.findById(id)  
            if ( !address ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Address With This Id"
                })
            }else {
                
                return res.status(200).send({
                    success: true,
                    message: "Address Getting Successfully",
                    address,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Getting address API",
            error,
            })
    
        }   
    }


    /****
     * @desc    Update adderss 
     * @route   /api/address/update
     * @method  PUT
     * @access  private
     */

    
    static async update (req , res) {
        try{

            // const {customer_id} = req.body.id      // from token 
            const { id } = req.params ;
            const { customer_id ,  city , region , district , address , addressHead} = req.body ;
            
            const {error} = AddressValidation.getByIdValidation({id , customer_id ,  city , region , district , address , addressHead   });
            if(error){
                return res.status(400).json(error.details[0].message);
            }
 
            const Address = await AddressModel.findByIdAndUpdate(
                id ,
                
                {  customer_id ,  city , region , district , address , addressHead },
                { new: true }   // return Address after update
            )  

            if ( !Address ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Address With This Id"
                })
            }else {
             
                return res.status(200).send({
                    success: true,
                    message: "Address Updated Successfully",
                    Address,
                    });
                }
            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Updating Address API",
            error,
            })

        }   
    }



    /****
     * @desc    Delete adderss 
     * @route   /api/address/delete
     * @method  DELETE
     * @access  private
     */
    
    static async delete (req , res) {
        try{

            const { id } = req.params ;

            const {error} = AddressValidation.idValidation({ id });
            if(error){
                return res.status(400).json(error.details[0].message);
            }

            const address = await AddressModel.findByIdAndDelete( id )     

            if ( !address ) {
                return res.status(404).json({
                    success : false ,
                    message : "There Is No Address With This Id"
                })
            }else {
                return res.status(404).json({
                    success : false ,
                    message: "Product Deleted Successfully",
                })
            }

            
        } catch (error){
            console.log(error);
            return res.status(500).send({
            success: false,
            message: "Error In Deleted Address API",
            error,
            })

        }   
    }


}

module.exports = AddressController