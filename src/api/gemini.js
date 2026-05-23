import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash'
});

export async function getBotReply(userMessage) {
  const result = await model.generateContent(userMessage);

  return result.response.text();
}