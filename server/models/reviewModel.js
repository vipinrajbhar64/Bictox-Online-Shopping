const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        //═══════════════════════════════════════
        // User
        //═══════════════════════════════════════

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        //═══════════════════════════════════════
        // Product
        //═══════════════════════════════════════

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        //═══════════════════════════════════════
        // Rating
        //═══════════════════════════════════════

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        //═══════════════════════════════════════
        // Comment
        //═══════════════════════════════════════

        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", reviewSchema);