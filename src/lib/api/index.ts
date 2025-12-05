import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses with token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("rfk");
      console.log("=====refreshToken ",refreshToken);
      if (!refreshToken) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("rfk");
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });
        const { accessToken } = response.data;
        console.log("=====response after refresh", accessToken);

        localStorage.setItem("authToken", accessToken);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("rfk");
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  requestOtp: async (email: string) => {
    const response = await api.post("/auth/otp/request", { email });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post("/auth/otp/verify", { email, otp });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Users API
export const usersApi = {
  getUsers: async (page: number = 1, limit: number = 20) => {
    const response = await api.get("/users", {
      params: { _page: page, _limit: limit },
    });
    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"] || "0"),
    };
  },

  getUser: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  suspendUser: async (id: string) => {
    const response = await api.patch(`/users/${id}`, { status: "suspended" });
    return response.data;
  },

  banUser: async (id: string) => {
    const response = await api.patch(`/users/${id}`, { status: "banned" });
    return response.data;
  },
};

// Re-export from separate files
export { publishersApi } from "./publishers";
export { campaignsApi } from "./campaigns";
