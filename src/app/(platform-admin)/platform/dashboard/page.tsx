"use client";

import { usePlatformStats, usePlatformAlerts } from "@/hooks/use-platform-admin";
import { Building2, Users, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

export default function PlatformDashboardPage() {
  const { data: stats, isLoading } = usePlatformStats();
  const { data: alerts } = usePlatformAlerts();

  if (isLoading || !stats) {
    return <div className="text-cream">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Platform Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of the Amka platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Gyms"
          value={stats.totalGyms}
          icon={Building2}
          description={`${stats.activeGyms} active`}
        />
        <StatCard
          title="Total Members"
          value={stats.totalMembers.toLocaleString()}
          icon={Users}
          trend={{ value: "+124 this month", positive: true }}
        />
        <StatCard
          title="Platform MRR"
          value={`KES ${(stats.mrr / 1000).toFixed(0)}k`}
          icon={DollarSign}
          trend={{ value: "+12%", positive: true }}
        />
        <StatCard
          title="New Gyms"
          value={stats.newSignupsThisMonth}
          icon={TrendingUp}
          description="This month"
        />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Alerts
        </h3>
        <div className="space-y-4">
          {!alerts?.length && (
            <p className="text-muted-foreground text-sm">No alerts</p>
          )}
          {alerts?.map((alert, i) => (
            <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                alert.severity === "high" ? "bg-red-500" :
                alert.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-cream">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{alert.severity} priority</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
