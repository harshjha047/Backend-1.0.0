const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { getCart, addToCart, removeFromCart, deleteCartItem } = require("../controllers/cartController");

router.route("/").get(protect, getCart);//done
router.route("/add").post(protect, addToCart);//done
router.route("/remove").post(protect, removeFromCart);//done
router.route("/delete").post(protect, deleteCartItem);//done

module.exports = router;
