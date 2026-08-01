import axios from "axios";

const API = "http://localhost:5000/api/products";

export const getAllProducts = async () => {
    return await axios.get(API);
};

export const getSingleProduct = async (id) => {
    return await axios.get(`${API}/${id}`);
};

export const searchProducts = async (keyword) => {
    return await axios.get(`${API}/search?keyword=${keyword}`);
};