const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize") ;
const rateLimit = require("express-rate-limit") ;
const helmet  = require("helmet") ;

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); 
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middlewares
app.use(express.json({ limit: "10kb" }));
const allowedOrigins = [
  "http://localhost:5173", // dev (vite)
  "http://localhost:3000",
  "https://div-ecom.netlify.app",
  "https://div-0-0-1.vercel.app" // production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed by server"));
  },
  credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // 200 requests per 15 min per IP
  message: "Too many requests, please try again later.",
});
app.use(limiter);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));


app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});


// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running ✅" });
});

module.exports = app;