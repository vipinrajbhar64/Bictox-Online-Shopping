const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middlewares/authMiddleware");

//Add To Cart
router.post("/add", authMiddleware, addToCart);

//GetCart
router.get("/", authMiddleware, getCart);

//UpdateQuantity
router.patch("/update", authMiddleware, updateCartQuantity);

//Remove from Cart
router.delete("/remove", authMiddleware, removeFromCart);

module.exports = router;