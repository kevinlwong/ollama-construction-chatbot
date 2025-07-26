import fs from 'fs';
import { extractTextFromImage } from '../services/tesseractService.js';
import { streamChatResponse } from '../services/ollamaService.js';

export const handleUpload = async (req, res) => {
    const filePath = req.file.path;
    const userPrompt = req.body.prompt;
    const model = req.body.model;

    if (!userPrompt || !model) {
        return res.status(400).json({
            success: false,
            error: "Model and prompt are required."
        });
    }

    try {
        const extractedText = await extractTextFromImage(filePath);
        fs.unlink(filePath, () => {});

        const fullPrompt = `${extractedText}\n\nUser Prompt: ${userPrompt}`;
        await streamChatResponse(model, fullPrompt, res);
    } catch (error) {
        console.error('Upload/OCR Error:', error);
        res.status(500).json({
            success: false,
            error: "Failed to process the uploaded file."
        });
    }
};