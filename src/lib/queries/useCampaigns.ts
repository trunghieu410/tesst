import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "@/lib/api";
import { toast } from "sonner";

export function useCampaigns(page: number = 1, pageSize: number = 20) {
  return useQuery({
    queryKey: ["campaigns", page, pageSize],
    queryFn: () => campaignsApi.getCampaigns(page, pageSize),
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

  return useMutation({
    mutationFn: (data: {
      title: string;
      startDate: string;
      endDate: string;
      description: string;
    }) => campaignsApi.createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Campaign created successfully");
    },
    onError: () => {
      toast.error("Failed to create campaign");
    },
  });
}
