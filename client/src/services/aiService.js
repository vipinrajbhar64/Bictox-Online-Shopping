import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/ai/chat`;
export const askBictoxAI = async (message) => {
    try {
        const response = await axios.post(API_URL, {
            message,
        });

        return response.data;
    } catch (error) {
        console.error("AI Error:", error);

        return {
            success: false,
            recommendation: "Something went wrong.",
            products: [],
            budget: null,
        };
    }
};