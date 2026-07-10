const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
    registerUser,
    verifyOTP,
    loginUser,
    getProfile,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController");

//══════════════════════════════════
// Register Route
//══════════════════════════════════

router.post("/register", registerUser);

//══════════════════════════════════
//Verify OTP
//══════════════════════════════════

router.post("/verify-otp", verifyOTP);

//══════════════════════════════════
// Login Route
//══════════════════════════════════

router.post("/login", loginUser);

//══════════════════════════════════
// Profile Route
//══════════════════════════════════

router.get("/profile", authMiddleware, getProfile);

//══════════════════════════════════
// Forgot Password Route
//══════════════════════════════════

router.post("/forgot-password", forgotPassword);

//═══════════════════════════════════
// Reset Password Route
//═══════════════════════════════════

router.post("/reset-password", resetPassword);

module.exports = router;