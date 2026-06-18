"use client";

import { useState, useMemo } from "react";
import { usePlatformTenants, usePlatformBills, useGenerateBills, usePayBill, usePlatformSubscriptions, useMarkSubscriptionPaid } from "@/hooks/use-platform-admin";
import { DollarSign, Building2, Users, AlertTriangle, Loader2, RefreshCw, CheckCircle, CreditCard, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ESTIMATED_MRR_PER_MEMBER = 3000;

export default function PlatformBillingPage() {
  const [subStatus, setSubStatus] = useState("");

  const { data: tenants, isLoading: tenantsLoading, isError: tenantsError } = usePlatformTenants();
  const { data: billsData } = usePlatformBills();
  const { data: subsData } = usePlatformSubscriptions(subStatus || undefined);
  const generateBills = useGenerateBills();
  const payBill = usePayBill();
  const markSubPaid = useMarkSubscriptionPaid();

  const activeTenants = useMemo(() => tenants?.filter((t) => t.status === "ACTIVE") ?? [], [tenants]);
  const totalMembers = useMemo(() => activeTenants.reduce((s, t) => s + t._count.members, 0), [activeTenants]);
  const bills = useMemo(() => billsData?.bills ?? [], [billsData]);
  const subscriptions = useMemo(() => subsData?.subscriptions ?? [], [subsData]);

  if (tenantsLoading) return <div className="text-cream animate-pulse">Loading billing data...</div>;

  if (tenantsError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="font-heading font-bold text-xl text-cream mb-2">Failed to Load</h2>
        <p className="text-muted-foreground">Could not fetch billing data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-4xl text-cream uppercase">Billing</h1>
          <p className="text-muted-foreground mt-2">Gym bills, member subscriptions, and revenue</p>
        </div>
        <Button className="bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider" onClick={() => generateBills.mutate()} disabled={generateBills.isPending}>
          {generateBills.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}Generate Bills
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6"><DollarSign className="w-7 h-7 text-primary mb-3" /><p className="text-xs text-muted-foreground uppercase tracking-wider">Est. MRR</p><p className="text-2xl font-bold text-cream mt-1">KES {(totalMembers * ESTIMATED_MRR_PER_MEMBER / 1000).toFixed(0)}k</p></div>
        <div className="bg-card border border-border rounded-xl p-6"><Building2 className="w-7 h-7 text-primary mb-3" /><p className="text-xs text-muted-foreground uppercase tracking-wider">Active Gyms</p><p className="text-2xl font-bold text-cream mt-1">{activeTenants.length}</p></div>
        <div className="bg-card border border-border rounded-xl p-6"><Users className="w-7 h-7 text-primary mb-3" /><p className="text-xs text-muted-foreground uppercase tracking-wider">Total Members</p><p className="text-2xl font-bold text-cream mt-1">{totalMembers}</p></div>
        <div className="bg-card border border-border rounded-xl p-6"><CreditCard className="w-7 h-7 text-primary mb-3" /><p className="text-xs text-muted-foreground uppercase tracking-wider">Gym Bills</p><p className="text-2xl font-bold text-cream mt-1">{bills.length}</p></div>
      </div>

      <GymBillingSection bills={bills} payBill={payBill} generateBills={generateBills} />
      <MemberBillingSection subscriptions={subscriptions} subStatus={subStatus} setSubStatus={setSubStatus} markSubPaid={markSubPaid} totalMembers={totalMembers} />
      <RevenueByGymSection tenants={activeTenants} />
    </div>
  );
}

function GymBillingSection({ bills, payBill, generateBills }: { bills: any[]; payBill: any; generateBills: any }) {
  const pending = bills.filter((b: any) => b.status === "PENDING");
  const paid = bills.filter((b: any) => b.status === "PAID");
  const overdue = bills.filter((b: any) => b.status === "OVERDUE");

  const totalPending = pending.reduce((s: number, b: any) => s + (b.totalAmountKES || 0), 0);
  const totalPaid = paid.reduce((s: number, b: any) => s + (b.totalAmountKES || 0), 0);
  const totalOverdue = overdue.reduce((s: number, b: any) => s + (b.totalAmountKES || 0), 0);

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-bold text-2xl text-cream uppercase">Gym Billing</h2>
        <span className="text-xs text-muted-foreground ml-2">Monthly bills per gym</span>
      </div>

      {bills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p><p className="text-2xl font-bold text-yellow-500 mt-1">KES {totalPending.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-0.5">{pending.length} bills</p></div>
          <div className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider">Collected</p><p className="text-2xl font-bold text-green-500 mt-1">KES {totalPaid.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-0.5">{paid.length} bills</p></div>
          <div className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider">Overdue</p><p className="text-2xl font-bold text-red-500 mt-1">KES {totalOverdue.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-0.5">{overdue.length} bills</p></div>
        </div>
      )}

      {bills.length > 0 ? (
        <div className="bg-card border border-border rounded-xl">
          <div className="divide-y divide-border">
            {bills.map((bill: any) => {
              const styles: Record<string, string> = { PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", PAID: "bg-green-500/10 text-green-500 border-green-500/20", OVERDUE: "bg-red-500/10 text-red-500 border-red-500/20" };
              return (
                <div key={bill.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-sm" style={{ backgroundColor: bill.tenant?.gymName ? "#" + Math.abs(bill.tenant.gymName.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % 0x1000000).toString(16).padStart(6, "0") : "#333" }}>
                      {bill.tenant?.gymName?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-cream text-sm">{bill.tenant?.gymName || "Unknown Gym"}</p>
                      <p className="text-xs text-muted-foreground">{bill.period} · {bill.activeMemberCount} members · KES {bill.basePriceKES?.toLocaleString() ?? "0"} base</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs border capitalize ${styles[bill.status] || ""}`}>{bill.status}</span>
                    <span className="font-heading font-bold text-cream">KES {(bill.totalAmountKES ?? 0).toLocaleString()}</span>
                    {bill.status === "PENDING" && (
                      <Button variant="outline" size="sm" className="border-green-500/30 text-green-500 hover:bg-green-500/10 text-xs" onClick={() => payBill.mutate(bill.id)} disabled={payBill.isPending && payBill.variables === bill.id}>
                        {payBill.isPending && payBill.variables === bill.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Pay"}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Building2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-cream mb-2">No Gym Bills Yet</h3>
          <p className="text-muted-foreground text-sm mb-4">Click "Generate Bills" to create monthly bills for all active gyms.</p>
          <Button variant="outline" className="border-border text-cream" onClick={() => generateBills.mutate()} disabled={generateBills.isPending}>
            {generateBills.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}Generate Bills
          </Button>
        </div>
      )}
    </section>
  );
}

function MemberBillingSection({ subscriptions, subStatus, setSubStatus, markSubPaid, totalMembers }: { subscriptions: any[]; subStatus: string; setSubStatus: (v: string) => void; markSubPaid: any; totalMembers: number }) {
  const pendingSubs = subscriptions.filter((s: any) => s.status === "PENDING");
  const paidSubs = subscriptions.filter((s: any) => s.status === "PAID");

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-2xl text-cream uppercase">Member Billing</h2>
          <span className="text-xs text-muted-foreground ml-2">KES 30/member subscriptions</span>
        </div>
        <select value={subStatus} onChange={(e) => setSubStatus(e.target.value)} className="bg-background border border-border text-cream py-2 px-3 rounded-lg text-sm outline-none">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="OVERDUE">Overdue</option>
        </select>
      </div>

      {subscriptions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p><p className="text-2xl font-bold text-yellow-500 mt-1">{pendingSubs.length}</p><p className="text-xs text-muted-foreground mt-0.5">KES {pendingSubs.length * 30} total</p></div>
          <div className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider">Paid</p><p className="text-2xl font-bold text-green-500 mt-1">{paidSubs.length}</p><p className="text-xs text-muted-foreground mt-0.5">KES {paidSubs.length * 30} collected</p></div>
          <div className="bg-card border border-border rounded-xl p-5"><p className="text-xs text-muted-foreground uppercase tracking-wider">Collection Rate</p><p className="text-2xl font-bold text-cream mt-1">{totalMembers > 0 ? Math.round((paidSubs.length / totalMembers) * 100) : 0}%</p><p className="text-xs text-muted-foreground mt-0.5">of total members</p></div>
        </div>
      )}

      {subscriptions.length > 0 ? (
        <div className="bg-card border border-border rounded-xl">
          <div className="divide-y divide-border">
            {subscriptions.map((sub: any) => {
              const styles: Record<string, string> = { PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", PAID: "bg-green-500/10 text-green-500 border-green-500/20", OVERDUE: "bg-red-500/10 text-red-500 border-red-500/20" };
              return (
                <div key={sub.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-cream text-sm">{sub.member?.preferredName || "Unknown Member"}</p>
                    <p className="text-xs text-muted-foreground">{sub.member?.phone || ""} · {sub.tenant?.gymName || ""} · Period: {sub.periodStart || "—"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs border capitalize ${styles[sub.status] || ""}`}>{sub.status}</span>
                    <span className="font-heading font-bold text-cream">KES 30</span>
                    {sub.status === "PENDING" && (
                      <Button variant="outline" size="sm" className="border-green-500/30 text-green-500 hover:bg-green-500/10 text-xs" onClick={() => markSubPaid.mutate(sub.id)} disabled={markSubPaid.isPending && markSubPaid.variables === sub.id}>
                        {markSubPaid.isPending && markSubPaid.variables === sub.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <UserCheck className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-cream mb-2">No Member Subscriptions</h3>
          <p className="text-muted-foreground text-sm">Generate gym bills first — member subscriptions are created automatically.</p>
        </div>
      )}
    </section>
  );
}

function RevenueByGymSection({ tenants }: { tenants: any[] }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-bold text-2xl text-cream uppercase">Revenue by Gym</h2>
      </div>
      <div className="bg-card border border-border rounded-xl">
        <div className="divide-y divide-border">
          {tenants.length === 0 && <div className="p-8 text-center text-muted-foreground text-sm">No active gyms</div>}
          {tenants.sort((a, b) => b._count.members - a._count.members).map((tenant) => (
            <div key={tenant.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-sm" style={{ backgroundColor: tenant.primaryColor, color: tenant.secondaryColor }}>{tenant.gymName.charAt(0)}</div>
                <div><p className="font-medium text-cream">{tenant.gymName}</p><p className="text-xs text-muted-foreground capitalize">{tenant.subscriptionPlan} · {tenant._count.members} members</p></div>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-lg text-cream">KES {(tenant._count.members * ESTIMATED_MRR_PER_MEMBER / 1000).toFixed(0)}k</p>
                <p className="text-xs text-muted-foreground">est. monthly</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
