const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

//═══════════════════════════════════════════════
// Add Review
//═══════════════════════════════════════════════

router.post(
    "/add",
    authMiddleware,
    addReview
);

//═══════════════════════════════════════════════
// Get Product Reviews
//═══════════════════════════════════════════════

router.get(
    "/product/:productId",
    getProductReviews
);

//═══════════════════════════════════════════════
// Update Review
//═══════════════════════════════════════════════

router.put(
    "/:id",
    authMiddleware,
    updateReview
);

//═══════════════════════════════════════════════
// Delete Review
//═══════════════════════════════════════════════

router.delete(
    "/:id",
    authMiddleware,
    deleteReview

);
module.exports = router;