//═══════════════════════════════════════════════
// Bictox AI Smart Search Parser v2
//═══════════════════════════════════════════════

const parseSearchQuery = (query) => {

    const text = query.toLowerCase().trim();

    const filters = {};

    //═══════════════════════════════════════════════
    // Color Detection
    //═══════════════════════════════════════════════

    const colors = [
        "black",
        "white",
        "blue",
        "green",
        "red",
        "grey",
        "gray",
        "brown",
        "pink",
        "yellow"
    ];

    filters.color = colors.find(color =>
        text.includes(color)
    );

    //═══════════════════════════════════════════════
    // Budget Detection
    //═══════════════════════════════════════════════

    const budget = text.match(/\d+/);

    if (budget) {

        filters.price = Number(budget[0]);

    }

    //═══════════════════════════════════════════════
    // Category Detection
    //═══════════════════════════════════════════════

    const categoryMap = {

        pant: ["pant", "pants"],

        cargo: ["cargo", "cargo pant", "cargo pants"],

        jeans: ["jeans", "jean"],

        shirt: ["shirt", "shirts"],

        tshirt: ["tshirt", "t-shirt", "tee"],

        hoodie: ["hoodie", "hoodies"],

        shoes: ["shoe", "shoes"],

        jacket: ["jacket", "jackets"]

    };

    for (const key in categoryMap) {

        if (categoryMap[key].some(word => text.includes(word))) {

            filters.category = key;

            break;

        }

    }

    return filters;

};

module.exports = parseSearchQuery;