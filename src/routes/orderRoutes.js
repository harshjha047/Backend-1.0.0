const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Create new order
router.post("/", protect, addOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Update order to paid
router.put("/:id/pay", protect, updateOrderToPaid);

// Update order to delivered (Admin only)
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

// Get all orders (Admin only)
router.get("/", protect, admin, getOrders);

module.exports = router;
