const Wishlist = require("../models/wishlistModel");

// ============================
// Add To Wishlist
// ============================

const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // Check if already exists
        const exists = await Wishlist.findOne({
            user: userId,
            product: productId,
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist ❤️",
            });
        }

        const wishlistItem = await Wishlist.create({
            user: userId,
            product: productId,
        });

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist ❤️",
            wishlistItem,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ============================
// Get Wishlist
// ============================

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;

        const wishlistItems = await Wishlist.find({
            user: userId,
        }).populate("product");

        return res.status(200).json({
            success: true,
            count: wishlistItems.length,
            wishlistItems,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// ============================
// Remove Wishlist
// ============================

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;

        await Wishlist.findOneAndDelete({
            user: userId,
            product: productId,
        });

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist 🗑️",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};