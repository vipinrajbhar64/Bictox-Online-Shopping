const Product = require("../models/productModel");

const searchProducts = async (filters) => {
    let query = {};
    // Category
    if (filters.category) {

        const categoryMap = {
            pant: "Pants",
            tshirt: "T-Shirts",
            shirt: "Shirts",
            hoodie: "Hoodies",
            shoes: "Shoes",
            jeans: "Jeans",
        };

        if (filters.category === "cargo") {

            query.tags = {
                $in: [/cargo/i]
            };

        } else {

            query.$or = [
                {
                    category: categoryMap[filters.category] || filters.category
                },
                {
                    tags: {
                        $in: [new RegExp(filters.category, "i")]
                    }
                }
            ];
        }
    }

    //═══════════════════════════════════════
    // Tag Search (Parser V2)
    //═══════════════════════════════════════

    if (filters.tag) {

        query.tags = {
            $elemMatch: {
                $regex: filters.tag,
                $options: "i"
            }
        };

    }

    // Color
    if (filters.color) {
        query.color = new RegExp(filters.color, "i");
    }

    // Budget
    if (filters.price) {
        query.price = { $lte: filters.price };
    }

    const products = await Product.find(query).limit(10);

    return products;
};

module.exports = searchProducts;