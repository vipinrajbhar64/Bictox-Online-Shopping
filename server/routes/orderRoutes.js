const express = require("express");
const router = express.Router();


const {
    buyNow,
    placeOrder,
    getOrderHistory,
    getSingleOrder,
    updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");

//═══════════════════════════════
// Buy Now
//═══════════════════════════════
router.post("/buy-now", authMiddleware, buyNow);

//═══════════════════════════════
// Place Order
//═══════════════════════════════

router.post("/place-order", authMiddleware, placeOrder);

//═══════════════════════════════
// Order History
//═══════════════════════════════

router.get("/", authMiddleware, getOrderHistory);

//═══════════════════════════════
// Get Single Order
//═══════════════════════════════

router.get("/:id", authMiddleware, getSingleOrder);

//═══════════════════════════════
// Update Order Status
//═══════════════════════════════

router.put("/:id/status", authMiddleware, updateOrderStatus);

//═══════════════════════════════
// Module Exports
//═══════════════════════════════

module.exports = router;