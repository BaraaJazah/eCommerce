const mongoose = require("mongoose");


//schema
const subCatagorySchema = new mongoose.Schema(
    {
        catagory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Catagory",
        },

        name: {
            type: String,
            required: [true, "user name is required"],
            trim: true,
            minlength: [2, "name must be at least 2 characters"],
            maxlength: [100, "name cannot exceed 100 characters"],
        },

        deleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("SubCatagory", subCatagorySchema);
