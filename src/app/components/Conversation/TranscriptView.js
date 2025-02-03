import { useEffect, useRef } from "react";
import { ConversationControls } from "./ConversationControls";

export function TranscriptView({ transcript, status, onStop, onStart }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  if (transcript.length === 0) {
    return (
      <div className="text-gray-500 text-center flex flex-col items-center justify-center h-full">
        <ConversationControls
          isConnected={status === "connected"}
          onStop={onStop}
          onStart={onStart}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 space-y-3 overflow-y-auto">
        {transcript.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded ${
              msg.role === "agent"
                ? "bg-gray-800 border border-gray-700"
                : "bg-blue-800 border border-blue-700"
            }`}
          >
            <strong className="block font-medium mb-1 text-gray-100">
              {msg.role === "agent" ? "Agent:" : "You:"}
            </strong>
            <span className="text-gray-200">{msg.content.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {status === "connected" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <button
            onClick={onStop}
            className="px-16 py-8 bg-red-500/10 border-3 border-red-500 text-red-400 rounded-xl 
            hover:bg-red-500/20 transition-all text-2xl font-semibold
            shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            Stop Conversation
          </button>
        </div>
      )}
    </div>
  );
}
