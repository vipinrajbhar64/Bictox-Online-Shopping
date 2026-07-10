//═══════════════════════════════════════════════
// Imports
//═══════════════════════════════════════════════

const jwt = require("jsonwebtoken");

//═══════════════════════════════════════════════
// Authentication Middleware
//═══════════════════════════════════════════════

const authMiddleware = (req, res, next) => {
    try {
        // Get Token From Header
        const token = req.header("Authorization");

        // Check Token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided",
            });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save User Data
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

//═══════════════════════════════════════════════
// Module Exports
//═══════════════════════════════════════════════

module.exports = authMiddleware;