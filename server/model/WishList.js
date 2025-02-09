const mongoose = require("mongoose");


//schema
const WishListSchema = new mongoose.Schema(
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
     
    },
    { timestamps: true }
  );


  module.exports = mongoose.model("WishList" , WishListSchema ) ;
