"use client";

import { useStaff } from "@/hooks/use-gym-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { GymAdmin } from "@/types/api";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function StaffPage() {
  const { data: staff, isLoading } = useStaff();

  const columns: ColumnDef<GymAdmin>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return <span className="capitalize text-cream">{role}</span>;
      },
    },
    {
      accessorKey: "lastLoginAt",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLogin = row.getValue("lastLoginAt");
        return lastLogin ? new Date(lastLogin as string).toLocaleDateString() : "—";
      },
    },
    {
      accessorKey: "suspended",
      header: "Status",
      cell: ({ row }) => {
        const suspended = row.getValue("suspended") as boolean;
        return (
          <span className={`px-2 py-1 rounded-full text-xs border capitalize ${
            !suspended ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
          }`}>
            {suspended ? "suspended" : "active"}
          </span>
        );
      },
    },
  ];

  if (isLoading) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Staff</h1>
          <p className="text-muted-foreground mt-2">Manage your gym staff and permissions</p>
        </div>
        <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Staff
        </Button>
      </div>

      {staff && <DataTable columns={columns} data={staff} searchKey="name" searchPlaceholder="Search staff..." />}
    </div>
  );
}
