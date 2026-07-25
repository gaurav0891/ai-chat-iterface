import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function streamChatResponse(messages, onToken) {
  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages, // [{ role: "user", content: "..." }, ...]
  });

  stream.on("text", (textChunk) => {
    onToken(textChunk);
  });

  const finalMessage = await stream.finalMessage();
  return finalMessage;
}