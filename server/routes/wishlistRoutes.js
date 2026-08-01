const express = require("express");

const router = express.Router();

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} = require("../controllers/wishlistController");

const authMiddleware = require("../middlewares/authMiddleware");

// ❤️ Add To Wishlist
router.post("/add", authMiddleware, addToWishlist);

// ❤️ Get Wishlist
router.get("/", authMiddleware, getWishlist);

// ❤️ Remove Wishlist
router.delete("/remove", authMiddleware, removeFromWishlist);

module.exports = router;