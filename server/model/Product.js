const mongoose = require("mongoose");


//schema
const productSchema = new mongoose.Schema(
  {

    subCatagory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCatagory",
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [150, "Name cannot exceed 150 characters"],
    },

    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [2, "Description must be at least 2 characters"],
      maxlength: [300, "Description cannot exceed 300 characters"],
    },

    images: [{
      type: String,
      required: [true, "Image is required"],
    }],

    prices: {
      typeKey: {
        type: String,
        required: ["keyVlaue is required"],
        trim: true,
        minlength: [2, "keyVlaue must be at least 2 characters"],
        maxlength: [50, "keyVlaue cannot exceed 50 characters"],
      },
      typeValue: [{

        size: {
          type: String,
          required: ["size is required"],
          trim: true,
          minlength: [2, "size must be at least 2 characters"],
          maxlength: [50, "size cannot exceed 50 characters"],
        },
        price: {
          type: Number,
          required: ["Price is required"],
          min: [0, "Price must be at least 0"],

        },
        oldPrice: {
          type: Number,
          min: [0, "Old Price must be at least 0"],

        },
        quantity: {
          type: Number,
          required: ["quantity is required"],
          min: [1, "quantity must be at least 1"],
        }
      }]
    }
    ,

    sex: {
      type: String,
      required: [true, "sex type is required"],
      enum: ["man", "woman", "baby", "unisex"],
    },

    review: {
      type: Number,
      default: 0.0,
      min: [0, "Review must be at least 0"],
      max: [5, "Review must not exceed 5"],

    },

    love: {
      type: Number,
      default: 0,
    },

    numConstomer: {
      type: Number,
      default: 0
    },

    active: {
      type: Boolean,
      default: true
    },

    deleted: {
      type: Boolean,
      default: false
    },

    details: [{
      key: {
        type: String,
        required: ["Attribute is required"],
        trim: true,
        minlength: [2, "Attribute must be at least 2 characters"],
        maxlength: [100, "Attribute cannot exceed 100 characters"],
      },
      value: {
        type: String,
        required: ["Explane is required"],
        trim: true,
        minlength: [2, "Explane must be at least 2 characters"],
        maxlength: [150, "Explane cannot exceed 150 characters"],
      }
    }],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);
