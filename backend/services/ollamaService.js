import axios from 'axios';

const OLLAMA_URL = 'http://localhost:11434/api/generate';

export const streamChatResponse = async (model, prompt, res) => {
    const response = await axios.post(OLLAMA_URL,  { model, prompt }, { responseType: 'stream' });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    let fullResponse = '';
    let thinkingProcess = '';
    let isThinking = false;
    let hasThinking = false;

    response.data.on('data', (chunk) => {
        try {
            const parsedChunk = JSON.parse(chunk.toString());

            if(parsedChunk.response) {
                fullResponse += parsedChunk.response;

                if(parsedChunk.response.includes("<think>")) {
                    isThinking = true;
                    hasThinking = true;
                    thinkingProcess = '';
                }

                if (isThinking) {
                    thinkingProcess += parsedChunk.response;
                }

                if (parsedChunk.response.includes("</think>")) {
                    isThinking = false;
                    res.write(JSON.stringify({ type: "thinking", text: thinkingProcess.replace(/<\/?think>/g, '') }) + '\n');
                }
            }
        } catch (error) {
            console.error('Error parsing chunk:', error);
        }
    });

    response.data.on('end', () => {
        const cleanedResponse = fullResponse.replace(/<think>.*?<\/think>/s, '').trim();

        if (!hasThinking) {
            console.log("No <think> section detected. Skipping thinking phase.");
        }

        res.write(JSON.stringify({ type: 'final', text: cleanedResponse }) + '\n');
        res.end();
    });
};