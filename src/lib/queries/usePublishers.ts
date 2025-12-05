import { useQuery } from "@tanstack/react-query";
import { publishersApi } from "@/lib/api";

export interface PublisherFilters {
  search?: string;
  country?: string[];
  status?: string[];
  minMembers?: number;
  createdFrom?: string;
  createdTo?: string;
}

export function usePublishers(
  page: number = 1,
  pageSize: number = 20,
  filters: PublisherFilters = {}
) {
  return useQuery({
    queryKey: ["publishers", page, pageSize, filters],
    queryFn: () =>
      publishersApi.getPublishers({
        page,
        limit: pageSize,
        ...filters,
      }),
  });
}

export function usePublisher(id: string) {
  return useQuery({
    queryKey: ["publisher", id],
    queryFn: () => publishersApi.getPublisher(id),
    enabled: !!id,
  });
}

export function usePublisherOverview(id: string) {
  return useQuery({
    queryKey: ["publisher-overview", id],
    queryFn: () => publishersApi.getPublisherOverview(id),
    enabled: !!id,
  });
}
