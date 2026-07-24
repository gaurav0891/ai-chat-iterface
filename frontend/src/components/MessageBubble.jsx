export default function MessageBubble({ role, content }) {
  return (
    <div className={`mb-4 rounded-2xl p-4 shadow-sm ${
      role === "assistant" ? "bg-slate-100 text-slate-900" : "bg-blue-600 text-white"
    }`}>
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {role}
      </div>
      <div className="mt-2 whitespace-pre-wrap text-sm">{content}</div>
    </div>
  );
}
