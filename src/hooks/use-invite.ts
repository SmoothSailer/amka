import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { InviteVerifyResponse, InviteAcceptResponse } from "@/types/api";

export function useInviteVerify(token: string) {
  return useQuery({
    queryKey: ["invite", "verify", token],
    queryFn: () =>
      apiClient.get<InviteVerifyResponse>(`/api/invite/verify?token=${encodeURIComponent(token)}`),
    enabled: !!token,
    retry: false,
  });
}

export function useInviteAccept() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      apiClient.post<InviteAcceptResponse>("/api/invite/accept", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invite"] });
    },
  });
}
