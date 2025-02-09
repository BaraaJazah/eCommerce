const mongoose = require("mongoose");


//schema
const CartSchema = new mongoose.Schema(
    {
        customer_id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User",
             required: [true, "Customer ID is required"],
     
         },
        
         product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required"], 
    
        },

        select: {
            type: Boolean,
            default : true            
          },

        quantity: {
             type: Number,
             min: [1, "Quantity must be at least 0"],
             max : [20 , "Quantity cannot exceed 20"] ,
             default : 1            

           },

        productPrice_id: {
            type: mongoose.Schema.Types.ObjectId,
        },

     
    },
    { timestamps: true }
  );


  module.exports = mongoose.model("Cart" , CartSchema ) ;
