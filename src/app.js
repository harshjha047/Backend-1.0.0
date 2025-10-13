const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); 
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "https://div-ecom.netlify.app/",   // your frontend URL
  credentials: true,                 // allow cookies/credentials
}));
app.use(morgan("dev"));
app.use(cookieParser());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);



// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running ✅" });
});

module.exports = app;