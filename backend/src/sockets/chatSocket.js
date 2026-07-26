import { streamChatResponse } from "../services/geminiService.js";

export function registerChatSocket(socket) {
  socket.on("chat:message", async ({ text, conversationId }) => {
    try {
      console.log("Received chat message:", text, "for conversation:", conversationId);

      const messages = [{ role: "user", content: text }];

      await streamChatResponse(messages, (chunk) => {
        socket.emit("chat:token", chunk);
      });

      socket.emit("chat:done");
    } catch (err) {
      console.error("Chat error:", err);
      socket.emit("chat:error", { message: "Something went wrong. Please try again." });
    }
  });
}
