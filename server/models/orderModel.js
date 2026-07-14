const mongoose = require("mongoose");

//═══════════════════════════════════════════════
// Order Schema
//═══════════════════════════════════════════════

const orderSchema = new mongoose.Schema(
    {
        //═══════════════════════════════════════════
        // User Information
        //═══════════════════════════════════════════

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        //═══════════════════════════════════════════
        // Ordered Products
        //═══════════════════════════════════════════

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },

                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        //═══════════════════════════════════════════
        // Order Price Details
        //═══════════════════════════════════════════

        subtotal: {
            type: Number,
            required: true,
        },

        deliveryCharge: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        //═══════════════════════════════════════════
        // Shipping Address
        //═══════════════════════════════════════════

        shippingAddress: {
            fullName: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            pincode: String,

            country: {
                type: String,
                default: "India",
            },
        },

        //═══════════════════════════════════════════
        // Payment Information
        //═══════════════════════════════════════════

        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "CARD"],
            default: "COD",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },

        //═══════════════════════════════════════════
        // Order Status
        //═══════════════════════════════════════════

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Packed",
                "Shipped",
                "Out For Delivery",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },

    //═══════════════════════════════════════════
    // Timestamps
    //═══════════════════════════════════════════

    {
        timestamps: true,
    }
);

//═══════════════════════════════════════════════
// Module Exports
//═══════════════════════════════════════════════

module.exports = mongoose.model("Order", orderSchema);