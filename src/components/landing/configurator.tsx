"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { usePricing } from "@/hooks/use-pricing";
import type { PricingTier } from "@/types/api";
import { generateJoinCode, generateSlug } from "@/lib/configurator-utils";

interface ConfiguratorProps {
  onOpenModal: (plan: string, price: string, gymName: string, options: { location: string; primaryColor: string; secondaryColor: string }) => void;
}

function toPlanId(name: string): string {
  return name.toLowerCase();
}

function toPlanSub(tier: PricingTier): string {
  if (tier.enterprise) return "Unlimited members";
  const match = tier.members.match(/Up to (\d+)/);
  return match ? `Up to ${match[1]} members` : tier.members;
}

export function Configurator({ onOpenModal }: ConfiguratorProps) {
  const { data, isLoading } = usePricing();
  const plans = useMemo(() => {
    if (!data?.tiers) return [];
    return data.tiers
      .filter((t) => !t.enterprise)
      .map((tier) => ({
        plan: toPlanId(tier.name),
        name: tier.name,
        sub: toPlanSub(tier),
        price: tier.price,
        priceNum: tier.priceNum,
        chips: tier.chips,
        popular: tier.hot,
      }));
  }, [data]);

  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [gymName, setGymName] = useState("");
  const [gymLoc, setGymLoc] = useState("");
  const [priCol, setPriCol] = useState("#CAFF33");
  const [secCol, setSecCol] = useState("#0D0C0A");
  const [logoUploaded, setLogoUploaded] = useState(false);

  const displayName = gymName || "PowerZone";
  const shortName = displayName.split(" ")[0];
  const initial = displayName.charAt(0).toUpperCase();
  const slug = generateSlug(displayName);
  const code = generateJoinCode(displayName);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setLogoUploaded(true);
  }, []);

  const syncColorFromPicker = (type: "pri" | "sec", value: string) => {
    if (type === "pri") setPriCol(value);
    else setSecCol(value);
  };

  const syncColorFromText = (type: "pri" | "sec", value: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      if (type === "pri") setPriCol(value);
      else setSecCol(value);
    }
  };

  return (
    <section id="configure" className="py-[100px] px-6 md:px-12 border-t border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            Get Started
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            Configure your gym.<br />See it live now.
          </div>
          <p className="text-[16px] text-muted-color max-w-[500px] leading-[1.75] mt-3">
            Watch your gym&apos;s branding appear on the phone preview in real time. Pay nothing today — 3
            months free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 mt-14 items-start">
          <div className="flex flex-col gap-[2px]">
            <div className="bg-card border border-[var(--border-color)] p-8 rounded-t-xl">
              <div className="font-heading font-bold text-[20px] uppercase tracking-[.04em] mb-[22px] flex items-center gap-2.5">
                <span className="text-lime">01</span> Choose Your Plan
              </div>
              <div className="flex flex-col gap-2">
                {isLoading ? (
                  <div className="text-[13px] text-muted-color py-4">Loading plans...</div>
                ) : plans.map((plan) => (
                  <div
                    key={plan.plan}
                    onClick={() => setSelectedPlan(plan.plan)}
                    className={`flex justify-between items-center border rounded-lg p-[14px] px-4 cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.plan
                        ? "border-lime bg-[rgba(202,255,51,.06)]"
                        : "border-[var(--border-color)] bg-[rgba(245,239,224,.02)] hover:border-[rgba(202,255,51,.3)] hover:bg-[rgba(202,255,51,.03)]"
                    }`}
                  >
                    <div>
                      <div className="font-heading font-bold text-[17px] uppercase tracking-[.04em] flex items-center gap-2">
                        {plan.name}
                        {plan.popular && (
                          <span className="text-[9px] bg-terra text-white py-[2px] px-2 rounded-full font-bold tracking-[.04em]">Popular</span>
                        )}
                      </div>
                      <div className="text-[12px] text-muted-color mt-[2px]">{plan.sub}</div>
                      <div className="flex flex-wrap gap-1 mt-[7px]">
                        {plan.chips.map((chip) => (
                          <span key={chip} className="text-[10px] text-[rgba(245,239,224,.4)] bg-[rgba(245,239,224,.04)] py-[2px] px-[9px] rounded-full border border-[var(--border-color)]">
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="font-heading font-extrabold text-[22px] text-lime text-right shrink-0">
                      KES {plan.price}
                      <small className="block text-[11px] text-muted-color font-normal font-body">/month</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-[var(--border-color)] p-8 rounded-b-xl">
              <div className="font-heading font-bold text-[20px] uppercase tracking-[.04em] mb-[22px] flex items-center gap-2.5">
                <span className="text-lime">02</span> Brand Your Gym
              </div>
              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="text-[11px] text-muted-color uppercase tracking-[.08em] mb-1.5 block">Gym Name</label>
                  <input
                    type="text"
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                    placeholder="e.g. PowerZone Nairobi"
                    className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 rounded-md font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] placeholder:text-[rgba(245,239,224,.2)]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-muted-color uppercase tracking-[.08em] mb-1.5 block">Location</label>
                  <input
                    type="text"
                    value={gymLoc}
                    onChange={(e) => setGymLoc(e.target.value)}
                    placeholder="e.g. Westlands, Nairobi"
                    className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-3 px-3.5 rounded-md font-body text-[14px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.5)] placeholder:text-[rgba(245,239,224,.2)]"
                  />
                </div>
                <div
                  className="border border-dashed border-[rgba(245,239,224,.15)] rounded-lg py-[22px] text-center cursor-pointer transition-border-color duration-200 hover:border-[rgba(202,255,51,.4)]"
                  onClick={() => document.getElementById("logoF")?.click()}
                >
                  <input type="file" id="logoF" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  <div className="text-[24px] mb-1.5">{logoUploaded ? "✅" : "🏢"}</div>
                  <div className="text-[13px] text-muted-color">
                    <strong className="text-lime">Upload logo</strong> — shown in app header + discovery
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="flex-1">
                    <label className="text-[11px] text-muted-color uppercase tracking-[.08em] mb-1.5 block">Primary</label>
                    <div className="flex gap-1.5 items-center">
                      <input
                        type="color"
                        value={priCol}
                        onChange={(e) => syncColorFromPicker("pri", e.target.value)}
                        className="w-[38px] h-9 p-[2px] rounded-[5px] cursor-pointer bg-[rgba(245,239,224,.04)] border border-[var(--border-color)]"
                      />
                      <input
                        type="text"
                        value={priCol}
                        onChange={(e) => syncColorFromText("pri", e.target.value)}
                        className="flex-1 bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-[9px] px-2.5 rounded-[5px] font-body text-[13px] outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] text-muted-color uppercase tracking-[.08em] mb-1.5 block">Secondary</label>
                    <div className="flex gap-1.5 items-center">
                      <input
                        type="color"
                        value={secCol}
                        onChange={(e) => syncColorFromPicker("sec", e.target.value)}
                        className="w-[38px] h-9 p-[2px] rounded-[5px] cursor-pointer bg-[rgba(245,239,224,.04)] border border-[var(--border-color)]"
                      />
                      <input
                        type="text"
                        value={secCol}
                        onChange={(e) => syncColorFromText("sec", e.target.value)}
                        className="flex-1 bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-[9px] px-2.5 rounded-[5px] font-body text-[13px] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-20 flex flex-col items-center gap-4">
            <div className="text-[11px] uppercase tracking-[.1em] text-muted-color font-semibold">Live Preview</div>

            <div className="w-[220px] h-[450px] bg-[#111] rounded-[36px] border-[6px] border-[#2a2826] relative overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,.05),0_32px_64px_rgba(0,0,0,.7)] transition-all duration-[350ms]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[68px] h-[20px] bg-[#111] rounded-b-xl z-10" />
              <div className="w-full h-full overflow-hidden">
                <div className="px-[14px] pt-[30px] pb-[10px] flex items-center justify-between" style={{ background: secCol }}>
                  <div className="flex items-center gap-[7px]">
                    <div className="w-[28px] h-[28px] rounded-lg flex items-center justify-center font-heading font-black text-[14px]" style={{ background: priCol, color: secCol }}>
                      {initial}
                    </div>
                    <div className="font-heading font-bold text-[14px] tracking-[.04em] uppercase text-cream">
                      {shortName}
                    </div>
                  </div>
                  <div className="w-[26px] h-[26px] rounded-full bg-[rgba(245,239,224,.08)] flex items-center justify-center text-[11px]">👤</div>
                </div>

                <div className="mx-3 my-2 rounded-xl p-[14px]" style={{ background: priCol, color: secCol }}>
                  <div className="text-[9px] font-semibold opacity-60 uppercase tracking-[.06em]">Good morning 👋</div>
                  <div className="font-heading font-extrabold text-[18px] uppercase">Chest & Triceps</div>
                  <div className="text-[9px] opacity-55 mt-[2px]">Bench 62.5kg · Today</div>
                </div>

                <div className="flex gap-[6px] mx-3 mt-[6px]">
                  <div className="flex-1 bg-[rgba(245,239,224,.06)] rounded-lg p-2 text-center">
                    <div className="font-heading text-[16px] font-extrabold" style={{ color: priCol }}>12</div>
                    <div className="text-[8px] text-[rgba(245,239,224,.35)] uppercase tracking-[.04em]">Sessions</div>
                  </div>
                  <div className="flex-1 bg-[rgba(245,239,224,.06)] rounded-lg p-2 text-center">
                    <div className="font-heading text-[16px] font-extrabold text-cream">3🔥</div>
                    <div className="text-[8px] text-[rgba(245,239,224,.35)] uppercase tracking-[.04em]">Streak</div>
                  </div>
                  <div className="flex-1 bg-[rgba(245,239,224,.06)] rounded-lg p-2 text-center">
                    <div className="font-heading text-[16px] font-extrabold text-cream">87%</div>
                    <div className="text-[8px] text-[rgba(245,239,224,.35)] uppercase tracking-[.04em]">Nutrition</div>
                  </div>
                </div>

                <div className="mx-3 mt-[10px]">
                  <div className="text-[9px] uppercase tracking-[.1em] text-[rgba(245,239,224,.3)] mb-[6px] font-semibold">Today&apos;s Program</div>
                  <div className="bg-[rgba(245,239,224,.05)] rounded-lg p-[9px_10px] flex items-center gap-2">
                    <div className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-[13px] shrink-0" style={{ background: `${priCol}22` }}>🏋️</div>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold text-cream">Bench Press</div>
                      <div className="text-[8px] text-[rgba(245,239,224,.35)]">62.5kg × 5 × 5</div>
                    </div>
                    <div className="text-[8px] py-[2px] px-2 rounded-full font-semibold shrink-0" style={{ background: `${priCol}20`, color: priCol }}>+2.5kg</div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-around py-[10px] pb-[14px] bg-[rgba(13,12,10,.96)] border-t border-[rgba(245,239,224,.05)]">
                  {[{ icon: "🏠", on: true }, { icon: "🏋️" }, { icon: "🥗" }, { icon: "📈" }].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center gap-[2px] ${item.on ? "opacity-100" : "opacity-30"}`}>
                      <div className="text-[15px]">{item.icon}</div>
                      {item.on && <div className="w-[3px] h-[3px] rounded-full" style={{ background: priCol }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="font-heading font-extrabold text-[18px] uppercase tracking-[.04em]">{shortName}</div>
              <div className="text-[12px] text-muted-color mt-[3px]">amka.app/{slug}</div>
            </div>

            <div className="bg-[rgba(202,255,51,.08)] border border-[rgba(202,255,51,.2)] rounded-lg p-[14px] text-center w-full">
              <div className="text-[11px] text-muted-color mb-1 uppercase tracking-[.06em]">Your join code</div>
              <div className="font-heading font-black text-[28px] tracking-[.25em] text-lime">{code}</div>
            </div>

            <button
              onClick={() => {
                const priceNum = plans.find((p) => p.plan === selectedPlan)?.priceNum?.toString() || "1500";
                onOpenModal(selectedPlan, priceNum, gymName, {
                  location: gymLoc,
                  primaryColor: priCol,
                  secondaryColor: secCol,
                });
              }}
              className="w-full bg-lime text-ink border-none py-[15px] font-heading font-extrabold text-[16px] tracking-[.08em] uppercase cursor-pointer transition-all duration-200 hover:bg-cream hover:-translate-y-px"
              style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
            >
              List my gym on Amka →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
