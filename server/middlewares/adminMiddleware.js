const User = require("../models/User");

//═══════════════════════════════════════════════
// Admin Authorization Middleware
//═══════════════════════════════════════════════

const adminMiddleware = async (req, res, next) => {
    try {

        //═════════════════════════════════
        // Get Logged-in User
        //═════════════════════════════════
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //═════════════════════════════════
        // Check Admin Role
        //═════════════════════════════════
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        //═════════════════════════════════
        // Allow Access
        //═════════════════════════════════

        next();

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

module.exports = adminMiddleware;