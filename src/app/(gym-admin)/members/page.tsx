"use client";

import { useMembers } from "@/hooks/use-gym-admin";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import type { AdminMember } from "@/types/api";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function MembersPage() {
  const { data: members, isLoading } = useMembers();

  const columns: ColumnDef<AdminMember>[] = [
    {
      accessorKey: "preferredName",
      header: "Name",
      cell: ({ row }) => (
        <Link href={`/members/${row.original.id}`} className="text-cream hover:text-primary transition-colors font-medium">
          {row.getValue("preferredName")}
        </Link>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.getValue("phone") || <span className="text-muted-foreground">—</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email") || <span className="text-muted-foreground">—</span>,
    },
    {
      accessorKey: "membershipStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("membershipStatus") as string;
        const styles = {
          ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
          EXPIRED: "bg-red-500/10 text-red-500 border-red-500/20",
          SUSPENDED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs border ${styles[status as keyof typeof styles] || ""}`}>
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
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString(),
    },
  ];

  if (isLoading) {
    return <div className="text-cream">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Members</h1>
          <p className="text-muted-foreground mt-2">Manage your gym members</p>
        </div>
        <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {members && <DataTable columns={columns} data={members} searchKey="name" searchPlaceholder="Search members..." />}
    </div>
  );
}
