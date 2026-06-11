"use client";

import { useDashboardStats } from "@/hooks/use-gym-admin";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { TrendChart } from "@/components/charts/trend-chart";
import { formatDistanceToNow } from "date-fns";
import type { DashboardStats } from "@/types/api";

interface DashboardStatsExtended extends DashboardStats {
  retentionRate?: number;
  memberGrowth?: { date: string; count: number }[];
  recentActivity?: { id: string; message: string; timestamp: string }[];
}

export default function GymDashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();
  const extended = stats as DashboardStatsExtended | undefined;

  if (isLoading || !stats) {
    return <div className="text-cream">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s what&apos;s happening at your gym.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={Users}
          trend={{ value: "+12 this month", positive: true }}
        />
        <StatCard
          title="Active Members"
          value={stats.activeMembers}
          icon={UserCheck}
          description={`${Math.round((stats.activeMembers / stats.totalMembers) * 100)}% of total`}
        />
        <StatCard
          title="Classes This Week"
          value={stats.classesThisWeek}
          icon={Calendar}
        />
        <StatCard
          title="Retention Rate"
          value={`${extended?.retentionRate ?? "—"}%`}
          icon={TrendingUp}
          trend={{ value: "+13pts vs avg", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="font-heading font-bold text-lg text-cream mb-4">Member Growth (Last 30 Days)</h3>
          {extended?.memberGrowth ? <TrendChart data={extended.memberGrowth} /> : <p className="text-muted-foreground text-sm">No data yet</p>}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-heading font-bold text-lg text-cream mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {extended?.recentActivity?.map((activity) => (
              <div key={activity.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-primary text-ink font-heading font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors">
          Add Member
        </button>
        <button className="px-6 py-3 bg-card border border-border text-cream font-heading font-bold uppercase tracking-wider rounded-lg hover:bg-card/80 transition-colors">
          Create Class
        </button>
        <button className="px-6 py-3 bg-card border border-border text-cream font-heading font-bold uppercase tracking-wider rounded-lg hover:bg-card/80 transition-colors">
          View Alerts
        </button>
      </div>
    </div>
  );
}
