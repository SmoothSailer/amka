"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePlatformTenants, usePlatformBills, usePlatformMembers } from "@/hooks/use-platform-admin";
import { Building2, Users, DollarSign, TrendingUp, AlertTriangle, ArrowRight, Mail, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";

export default function PlatformDashboardPage() {
  const router = useRouter();
  const { data: tenants, isLoading, isError, error } = usePlatformTenants();
  const { data: billsData } = usePlatformBills();
  const { data: membersData } = usePlatformMembers();

  const stats = useMemo(() => {
    if (!tenants) return null;
    const active = tenants.filter((t) => t.status === "ACTIVE");
    const suspended = tenants.filter((t) => t.status === "SUSPENDED");
    const totalMembers = tenants.reduce((sum, t) => sum + t._count.members, 0);
    const bills = billsData?.bills ?? [];
    const pendingBills = bills.filter((b) => b.status === "PENDING");
    const totalPending = pendingBills.reduce((s, b) => s + (b.totalAmountKES || 0), 0);
    return {
      totalGyms: tenants.length,
      activeGyms: active.length,
      suspendedGyms: suspended.length,
      totalMembers,
      totalAdmins: tenants.reduce((sum, t) => sum + t._count.admins, 0),
      totalMembersPlatform: membersData?.total ?? totalMembers,
      pendingBills: pendingBills.length,
      pendingAmount: totalPending,
    };
  }, [tenants, billsData, membersData]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-[rgba(245,239,224,.06)] rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6">
              <div className="h-4 w-24 bg-[rgba(245,239,224,.06)] rounded mb-3" />
              <div className="h-8 w-16 bg-[rgba(245,239,224,.1)] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="font-heading font-bold text-xl text-cream mb-2">Failed to Load Dashboard</h2>
        <p className="text-muted-foreground max-w-md text-center mb-4">
          {error instanceof Error ? error.message : "Could not fetch platform data."}
        </p>
        <a href="/platform-login" className="text-lime hover:underline font-medium">Try logging in again →</a>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Platform Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of the Amka platform</p>
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider"
            onClick={() => router.push("/platform/tenants")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Provision Gym
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Gyms"
          value={stats.totalGyms}
          icon={Building2}
          description={`${stats.activeGyms} active · ${stats.suspendedGyms} suspended`}
        />
        <StatCard
          title="Total Members"
          value={stats.totalMembersPlatform.toLocaleString()}
          icon={Users}
        />
        <StatCard
          title="Admin Accounts"
          value={stats.totalAdmins}
          icon={TrendingUp}
          description="Across all gyms"
        />
        <StatCard
          title="Pending Bills"
          value={`KES ${(stats.pendingAmount / 1000).toFixed(0)}k`}
          icon={DollarSign}
          description={`${stats.pendingBills} unpaid`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-cream">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/platform/tenants")}
                className="bg-background border border-border rounded-lg p-4 text-left hover:border-primary/50 transition-colors group"
              >
                <Building2 className="w-6 h-6 text-primary mb-2" />
                <p className="font-heading font-bold text-cream uppercase text-sm">Manage Tenants</p>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-cream">View, suspend, or upgrade gyms <ArrowRight className="w-3 h-3 inline ml-1" /></p>
              </button>
              <button
                onClick={() => router.push("/platform/invites")}
                className="bg-background border border-border rounded-lg p-4 text-left hover:border-primary/50 transition-colors group"
              >
                <Mail className="w-6 h-6 text-primary mb-2" />
                <p className="font-heading font-bold text-cream uppercase text-sm">Send Invites</p>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-cream">Invite new gym admins <ArrowRight className="w-3 h-3 inline ml-1" /></p>
              </button>
              <button
                onClick={() => router.push("/platform/members")}
                className="bg-background border border-border rounded-lg p-4 text-left hover:border-primary/50 transition-colors group"
              >
                <Users className="w-6 h-6 text-primary mb-2" />
                <p className="font-heading font-bold text-cream uppercase text-sm">Search Members</p>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-cream">Cross-tenant member lookup <ArrowRight className="w-3 h-3 inline ml-1" /></p>
              </button>
              <button
                onClick={() => router.push("/platform/billing")}
                className="bg-background border border-border rounded-lg p-4 text-left hover:border-primary/50 transition-colors group"
              >
                <DollarSign className="w-6 h-6 text-primary mb-2" />
                <p className="font-heading font-bold text-cream uppercase text-sm">View Billing</p>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-cream">Bills & subscriptions <ArrowRight className="w-3 h-3 inline ml-1" /></p>
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading font-bold text-lg text-cream mb-4">Top Gyms by Members</h3>
            <div className="space-y-3">
              {(!tenants || tenants.length === 0) && (
                <p className="text-muted-foreground text-sm">No gyms registered yet</p>
              )}
              {tenants?.slice().sort((a, b) => b._count.members - a._count.members).slice(0, 5).map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center font-heading font-black text-xs" style={{ backgroundColor: tenant.primaryColor, color: tenant.secondaryColor }}>
                      {tenant.gymName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cream">{tenant.gymName}</p>
                      <p className="text-xs text-muted-foreground">{tenant.location || ""}</p>
                    </div>
                  </div>
                  <span className="font-heading font-bold text-cream">{tenant._count.members} members</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading font-bold text-lg text-cream mb-4">Tenant Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-green-500" /><span className="text-cream">Active</span></div>
                <span className="font-heading font-bold text-lg text-green-500">{stats.activeGyms}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-yellow-500" /><span className="text-cream">Suspended</span></div>
                <span className="font-heading font-bold text-lg text-yellow-500">{stats.suspendedGyms}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-red-500" /><span className="text-cream">Cancelled</span></div>
                <span className="font-heading font-bold text-lg text-red-500">{tenants?.filter((t) => t.status === "CANCELLED").length ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading font-bold text-lg text-cream mb-4">Plan Distribution</h3>
            {(["STARTER", "ENTERPRISE"] as const).map((plan) => {
              const count = tenants?.filter((t) => t.subscriptionPlan === plan).length ?? 0;
              const pct = tenants?.length ? Math.round((count / tenants.length) * 100) : 0;
              return (
                <div key={plan} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cream capitalize">{plan}</span>
                    <span className="text-muted-foreground">{count} gyms ({pct}%)</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
