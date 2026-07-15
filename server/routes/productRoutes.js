const express = require("express");

const router = express.Router();

const {
    getAllProducts,
    getSingleProduct,
    smartSearch
} = require("../controllers/productController");

//═══════════════════════════════════════════════
// Product Routes
//═══════════════════════════════════════════════

// Get All Products
router.get("/", getAllProducts);

// Smart Search 
router.get("/search", smartSearch);

// Single Product
router.get("/:id", getSingleProduct);

module.exports = router;