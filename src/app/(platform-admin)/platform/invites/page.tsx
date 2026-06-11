"use client";

import { usePlatformInvites } from "@/hooks/use-platform-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { GymAdminInvite } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw, X } from "lucide-react";

export default function InvitesPage() {
  const { data: invites, isLoading } = usePlatformInvites();

  const columns: ColumnDef<GymAdminInvite>[] = [
    { accessorKey: "email", header: "Email" },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span className="capitalize text-cream">{row.getValue("role")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const styles: Record<string, string> = {
          PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          ACCEPTED: "bg-green-500/10 text-green-500 border-green-500/20",
          EXPIRED: "bg-red-500/10 text-red-500 border-red-500/20",
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
      header: "Sent",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const status = row.original.status;
        if (status === "PENDING") {
          return (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500/80">
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        }
        return null;
      },
    },
  ];

  if (isLoading) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Invites</h1>
          <p className="text-muted-foreground mt-2">Manage gym admin invitations</p>
        </div>
        <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4 mr-2" />
          Send Invite
        </Button>
      </div>

      {invites && <DataTable columns={columns} data={invites} searchKey="email" searchPlaceholder="Search invites..." />}
    </div>
  );
}
