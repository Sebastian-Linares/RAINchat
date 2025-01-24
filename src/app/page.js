"use client";

import { useRouter } from "next/navigation";
import { Login } from "./components/Login";

export default function Home() {
  const router = useRouter();

  const handleLogin = (user) => {
    if (user) {
      router.push("/conversation");
    }
  };

  return (
    <main className="h-screen overflow-hidden">
      <Login onLogin={handleLogin} />
    </main>
  );
}
