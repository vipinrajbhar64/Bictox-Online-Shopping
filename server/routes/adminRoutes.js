const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

//═══════════════════════════════════════════════
// Controllers
//═══════════════════════════════════════════════

const {
    getDashboard,
    getAllOrders,
    filterOrders,
    searchOrders,
} = require("../controllers/adminController");

const {
    addProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

//═════════════════════════════════
// Admin Dashboard
//═════════════════════════════════

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboard
);

//═════════════════════════════════
// Get All Orders (Admin)
//═════════════════════════════════

router.get(
    "/orders",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);

//══════════════════════════════════
// Filter Orders By Status (Admin)
//══════════════════════════════════

router.get(
    "/orders/filter",
    authMiddleware,
    adminMiddleware,
    filterOrders
);

//══════════════════════════════════
// Search Orders (Admin)
//══════════════════════════════════

router.get(
    "/orders/search",
    authMiddleware,
    adminMiddleware,
    searchOrders
);

//═════════════════════════════════
// Product Management (Admin)
//═════════════════════════════════

// Add Product
router.post(
    "/products",
    authMiddleware,
    adminMiddleware,
    addProduct
);

// Update Product
router.put(
    "/products/:id",
    authMiddleware,
    adminMiddleware,
    updateProduct
);

// Delete Product
router.delete(
    "/products/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
);

module.exports = router;