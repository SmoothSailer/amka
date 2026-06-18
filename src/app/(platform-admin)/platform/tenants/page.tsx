"use client";

import { useState } from "react";
import { usePlatformTenants, useProvisionTenant } from "@/hooks/use-platform-admin";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import type { TenantWithCounts } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, AlertTriangle } from "lucide-react";
import { handleApiError } from "@/lib/api-error-handler";

export default function TenantsPage() {
  const { data: tenants, isLoading, isError, error } = usePlatformTenants();
  const provisionTenant = useProvisionTenant();

  const [showModal, setShowModal] = useState(false);
  const [gymName, setGymName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [location, setLocation] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#CAFF33");
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState("");

  const handleProvision = async () => {
    setModalError("");
    setModalSuccess("");

    if (!gymName || !adminEmail || !adminName) {
      setModalError("Gym name, admin email, and admin name are required");
      return;
    }

    try {
      const result = await provisionTenant.mutateAsync({
        gymName,
        adminEmail,
        adminName,
        primaryColor,
        location: location || undefined,
      });
      setModalSuccess(`Gym created! Join code: ${result.joinCode}. Invite sent to ${adminEmail}.`);
    } catch (err) {
      setModalError(handleApiError(err));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setGymName("");
    setAdminEmail("");
    setAdminName("");
    setLocation("");
    setPrimaryColor("#CAFF33");
    setModalError("");
    setModalSuccess("");
  };

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Tenants</h1>
          <p className="text-muted-foreground mt-2">Manage all gyms on the platform</p>
        </div>
        <Button
          className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Provision New Gym
        </Button>
      </div>

      {tenants && <DataTable columns={columns} data={tenants} searchKey="gymName" searchPlaceholder="Search gyms..." />}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(13,12,10,.8)] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-cream uppercase">Provision New Gym</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-cream text-xl">✕</button>
            </div>

            {modalSuccess ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎉</div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4 text-green-500 text-sm">
                  {modalSuccess}
                </div>
                <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider" onClick={closeModal}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                {modalError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-500 text-sm">
                    {modalError}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label className="text-cream text-sm">Gym Name *</Label>
                    <Input
                      type="text"
                      value={gymName}
                      onChange={(e) => setGymName(e.target.value)}
                      placeholder="e.g. CrossFit Central"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-cream text-sm">Admin Email *</Label>
                    <Input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="owner@gym.com"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-cream text-sm">Admin Name *</Label>
                    <Input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Jane Doe"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-cream text-sm">Location</Label>
                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Westlands, Nairobi"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-cream text-sm">Primary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-border"
                      />
                      <Input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 bg-background border-border font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1 border-border text-cream hover:bg-card/80"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider"
                    onClick={handleProvision}
                    disabled={provisionTenant.isPending}
                  >
                    {provisionTenant.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create & Send Invite"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
