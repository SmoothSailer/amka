"use client";

import { useState } from "react";
import { usePlatformInvites, useSendInvite, useResendInvite, usePlatformTenants } from "@/hooks/use-platform-admin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import type { GymAdminInvite } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, RefreshCw, X, Loader2, AlertTriangle } from "lucide-react";
import { handleApiError } from "@/lib/api-error-handler";

export default function InvitesPage() {
  const { data: invites, isLoading, isError, error } = usePlatformInvites();
  const { data: tenants } = usePlatformTenants();
  const sendInvite = useSendInvite();
  const resendInvite = useResendInvite();

  const [showModal, setShowModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("OWNER");
  const [inviteTenantId, setInviteTenantId] = useState("");
  const [modalError, setModalError] = useState("");
  const [actionError, setActionError] = useState("");

  const handleSendInvite = async () => {
    setModalError("");
    if (!inviteEmail || !inviteName || !inviteTenantId) {
      setModalError("All fields are required");
      return;
    }
    try {
      await sendInvite.mutateAsync({
        tenantId: inviteTenantId,
        email: inviteEmail,
        name: inviteName,
        role: inviteRole,
      });
      setShowModal(false);
      setInviteEmail("");
      setInviteName("");
      setInviteRole("OWNER");
      setInviteTenantId("");
    } catch (err) {
      setModalError(handleApiError(err));
    }
  };

  const handleResend = async (inviteId: string) => {
    setActionError("");
    try {
      await resendInvite.mutateAsync(inviteId);
    } catch (err) {
      setActionError(handleApiError(err));
    }
  };

  const columns: ColumnDef<GymAdminInvite>[] = [
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name") || "—",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span className="capitalize text-cream">{row.getValue("role")}</span>,
    },
    {
      id: "gym",
      header: "Gym",
      accessorFn: (row) => (row as GymAdminInvite & { tenant?: { gymName: string } }).tenant?.gymName || "—",
      cell: ({ getValue }) => <span className="text-cream">{getValue() as string}</span>,
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
      accessorKey: "expiresAt",
      header: "Expires",
      cell: ({ row }) => new Date(row.getValue("expiresAt") as string).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const status = row.original.status;
        if (status === "PENDING") {
          return (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
                onClick={() => handleResend(row.original.id)}
                disabled={resendInvite.isPending}
              >
                {resendInvite.isPending && resendInvite.variables === row.original.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500/80" disabled title="Revoke endpoint not yet built">
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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="font-heading font-bold text-xl text-cream mb-2">Failed to Load</h2>
        <p className="text-muted-foreground">{error instanceof Error ? error.message : "Could not fetch data."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Invites</h1>
          <p className="text-muted-foreground mt-2">Manage gym admin invitations</p>
        </div>
        <Button
          className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider"
          onClick={() => setShowModal(true)}
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Invite
        </Button>
      </div>

      {actionError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm">
          {actionError}
        </div>
      )}

      {invites && <DataTable columns={columns} data={invites} searchKey="email" searchPlaceholder="Search invites..." />}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(13,12,10,.8)] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-cream uppercase">Send Invite</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-cream text-xl">✕</button>
            </div>

            {modalError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-500 text-sm">
                {modalError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-cream text-sm">Gym</Label>
                <select
                  value={inviteTenantId}
                  onChange={(e) => setInviteTenantId(e.target.value)}
                  className="w-full mt-1 bg-background border border-border text-cream py-2.5 px-3 rounded-lg text-sm outline-none focus:border-primary/50"
                >
                  <option value="">Select a gym...</option>
                  {tenants?.map((t) => (
                    <option key={t.id} value={t.id}>{t.gymName}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-cream text-sm">Email</Label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="admin@gym.com"
                  className="mt-1 bg-background border-border"
                />
              </div>
              <div>
                <Label className="text-cream text-sm">Name</Label>
                <Input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1 bg-background border-border"
                />
              </div>
              <div>
                <Label className="text-cream text-sm">Role</Label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full mt-1 bg-background border border-border text-cream py-2.5 px-3 rounded-lg text-sm outline-none focus:border-primary/50"
                >
                  <option value="OWNER">Owner</option>
                  <option value="MANAGER">Manager</option>
                  <option value="STAFF">Staff</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 border-border text-cream hover:bg-card/80"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider"
                onClick={handleSendInvite}
                disabled={sendInvite.isPending}
              >
                {sendInvite.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Invite"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
