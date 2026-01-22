import axios from 'axios';

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const generateAIResponse = async (prompt, brandContext, apiKey) => {
  if (!apiKey) throw new Error("API Key is missing. Please check your settings.");

  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "mistralai/mistral-7b-instruct:free", // Fixed professional model
        messages: [
          {
            role: "system",
            content: `You are an elite brand consultant for ${brandContext.name}. 
            Tone: ${brandContext.tone}. 
            Target Audience: ${brandContext.audience}. 
            Context: ${brandContext.description}`
          },
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error.response?.data?.error?.message || "Failed to connect to AI engine.";
  }
};
