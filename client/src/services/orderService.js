import API from "./api";

// Buy Now
export const buyNow = (productId, quantity, addressId, paymentMethod) => {
    return API.post("/orders/buy-now", {
        productId,
        quantity,
        addressId,
        paymentMethod,
    });
};

// Place Order (Cart)
export const placeOrder = (orderData) => {
    return API.post("/orders/place-order", orderData);
};

// Order History
export const getOrderHistory = () => {
    return API.get("/orders");
};

// Single Order
export const getSingleOrder = (id) => {
    return API.get(`/orders/${id}`);
};