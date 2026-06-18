import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  TenantWithCounts,
  Tenant,
  GymAdminInvite,
  SubscriptionPlan,
  TenantStatus,
  ProvisionTenantResponse,
  PlatformMember,
  PlatformBill,
  MemberSubscription,
} from "@/types/api";

const BASE = "/api/platform-proxy";

async function proxyRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(
      (data as { error?: string })?.error || `Request failed: ${res.status}`
    );
  }

  return res.json();
}

async function proxyGet<T>(path: string): Promise<T> {
  return proxyRequest<T>(path, { method: "GET" });
}

export function usePlatformTenants() {
  return useQuery({
    queryKey: ["platform", "tenants"],
    queryFn: () =>
      proxyGet<{ tenants: TenantWithCounts[] }>("/api/platform/tenants").then((r) => r.tenants),
    retry: false,
  });
}

export function usePlatformTenant(id: string) {
  const { data: tenants, isLoading, error } = usePlatformTenants();
  const tenant = tenants?.find((t) => t.id === id) ?? null;
  return { data: tenant, isLoading, error };
}

export function usePlatformInvites() {
  return useQuery({
    queryKey: ["platform", "invites"],
    queryFn: () =>
      proxyGet<{ invites: GymAdminInvite[] }>("/api/platform/invites").then((r) => r.invites),
    retry: false,
  });
}

export function useProvisionTenant() {
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
    }) =>
      proxyRequest<ProvisionTenantResponse>(
        "/api/platform/tenants",
        { method: "POST", body: JSON.stringify(data) }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "tenants"] });
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useChangeTenantStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tenantId, status }: { tenantId: string; status: TenantStatus }) =>
      proxyRequest<{ tenant: Tenant }>(
        `/api/platform/tenants/${tenantId}/status`,
        { method: "PATCH", body: JSON.stringify({ status }) }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "tenants"] });
    },
  });
}

export function useChangeTenantPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tenantId, plan }: { tenantId: string; plan: SubscriptionPlan }) =>
      proxyRequest<{ tenant: Tenant }>(
        `/api/platform/tenants/${tenantId}/plan`,
        { method: "PATCH", body: JSON.stringify({ plan }) }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "tenants"] });
    },
  });
}

export function useSendInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      tenantId: string;
      email: string;
      name: string;
      role?: string;
    }) =>
      proxyRequest<{ invite: GymAdminInvite }>(
        "/api/platform/invite",
        { method: "POST", body: JSON.stringify(data) }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useResendInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) =>
      proxyRequest<{ invite: GymAdminInvite }>(
        `/api/platform/invite/${inviteId}/resend`,
        { method: "POST" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "invites"] });
    },
  });
}

export function useSuspendAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      adminId,
      suspended,
    }: {
      adminId: string;
      suspended: boolean;
    }) =>
      proxyRequest(
        `/api/platform/admins/${adminId}/suspend`,
        { method: "PATCH", body: JSON.stringify({ suspended }) }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "bills"] });
    },
  });
}

export function usePlatformSubscriptions(status?: string, tenantId?: string) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (tenantId) params.set("tenantId", tenantId);
  params.set("limit", "50");

  return useQuery({
    queryKey: ["platform", "subscriptions", status, tenantId],
    queryFn: () =>
      proxyGet<{ subscriptions: MemberSubscription[]; total: number }>(
        `/api/platform/bills/subscriptions?${params}`
      ),
    retry: false,
  });
}

export function useMarkSubscriptionPaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subscriptionId: string) =>
      proxyRequest<{ subscription: MemberSubscription }>(
        `/api/platform/bills/subscriptions/${subscriptionId}/pay`,
        { method: "PATCH" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "subscriptions"] });
    },
  });
}

export function usePlatformMembers(search?: string, tenantId?: string, status?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (tenantId) params.set("tenantId", tenantId);
  if (status) params.set("status", status);
  params.set("limit", "50");

  return useQuery({
    queryKey: ["platform", "members", search, tenantId, status],
    queryFn: () =>
      proxyGet<{ members: PlatformMember[]; total: number }>(
        `/api/platform/members?${params}`
      ),
    enabled: true,
    retry: false,
  });
}

export function usePlatformBills() {
  return useQuery({
    queryKey: ["platform", "bills"],
    queryFn: () =>
      proxyGet<{ bills: PlatformBill[] }>("/api/platform/bills"),
    retry: false,
  });
}

export function useGenerateBills() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      proxyRequest<{ message: string; count: number }>(
        "/api/platform/bills/generate",
        { method: "POST" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "bills"] });
    },
  });
}

export function usePayBill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (billId: string) =>
      proxyRequest<{ bill: PlatformBill }>(
        `/api/platform/bills/${billId}/pay`,
        { method: "PATCH" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "bills"] });
    },
  });
}

export function useGenerateTenantBill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tenantId: string) =>
      proxyRequest<{ bill: PlatformBill }>(
        `/api/platform/bills/${tenantId}/generate`,
        { method: "POST" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "bills"] });
    },
  });
}
