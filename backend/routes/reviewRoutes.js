const express = require("express");
const router = express.Router();
const { addReview, getProductReviews, deleteReview } = require("../controllers/reviewController");
const { ensureAdmin } = require("../middleware/authMiddleware");

// Review routes
router.post("/products/:id/reviews", addReview);
router.get("/products/:id/reviews", getProductReviews);

// Admin can delete any review
router.delete("/reviews/:id", ensureAdmin, deleteReview);

module.exports = router;
