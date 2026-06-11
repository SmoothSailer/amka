"use client";

import { usePlatformTenant } from "@/hooks/use-platform-admin";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Users, DollarSign, TrendingUp } from "lucide-react";

export default function TenantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.id as string;

  const { data: tenant, isLoading } = usePlatformTenant(tenantId);

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

        <div className="mt-8 p-6 bg-background rounded-lg border border-border">
          <h3 className="font-heading font-bold text-lg text-cream mb-4">Branding Preview</h3>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center font-heading font-black text-xl"
              style={{ backgroundColor: tenant.primaryColor, color: tenant.secondaryColor }}
            >
              {tenant.gymName.charAt(0)}
            </div>
            <div>
              <p className="font-heading font-bold text-cream">{tenant.gymName}</p>
              <p className="text-sm text-muted-foreground">amka.app/{tenant.slug}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
            Edit Tenant
          </Button>
          <Button variant="outline" className="border-border text-cream hover:bg-card/80 font-heading font-bold uppercase tracking-wider">
            Suspend Gym
          </Button>
          <Button variant="outline" className="border-border text-cream hover:bg-card/80 font-heading font-bold uppercase tracking-wider">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
