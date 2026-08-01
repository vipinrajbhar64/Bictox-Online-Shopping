import API from "./api";

// Add Review
export const addReview = (reviewData) => {
    return API.post("/reviews/add", reviewData);
};

// Get Product Reviews
export const getProductReviews = (productId) => {
    return API.get(`/reviews/product/${productId}`);
};

// Update Review
export const updateReview = (id, reviewData) => {
    return API.put(`/reviews/${id}`, reviewData);
};

// Delete Review
export const deleteReview = (id) => {
    return API.delete(`/reviews/${id}`);
};