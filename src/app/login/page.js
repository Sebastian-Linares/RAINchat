"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Login } from "@/app/components/Login";
import { useCurrentUser } from "@/app/lib/hooks/useCurrentUser";
import { pages } from "@/app/lib/routes";
export default function Home() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (user) {
      router.push(pages.conversations);
    }
  }, [user, router]);

  const handleLogin = (user) => {
    if (user) {
      router.push(pages.conversations);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="h-screen overflow-hidden">
      <Login onLogin={handleLogin} />
    </main>
  );
}
