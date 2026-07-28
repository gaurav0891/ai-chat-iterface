import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { connected, sendMessage, streamingText, isStreaming } = useSocket();
  const wasStreaming = useRef(false);

  const createMessage = (role, content) => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  });

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, createMessage("user", trimmed)]);
    sendMessage(trimmed);
  };

  useEffect(() => {
    if (wasStreaming.current && !isStreaming && streamingText) {
      setMessages((prev) => [...prev, createMessage("assistant", streamingText)]);
    }
    wasStreaming.current = isStreaming;
  }, [isStreaming, streamingText]);

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-gray-200 px-4 py-3 text-sm text-gray-500">
        {connected ? "Connected" : "Connecting..."}
      </header>
      <ChatWindow
        messages={messages}
        streamingText={streamingText}
        isStreaming={isStreaming}
      />
      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
