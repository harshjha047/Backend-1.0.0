const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
  removeReview,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getProducts);//done
router.get("/:id", getProductById);//not in use kaam frontend me kar liya so //done // not use
router.post("/:productId/reviews", protect, addReview);
router.delete("/:productId/reviews/:reviewId", protect, removeReview);

// Admin routes (later we’ll add auth middleware)
router.post("/",protect, createProduct);
router.patch("/:id",protect, updateProduct);
router.delete("/:id",protect, deleteProduct);

module.exports = router;