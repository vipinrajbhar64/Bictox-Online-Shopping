const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

//═══════════════════════════════════════════════
// Buy Now
//═══════════════════════════════════════════════

const buyNow = async (req, res) => {
    try {

        //═════════════════════════
        // Get User ID & Product ID
        //═════════════════════════

        const userId = req.user.userId;

        const { productId, quantity } = req.body;

        // Check Product ID
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // Check Quantity
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        //════════════════
        // Check Product
        //════════════════

        const product = await Product.findById(productId);

        // Product Not Found
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Out of Stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available",
            });
        }

        //══════════════════════
        // Calculate Order Price
        //══════════════════════

        // Subtotal
        const subtotal = product.price * quantity;

        // Delivery Charge
        const deliveryCharge = subtotal >= 999 ? 0 : 99;

        // Discount
        const discount = 0;

        // Grand Total
        const totalAmount = subtotal + deliveryCharge - discount;

        //══════════════════
        // Create Order
        //══════════════════

        const order = await Order.create({
            user: userId,

            products: [
                {
                    product: product._id,
                    quantity: quantity,
                    price: product.price,
                },
            ],

            subtotal,
            deliveryCharge,
            discount,
            totalAmount,

            shippingAddress: {
                fullName: req.body.fullName,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                country: req.body.country || "India",
            },

            paymentMethod: req.body.paymentMethod || "COD",
        });

        //═════════════════
        // Success Response
        //═════════════════

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
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
// Place Order
//═══════════════════════════════════════════════

const placeOrder = async (req, res) => {
    try {

        //═══════════════
        // Get User Cart
        //═══════════════

        const userId = req.user.userId;

        const cartItems = await Cart.find({ user: userId }).populate("product");

        //══════════════════
        // Check Empty Cart
        //══════════════════
        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty",
            });
        }

        //══════════════════════════════
        // Prepare Order Data
        //══════════════════════════════
        let subtotal = 0;

        const products = [];

        for (const item of cartItems) {

            // Check Product Exists
            if (!item.product) {
                continue;
            }

            // Check Stock
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${item.product.name} is out of stock`,
                });
            }

            // Calculate Subtotal
            subtotal += item.product.price * item.quantity;

            // Prepare Products Array
            products.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            });
        }

        //═════════════════════════════════
        // Calculate Final Amount
        //═════════════════════════════════

        // Delivery Charge
        const deliveryCharge = subtotal >= 999 ? 0 : 99;

        // Discount
        const discount = 0;

        // Grand Total
        const totalAmount = subtotal + deliveryCharge - discount;

        //═══════════════════════════════
        // Create Order
        //═══════════════════════════════
        const order = await Order.create({
            user: userId,

            products,

            subtotal,
            deliveryCharge,
            discount,
            totalAmount,

            shippingAddress: {
                fullName: req.body.fullName,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                country: req.body.country || "India",
            },

            paymentMethod: req.body.paymentMethod || "COD",
        });

        //═══════════════════════════════════
        // Update Product Stock
        //═══════════════════════════════════
        for (const item of cartItems) {

            item.product.stock -= item.quantity;

            await item.product.save();
        }

        //══════════════════════════════
        // Clear User Cart
        //══════════════════════════════
        await Cart.deleteMany({
            user: userId,
        });

        //═══════════════════════════════
        // Success Response
        //═══════════════════════════════
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
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
// Get Order History
//═══════════════════════════════════════════════

const getOrderHistory = async (req, res) => {
    try {

        //══════════════════════════════
        // Get User ID
        //══════════════════════════════
        const userId = req.user.userId;

        //══════════════════════════════
        // Get Orders
        //══════════════════════════════
        const orders = await Order.find({ user: userId })
            .populate("products.product")
            .sort({ createdAt: -1 });

        //═════════════════════════════
        // Check Orders
        //═════════════════════════════
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }

        //═══════════════════════════
        // Success Response
        //════════════════════════════
        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
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
// Get Single Order
//═══════════════════════════════════════════════

const getSingleOrder = async (req, res) => {
    try {

        //═════════════════════════════
        // Get Order ID
        //═════════════════════════════
        const userId = req.user.userId;

        const { id } = req.params;

        //═════════════════════════════
        // Find Order
        //═════════════════════════════
        const order = await Order.findOne({
            _id: id,
            user: userId,
        }).populate("products.product");

        //══════════════════════════════
        // Check Order
        //══════════════════════════════
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        //═══════════════════════════════
        // Success Response
        //═══════════════════════════════
        return res.status(200).json({
            success: true,
            order,
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
// Update Order Status
//═══════════════════════════════════════════════

const updateOrderStatus = async (req, res) => {
    try {

        //════════════════════════════════
        // Get Order ID & Status
        //════════════════════════════════
        const { id } = req.params;
        const { status } = req.body;

        //════════════════════════════════
        // Valid Status
        //════════════════════════════════
        const validStatus = [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        //═════════════════════════════════
        // Find Order
        //═════════════════════════════════
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        //══════════════════════════════════
        // Update Order Status
        //══════════════════════════════════
        order.orderStatus = status;

        await order.save();

        //══════════════════════════════════
        // Success Response
        //══════════════════════════════════
        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//══════════════════════════════════
// Module Exports
//══════════════════════════════════

module.exports = {
    buyNow,
    placeOrder,
    getOrderHistory,
    getSingleOrder,
    updateOrderStatus,
};