const mongoose = require("mongoose");
const { Review } = require("../models/Review");
const { Product } = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

async function updateProductRating(productId) {
  const reviews = await Review.find({ productId });
  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0;

  // Only attempt to update product stats when productId is a valid Mongo ObjectId.
  // In this demo app, frontend products use numeric IDs, so we store productId as string
  // and skip updating the Product document to avoid Cast errors.
  if (Product && Product.findByIdAndUpdate && mongoose.isValidObjectId(productId)) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: Number(averageRating.toFixed(2)),
      reviewCount,
    });
  }
}

// POST /api/products/:id/reviews
const addReview = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { rating, reviewText, userName, userEmail } = req.body;
  const normalizedRating = Number(rating);

  if (!productId) {
    res.status(400);
    throw new Error("Product reference is required");
  }

  if (!Number.isFinite(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
    res.status(400);
    throw new Error("Rating must be a number between 1 and 5");
  }

  if (!userName || !userEmail) {
    res.status(400);
    throw new Error("User name and email are required");
  }

  const review = new Review({
    productId,
    rating: normalizedRating,
    reviewText: reviewText?.trim() || "",
    userName: userName.trim(),
    userEmail: userEmail.trim(),
  });

  const created = await review.save();
  await updateProductRating(productId);

  res.status(201).json({ success: true, data: created });
});

// GET /api/products/:id/reviews
const getProductReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.status(400);
    throw new Error("Product reference is required");
  }

  const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
  res.json({ success: true, data: reviews });
});

// DELETE /api/reviews/:id
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const productId = review.productId;
  await review.deleteOne();
  await updateProductRating(productId);

  res.json({ success: true, data: { id: req.params.id } });
});

module.exports = {
  addReview,
  getProductReviews,
  deleteReview,
};
