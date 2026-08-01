const searchProducts = require("./productSearchService");

const budgetShopping = async (filters) => {
    const products = await searchProducts(filters);

    if (!products.length) {
        return {
            total: 0,
            remaining: filters.price || 0,
            products: [],
        };
    }

    let total = 0;
    let selectedProducts = [];

    for (const product of products) {

        // Agar budget diya hai
        if (filters.price) {

            if (total + product.price <= filters.price) {

                total += product.price;
                selectedProducts.push(product);

            }

        }

        // Agar budget nahi diya
        else {

            selectedProducts.push(product);

        }
    }

    return {

        total,

        remaining: filters.price
            ? filters.price - total
            : 0,

        products: selectedProducts,

    };
};

module.exports = budgetShopping;