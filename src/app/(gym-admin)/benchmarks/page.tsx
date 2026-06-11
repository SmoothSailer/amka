"use client";

import { useBenchmarks } from "@/hooks/use-gym-admin";
import { TrendChart } from "@/components/charts/trend-chart";

export default function BenchmarksPage() {
  const { data: benchmarkData, isLoading } = useBenchmarks();

  const trendData = Array.from({ length: 12 }, (_, i) => ({
    date: new Date(2025, 0, 1 + i * 7).toISOString().split("T")[0],
    count: 70 + (i * 3) % 20,
  }));

  if (isLoading) return <div className="text-cream">Loading...</div>;

  const benchmarks = benchmarkData?.benchmarks;
  const platformAvg = benchmarkData?.platformAverage;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Benchmarks</h1>
        <p className="text-muted-foreground mt-2">How your gym compares to the platform average</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!benchmarks?.length && (
          <p className="text-muted-foreground">No benchmark data available yet</p>
        )}
        {benchmarks?.map((benchmark) => {
          const isAbove = benchmark.retentionPct > (platformAvg?.retentionPct ?? 0);
          return (
            <div key={benchmark.id} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg text-cream mb-4">Week of {new Date(benchmark.weekOf).toLocaleDateString()}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Your Gym</span>
                    <span className={`font-bold ${isAbove ? "text-green-500" : "text-red-500"}`}>
                      {benchmark.retentionPct}%
                    </span>
                  </div>
                  <div className="w-full bg-background rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${isAbove ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${benchmark.retentionPct}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Platform Average</span>
                    <span className="text-cream font-bold">{platformAvg?.retentionPct ?? 0}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-3">
                    <div
                      className="bg-muted-foreground h-3 rounded-full transition-all"
                      style={{ width: `${platformAvg?.retentionPct ?? 0}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Active Members</p>
                    <p className="text-cream font-bold">{benchmark.activeMembers}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">New Members</p>
                    <p className="text-green-500 font-bold">+{benchmark.newMembers}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Churned</p>
                    <p className="text-red-500 font-bold">-{benchmark.churnedMembers}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-4">Retention Rate Trend (12 Weeks)</h3>
        <TrendChart data={trendData} color="#CAFF33" />
      </div>
    </div>
  );
}
