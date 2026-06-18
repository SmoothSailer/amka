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
  BillingCurrent,
  BillingHistoryEntry,
} from "@/types/api";

const BASE = "/api/gym-proxy";

async function proxyGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(
      (data as { error?: string })?.error || `Request failed: ${res.status}`
    );
  }
  return res.json();
}

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

export function useGymBillingCurrent() {
  return useQuery({
    queryKey: ["gym", "billing", "current"],
    queryFn: () => proxyGet<BillingCurrent>("/api/admin/billing/current"),
    retry: false,
  });
}

export function useGymBillingHistory() {
  return useQuery({
    queryKey: ["gym", "billing", "history"],
    queryFn: () =>
      proxyGet<{ transactions: BillingHistoryEntry[] }>("/api/admin/billing/history").then(
        (r) => r.transactions
      ),
    retry: false,
  });
}
