const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createPaymentOrder,
    verifyPayment,
} = require("../controllers/paymentController");

//══════════════════════════════════════
// Create Razorpay Order
//══════════════════════════════════════

router.post(
    "/create-order",
    authMiddleware,
    createPaymentOrder
);

//════════════════════════════════════════
// Verify Razorpay Payment
//════════════════════════════════════════

router.post(
    "/verify",
    authMiddleware,
    verifyPayment
);

module.exports = router;