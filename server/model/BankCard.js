const mongoose = require("mongoose");


//schema
const BankCardSchema = new mongoose.Schema(
    {
       customer_id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User",
             required: [true, "Customer ID is required"], // تأكد من وجود المرجع
     
         },
        cardName: {
             type: String,
             required: [true, "Kart Name is required"],
             trim: true, 
             minlength: [2, "Kart Name must be at least 2 characters"],
             maxlength: [100, "Kart Name cannot exceed 100 characters"],
             match: [/^[a-zA-Z\u0600-\u06FF\s\-]+$/, "District name must only contain letters, spaces, and hyphens"], //  مافي ارقام فقط احرف ورمز - و مسطرة
     
           },
     
        cardNumber: {
             type: String,
             required: [true, "Kart Number is required"],
             trim: true, // إزالة المسافات الزائدة
             minlength: [16, "Kart Number must be at least 16 characters"],
             maxlength: [16, "Kart Number cannot exceed 16 characters"],
             match: [/^[0-9\s\-]+$/, "Kart number must contain only numbers, spaces, and hyphens"], // السماح بالأرقام والمسافات والشرطات

           },
    
        month: {
             type: Number,
             required: [true, "Month is required"],
             min: [1, "Month must be between 1 and 12"], // الحد الأدنى للشهر
             max: [12, "Month must be between 1 and 12"], // الحد الأقصى للشهر
     
           },
     
        year: {
             type: Number,
             required: [true, "Address is required"],
             min: [2024, "Year of birth must be after 1900"], 

           },
     
        cvv: {
             type: Number,
             required: [true, "Address Head is required"],
             min: [100, "Code must be exactly 3 digits"], // الحد الأدنى
             max: [999, "Code must be exactly 3 digits"], // الحد الأقصى

           },
     
    },
    { timestamps: true }
  );


  module.exports = mongoose.model("BankCard" , BankCardSchema ) ;
