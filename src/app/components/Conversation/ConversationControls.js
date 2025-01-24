export function ConversationControls({ onStart, onStop, status, isConnected }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onStart}
        disabled={isConnected}
        className="px-16 py-8 bg-blue-500/10 border-3 border-blue-500 text-blue-400 rounded-xl 
        disabled:bg-gray-600/20 disabled:border-gray-600 disabled:text-gray-500
        hover:bg-blue-500/20 transition-all text-2xl font-semibold
        shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      >
        Start Conversation
      </button>
      <button
        onClick={onStop}
        disabled={!isConnected}
        className="px-16 py-8 bg-red-500/10 border-3 border-red-500 text-red-400 rounded-xl 
        disabled:bg-gray-600/20 disabled:border-gray-600 disabled:text-gray-500
        hover:bg-red-500/20 transition-all text-2xl font-semibold
        shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      >
        Stop Conversation
      </button>
    </div>
  );
} 