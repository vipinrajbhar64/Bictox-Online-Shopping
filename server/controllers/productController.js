const Product = require("../models/Product");
const parseSearchQuery = require("../utils/baiSearchParser");

//═══════════════════════════════════════════════
// Add Product
//═══════════════════════════════════════════════

const addProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            brand,
            price,
            color,
            material,
            size,
            gender,
            tags,
            description,
            stock,
            image,
            isFeatured,
        } = req.body;

        // Check Required Fields
        if (
            !name ||
            !category ||
            !brand ||
            !price ||
            !color ||
            !material ||
            !gender ||
            !description ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Create Product
        const product = await Product.create({
            name,
            category,
            brand,
            price,
            color,
            material,
            size,
            gender,
            tags,
            description,
            stock,
            image,
            isFeatured,
        });

        return res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product,
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
// Get All Products
//═══════════════════════════════════════════════

const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find().select("-__v");

        return res.status(200).json({
            success: true,
            count: products.length,
            products,
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
// Get Single Product
//═══════════════════════════════════════════════

const getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id).select("-__v");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product,
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
// Update Product
//═══════════════════════════════════════════════

const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).select("-__v");

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct,
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
// Delete Product
//═══════════════════════════════════════════════

const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
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
// BAI Smart Product Search
//═══════════════════════════════════════════════

const smartSearch = async (req, res) => {

    try {

        const { query } = req.query;

        if (!query) {

            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });

        }

        // BAI Parser
        const filters = parseSearchQuery(query);

        // Mongo Query
        let mongoQuery = {};

        // Color
        if (filters.color) {

            mongoQuery.color = new RegExp(filters.color, "i");

        }

        // Category
        if (filters.category) {

            mongoQuery.$or = [
                {
                    category: new RegExp(filters.category, "i")
                },
                {
                    tags: new RegExp(filters.category, "i")
                },
                {
                    name: new RegExp(filters.category, "i")
                }
            ];

        }

        // Budget
        if (filters.price) {

            mongoQuery.price = {
                $lte: filters.price
            };

        }

        const products = await Product.find(mongoQuery).select("-__v");

        return res.status(200).json({

            success: true,

            baiFilters: filters,

            count: products.length,

            products

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    smartSearch
};