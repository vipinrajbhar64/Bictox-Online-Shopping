import API from "./api";

//  Add Wishlist
export const addToWishlist = (productId) => {
    return API.post("/wishlist/add", {
        productId,
    });
};

//  Get Wishlist
export const getWishlist = () => {
    return API.get("/wishlist");
};

//  Remove Wishlist
export const removeWishlist = (productId) => {
    return API.delete("/wishlist/remove", {
        data: {
            productId,
        },
    });
};