import API from "./api";

// Add product to cart
export const addToCart = (productId, quantity = 1) => {
    return API.post("/cart/add", {
        productId,
        quantity,
    });
};

// Get logged-in user's cart
export const getCart = () => {
    return API.get("/cart");
};

// Update cart item quantity
export const updateCartQuantity = (productId, action) => {
    return API.patch("/cart/update", {
        productId,
        action,
    });
};

// Remove product from cart
export const removeFromCart = (productId) => {
    return API.delete("/cart/remove", {
        data: {
            productId,
        },
    });
};