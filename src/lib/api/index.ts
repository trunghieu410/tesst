const API_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | string[]>;
  _retry?: boolean;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

// Helper to construct URL with query params
const createUrl = (endpoint: string, params?: RequestOptions["params"]): string => {
  const url = new URL(endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        url.searchParams.append(key, String(value));
      } else if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
};

const headersToObject = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

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

const extendedFetch = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const { params, ...fetchOptions } = options;
  const token = localStorage.getItem("authToken");

  const headers = new Headers(fetchOptions.headers || {});
  headers.set("Content-Type", "application/json");
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = createUrl(endpoint, params);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (response.ok) {
        const contentType = response.headers.get("content-type");
        const data = contentType && contentType.includes("application/json") 
            ? await response.json() 
            : await response.text();
        
        return {
            data,
            status: response.status,
            headers: headersToObject(response.headers),
        };
    }

    if (response.status === 401 && !options._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
             // For the retry, we need to ensure the new token is used.
             // extendedFetch reads from localStorage, so we just need to re-call it.
            return extendedFetch<T>(endpoint, { ...options, _retry: true });
        });
      }

      options._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("rfk");
      if (!refreshToken) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("rfk");
        window.location.href = "/";
        const errorData = await response.json().catch(() => ({}));

        throw { 
            response: {
                data: errorData,
                status: response.status,
                headers: headersToObject(response.headers),
            }
        };
      }

      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error("Refresh failed");
        }

        const refreshData = await refreshResponse.json();
        const { accessToken } = refreshData;

        localStorage.setItem("authToken", accessToken);
        processQueue(null, accessToken);
        
        return extendedFetch<T>(endpoint, options);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("rfk");
        window.location.href = "/";
        // Construct a response-like error object if possible, or just throw
        // The original code returned Promise.reject(refreshError)
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    const errorData = await response.json().catch(() => ({}));
    throw {
      response: {
        data: errorData,
        status: response.status,
        headers: headersToObject(response.headers),
      },
      message: `Request failed with status ${response.status}`,
    };

  } catch (error) {
    if (error instanceof Error) {
        throw error;
    }
    throw error;
  }
};

export const api = {
  get: <T = any>(url: string, config?: RequestOptions) => 
    extendedFetch<T>(url, { ...config, method: "GET" }),
  
  post: <T = any>(url: string, data?: any, config?: RequestOptions) => 
    extendedFetch<T>(url, { ...config, method: "POST", body: JSON.stringify(data) }),
    
  put: <T = any>(url: string, data?: any, config?: RequestOptions) => 
    extendedFetch<T>(url, { ...config, method: "PUT", body: JSON.stringify(data) }),
    
  patch: <T = any>(url: string, data?: any, config?: RequestOptions) => 
    extendedFetch<T>(url, { ...config, method: "PATCH", body: JSON.stringify(data) }),
    
  delete: <T = any>(url: string, config?: RequestOptions) => 
    extendedFetch<T>(url, { ...config, method: "DELETE" }),
};


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
