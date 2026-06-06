const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "Product reference is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    reviewText: {
      type: String,
      trim: true,
      default: "",
    },
    userName: {
      type: String,
      trim: true,
      required: [true, "User name is required"],
    },
    userEmail: {
      type: String,
      trim: true,
      required: [true, "User email is required"],
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  Review,
  reviewSchema,
};
