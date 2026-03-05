// config/api.example.js
// Copy this file, rename to api.js, and add your own API key
// Get a free key at console.groq.com

const API_CONFIG = {
    key: "YOUR_OPENROUTER_KEY_HERE",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "meta-llama/llama-3.1-8b-instruct:free",
    headers: {
        "HTTP-Referer": "https://your-domain-here.com",
        "X-Title": "MaxPrompt"
    }
};
