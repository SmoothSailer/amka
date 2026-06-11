"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface TrendChartProps {
  data: { date: string; count: number }[];
  color?: string;
  height?: number;
  showArea?: boolean;
}

export function TrendChart({ data, color = "#CAFF33", height = 200, showArea = true }: TrendChartProps) {
  if (showArea) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,239,224,0.05)" />
          <XAxis
            dataKey="date"
            stroke="rgba(245,239,224,0.4)"
            fontSize={12}
            tickFormatter={(value) => new Date(value).toLocaleDateString("en", { month: "short", day: "numeric" })}
          />
          <YAxis stroke="rgba(245,239,224,0.4)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#211F1B",
              border: "1px solid rgba(245,239,224,0.08)",
              borderRadius: "8px",
              color: "#F5EFE0",
            }}
          />
          <Area type="monotone" dataKey="count" stroke={color} fill={color} fillOpacity={0.1} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,239,224,0.05)" />
        <XAxis
          dataKey="date"
          stroke="rgba(245,239,224,0.4)"
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleDateString("en", { month: "short", day: "numeric" })}
        />
        <YAxis stroke="rgba(245,239,224,0.4)" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#211F1B",
            border: "1px solid rgba(245,239,224,0.08)",
            borderRadius: "8px",
            color: "#F5EFE0",
          }}
        />
        <Line type="monotone" dataKey="count" stroke={color} strokeWidth={2} dot={{ fill: color, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
