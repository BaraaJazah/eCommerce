const mongoose = require("mongoose");


//schema
const OrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "products id is required"],
        },
        name: {
          type: String,
          required: [true, "products name is required"],
        },
        desc: {
          type: String,
          required: [true, "products desc is required"],
        },
        qunatity: {
          type: Number,
          required: [true, "products qunatity is required"],
        },
        price: {
          price: {
            type: Number,
            required: [true, "products price is required"],
            min: [0, "Price cannot be negative"],
          },
          detail: {
            key: {
              type: String,
              required: [true, "products key is required"],
            },
            value: {
              type: String,
              required: [true, "products value is required"],
            }
          }
        },
        image: {
          type: String,
          required: [true, "products image is required"],
        },

      },
    ],

    address: {
      city: {
        type: String,
        required: [true, "city is required"],
      },
      appartment: {
        type: String,
        required: [true, "appartment is required"],
      },
      district: {
        type: String,
        required: [true, "district  is required"],
      },
      address: {
        type: String,
        required: [true, "address is required"],
      },

    },

    status: {
      type: String,
      trim: true,
    },

    totalPrice: {
      type: Number,
    },



  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);
