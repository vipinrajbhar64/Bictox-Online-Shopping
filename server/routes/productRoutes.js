const express = require("express");

const router = express.Router();

const {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    smartSearch
} = require("../controllers/productController");

//═══════════════════════════════════════════════
// Product Routes
//═══════════════════════════════════════════════

// Add Product
router.post("/add-product", addProduct);

// Get All Products
router.get("/", getAllProducts);

// Smart Search 
router.get("/search", smartSearch);

// Single Product
router.get("/:id", getSingleProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;