import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (filePath) => {
    const result = await Tesseract.recognize(
        filePath,
        'eng',
        { logger: m => console.log(m) }
    );
    return result.data.text;
};