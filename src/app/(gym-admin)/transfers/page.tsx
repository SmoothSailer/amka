"use client";

import { useTransfers } from "@/hooks/use-gym-admin";
import { useState } from "react";
import { TrendChart } from "@/components/charts/trend-chart";

export default function TransfersPage() {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");
  const { data: transfers, isLoading } = useTransfers();

  const inbound = transfers?.inbound ?? [];
  const outbound = transfers?.outbound ?? [];
  const activeList = activeTab === "inbound" ? inbound : outbound;

  const inboundCount = inbound.length;
  const outboundCount = outbound.length;

  const trendData = Array.from({ length: 12 }, (_, i) => ({
    date: new Date(2025, 0, 1 + i * 7).toISOString().split("T")[0],
    count: 1 + (i * 2) % 5,
  }));

  if (isLoading) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Transfers</h1>
        <p className="text-muted-foreground mt-2">Monitor member transfers in and out</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Inbound</p>
          <p className="text-3xl font-bold text-green-500 mt-2">+{inboundCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Outbound</p>
          <p className="text-3xl font-bold text-red-500 mt-2">-{outboundCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Net</p>
          <p className={`text-3xl font-bold mt-2 ${inboundCount - outboundCount >= 0 ? "text-green-500" : "text-red-500"}`}>
            {inboundCount - outboundCount >= 0 ? "+" : ""}{inboundCount - outboundCount}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-4">Transfer Trend (12 Weeks)</h3>
        <TrendChart data={trendData} color="#CAFF33" />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("inbound")}
            className={`px-4 py-2 rounded-lg font-heading font-bold uppercase tracking-wider text-sm transition-colors ${
              activeTab === "inbound" ? "bg-primary text-ink" : "bg-background text-muted-foreground hover:text-cream"
            }`}
          >
            Inbound ({inboundCount})
          </button>
          <button
            onClick={() => setActiveTab("outbound")}
            className={`px-4 py-2 rounded-lg font-heading font-bold uppercase tracking-wider text-sm transition-colors ${
              activeTab === "outbound" ? "bg-primary text-ink" : "bg-background text-muted-foreground hover:text-cream"
            }`}
          >
            Outbound ({outboundCount})
          </button>
        </div>
        <div className="space-y-3">
          {activeList.length === 0 && (
            <p className="text-muted-foreground text-sm">No transfers yet</p>
          )}
          {activeList.map((entry, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-cream font-medium">{entry.memberName}</p>
                <p className="text-sm text-muted-foreground capitalize">{entry.reason}</p>
              </div>
              <span className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
