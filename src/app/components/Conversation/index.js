"use client";

import { useConversation } from "@11labs/react";
import { useCallback, useState } from "react";
import { Header } from "./Header";
import { TranscriptView } from "./TranscriptView";

export function Conversation() {
  const [transcript, setTranscript] = useState([]);

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => {
      console.log("Message:", message);
      setTranscript((prev) => [...prev, { role: "agent", content: message }]);
    },
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Start audio
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId: "xfUT2HAJEFqMxhXVCF3J" });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      // Show error to user
      setTranscript((prev) => [
        ...prev,
        {
          role: "system",
          content: `Error: ${error.message}`,
        },
      ]);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to stop conversation:", error);
    }
  }, [conversation]);

  return (
    <div className="flex h-screen bg-black text-gray-200">
      <main className="flex-1 p-6 flex flex-col bg-black">
        <Header
          status={conversation.status}
          isSpeaking={conversation.isSpeaking}
          onStart={startConversation}
          onStop={stopConversation}
        />

        <div className="flex-1 overflow-y-auto bg-gray-900 rounded border border-gray-800 p-4 space-y-3">
          <TranscriptView
            transcript={transcript}
            status={conversation.status}
            onStop={stopConversation}
            onStart={startConversation}
          />
        </div>
      </main>
    </div>
  );
}

export { Sidebar } from "../Layouts/Sidebar";
export { Header } from "./Header";
export { TranscriptView } from "./TranscriptView";
export { TranscriptActions } from "./TranscriptActions";
export { ConversationControls } from "./ConversationControls";
