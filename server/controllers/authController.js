const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateOTP = require("../utils/otpGenerator");
const sendEmail = require("../utils/sendEmail");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check Empty Fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // OTP Expiry (5 Minutes)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await sendEmail(
      email,
      "Bictox Email Verification",
      `Welcome to Bictox!

    Your OTP is: ${otp}

    This OTP is valid for 5 minutes.

    Do not share this OTP with anyone.`,
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//═══════════════════════════════════════════════
// Verify OTP Controller
//═══════════════════════════════════════════════

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check Empty Fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check OTP Expiry
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Verify User
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
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
// Login Controller
//═══════════════════════════════════════════════

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Empty Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Email Verification
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
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
// Get User Profile
//═══════════════════════════════════════════════

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
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
// Forgot Password Controller
//═══════════════════════════════════════════════

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check Email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // OTP Expiry (5 Minutes)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;

    await user.save();

    // Send Email
    await sendEmail(
      email,
      "Bictox Password Reset OTP",
      `Your Password Reset OTP is: ${otp}

This OTP is valid for 5 minutes.

Do not share this OTP with anyone.`
    );

    return res.status(200).json({
      success: true,
      message: "Password Reset OTP Sent Successfully",
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
// Reset Password Controller
//═══════════════════════════════════════════════

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check Empty Fields
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and New Password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP
    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check OTP Expiry
    if (new Date() > user.resetPasswordOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update Password
    user.password = hashedPassword;

    // Clear Reset OTP
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//═════════════════════════════
// Module Exports
//═════════════════════════════

module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
};