import API from "./api";

// Create Razorpay Order
export const createPaymentOrder = (amount) => {
    return API.post("/payment/create-order", {
        amount,
    });
};

// Verify Payment
export const verifyPayment = (paymentData) => {
    return API.post("/payment/verify", paymentData);
};