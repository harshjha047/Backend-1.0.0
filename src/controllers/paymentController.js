// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // @desc    Create Stripe Checkout Session
// // @route   POST /api/payment/create-checkout-session
// // @access  Private (but can be public too)
// const createCheckoutSession = async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // Format items for Stripe
//     const line_items = cartItems.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//           images: [item.image], // optional
//         },
//         unit_amount: Math.round(item.new_price * 100), // convert ₹ to paise
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//       shipping_address_collection: { allowed_countries: ["IN"] },
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe Checkout Error:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { createCheckoutSession };
