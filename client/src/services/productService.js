import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/products`;

export const getAllProducts = async () => {
    return await axios.get(API);
};

export const getSingleProduct = async (id) => {
    return await axios.get(`${API}/${id}`);
};

export const searchProducts = async (keyword) => {
    return await axios.get(`${API}/search?keyword=${keyword}`);
};