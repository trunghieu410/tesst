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

// Handle 401 responses by redirecting to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token
      localStorage.removeItem("authToken");
      // Redirect to login page
      window.location.href = "/";
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

// Publishers API
export const publishersApi = {
  getPublishers: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      country?: string[];
      status?: string[];
      minMembers?: number;
      createdFrom?: string;
      createdTo?: string;
    } = {}
  ) => {
    const {
      page = 1,
      limit = 20,
      search,
      country,
      status,
      minMembers,
      createdFrom,
      createdTo,
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    }); 

    // For now, let's use simpler queries that json-server definitely supports
    if (search) queryParams.append("search", search);
    if (country) queryParams.append("countries", country.join(","));
    if (status) queryParams.append("accountStatuses", status.join(","));
    if (minMembers !== undefined && minMembers > 0)
      queryParams.append("minMembers", minMembers.toString());
    if (createdFrom) queryParams.append("createdFrom", createdFrom);
    if (createdTo) queryParams.append("createdTo", createdTo);

    const response = await api.get(
      `/admin/publishers?${queryParams.toString()}`
    );
    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"] || "0"),
    };
  },

  getPublisher: async (id: string) => {
    const response = await api.get(`/admin/publishers/${id}`);
    return response.data;
  },
  getPublisherOverview: async (id: string) => {
    const response = await api.get(`/admin/publishers/${id}/overview`);
    return response.data;
  },
};

// Campaigns API
export const campaignsApi = {
  getCampaigns: async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      country?: string;
      imageType?: string;
      status?: string;
      dateRange?: string;
    } = {}
  ) => {
    const {
      page = 1,
      limit = 20,
      search,
      country,
      imageType,
      status,
      // dateRange,
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filters
    if (search) queryParams.append("q", search);
    if (country) queryParams.append("country.code", country);
    if (imageType) queryParams.append("imageType", imageType);
    if (status) queryParams.append("status", status);

    const response = await api.get(`/campaigns`);
    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"] || "0"),
    };
  },

  getCampaign: async (id: string) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  createCampaign: async (data: {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  }) => {
    const response = await api.post("/campaigns", {
      ...data,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },
};
