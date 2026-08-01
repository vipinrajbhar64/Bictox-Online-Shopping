const baiSearchParser = require("../utils/baiSearchParser");
const searchProducts = require("../services/productSearchService");
const budgetShopping = require("../services/budgetShoppingService");
const recommendationService = require("../services/recommendationService");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        // Parse User Message
        const parsedResult = baiSearchParser(message);
        const aiResult = await recommendationService(parsedResult);
        return res.status(200).json({
            success: true,
            parsedResult,
            recommendation: aiResult.recommendation,
            budget: {
                total: aiResult.total,
                remaining: aiResult.remaining,
            },
            products: aiResult.products,
        });
    } catch (error) {


        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    chatWithAI,
};