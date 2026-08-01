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

        tshirt: ["tshirt", "t-shirt", "tee"],

        shirt: ["shirt", "shirts"],

        hoodie: ["hoodie", "hoodies"],

        shoes: ["shoe", "shoes"],

        jacket: ["jacket", "jackets"]

    };

    //═══════════════════════════════════════
    // Tag Detection (Parser V2)
    //═══════════════════════════════════════

    const tagMap = {
        oversized: ["oversized", "oversize"],
        running: ["running", "runner"],
        formal: ["formal", "office", "business"],
        casual: ["casual", "daily"],
        winter: ["winter", "warm"],
        sports: ["sports", "sport", "gym"],
        college: ["college"],
        graphic: ["graphic", "printed"],
        wideleg: ["wide leg", "wide-leg", "wideleg", "wide"],
        sneakers: ["sneakers", "sneaker"]
    };

    for (const key in tagMap) {

        if (tagMap[key].some(word => text.includes(word))) {

            if (key === "wideleg") {
                filters.tag = "wide leg";
            } else {
                filters.tag = key;
            }
            break;

        }

    }

    for (const key in categoryMap) {

        if (categoryMap[key].some(word => text.includes(word))) {

            filters.category = key;

            break;

        }

    }



    return filters;

};

module.exports = parseSearchQuery;