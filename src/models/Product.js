const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      // maxLength: 30,
      minLength: [10, "Title can not be more than 10 characters"],
      required: [true, "Please add a title"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Please add a price"],
    },
    description: {
      type: String,
      minLength: [30, "Description should be more than 30 characters"],
      trim: true,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      maxLength: [15, "Category can not be more than 15 characters"],
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
