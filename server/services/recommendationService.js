const budgetShopping = require("./budgetShoppingService");

const recommendationService = async (filters) => {
    const result = await budgetShopping(filters);

    let recommendation = "";

    if (result.products.length === 0) {

        recommendation =
            "Sorry! No matching products were found.\n\nTry another product, color or increase your budget.";

    } else {

        const firstProduct = result.products[0];

        recommendation =
            `🛍️ Bictox AI Recommendation

Great choice! I found ${result.products.length} product(s) matching your search.

⭐ Best Match:
${firstProduct.name}

💰 Price : ₹${firstProduct.price}
🎨 Color : ${firstProduct.color}
🧵 Material : ${firstProduct.material}
📦 Stock : ${firstProduct.stock} Available

Why I recommend this:
✔ Matches your search
✔ Best value for your budget
✔ High quality product
✔ Ready for purchase`;

    }

    return {
        recommendation,
        total: result.total,
        remaining: result.remaining,
        products: result.products,
    };
};

module.exports = recommendationService;