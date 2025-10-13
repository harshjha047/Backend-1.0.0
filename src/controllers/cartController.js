const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Get user cart
const getCart = async (req, res) => {
const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
  res.json(cart);
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, selectedVariant, quantity, productName } = req.body;

    // Get product price
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const priceAtAddTime = product.new_price;
    const subtotal = priceAtAddTime * quantity;

    // Find user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create cart if it doesn't exist
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            selectedVariant,
            quantity,
            priceAtAddTime,
            subtotal,
            productName,
          },
        ],
        totalAmount: subtotal,
      });
      await User.findByIdAndUpdate(userId, { cart: cart._id });
    } else {
      // Check if same product + variant exists
      const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (existingItemIndex > -1) {
        // Increment quantity & update subtotal
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].subtotal =
          cart.items[existingItemIndex].quantity * priceAtAddTime;
      } else {
        // Add new item
        cart.items.push({
          productId,
          selectedVariant,
          quantity,
          priceAtAddTime,
          subtotal,
          productName,
        });
      }

      // Update totalAmount
      cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subtotal,0);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove or decrement item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, selectedVariant, productName } = req.body;

    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    // Decrease quantity or remove item
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
      cart.items[itemIndex].subtotal =
        cart.items[itemIndex].quantity * cart.items[itemIndex].priceAtAddTime;
    } else {
      // Remove the item entirely if quantity is 1
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    await cart.save();

    // Populate cart items for response
    const populatedCart = await Cart.findById(cart._id).populate({
      path: "items.productId",
      select: "name new_price images.url",
    });

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Update item quantity
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    // Find user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item index
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    // Remove the item
    cart.items = cart.items.filter((_, index) => index !== itemIndex);

    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    await cart.save();

    // Populate cart items for response
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("delete from cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { getCart, addToCart, removeFromCart, deleteCartItem };
