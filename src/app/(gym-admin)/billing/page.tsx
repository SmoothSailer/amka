"use client";

import { useBillingTransactions, useBillingSummary } from "@/hooks/use-gym-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { MpesaTransaction } from "@/types/api";
import { TrendChart } from "@/components/charts/trend-chart";

export default function BillingPage() {
  const { data: billingData, isLoading } = useBillingTransactions();
  const { data: summary } = useBillingSummary();

  const transactions = billingData?.transactions;

  const columns: ColumnDef<MpesaTransaction>[] = [
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `KES ${Number(row.getValue("amount")).toLocaleString()}`,
    },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const styles: Record<string, string> = {
          SUCCESS: "bg-green-500/10 text-green-500 border-green-500/20",
          PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          FAILED: "bg-red-500/10 text-red-500 border-red-500/20",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs border capitalize ${styles[status] || ""}`}>
            {status}
          </span>
        );
      },
    },
    { accessorKey: "mpesaRef", header: "Reference" },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString(),
    },
  ];

  const revenueData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2025, 0, 1 + i).toISOString().split("T")[0],
    count: 10000 + (i * 1500) % 50000,
  }));

  const totalRevenue = summary?.totalCollected ?? 0;
  const pendingPayments = summary?.pending ?? 0;
  const failedPayments = summary?.failed ?? 0;

  if (isLoading) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Billing</h1>
        <p className="text-muted-foreground mt-2">M-Pesa transactions and revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-bold text-cream mt-2">KES {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Pending</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{pendingPayments}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Failed</p>
          <p className="text-3xl font-bold text-red-500 mt-2">{failedPayments}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-4">Revenue Trend (Last 30 Days)</h3>
        <TrendChart data={revenueData} color="#CAFF33" />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-6">Transactions</h3>
        {transactions && <DataTable columns={columns} data={transactions} searchKey="phone" searchPlaceholder="Search by phone..." />}
      </div>
    </div>
  );
}
