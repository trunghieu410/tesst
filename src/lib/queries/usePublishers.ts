import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { publishersApi } from "@/lib/api";
import type {
  MembersFilters,
  MembersResponse,
  KYCResponse,
  ActivityLogsFilters,
  ActivityLogsResponse,
  PublisherNote,
  PublisherRole,
  PublisherOverviewResponse,
} from "@/types";

export interface PublisherFilters {
  search?: string;
  country?: string[];
  status?: string[];
  minMembers?: number;
  createdFrom?: string;
  createdTo?: string;
}

// ==========================================
// Publisher List Queries
// ==========================================

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
  return useQuery<PublisherOverviewResponse>({
    queryKey: ["publisher-overview", id],
    queryFn: () => publishersApi.getPublisherOverview(id),
    enabled: !!id,
  });
}

// ==========================================
// Notes Queries & Mutations
// ==========================================

export function usePublisherNotes(publisherId: string) {
  return useQuery<PublisherNote[]>({
    queryKey: ["publisher-notes", publisherId],
    queryFn: () => publishersApi.getNotes(publisherId),
    enabled: !!publisherId,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      content,
    }: {
      publisherId: string;
      content: string;
    }) => publishersApi.createNote(publisherId, content),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-notes", publisherId],
      });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      noteId,
    }: {
      publisherId: string;
      noteId: string;
    }) => publishersApi.deleteNote(publisherId, noteId),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-notes", publisherId],
      });
    },
  });
}

// ==========================================
// Roles Queries & Mutations
// ==========================================

export function usePublisherRoles(publisherId: string) {
  return useQuery<{ roles: PublisherRole[] }>({
    queryKey: ["publisher-roles", publisherId],
    queryFn: () => publishersApi.getRoles(publisherId),
    enabled: !!publisherId,
  });
}

export function useAssignRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      roleCode,
    }: {
      publisherId: string;
      roleCode: string;
    }) => publishersApi.assignRole(publisherId, roleCode),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-roles", publisherId],
      });
      queryClient.invalidateQueries({ queryKey: ["publisher", publisherId] });
    },
  });
}

export function useUnassignRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      roleCode,
    }: {
      publisherId: string;
      roleCode: string;
    }) => publishersApi.unassignRole(publisherId, roleCode),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-roles", publisherId],
      });
      queryClient.invalidateQueries({ queryKey: ["publisher", publisherId] });
    },
  });
}

// ==========================================
// Status & Security Mutations
// ==========================================

export function useUpdatePublisherStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      targetStatus,
      reason,
    }: {
      publisherId: string;
      targetStatus: "active" | "suspended";
      reason: string;
    }) => publishersApi.updateStatus(publisherId, targetStatus, reason),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({ queryKey: ["publisher", publisherId] });
      queryClient.invalidateQueries({
        queryKey: ["publisher-overview", publisherId],
      });
    },
  });
}

export function useDisable2FA() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ publisherId }: { publisherId: string }) =>
      publishersApi.disable2FA(publisherId),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({ queryKey: ["publisher", publisherId] });
    },
  });
}

// ==========================================
// Members Queries
// ==========================================

export function usePublisherMembers(
  publisherId: string,
  filters: Omit<MembersFilters, "page" | "limit"> = {},
  page: number = 1,
  limit: number = 20
) {
  return useQuery<MembersResponse>({
    queryKey: ["publisher-members", publisherId, page, limit, filters],
    queryFn: () =>
      publishersApi.getMembers(publisherId, {
        page,
        limit,
        includeStats: true,
        ...filters,
      }),
    enabled: !!publisherId,
  });
}

// ==========================================
// KYC Queries & Mutations
// ==========================================

export function usePublisherKyc(publisherId: string) {
  return useQuery<KYCResponse>({
    queryKey: ["publisher-kyc", publisherId],
    queryFn: () => publishersApi.getKycSubmissions(publisherId),
    enabled: !!publisherId,
  });
}

export function useApproveKyc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      submissionId,
    }: {
      publisherId: string;
      submissionId: string;
    }) => publishersApi.approveKyc(publisherId, submissionId),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-kyc", publisherId],
      });
      queryClient.invalidateQueries({
        queryKey: ["publisher-overview", publisherId],
      });
    },
  });
}

export function useRejectKyc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      submissionId,
      reason,
    }: {
      publisherId: string;
      submissionId: string;
      reason: string;
    }) => publishersApi.rejectKyc(publisherId, submissionId, reason),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-kyc", publisherId],
      });
      queryClient.invalidateQueries({
        queryKey: ["publisher-overview", publisherId],
      });
    },
  });
}

// ==========================================
// Activity Logs Queries
// ==========================================

export function usePublisherActivityLogs(
  publisherId: string,
  filters: Omit<ActivityLogsFilters, "page" | "limit"> = {},
  page: number = 1,
  limit: number = 20
) {
  return useQuery<ActivityLogsResponse>({
    queryKey: ["publisher-activity-logs", publisherId, page, limit, filters],
    queryFn: () =>
      publishersApi.getActivityLogs(publisherId, {
        page,
        limit,
        ...filters,
      }),
    enabled: !!publisherId,
  });
}

// ==========================================
// Blacklist Queries & Mutations
// ==========================================

export function usePublisherBlacklists(publisherId: string) {
  return useQuery({
    queryKey: ["publisher-blacklists", publisherId],
    queryFn: () => publishersApi.getBlacklists(publisherId),
    enabled: !!publisherId,
  });
}

export function useAddToBlacklist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      campaignId,
      reason,
    }: {
      publisherId: string;
      campaignId: string;
      reason?: string;
    }) => publishersApi.addToBlacklist(publisherId, campaignId, reason),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-blacklists", publisherId],
      });
      queryClient.invalidateQueries({
        queryKey: ["publisher-overview", publisherId],
      });
    },
  });
}

export function useRemoveFromBlacklist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      publisherId,
      campaignId,
    }: {
      publisherId: string;
      campaignId: string;
    }) => publishersApi.removeFromBlacklist(publisherId, campaignId),
    onSuccess: (_, { publisherId }) => {
      queryClient.invalidateQueries({
        queryKey: ["publisher-blacklists", publisherId],
      });
      queryClient.invalidateQueries({
        queryKey: ["publisher-overview", publisherId],
      });
    },
  });
}

