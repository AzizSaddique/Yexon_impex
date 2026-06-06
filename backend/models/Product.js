const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive value"],
      default: 0,
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    averageRating: {
      type: Number,
      min: [0, "Rating must be between 0 and 5"],
      max: [5, "Rating must be between 0 and 5"],
      default: 0,
    },
    reviewCount: {
      type: Number,
      min: [0, "Review count cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
  productSchema,
};
