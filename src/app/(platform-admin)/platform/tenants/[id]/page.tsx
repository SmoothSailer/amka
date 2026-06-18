"use client";

import { useState } from "react";
import { usePlatformTenant, useChangeTenantStatus, useChangeTenantPlan } from "@/hooks/use-platform-admin";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Users, DollarSign, TrendingUp, Loader2 } from "lucide-react";
import { handleApiError } from "@/lib/api-error-handler";

export default function TenantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.id as string;
  const [statusError, setStatusError] = useState("");
  const [planError, setPlanError] = useState("");

  const { data: tenant, isLoading } = usePlatformTenant(tenantId);
  const changeStatus = useChangeTenantStatus();
  const changePlan = useChangeTenantPlan();

  const handleStatusToggle = async () => {
    setStatusError("");
    const newStatus = tenant?.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    if (!tenant) return;
    try {
      await changeStatus.mutateAsync({ tenantId: tenant.id, status: newStatus });
    } catch (err) {
      setStatusError(handleApiError(err));
    }
  };

  const handlePlanToggle = async () => {
    setPlanError("");
    const newPlan = tenant?.subscriptionPlan === "STARTER" ? "ENTERPRISE" : "STARTER";
    if (!tenant) return;
    try {
      await changePlan.mutateAsync({ tenantId: tenant.id, plan: newPlan });
    } catch (err) {
      setPlanError(handleApiError(err));
    }
  };

  if (isLoading || !tenant) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/platform/tenants")}
        className="text-muted-foreground hover:text-cream"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Tenants
      </Button>

      <div className="bg-card border border-border rounded-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center font-heading font-black text-2xl"
              style={{ backgroundColor: tenant.primaryColor, color: tenant.secondaryColor }}
            >
              {tenant.gymName.charAt(0)}
            </div>
            <div>
              <h1 className="font-heading font-black text-3xl text-cream uppercase">{tenant.gymName}</h1>
              <p className="text-muted-foreground mt-1">{tenant.location || tenant.neighborhood || "No location set"}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm border capitalize ${
            tenant.status === "ACTIVE" ? "bg-green-500/10 text-green-500 border-green-500/20" :
            tenant.status === "SUSPENDED" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
            "bg-red-500/10 text-red-500 border-red-500/20"
          }`}>
            {tenant.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-background rounded-lg p-6 border border-border">
            <Building2 className="w-8 h-8 text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-2xl font-bold text-cream mt-1 capitalize">{tenant.subscriptionPlan}</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <Users className="w-8 h-8 text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Join Code</p>
            <p className="text-2xl font-bold text-cream mt-1 font-heading tracking-widest">{tenant.joinCode}</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <DollarSign className="w-8 h-8 text-primary mb-3" />
            <p className="text-sm text-muted-foreground">M-Pesa</p>
            <p className="text-2xl font-bold text-cream mt-1">{tenant.mpesaPaybill || tenant.mpesaTillNumber || "—"}</p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="text-lg font-bold text-cream mt-1">{new Date(tenant.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {(Number.isInteger(tenant.latitude) || Number.isInteger(tenant.longitude)) && (
          <div className="mt-8 p-6 bg-background rounded-lg border border-border">
            <h3 className="font-heading font-bold text-lg text-cream mb-4">Location</h3>
            <div className="space-y-2 text-sm">
              {tenant.address && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="text-cream">{tenant.address}</span>
                </div>
              )}
              {tenant.neighborhood && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Neighborhood</span>
                  <span className="text-cream">{tenant.neighborhood}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coordinates</span>
                <span className="text-cream">{tenant.latitude}, {tenant.longitude}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-background rounded-lg border border-border">
          <h3 className="font-heading font-bold text-lg text-cream mb-4">Branding</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Primary</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: tenant.primaryColor }} />
                <span className="text-cream text-sm font-mono">{tenant.primaryColor}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Secondary</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: tenant.secondaryColor }} />
                <span className="text-cream text-sm font-mono">{tenant.secondaryColor}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Accent</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: tenant.accentColor }} />
                <span className="text-cream text-sm font-mono">{tenant.accentColor}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-sm"
              style={{ backgroundColor: tenant.primaryColor, color: tenant.secondaryColor }}
            >
              {tenant.gymName.charAt(0)}
            </div>
            <div>
              <p className="font-heading font-bold text-cream">{tenant.gymName}</p>
              <p className="text-xs text-muted-foreground">amka.app/{tenant.slug}</p>
            </div>
          </div>
        </div>

        {(statusError || planError) && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm">
            {statusError || planError}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
            Edit Tenant
          </Button>
          <Button
            variant="outline"
            className="border-border text-cream hover:bg-card/80 font-heading font-bold uppercase tracking-wider"
            onClick={handleStatusToggle}
            disabled={changeStatus.isPending}
          >
            {changeStatus.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {tenant.status === "ACTIVE" ? "Suspend Gym" : "Activate Gym"}
          </Button>
          <Button
            variant="outline"
            className="border-border text-cream hover:bg-card/80 font-heading font-bold uppercase tracking-wider"
            onClick={handlePlanToggle}
            disabled={changePlan.isPending}
          >
            {changePlan.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {tenant.subscriptionPlan === "STARTER" ? "Upgrade to Enterprise" : "Downgrade to Starter"}
          </Button>
        </div>
      </div>
    </div>
  );
}
