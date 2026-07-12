//═══════════════════════════════════════════════
// Bictox AI Engine (BAI)
// Smart Search Parser
//═══════════════════════════════════════════════

const parseSearchQuery = (query) => {

    const text = query.toLowerCase();

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

    filters.color = colors.find(color => text.includes(color));

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

    const categories = [
        "pant",
        "cargo",
        "shirt",
        "tshirt",
        "jeans",
        "hoodie"
    ];

    filters.category = categories.find(category =>
        text.includes(category)
    );

    return filters;

};

module.exports = parseSearchQuery;