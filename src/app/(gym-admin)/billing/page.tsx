"use client";

import { useGymBillingCurrent, useGymBillingHistory } from "@/hooks/use-gym-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { BillingHistoryEntry } from "@/types/api";
import { DollarSign, Clock, XCircle, AlertTriangle } from "lucide-react";

export default function BillingPage() {
  const { data: current, isLoading: currentLoading } = useGymBillingCurrent();
  const { data: transactions, isLoading: historyLoading } = useGymBillingHistory();

  const columns: ColumnDef<BillingHistoryEntry>[] = [
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
    { accessorKey: "reference", header: "Reference" },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => new Date(row.getValue("date") as string).toLocaleDateString(),
    },
  ];

  if (currentLoading || historyLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-[rgba(245,239,224,.06)] rounded" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6">
              <div className="h-4 w-24 bg-[rgba(245,239,224,.06)] rounded mb-3" />
              <div className="h-8 w-20 bg-[rgba(245,239,224,.1)] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalRevenue = current?.collectedThisMonth ?? 0;
  const pending = current?.pendingPayments ?? 0;
  const failed = current?.failedPayments ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Billing</h1>
        <p className="text-muted-foreground mt-2">M-Pesa transactions and revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <DollarSign className="w-8 h-8 text-primary mb-3" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Collected This Month</p>
          <p className="text-3xl font-bold text-cream mt-2">KES {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <Clock className="w-8 h-8 text-yellow-500 mb-3" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Pending</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{pending}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <XCircle className="w-8 h-8 text-red-500 mb-3" />
          <p className="text-sm text-muted-foreground uppercase tracking-wider">Failed</p>
          <p className="text-3xl font-bold text-red-500 mt-2">{failed}</p>
        </div>
      </div>

      {current && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Members</p>
            <p className="text-2xl font-bold text-cream mt-1">{current.totalMembers}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Active Members</p>
            <p className="text-2xl font-bold text-green-500 mt-1">{current.activeMembers}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Est. MRR</p>
            <p className="text-2xl font-bold text-cream mt-1">KES {current.mrr.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-cream mb-6">Transaction History</h3>
        {!transactions?.length && (
          <p className="text-muted-foreground text-sm">No transactions yet</p>
        )}
        {transactions && <DataTable columns={columns} data={transactions} searchKey="phone" searchPlaceholder="Search by phone..." />}
      </div>
    </div>
  );
}
