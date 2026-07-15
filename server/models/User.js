const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        //══════════════════════════════
        // User Role
        //══════════════════════════════

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        otp: {
            type: String,
            default: null
        },

        otpExpiry: {
            type: Date,
            default: null
        },


        //═══════════════════════════════════════════════
        // Reset Password OTP
        //═══════════════════════════════════════════════

        resetPasswordOTP: {
            type: String,
            default: null,
        },

        resetPasswordOTPExpiry: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);