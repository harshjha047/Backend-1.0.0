const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getProducts);//done
router.get("/:id", getProductById);//not in use kaam frontend me kar liya so //done

// Admin routes (later we’ll add auth middleware)
router.post("/",protect, createProduct);
router.patch("/:id",protect, updateProduct);
router.delete("/:id",protect, deleteProduct);

module.exports = router;