import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import User from "@/app/lib/models/User";

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          setUser(User.fromJson(JSON.parse(storedUser)));
        } else {
          // Clear any potentially invalid data
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          router.push("/login");
        }
      } catch (err) {
        setError(err.message);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return { user, loading, error, logout, setUser };
}
