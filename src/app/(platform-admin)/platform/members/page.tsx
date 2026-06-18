"use client";

import { useState, useMemo } from "react";
import { usePlatformMembers, usePlatformTenants, usePlatformSubscriptions } from "@/hooks/use-platform-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { PlatformMember } from "@/types/api";
import { Search, Bell, CheckCircle, Clock, XCircle, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const MEMBER_FEE = 30;

export default function PlatformMembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tenantFilter, setTenantFilter] = useState("");
  const [notifyingId, setNotifyingId] = useState<string | null>(null);

  const { data, isLoading } = usePlatformMembers(search || undefined, tenantFilter || undefined, statusFilter || undefined);
  const { data: tenants } = usePlatformTenants();
  const { data: subsData } = usePlatformSubscriptions();

  const subscriptionMap = useMemo(() => {
    const map = new Map<string, { status: string; amount: number; periodStart: string; paidAt: string | null }>();
    (subsData?.subscriptions ?? []).forEach((s) => {
      if (s.memberId) map.set(s.memberId, {
        status: s.status,
        amount: s.amount || MEMBER_FEE,
        periodStart: s.periodStart,
        paidAt: s.paidAt,
      });
    });
    return map;
  }, [subsData]);

  const members = data?.members ?? [];
  const total = data?.total ?? 0;

  const handleNotify = async (memberName: string) => {
    setNotifyingId(memberName);
    await new Promise((r) => setTimeout(r, 1000));
    setNotifyingId(null);
  };

  const columns: ColumnDef<PlatformMember>[] = [
    { accessorKey: "preferredName", header: "Name" },
    { accessorKey: "phone", header: "Phone", cell: ({ row }) => row.getValue("phone") || "—" },
    { accessorKey: "email", header: "Email", cell: ({ row }) => row.getValue("email") || "—" },
    { id: "gym", header: "Gym", accessorFn: (row) => row.tenant?.gymName || "—" },
    {
      accessorKey: "membershipStatus", header: "Membership",
      cell: ({ row }) => {
        const s = row.getValue("membershipStatus") as string;
        const styles: Record<string, string> = { ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20", EXPIRED: "bg-red-500/10 text-red-500 border-red-500/20", SUSPENDED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" };
        return <span className={`px-2 py-1 rounded-full text-xs border ${styles[s] || ""}`}>{s}</span>;
      },
    },
    {
      id: "payment", header: "Payment",
      cell: ({ row }) => {
        const sub = subscriptionMap.get(row.original.id);
        const isExpired = row.original.membershipStatus === "EXPIRED";

        if (sub) {
          const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
            PAID: { icon: <CheckCircle className="w-3.5 h-3.5 text-green-500" />, color: "text-green-500" },
            PENDING: { icon: <Clock className="w-3.5 h-3.5 text-yellow-500" />, color: "text-yellow-500" },
            OVERDUE: { icon: <XCircle className="w-3.5 h-3.5 text-red-500" />, color: "text-red-500" },
          };
          const cfg = statusConfig[sub.status] || statusConfig.PENDING;
          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CreditCard className={`w-3.5 h-3.5 ${cfg.color}`} />
                <span className={`text-xs font-medium ${cfg.color}`}>KES {sub.amount}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {sub.paidAt ? `Paid ${new Date(sub.paidAt).toLocaleDateString()}` : "Unpaid"}
              </span>
            </div>
          );
        }

        if (isExpired) {
          return (
            <div className="flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs text-red-500">Payment expired</span>
            </div>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">KES {MEMBER_FEE}/mo</span>
          </div>
        );
      },
    },
    { accessorKey: "lastSeenAt", header: "Last Seen", cell: ({ row }) => row.getValue("lastSeenAt") ? new Date(row.getValue("lastSeenAt") as string).toLocaleDateString() : "—" },
    { accessorKey: "createdAt", header: "Joined", cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString() },
    {
      id: "notify", header: "",
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-lime"
          onClick={() => handleNotify(row.original.preferredName)}
          disabled={notifyingId === row.original.preferredName}
        >
          {notifyingId === row.original.preferredName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Members</h1>
        <p className="text-muted-foreground mt-2">Cross-tenant search & payment tracking{total > 0 ? ` (${total} total)` : ""}</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, phone, or email..." className="w-full bg-background border border-border text-cream py-2.5 pl-9 pr-3 rounded-lg text-sm outline-none focus:border-primary/50" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-background border border-border text-cream py-2.5 px-3 rounded-lg text-sm outline-none">
            <option value="">All Membership</option><option value="ACTIVE">Active</option><option value="EXPIRED">Expired</option><option value="SUSPENDED">Suspended</option>
          </select>
          <select value={tenantFilter} onChange={(e) => setTenantFilter(e.target.value)} className="bg-background border border-border text-cream py-2.5 px-3 rounded-lg text-sm outline-none">
            <option value="">All Gyms</option>{tenants?.map((t) => <option key={t.id} value={t.id}>{t.gymName}</option>)}
          </select>
        </div>
      </div>

      {!search && !statusFilter && !tenantFilter && members.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-heading font-bold text-xl text-cream mb-2">Search across all gyms</h3>
          <p className="text-muted-foreground">Enter a name, phone, or email to find members across all gyms.</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-cream">Loading...</div>
      ) : members.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-6 text-xs text-muted-foreground bg-card border border-border rounded-xl px-6 py-3">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Paid</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-yellow-500" /> Pending</span>
            <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-500" /> Overdue</span>
            <span className="ml-auto font-medium">KES {MEMBER_FEE}/member/month</span>
          </div>
          <DataTable columns={columns} data={members} searchKey="preferredName" searchPlaceholder="Filter results..." />
        </div>
      ) : (search || statusFilter || tenantFilter) ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No members found matching your filters.</p>
        </div>
      ) : null}
    </div>
  );
}
