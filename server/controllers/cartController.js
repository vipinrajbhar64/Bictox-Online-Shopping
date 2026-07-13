const Cart = require("../models/cartModel");
const Product = require("../models/productModel");


//═══════════════════════════════════════════════
// Add To Cart
//═══════════════════════════════════════════════

const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;

        // Step 1: Check Product ID
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // Step 2: Check Product Exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Step 3: Check Cart
        const cartItem = await Cart.findOne({
            user: userId,
            product: productId,
        });

        // Step 4: Product Already Exists
        if (cartItem) {
            cartItem.quantity += 1;

            await cartItem.save();

            return res.status(200).json({
                success: true,
                message: "Product quantity updated",
                cartItem,
            });
        }

        // Step 5: New Cart Item
        const newCart = await Cart.create({
            user: userId,
            product: productId,
            quantity: 1,
        });

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItem: newCart,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//═══════════════════════════════════════════════
// Get Cart
//═══════════════════════════════════════════════

const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        const cartItems = await Cart.find({
            user: userId,
        }).populate(
            "product",
            "name price image brand category color stock"
        );

        return res.status(200).json({
            success: true,
            count: cartItems.length,
            cartItems,
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//═══════════════════════════════════════════════
// Update Cart Quantity
//═══════════════════════════════════════════════

const updateCartQuantity = async (req, res) => {
    try {

        const userId = req.user.userId;

        const {
            productId,
            action,
        } = req.body;

        //Validation
        if (!productId || !action) {
            return res.status(400).json({
                success: false,
                message: "Product ID and action are required",
            });
        }

        // Validate Action
        if (action !== "increase" && action !== "decrease") {
            return res.status(400).json({
                success: false,
                message: "Invalid action",
            });
        }

        //Find Cart Item
        const cartItem = await Cart.findOne({
            user: userId,
            product: productId,
        });

        //Check Cart Item
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        // Increase Quantity
        if (action === "increase") {
            cartItem.quantity += 1;
        }

        // Decrease Quantity
        if (action === "decrease") {
            cartItem.quantity -= 1;
        }

        //Minimum Quantity = 1
        if (cartItem.quantity < 1) {
            cartItem.quantity = 1;
        }

        //Save Updated Cart
        await cartItem.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cartItem,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//═══════════════════════════════════════════════
// Remove From Cart
//═══════════════════════════════════════════════

const removeFromCart = async (req, res) => {
    try {

        const userId = req.user.userId;

        const { productId } = req.body;

        //Validation
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        //Find Cart Item
        const cartItem = await Cart.findOne({
            user: userId,
            product: productId,
        });

        //Chack Cart Item
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        // Delete Cart Item
        await Cart.findOneAndDelete({
            user: userId,
            product: productId,
        });

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
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
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart,
};