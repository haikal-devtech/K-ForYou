import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY }); // Actually, we should use GEMINI_API_KEY for server-side if it's safe. AI Studio uses GEMINI_API_KEY.
// Actually, wait, the framework instructions say:
// Always use process.env.NEXT_PUBLIC_GEMINI_API_KEY for the Gemini API. This is the *only* way to access the Gemini API key.
// BAD: process.env.GEMINI_API_KEY or process.env.API_KEY (Do NOT use these)
// Let's modify:

export const getGemini = () => {
   return new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
}

export const generateProductDescription = async (promptText: string) => {
  const ai = getGemini();
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: promptText,
    config: {
        responseMimeType: "application/json"
    }
  });

  return response.text;
};
