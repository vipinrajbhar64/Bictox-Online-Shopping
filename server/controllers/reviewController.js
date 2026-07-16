const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

//═══════════════════════════════════════════════
// Add Review
//═══════════════════════════════════════════════

const addReview = async (req, res) => {
    try {

        const { productId, rating, comment } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }

        const review = await Review.create({
            user: req.user.userId,
            product: productId,
            rating,
            comment,
        });

        return res.status(201).json({
            success: true,
            message: "Review Added Successfully",
            review,
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
// Get Product Reviews
//═══════════════════════════════════════════════

const getProductReviews = async (req, res) => {
    try {

        const reviews = await Review.find({
            product: req.params.productId,
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
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
// Update Review
//═══════════════════════════════════════════════

const updateReview = async (req, res) => {
    try {

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review Not Found",
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Review Updated Successfully",
            review: updatedReview,
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
// Delete Review
//═══════════════════════════════════════════════

const deleteReview = async (req, res) => {
    try {

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review Not Found",
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Review Deleted Successfully",
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
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
};