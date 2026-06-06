const { Product } = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({ success: true, data: products });
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, data: product });
});

// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, images, stock } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Product name is required");
  }

  if (price === undefined || price === null) {
    res.status(400);
    throw new Error("Product price is required");
  }

  const product = new Product({
    name: name.trim(),
    description: description?.trim() || "",
    price,
    category: category?.trim() || "",
    images: Array.isArray(images) ? images : [],
    stock: typeof stock === "number" ? stock : 0,
  });

  const created = await product.save();
  res.status(201).json({ success: true, data: created });
});

// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, description, price, category, images, stock } = req.body;

  if (name !== undefined) product.name = name.trim();
  if (description !== undefined) product.description = description.trim();
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category.trim();
  if (images !== undefined && Array.isArray(images)) product.images = images;
  if (stock !== undefined) product.stock = stock;

  const updated = await product.save();
  res.json({ success: true, data: updated });
});

// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();
  res.json({ success: true, data: { id: req.params.id } });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
