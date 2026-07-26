import { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";

const Socket_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function useSocket() {
  const socketRef = useRef(null);
 const [connected, setConnected] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const socket = io(Socket_URL, {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
     
    socket.on("chat:token", (chunk) => {
        setIsStreaming(true);
        setStreamingText((prev) => prev + chunk);
    });

    socket.on("chat:done", () => {
        setIsStreaming(false);
    });

    socket.on("chat:error", (err) => {
        console.error("Chat error:", err);
        setIsStreaming(false);
    });

    return () => {
      socket.disconnect();
    };
    }, []);

    const sendMessage = useCallback((text, conversationId) => {
        if (!socketRef.current) return;
            socketRef.current.emit("chat:message", { text, conversationId });
    }, []);

    return { connected, sendMessage, streamingText, isStreaming };
}