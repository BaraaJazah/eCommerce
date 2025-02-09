const mongoose = require("mongoose");


//schema
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "user name is required"],
        trim: true, 
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
      },
      surname: {
        type: String,
        required: [true, "user name is required"],
        trim: true, 
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
      },
      email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true, 
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [150, "Name cannot exceed 150 characters"],
      },
      phone: {
        type: String,
        required: [true, "phone number is require"],
        unique: true,
      },

      photo: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        trim: true, 
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [100, "Password cannot exceed 100 characters"],
      },

      active: {
        type: Boolean,
        default:false
      },

      hasAddress: {
        type: Boolean,
        default : false
      },

      isAdmin: {
        type: Boolean,
        default: false,
      },

    },
    { timestamps: true }
  );


  module.exports = mongoose.model("User" , userSchema ) ;
