const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { ensureAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", ensureAdmin, createProduct);
router.put("/:id", ensureAdmin, updateProduct);
router.delete("/:id", ensureAdmin, deleteProduct);

module.exports = router;
