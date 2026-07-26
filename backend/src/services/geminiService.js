import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function streamChatResponse(messages, onToken) {
  // Convert our {role, content} format into a single prompt for now
  const lastUserMessage = messages[messages.length - 1].content;

  const stream = await genAI.models.generateContentStream({
   model: "gemini-3.5-flash-lite",
    contents: lastUserMessage,
  });

  let fullText = "";
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      fullText += text;
      onToken(text);
    }
  }

  return fullText;
}