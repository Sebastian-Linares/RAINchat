export function Header({ status, isSpeaking, onStart, onStop, duration }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Conversation</h1>
        <div className="text-sm text-gray-400">Status: {status}</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-400">
          Duration: {duration} seconds
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {status === "disconnected" ? (
          <button
            onClick={onStart}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
          >
            Start Conversation
          </button>
        ) : (
          <button
            onClick={onStop}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            End Conversation
          </button>
        )}
      </div>
    </header>
  );
}
