const express = require("express");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Database Connection
dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("DNS Servers:", dns.getServers());
//console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Node Version:", process.version);

connectDB();
// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "Bictox Online Shopping",
        message: "Backend Server Running Successfully 🚀",
        version: "1.0.1"
    });
});

// Test Route
app.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Working Successfully ✅"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("==========================================");
    console.log("🚀 Bictox Online Shopping Backend");
    console.log(`🌐 Server Running : http://localhost:${PORT}`);
    console.log("📅 Version : 1.0.1");
    console.log("==========================================");
});