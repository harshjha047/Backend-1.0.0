const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");   
const { admin } = require("../middlewares/authMiddleware");
//ghante ka route hai user wale pe jao iska koi kaam nahi hai 

//Public
router.post("/register", registerUser);
router.post("/login", loginUser);

//Private
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
});

//Admin Route
router.get("/admin-test", protect, admin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
