const mongoose = require("mongoose");


//schema
const AddressSchema = new mongoose.Schema(
    {

    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Customer ID is required"], // تأكد من وجود المرجع

    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true, 
        minlength: [2, "City name must be at least 2 characters"],
        maxlength: [100, "City name cannot exceed 100 characters"],
        match: [/^[a-zA-Z\u0600-\u06FF\s\-]+$/, "District name must only contain letters, spaces, and hyphens"], //  مافي ارقام فقط احرف ورمز - و مسطرة

      },

    region: {
        type: String,
        required: [true, "Region is required"],
        trim: true, // إزالة المسافات الزائدة
        minlength: [2, "Region must be at least 2 characters"],
        maxlength: [100, "Region cannot exceed 100 characters"],
      },

    district: {
        type: String,
        required: [true, "District is required"],
        trim: true, // إزالة المسافات الزائدة
        minlength: [2, "District must be at least 2 characters"],
        maxlength: [100, "District cannot exceed 100 characters"],

      },

    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true, // إزالة المسافات الزائدة
        minlength: [2, "Address must be at least 2 characters"],
        maxlength: [300, "Address cannot exceed 300 characters"],
      },

    addressHead: {
        type: String,
        required: [true, "Address Head is required"],
        trim: true, // إزالة المسافات الزائدة
        minlength: [2, "Address Head must be at least 2 characters"],
        maxlength: [100, "Address Head cannot exceed 100 characters"],
      },


    },


    { timestamps: true }
  );


  module.exports = mongoose.model("Address" , AddressSchema ) ;
