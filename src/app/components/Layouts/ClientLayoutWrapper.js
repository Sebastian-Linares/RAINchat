"use client";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { LoggedInLayout } from "./LoggedInLayout";
import { usePathname } from "next/navigation";

export function ClientLayoutWrapper({ children }) {
  const { user, loading } = useCurrentUser();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div>
      </div>
    );
  }

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  if (!user && !isPublicPath) {
    return null; // Let the useCurrentUser hook handle the redirect
  }

  return user && !isPublicPath ? (
    <LoggedInLayout>{children}</LoggedInLayout>
  ) : (
    children
  );
}
