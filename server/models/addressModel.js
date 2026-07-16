const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
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
        // Full Name
        //═══════════════════════════════════════

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════════
        // Phone
        //═══════════════════════════════════════

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════════
        // Address Line
        //═══════════════════════════════════════

        address: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════════
        // City
        //═══════════════════════════════════════

        city: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════════
        // State
        //═══════════════════════════════════════

        state: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════════
        // Pincode
        //═══════════════════════════════════════

        pincode: {
            type: String,
            required: true,
            trim: true,
        },

        //═══════════════════════════════════════
        // Country
        //═══════════════════════════════════════

        country: {
            type: String,
            default: "India",
        },

        //═══════════════════════════════════════
        // Default Address
        //═══════════════════════════════════════

        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Address", addressSchema);