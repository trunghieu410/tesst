import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "@/lib/api";
import { useToast } from "@/context/toast/useToast";

export function useCampaigns(
  page: number = 1,
  pageSize: number = 20,
  filters?: {
    search?: string;
    country?: string;
    imageType?: string;
    status?: string;
    dateRange?: string;
  }
) {
  return useQuery({
    queryKey: ["campaigns", page, pageSize, filters],
    queryFn: () =>
      campaignsApi.getCampaigns({
        page,
        limit: pageSize,
        ...filters,
      }),
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => campaignsApi.getCampaign(id),
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (data: {
      title: string;
      startDate: string;
      endDate: string;
      description: string;
    }) => campaignsApi.createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      success("Campaign created successfully");
    },
    onError: () => {
      error("Failed to create campaign");
    },
  });
}
