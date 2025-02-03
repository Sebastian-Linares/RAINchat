"use client";

import { useConversation } from "@11labs/react";
import { useCallback, useState, useEffect } from "react";
import { Header } from "./Header";
import { TranscriptView } from "./TranscriptView";
import { useCurrentUser } from "@/app/lib/hooks/useCurrentUser";
import ConversationModel from "@/app/lib/models/Conversation";
import { useTimer } from "@/app/lib/hooks/useTimer";
import { useSearchParams } from "next/navigation";
import { agents } from "@/app/lib/agents";

export function Conversation() {
  const [transcript, setTranscript] = useState([]);
  const { user } = useCurrentUser();
  const [currentConversation, setCurrentConversation] = useState(null);
  const timer = useTimer();
  const [activeAgent, setActiveAgent] = useState(agents[0]);
  const searchParams = useSearchParams();

  const aiConversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      timer.reset();
      timer.start();
    },
    onDisconnect: () => {
      timer.stop();
      timer.reset();
      setCurrentConversation(null);
      setTranscript([]);
      console.log("Disconnected");
    },
    onMessage: (message) => {
      console.log("Message:", message);
      setTranscript((prev) => [...prev, { role: "agent", content: message }]);
    },
    onError: (error) => {
      console.error("Error:", error);
      timer.stop();
      timer.reset();
      setCurrentConversation(null);
      setTranscript([]);
    },
  });

  useEffect(() => {
    const agentId = searchParams.get("agentId");
    if (agentId) {
      setActiveAgent(agents.find((agent) => agent.id === agentId));
      console.log("Active agent:", activeAgent);
      timer.stop();
      timer.reset();
      setCurrentConversation(null);
      setTranscript([]);
    }
  }, [searchParams, activeAgent, timer]);

  // Update duration display every second, but only update 11labsConversation every 10 seconds
  useEffect(() => {
    if (
      aiConversation.status === "connected" &&
      Math.floor(timer.time) % 10 === 0 &&
      timer.time > 0
    ) {
      currentConversation
        .addDuration(10)
        .then(() => {
          console.log("Duration updated:");
        })
        .catch((error) => {
          console.error("Failed to update conversation duration:", error);
        });
    }
  }, [aiConversation, timer, currentConversation]);

  const startConversation = useCallback(async () => {
    try {
      if (!user || aiConversation.status === "connected") return;

      const agentId = activeAgent.id;

      // Create conversation in database
      try {
        const newConversation = await ConversationModel.create({
          userId: user.id,
          agentId,
        });
        setCurrentConversation(newConversation);
      } catch (error) {
        alert("Failed to start conversation: " + error.message);
        return;
      }

      // Start audio
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await aiConversation.startSession({ agentId });
    } catch (error) {
      // Show error to user
      setTranscript((prev) => [
        ...prev,
        {
          role: "system",
          content: `Error: ${error.message}`,
        },
      ]);
    }
  }, [aiConversation, user, activeAgent]);

  const stopConversation = useCallback(async () => {
    try {
      await aiConversation.endSession();
      setCurrentConversation(null);
    } catch (error) {
      console.error("Failed to stop conversation:", error);
    }
  }, [aiConversation]);

  return (
    <div className="flex h-screen bg-black text-gray-200">
      <main className="flex-1 p-6 flex flex-col bg-black">
        <Header
          status={aiConversation.status}
          isSpeaking={aiConversation.isSpeaking}
          onStart={startConversation}
          onStop={stopConversation}
          duration={timer.time}
        />
        <div className="flex-1 overflow-y-auto bg-gray-900 rounded border border-gray-800 p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{activeAgent.name}</h3>
          </div>
          <TranscriptView
            transcript={transcript}
            status={aiConversation.status}
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
