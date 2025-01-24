"use client";

import { useState } from "react";
import { authService } from "@/app/lib/services/api";
import { useRouter } from "next/navigation";
import { pages } from "@/app/lib/routes";

export function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user, token } = await authService.login(email);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      router.push(pages.conversations);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[var(--background)] border border-[var(--foreground)] border-opacity-10 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-[var(--foreground)]">
          Welcome Back
        </h1>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--foreground)] border-opacity-10 bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[var(--foreground)]"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[var(--foreground)] text-[var(--background)] rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
