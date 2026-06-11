"use client";

import { usePlatformMembers } from "@/hooks/use-platform-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { AdminMember } from "@/types/api";

export default function PlatformMembersPage() {
  const { data: members, isLoading } = usePlatformMembers();

  const columns: ColumnDef<AdminMember>[] = [
    { accessorKey: "preferredName", header: "Name" },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.getValue("phone") || "—",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email") || "—",
    },
    {
      accessorKey: "membershipStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("membershipStatus") as string;
        const styles: Record<string, string> = {
          ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
          EXPIRED: "bg-red-500/10 text-red-500 border-red-500/20",
          SUSPENDED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs border ${styles[status] || ""}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "lastSeenAt",
      header: "Last Seen",
      cell: ({ row }) => {
        const val = row.getValue("lastSeenAt");
        return val ? new Date(val as string).toLocaleDateString() : "—";
      },
    },
  ];

  if (isLoading) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Members</h1>
        <p className="text-muted-foreground mt-2">Search members across all gyms</p>
      </div>

      {members && <DataTable columns={columns} data={members} searchKey="preferredName" searchPlaceholder="Search by name, phone, or email..." />}
    </div>
  );
}
