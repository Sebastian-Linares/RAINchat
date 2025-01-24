"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Login } from "@/app/components/Login";
import { useCurrentUser } from "@/app/lib/hooks/useCurrentUser";
import { pages } from "@/app/lib/routes";

export default function Home() {
  const { user } = useCurrentUser();
  const router = useRouter();

  const goToConversations = useCallback(() => {
    router.push(pages.conversations);
  }, [router]);

  useEffect(() => {
    if (user) {
      goToConversations();
    }
  }, [goToConversations, user]);

  const handleLogin = (user) => {
    if (user) {
      goToConversations();
    }
  };

  return (
    <main className="h-screen overflow-hidden">
      <Login onLogin={handleLogin} />
    </main>
  );
}
