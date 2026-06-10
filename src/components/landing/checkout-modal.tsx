"use client";

import { useState, useRef, useCallback } from "react";
import { BUILD_STEPS } from "@/lib/landing-data";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  price: string;
  gymName: string;
  onComplete: () => void;
}

const PLAN_NAMES: Record<string, string> = { starter: "Starter", growth: "Growth", pro: "Pro" };

export function CheckoutModal({ isOpen, onClose, plan, price, gymName, onComplete }: CheckoutModalProps) {
  const [showBuild, setShowBuild] = useState(false);
  const [buildPct, setBuildPct] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const resetState = useCallback(() => {
    setShowBuild(false);
    setBuildPct(0);
    setActiveStep(-1);
    setCompletedSteps(new Set());
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  const startBuild = useCallback(() => {
    setShowBuild(true);

    let p = 0;
    intervalRef.current = setInterval(() => {
      if (p >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      p += 0.85;
      setBuildPct(Math.min(p, 100));
    }, 80);

    let cumulativeDelay = 0;
    BUILD_STEPS.forEach((step, i) => {
      const startTimeout = setTimeout(() => {
        setActiveStep(i);
        const doneTimeout = setTimeout(() => {
          setActiveStep(-1);
          setCompletedSteps((prev) => new Set(prev).add(step.id));
          if (i === BUILD_STEPS.length - 1) {
            const finishTimeout = setTimeout(() => {
              onComplete();
            }, 600);
            timeoutsRef.current.push(finishTimeout);
          }
        }, step.dur);
        timeoutsRef.current.push(doneTimeout);
      }, cumulativeDelay);
      timeoutsRef.current.push(startTimeout);
      cumulativeDelay += step.dur + 200;
    });
  }, [onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[rgba(13,12,10,.92)] backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-card border border-[var(--border-color)] w-[460px] max-w-full max-h-[90vh] overflow-y-auto" style={{ animation: "mIn .3s ease" }}>
        {!showBuild ? (
          <>
            <div className="p-7 pb-6 border-b border-[var(--border-color)] flex justify-between items-center">
              <div className="font-heading font-extrabold text-[24px] uppercase tracking-[.03em]">Complete listing</div>
              <button onClick={handleClose} className="bg-transparent border-none text-muted-color text-[20px] cursor-pointer transition-colors duration-200 hover:text-cream">✕</button>
            </div>
            <div className="p-7 pt-6">
              <div className="bg-[rgba(202,255,51,.05)] border border-[rgba(202,255,51,.15)] rounded-lg p-4 mb-6">
                <div className="flex justify-between text-[13px] mb-1.5 text-muted-color">
                  <span>Plan — {PLAN_NAMES[plan] || "Starter"}</span>
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

              <div className="mb-4">
                <label className="text-[11px] text-muted-color uppercase tracking-[.08em] block mb-1.5">M-Pesa Phone Number</label>
                <input type="tel" placeholder="0712 345 678" className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] rounded" />
              </div>
              <div className="mb-4">
                <label className="text-[11px] text-muted-color uppercase tracking-[.08em] block mb-1.5">Manager Email (for dashboard)</label>
                <input type="email" placeholder="manager@yourgym.com" className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] rounded" />
              </div>

              <button
                onClick={startBuild}
                className="w-full bg-lime text-ink border-none py-4 font-heading font-extrabold text-[16px] tracking-[.08em] uppercase cursor-pointer transition-all duration-200 hover:bg-cream"
                style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
              >
                Start 3-Month Free Trial →
              </button>
            </div>
          </>
        ) : (
          <div className="p-8">
            <div className="font-heading font-black text-[28px] uppercase tracking-[.03em] mb-1">
              {buildPct >= 100 ? "🎉 You&apos;re live!" : `Building ${gymName || "your gym"}...`}
            </div>
            <div className="text-[13px] text-muted-color mb-6">Takes about 30 seconds</div>

            <div className="w-[90px] h-[180px] bg-[#0a0a08] rounded-2xl border-[3px] border-[#2a2826] mx-auto mb-5 relative overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,.6)]">
              <div className="absolute left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--lime),transparent)]" style={{ animation: "scan-anim 1.6s ease-in-out infinite", boxShadow: "0 0 8px var(--lime)" }} />
            </div>

            <div className="w-full h-[3px] bg-[rgba(245,239,224,.06)] mb-1.5">
              <div className="h-full bg-lime transition-[width] duration-400" style={{ width: `${buildPct}%` }} />
            </div>
            <div className="font-heading text-[12px] text-lime text-right mb-[18px]">{Math.floor(buildPct)}%</div>

            <div>
              {BUILD_STEPS.map((step) => {
                const isDone = completedSteps.has(step.id);
                const isRunning = activeStep >= 0 && BUILD_STEPS[activeStep]?.id === step.id;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2.5 py-[9px] border-b border-[var(--border-color)] text-[13px] transition-colors duration-300 ${
                      isDone ? "text-cream" : isRunning ? "text-lime" : "text-[rgba(245,239,224,.3)]"
                    }`}
                  >
                    <span className="text-[14px] w-5">{step.icon}</span>
                    <span className="flex-1">{step.label}</span>
                    {isRunning && <div className="w-[13px] h-[13px] rounded-full border-2 border-[rgba(202,255,51,.15)] border-t-lime shrink-0" style={{ animation: "spin .7s linear infinite" }} />}
                    {isDone && <span className="text-lime text-[12px]">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
