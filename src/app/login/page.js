"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Login } from "../components/Login";
import { useCurrentUser } from "../hooks/useCurrentUser";
export default function Home() {
  const router = useRouter();
  const { user, loading, error } = useCurrentUser();

  useEffect(() => {
    if (user) {
      router.push("/conversation");
    }
  }, [user, router]);

  const handleLogin = (user) => {
    if (user) {
      router.push("/conversation");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="h-screen overflow-hidden">
      <Login onLogin={handleLogin} />
    </main>
  );
}
