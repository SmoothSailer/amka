"use client";

import { usePlatformTenants } from "@/hooks/use-platform-admin";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import type { TenantWithCounts } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TenantsPage() {
  const { data: tenants, isLoading } = usePlatformTenants();

  const columns: ColumnDef<TenantWithCounts>[] = [
    {
      accessorKey: "gymName",
      header: "Gym Name",
      cell: ({ row }) => (
        <Link href={`/platform/tenants/${row.original.id}`} className="text-cream hover:text-primary transition-colors font-medium">
          {row.getValue("gymName")}
        </Link>
      ),
    },
    { accessorKey: "location", header: "Location", cell: ({ row }) => (row.getValue("location") as string) || "—" },
    {
      accessorKey: "subscriptionPlan",
      header: "Plan",
      cell: ({ row }) => {
        const plan = row.getValue("subscriptionPlan") as string;
        return <span className="capitalize text-cream">{plan}</span>;
      },
    },
    {
      header: "Members",
      accessorFn: (row) => row._count.members,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const styles: Record<string, string> = {
          ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
          SUSPENDED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs border capitalize ${styles[status] || ""}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString(),
    },
  ];

  if (isLoading) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Tenants</h1>
          <p className="text-muted-foreground mt-2">Manage all gyms on the platform</p>
        </div>
        <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
          <Plus className="w-4 h-4 mr-2" />
          Provision New Gym
        </Button>
      </div>

      {tenants && <DataTable columns={columns} data={tenants} searchKey="gymName" searchPlaceholder="Search gyms..." />}
    </div>
  );
}
