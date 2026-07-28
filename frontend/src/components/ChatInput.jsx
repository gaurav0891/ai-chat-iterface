import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-gray-200 p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Message DevMate..."
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-40"
      >
        Send
      </button>
    </form>
  );
}