const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        //════════════════════════════════
        // Product Name
        //════════════════════════════════

        name: {
            type: String,
            required: true,
            trim: true,
        },

        //════════════════════════════════
        // Category
        //════════════════════════════════

        category: {
            type: String,
            required: true,
            trim: true,
        },

        //════════════════════════════════
        // Brand
        //════════════════════════════════

        brand: {
            type: String,
            required: true,
            trim: true,
        },

        //════════════════════════════════
        // Price
        //════════════════════════════════

        price: {
            type: Number,
            required: true,
        },

        //════════════════════════════════
        // Color
        //════════════════════════════════

        color: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════
        // Material
        //═══════════════════════════════════

        material: {
            type: String,
            required: true,
            trim: true,
        },

        //════════════════════════════════════
        // Size
        //════════════════════════════════════

        size: [
            {
                type: String,
            },
        ],

        //════════════════════════════════════
        // Gender
        //════════════════════════════════════

        gender: {
            type: String,
            enum: ["Men", "Women", "Kids", "Unisex"],
            required: true,
        },

        //════════════════════════════════════
        // Rating
        //════════════════════════════════════

        rating: {
            type: Number,
            default: 0,
        },

        //════════════════════════════════════
        // Review Count
        //════════════════════════════════════

        reviewCount: {
            type: Number,
            default: 0,
        },

        //════════════════════════════════════
        // Tags (BAI Ready)
        //════════════════════════════════════

        tags: [
            {
                type: String,
            },
        ],

        //════════════════════════════════════
        // Description
        //════════════════════════════════════

        description: {
            type: String,
            required: true,
            trim: true,
        },

        //═════════════════════════════════════
        // Stock
        //═════════════════════════════════════

        stock: {
            type: Number,
            default: 0,
        },

        //═════════════════════════════════════
        // image
        //═════════════════════════════════════

        image: {
            type: String,
            required: true,
            trim: true
        },

        //═════════════════════════════════════
        // Featured Product
        //═════════════════════════════════════

        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);