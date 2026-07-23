import {useEffect, useRef} from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, streamingText, isStreaming }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingText]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}

      {/* live streaming bubble — only shows while a response is coming in */}
      {isStreaming && (
        <MessageBubble role="assistant" content={streamingText || "…"} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}