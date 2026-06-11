import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">{title}</p>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend.positive ? "text-green-500" : "text-red-500"}`}>
            {trend.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
