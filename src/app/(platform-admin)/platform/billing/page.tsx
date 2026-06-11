"use client";

import { usePlatformStats, usePlatformTenants } from "@/hooks/use-platform-admin";
import { TrendChart } from "@/components/charts/trend-chart";
import { DollarSign, Building2, TrendingUp } from "lucide-react";

export default function PlatformBillingPage() {
  const { data: stats, isLoading } = usePlatformStats();
  const { data: tenants } = usePlatformTenants();

  const revenueData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2025, 0, 1 + i).toISOString().split("T")[0],
    count: 500000 + (i * 15000) % 200000 + i * 5000,
  }));

  if (isLoading || !stats) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Platform Billing</h1>
        <p className="text-muted-foreground mt-2">Revenue and subscription overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <DollarSign className="w-8 h-8 text-primary mb-3" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Platform MRR</p>
          <p className="text-3xl font-bold text-cream mt-2">KES {(stats.mrr / 1000).toFixed(0)}k</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <Building2 className="w-8 h-8 text-primary mb-3" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Active Subscriptions</p>
          <p className="text-3xl font-bold text-cream mt-2">{stats.activeGyms}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <TrendingUp className="w-8 h-8 text-primary mb-3" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Growth</p>
          <p className="text-3xl font-bold text-green-500 mt-2">+12%</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-4">Revenue Trend (Last 30 Days)</h3>
        <TrendChart data={revenueData} color="#CAFF33" />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-6">Revenue by Gym</h3>
        <div className="space-y-4">
          {tenants?.filter((t) => t.status === "ACTIVE").map((tenant) => (
            <div key={tenant.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-sm"
                  style={{ backgroundColor: tenant.primaryColor, color: tenant.secondaryColor }}
                >
                  {tenant.gymName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-cream">{tenant.gymName}</p>
                  <p className="text-sm text-muted-foreground capitalize">{tenant.subscriptionPlan} plan</p>
                </div>
              </div>
              <p className="font-heading font-bold text-lg text-cream">
                KES {(tenant._count.members * 3000 / 1000).toFixed(0)}k
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
