import { api } from "./index";

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
