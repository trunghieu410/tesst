import { api } from "./index";

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

  // Notes API
  getNotes: async (publisherId: string) => {
    const response = await api.get(`/admin/publishers/${publisherId}/notes`);
    return response.data;
  },

  createNote: async (publisherId: string, content: string) => {
    const response = await api.post(`/admin/publishers/${publisherId}/notes`, {
      content,
    });
    return response.data;
  },

  deleteNote: async (publisherId: string, noteId: string) => {
    const response = await api.delete(
      `/admin/publishers/${publisherId}/notes/${noteId}`
    );
    return response.data;
  },

  // Roles API
  getRoles: async (publisherId: string) => {
    const response = await api.get(`/admin/publishers/${publisherId}/roles`);
    return response.data;
  },

  assignRole: async (publisherId: string, roleCode: string) => {
    const response = await api.post(`/admin/publishers/${publisherId}/roles`, {
      roleCode,
    });
    return response.data;
  },

  unassignRole: async (publisherId: string, roleCode: string) => {
    const response = await api.delete(
      `/admin/publishers/${publisherId}/roles/${roleCode}`
    );
    return response.data;
  },

  // Status API
  updateStatus: async (
    publisherId: string,
    targetStatus: "active" | "suspended",
    reason: string
  ) => {
    const response = await api.post(
      `/admin/publishers/${publisherId}/status`,
      { targetStatus, reason }
    );
    return response.data;
  },

  // Security API
  disable2FA: async (publisherId: string) => {
    const response = await api.post(
      `/admin/publishers/${publisherId}/disable-2fa`
    );
    return response.data;
  },

  // Members API
  getMembers: async (
    publisherId: string,
    params: {
      page?: number;
      limit?: number;
      search?: string;
      tier?: string;
      countries?: string;
      accountStatuses?: string;
      includeStats?: boolean;
    } = {}
  ) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.tier) queryParams.append("tier", params.tier);
    if (params.countries) queryParams.append("countries", params.countries);
    if (params.accountStatuses) queryParams.append("accountStatuses", params.accountStatuses);
    if (params.includeStats) queryParams.append("includeStats", "true");

    const response = await api.get(
      `/admin/publishers/${publisherId}/members?${queryParams.toString()}`
    );
    return response.data;
  },

  // KYC API
  getKycSubmissions: async (
    publisherId: string,
    includeStatus: boolean = true
  ) => {
    const response = await api.get(
      `/admin/publishers/${publisherId}/kyc?includeStatus=${includeStatus}`
    );
    return response.data;
  },

  approveKyc: async (publisherId: string, submissionId: string) => {
    const response = await api.post(
      `/admin/publishers/${publisherId}/kyc/${submissionId}/approve`
    );
    return response.data;
  },

  rejectKyc: async (
    publisherId: string,
    submissionId: string,
    reason: string
  ) => {
    const response = await api.post(
      `/admin/publishers/${publisherId}/kyc/${submissionId}/reject`,
      { reason }
    );
    return response.data;
  },

  // Activity Logs API
  getActivityLogs: async (
    publisherId: string,
    params: {
      page?: number;
      limit?: number;
      actor?: string;
      includeSummary?: boolean;
    } = {}
  ) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.actor) queryParams.append("actor", params.actor);
    if (params.includeSummary) queryParams.append("includeSummary", "true");

    const response = await api.get(
      `/admin/publishers/${publisherId}/activity-logs?${queryParams.toString()}`
    );
    return response.data;
  },

  // Blacklist API
  getBlacklists: async (publisherId: string) => {
    const response = await api.get(
      `/admin/publishers/${publisherId}/blacklists`
    );
    return response.data;
  },

  addToBlacklist: async (
    publisherId: string,
    campaignId: string,
    reason?: string
  ) => {
    const response = await api.post(
      `/admin/publishers/${publisherId}/blacklists`,
      { campaignId, reason }
    );
    return response.data;
  },

  removeFromBlacklist: async (publisherId: string, campaignId: string) => {
    const response = await api.delete(
      `/admin/publishers/${publisherId}/blacklists/${campaignId}`
    );
    return response.data;
  },
};
