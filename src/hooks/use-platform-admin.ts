import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { usePlatformToken } from "./use-auth-token";
import type {
  PlatformStats,
  PlatformAlert,
  TenantWithCounts,
  Tenant,
  GymAdminInvite,
  AdminMember,
  BillingSummary,
  SubscriptionPlan,
  TenantStatus,
  ProvisionTenantResponse,
} from "@/types/api";

export function usePlatformStats() {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "stats"],
    queryFn: () => apiClient.get<PlatformStats>("/api/platform/stats", { token: token || undefined }),
    enabled: !!token,
  });
}

export function usePlatformAlerts() {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "alerts"],
    queryFn: () =>
      apiClient.get<{ alerts: PlatformAlert[] }>("/api/platform/alerts", { token: token || undefined }).then((r) => r.alerts),
    enabled: !!token,
  });
}

export function usePlatformTenants() {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "tenants"],
    queryFn: () =>
      apiClient.get<{ tenants: TenantWithCounts[] }>("/api/platform/tenants", { token: token || undefined }).then((r) => r.tenants),
    enabled: !!token,
  });
}

export function usePlatformTenant(id: string) {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "tenants", id],
    queryFn: () => apiClient.get<{ tenant: Tenant }>(`/api/platform/tenants/${id}`, { token: token || undefined }).then((r) => r.tenant),
    enabled: !!token && !!id,
  });
}

export function usePlatformInvites() {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "invites"],
    queryFn: () =>
      apiClient.get<{ invites: GymAdminInvite[] }>("/api/platform/invites", { token: token || undefined }).then((r) => r.invites),
    enabled: !!token,
  });
}

export function usePlatformMembers() {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "members"],
    queryFn: () =>
      apiClient.get<{ members: AdminMember[] }>("/api/platform/members", { token: token || undefined }).then((r) => r.members),
    enabled: !!token,
  });
}

export function usePlatformBillingOverview() {
  const token = usePlatformToken();
  return useQuery({
    queryKey: ["platform", "billing", "overview"],
    queryFn: () =>
      apiClient.get<BillingSummary & { revenuePerGym: Array<{ tenantId: string; gymName: string; amount: number }> }>(
        "/api/platform/billing/overview",
        { token: token || undefined }
      ),
    enabled: !!token,
  });
}

export function useProvisionTenant() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      gymName: string;
      adminEmail: string;
      adminName: string;
      primaryColor?: string;
      secondaryColor?: string;
      accentColor?: string;
      location?: string;
      description?: string;
    }) => apiClient.post<ProvisionTenantResponse>("/api/platform/tenants", data, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "tenants"] });
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useChangeTenantStatus() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tenantId, status }: { tenantId: string; status: TenantStatus }) =>
      apiClient.patch<{ tenant: Tenant }>(`/api/platform/tenants/${tenantId}/status`, { status }, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "tenants"] });
    },
  });
}

export function useChangeTenantPlan() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tenantId, plan }: { tenantId: string; plan: SubscriptionPlan }) =>
      apiClient.patch<{ tenant: Tenant }>(`/api/platform/tenants/${tenantId}/plan`, { plan }, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "tenants"] });
    },
  });
}

export function useSendInvite() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { tenantId: string; email: string; name: string; role?: string }) =>
      apiClient.post<{ invite: GymAdminInvite }>("/api/platform/invite", data, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useResendInvite() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) =>
      apiClient.post<{ invite: GymAdminInvite }>(`/api/platform/invite/${inviteId}/resend`, undefined, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useRevokeInvite() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) =>
      apiClient.delete(`/api/platform/invites/${inviteId}`, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useSuspendAdmin() {
  const token = usePlatformToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ adminId, suspended }: { adminId: string; suspended: boolean }) =>
      apiClient.patch(`/api/platform/admins/${adminId}/suspend`, { suspended }, { token: token || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform"] });
    },
  });
}
