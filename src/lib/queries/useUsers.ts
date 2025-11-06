import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import { useToast } from "@/context/toast/useToast";

export function useUsers(page: number = 1, pageSize: number = 20) {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => usersApi.getUsers(page, pageSize),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (id: string) => usersApi.suspendUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      success("User suspended successfully");
    },
    onError: () => {
      error("Failed to suspend user");
    },
  });
}

export function useBanUser() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (id: string) => usersApi.banUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      success("User banned successfully");
    },
    onError: () => {
      error("Failed to ban user");
    },
  });
}
