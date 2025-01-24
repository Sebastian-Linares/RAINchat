import User from "@/app/lib/models/User";

const API_BASE_URL = "/api";

export const authService = {
  async login(email) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const { user, token } = await response.json();
    return { user: User.fromJson(user), token };
  },
};

export const apiService = {
  async fetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }

      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  },

  get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: "GET" });
  },

  post(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put(endpoint, data, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: "DELETE" });
  },
};
