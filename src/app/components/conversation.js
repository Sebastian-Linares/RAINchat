'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

export function Conversation() {
  const [transcript, setTranscript] = useState([]);
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => {
      console.log('Message:', message);
      setTranscript(prev => [...prev, { role: 'agent', content: message }]);
    },
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId: 'xfUT2HAJEFqMxhXVCF3J' });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex h-screen bg-black text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Voice Sessions</h2>
        <div className="flex-1 space-y-2 overflow-y-auto">
          <div className="p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
            Session 1 - Yesterday
          </div>
          <div className="p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
            Session 2 - 2 days ago
          </div>
          <div className="p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
            Session 3 - Last week
          </div>
        </div>
        <button className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 transition rounded text-white text-sm">
          New Session
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col bg-black">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-100">Voice Conversation</h1>
          <div className="space-x-2">
            <button
              onClick={startConversation}
              disabled={conversation.status === 'connected'}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-600 hover:bg-blue-400 transition"
            >
              Start
            </button>
            <button
              onClick={stopConversation}
              disabled={conversation.status !== 'connected'}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-600 hover:bg-red-400 transition"
            >
              Stop
            </button>
          </div>
        </header>

        <div className="mb-4 text-sm text-gray-400">
          Status: {conversation.status} | Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-900 rounded border border-gray-800 p-4 space-y-3">
          {transcript.length === 0 ? (
            <div className="text-gray-500 text-center flex flex-col items-center justify-center h-full">
              <div className="flex gap-4">
                <button
                  onClick={startConversation}
                  disabled={conversation.status === 'connected'}
                  className="px-16 py-8 bg-blue-500/10 border-3 border-blue-500 text-blue-400 rounded-xl 
                  disabled:bg-gray-600/20 disabled:border-gray-600 disabled:text-gray-500
                  hover:bg-blue-500/20 transition-all text-2xl font-semibold
                  shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Start Conversation
                </button>
                <button
                  onClick={stopConversation}
                  disabled={conversation.status !== 'connected'}
                  className="px-16 py-8 bg-red-500/10 border-3 border-red-500 text-red-400 rounded-xl 
                  disabled:bg-gray-600/20 disabled:border-gray-600 disabled:text-gray-500
                  hover:bg-red-500/20 transition-all text-2xl font-semibold
                  shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  Stop Conversation
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full relative">
              <div className="flex-1 space-y-3">
                {transcript.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded ${
                      msg.role === 'agent'
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-gray-800 border border-gray-700'
                    }`}
                  >
                    <strong className="block font-medium mb-1 text-gray-100">
                      {msg.role === 'agent' ? 'Agent:' : 'You:'}
                    </strong>
                    <span className="text-gray-200">{msg.content}</span>
                  </div>
                ))}
              </div>
              
              {conversation.status === 'connected' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <button
                    onClick={stopConversation}
                    className="px-16 py-8 bg-red-500/10 border-3 border-red-500 text-red-400 rounded-xl 
                    hover:bg-red-500/20 transition-all text-2xl font-semibold
                    shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  >
                    Stop Conversation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="text-sm text-gray-400 hover:text-gray-300"
            onClick={() => {
              const text = transcript.map(m => `${m.role === 'agent' ? 'Agent' : 'You'}: ${m.content}`).join('\n');
              navigator.clipboard.writeText(text);
            }}
          >
            Copy Transcript
          </button>
          <button
            className="text-sm text-gray-400 hover:text-gray-300"
            onClick={() => {
              const text = transcript.map(m => `${m.role === 'agent' ? 'Agent' : 'You'}: ${m.content}`).join('\n');
              const blob = new Blob([text], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'transcript.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download Transcript
          </button>
        </div>
      </main>
    </div>
  );
}
