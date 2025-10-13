const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  selectedVariant: {
    color: { type: String },
    size: { type: String },
    // add more variant types if needed
  },
  quantity: { type: Number, default: 1, min: 1 },
  priceAtAddTime: { type: Number, required: true }, // snapshot price when added
  subtotal: { type: Number, required: true },       // quantity * priceAtAddTime
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },
    items: [cartItemSchema],
    totalAmount: { type: Number, default: 0 }, // sum of all subtotals
  },
  { timestamps: true }
);


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
