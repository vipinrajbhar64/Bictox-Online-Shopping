const express = require("express");
const router = express.Router();

const {
    registerUser,
    verifyOTP
} = require("../controllers/authController");

// Register Route
router.post("/register", registerUser);

// Verify OTP
router.post("/verify-otp", verifyOTP);

module.exports = router;