const mongoose = require("mongoose");


//schema
const ReviewSchema = new mongoose.Schema(
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

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be between 1 and 5"], // الحد الأدنى للشهر
            max: [5, "Rating must be between 1 and 5"], // الحد الأقصى للشهر
          },

        comment: {
             type: String,
             trim: true, 
             minlength: [2, "Comment must be at least 2 characters"],
             maxlength: [100, "Comment cannot exceed 100 characters"],
     
           },
           
        images: [ {
            type: String,
           }],

     
    },
    { timestamps: true }
  );


  module.exports = mongoose.model("Review" , ReviewSchema ) ;
