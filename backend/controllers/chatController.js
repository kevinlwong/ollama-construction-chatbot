import { streamChatResponse } from "../services/ollamaService.js"

export const handleChat = async (req, res) => {
    const { model, message } = req.body;

    console.log('Received request:', { model, message });

    if (!model || !message) {
        return res.status(400).json({
            success: false,
            error: "Model and message are required."
        });
    }

    try {
        await streamChatResponse(model, message, res);
        res.status(201).json({
            success: true,
            message: "Received successful response from Ollama."
        })
    } catch (error) {
        console.error("Error connecting to Ollama:", error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            error: "Failed to get a response from Ollama."
        });
    }
}