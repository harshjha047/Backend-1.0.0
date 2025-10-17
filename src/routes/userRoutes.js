const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile,getAddresses,addAddress,updateAddress,deleteAddress, getWishlist , addToWishlist, removeFromWishlist, requestReset, resetPassword, logoutUser} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware"); // middleware to protect routes


const router = express.Router();



// Register user
router.post("/register", registerUser); //done

// Login user
router.post("/login", loginUser); //done
router.post("/logout", protect, logoutUser); //done

// Reset Password
router.post("/request-reset", requestReset);//done
router.patch("/reset-password", resetPassword);//done

// User profile (protected route)
router.get("/me", protect, getUserProfile);//done
router.patch("/me", protect, updateUserProfile);//done

// Addresses
router.get("/addresses", protect, getAddresses);//done
router.post("/address", protect, addAddress);//done
router.delete("/addresses/:addressId", protect, deleteAddress);//done
router.put("/addresses/:addressId", protect, updateAddress); //done

//Wishlist
router.get("/wishlist", protect, getWishlist); //done
router.post("/wishlist/:productId", protect, addToWishlist); //done
router.delete("/wishlist/:productId", protect, removeFromWishlist); //done

module.exports = router;