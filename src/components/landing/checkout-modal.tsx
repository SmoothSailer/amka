"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/api-error-handler";
import { setAuthTokenClient, setGymDataClient } from "@/lib/auth-client";
import { usePricing } from "@/hooks/use-pricing";
import { Loader2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  price: string;
  gymName: string;
  gymLocation?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function CheckoutModal({
  isOpen, onClose, plan, price, gymName,
  gymLocation, primaryColor, secondaryColor,
}: CheckoutModalProps) {
  const router = useRouter();
  const { data } = usePricing();
  const planName = useMemo(() => {
    if (!data?.tiers) return plan.charAt(0).toUpperCase() + plan.slice(1);
    const tier = data.tiers.find((t) => t.name.toLowerCase() === plan);
    return tier?.name || plan.charAt(0).toUpperCase() + plan.slice(1);
  }, [data, plan]);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const resetState = useCallback(() => {
    setPhone("");
    setEmail("");
    setName("");
    setPassword("");
    setError("");
    setIsSubmitting(false);
    setIsRedirecting(false);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  const handleSubmit = useCallback(async () => {
    setError("");

    if (!email) {
      setError("Manager email is required");
      return;
    }

    if (!name) {
      setError("Manager name is required");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const signupRes = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gymName: gymName || name,
          adminEmail: email,
          adminName: name,
          adminPassword: password,
          primaryColor: primaryColor || "#CAFF33",
          secondaryColor: secondaryColor || "#0D0C0A",
          location: gymLocation || undefined,
        }),
      });

      const signupData = await signupRes.json();

      if (!signupRes.ok) {
        throw new Error(signupData.error || "Failed to create gym");
      }

      const slug = signupData.tenant?.slug;
      const tenantId = signupData.tenant?.id;
      const gymDisplayName = signupData.tenant?.gymName || gymName;

      if (!slug) {
        throw new Error("Gym created but no slug returned");
      }

      setIsSubmitting(false);
      setIsRedirecting(true);

      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, slug }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok || !loginData.token) {
        throw new Error(loginData.error || "Account created but login failed. Please log in manually.");
      }

      setAuthTokenClient(loginData.token, "gym");
      setGymDataClient({
        id: tenantId || "",
        name: gymDisplayName,
        slug,
        primaryColor: primaryColor || "#CAFF33",
      });

      router.push("/dashboard");
    } catch (err) {
      setError(handleApiError(err));
      setIsSubmitting(false);
      setIsRedirecting(false);
    }
  }, [gymName, email, name, password, primaryColor, secondaryColor, gymLocation, router]);

  if (!isOpen) return null;

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 z-[200] bg-[rgba(13,12,10,.92)] backdrop-blur-xl flex items-center justify-center p-4">
        <div className="bg-card border border-[var(--border-color)] w-[460px] max-w-full p-8 text-center" style={{ animation: "mIn .3s ease" }}>
          <Loader2 className="w-10 h-10 animate-spin text-lime mx-auto mb-4" />
          <div className="font-heading font-black text-[24px] uppercase tracking-[.03em] mb-2">Setting up your dashboard</div>
          <div className="text-[13px] text-muted-color">Redirecting you to your gym admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[rgba(13,12,10,.92)] backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-card border border-[var(--border-color)] w-[460px] max-w-full max-h-[90vh] overflow-y-auto" style={{ animation: "mIn .3s ease" }}>
        <div className="p-7 pb-6 border-b border-[var(--border-color)] flex justify-between items-center">
          <div className="font-heading font-extrabold text-[24px] uppercase tracking-[.03em]">Complete listing</div>
          <button onClick={handleClose} className="bg-transparent border-none text-muted-color text-[20px] cursor-pointer transition-colors duration-200 hover:text-cream">✕</button>
        </div>
        <div className="p-7 pt-6">
          <div className="bg-[rgba(202,255,51,.05)] border border-[rgba(202,255,51,.15)] rounded-lg p-4 mb-6">
            <div className="flex justify-between text-[13px] mb-1.5 text-muted-color">
              <span>Plan — {planName}</span>
              <span>KES {parseInt(price).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between text-[13px] mb-1.5 text-muted-color">
              <span>Setup</span><span>Free</span>
            </div>
            <div className="flex justify-between text-[13px] mb-1.5 text-muted-color">
              <span>First 3 months</span><span className="text-[#4ade80]">Free trial</span>
            </div>
            <div className="flex justify-between text-[14px] pt-2.5 border-t border-[rgba(202,255,51,.15)] font-semibold text-lime">
              <span>Total today</span><span>KES 0</span>
            </div>
          </div>

          <PaymentMethods />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-[11px] text-muted-color uppercase tracking-[.08em] block mb-1.5">M-Pesa Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712 345 678"
              className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="text-[11px] text-muted-color uppercase tracking-[.08em] block mb-1.5">Manager Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="text-[11px] text-muted-color uppercase tracking-[.08em] block mb-1.5">Manager Email (for dashboard)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="manager@yourgym.com"
              required
              className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="text-[11px] text-muted-color uppercase tracking-[.08em] block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              required
              className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] rounded"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-lime text-ink border-none py-4 font-heading font-extrabold text-[16px] tracking-[.08em] uppercase cursor-pointer transition-all duration-200 hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
          >
            {isSubmitting ? "Creating..." : "Start 3-Month Free Trial →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentMethods() {
  const [selected, setSelected] = useState(0);
  const methods = [
    { icon: "📱", label: "M-Pesa" },
    { icon: "💳", label: "Card" },
    { icon: "🏦", label: "Bank" },
  ];

  return (
    <div className="flex gap-2 mb-5">
      {methods.map((m, i) => (
        <div
          key={i}
          onClick={() => setSelected(i)}
          className={`flex-1 border rounded-md py-[11px] text-center cursor-pointer transition-all duration-200 text-[12px] font-semibold uppercase tracking-[.04em] ${
            selected === i
              ? "border-lime text-lime bg-[rgba(202,255,51,.06)]"
              : "border-[var(--border-color)] text-muted-color"
          }`}
        >
          <span className="text-[18px] block mb-[3px]">{m.icon}</span>
          {m.label}
        </div>
      ))}
    </div>
  );
}
