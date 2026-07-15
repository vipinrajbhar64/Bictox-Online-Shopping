const User = require("../models/User");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

//═══════════════════════════════════════════════
// Dashboard
//═══════════════════════════════════════════════

const getDashboard = async (req, res) => {
    try {

        //════════════════════════════════
        // Count Dashboard Data
        //════════════════════════════════

        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        //════════════════════════════════
        // Calculate Revenue
        //════════════════════════════════

        const revenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);

        //═════════════════════════════════
        // Success Response
        //═════════════════════════════════

        return res.status(200).json({
            success: true,

            dashboard: {

                totalUsers,

                totalProducts,

                totalOrders,

                totalRevenue:
                    revenue.length > 0
                        ? revenue[0].totalRevenue
                        : 0,
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
// Get All Orders (Admin)
//═══════════════════════════════════════════════

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product", "name price image")
            .sort({ createdAt: -1 });

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
// Filter Orders By Status (Admin)
//═══════════════════════════════════════════════

const filterOrders = async (req, res) => {
    try {

        const { status } = req.query;

        const orders = await Order.find({
            orderStatus: status,
        })
            .populate("user", "name email")
            .populate("products.product", "name price image")
            .sort({ createdAt: -1 });

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
// Search Orders (Admin)
//═══════════════════════════════════════════════

const searchOrders = async (req, res) => {
    try {

        const { keyword } = req.query;

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product", "name price image")
            .sort({ createdAt: -1 });

        const filteredOrders = orders.filter((order) => {

            return (
                order.user.name.toLowerCase().includes(keyword.toLowerCase()) ||
                order.user.email.toLowerCase().includes(keyword.toLowerCase())
            );

        });

        return res.status(200).json({
            success: true,
            count: filteredOrders.length,
            orders: filteredOrders,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

module.exports = {
    getDashboard,
    getAllOrders,
    filterOrders,
    searchOrders,
};