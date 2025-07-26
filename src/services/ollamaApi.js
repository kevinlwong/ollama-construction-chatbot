import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

export const sendMessageToOllama = async (model, message) => {
    try {
        console.log("Sending to backend:", { model, message }); // Debugging
        const response = await axios.post(API_URL, { model, message });

        console.log("Received from backend:", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error("Chatbot API error:", error.response ? error.response.data : error.message);
        return { response: "Error: Failed to communicate with the chatbot." };
    }
};
