import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useGymToken } from "./use-auth-token";
import type {
  DashboardStats,
  AdminMember,
  Member,
  TransferDashboard,
  GymClass,
  GymAdmin,
  Tenant,
  GymBenchmark,
  MpesaTransaction,
  BillingSummary,
} from "@/types/api";

export function useDashboardStats() {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "dashboard"],
    queryFn: () => apiClient.get<DashboardStats>("/api/admin/dashboard", { token: token || undefined }),
    enabled: !!token,
  });
}

export function useMembers() {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "members"],
    queryFn: () =>
      apiClient.get<{ members: AdminMember[] }>("/api/admin/members", { token: token || undefined }).then((r) => r.members),
    enabled: !!token,
  });
}

export function useMember(id: string) {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "members", id],
    queryFn: () =>
      apiClient
        .get<{ member: Member; recentSessions: number }>(`/api/admin/members/${id}`, { token: token || undefined })
        .then((r) => r.member),
    enabled: !!token && !!id,
  });
}

export function useTransfers() {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "transfers"],
    queryFn: () => apiClient.get<TransferDashboard>("/api/admin/dashboard/transfers", { token: token || undefined }),
    enabled: !!token,
  });
}

export function useClasses() {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "classes"],
    queryFn: () => apiClient.get<{ classes: GymClass[] }>("/api/admin/classes", { token: token || undefined }).then((r) => r.classes),
    enabled: !!token,
  });
}

export function useStaff() {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "staff"],
    queryFn: () =>
      apiClient.get<{ admins: GymAdmin[] }>("/api/admin/staff", { token: token || undefined }).then((r) => r.admins),
    enabled: !!token,
  });
}

export function useTenant(tenantId: string) {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "tenant", tenantId],
    queryFn: () => apiClient.get<{ tenant: Tenant }>(`/api/tenants/${tenantId}`, { token: token || undefined }).then((r) => r.tenant),
    enabled: !!token && !!tenantId,
  });
}

export function useBenchmarks(weeks = 12) {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "benchmarks", weeks],
    queryFn: () =>
      apiClient
        .get<{ benchmarks: GymBenchmark[]; platformAverage: { retentionPct: number; avgSessionsPerMember: number; activeMembers: number } }>(
          `/api/admin/benchmarks?weeks=${weeks}`,
          { token: token || undefined }
        ),
    enabled: !!token,
  });
}

export function useBillingTransactions(page = 1, limit = 50, status?: string) {
  const token = useGymToken();
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (status) params.set("status", status);
  return useQuery({
    queryKey: ["gym", "billing", "transactions", page, limit, status],
    queryFn: () =>
      apiClient.get<{ transactions: MpesaTransaction[]; total: number; page: number }>(
        `/api/admin/billing/transactions?${params}`,
        { token: token || undefined }
      ),
    enabled: !!token,
  });
}

export function useBillingSummary() {
  const token = useGymToken();
  return useQuery({
    queryKey: ["gym", "billing", "summary"],
    queryFn: () => apiClient.get<BillingSummary>("/api/admin/billing/summary", { token: token || undefined }),
    enabled: !!token,
  });
}
