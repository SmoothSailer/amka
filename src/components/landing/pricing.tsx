"use client";

import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/landing-data";

export function Pricing() {
  return (
    <section id="pricing" className="bg-mid border-t border-[var(--border-color)] py-[100px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            Pricing
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            Start free.<br />Pay as you grow.
          </div>
          <p className="text-[16px] text-muted-color max-w-[500px] leading-[1.75] mt-3">
            All plans include 3 months free. M-Pesa billing built in. Cancel any time. Enterprise
            white-label available on request.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[2px] mt-14 border border-[var(--border-color)]">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 px-6 relative transition-colors duration-200 ${
                tier.hot
                  ? "bg-lime !important"
                  : "bg-card hover:bg-[#252321]"
              } ${tier.enterprise ? "border-l-2 border-terra" : ""}`}
              style={tier.hot ? { background: "var(--lime)" } : {}}
            >
              <div className={`text-[11px] uppercase tracking-[.12em] mb-3 font-semibold ${tier.hot ? "text-[rgba(13,12,10,.6)]" : "text-muted-color"}`}>
                {tier.name}
              </div>
              <div className={`font-heading text-[48px] font-black leading-none tracking-[-.02em] mb-1 ${tier.hot ? "text-ink" : "text-cream"}`}>
                {tier.price === "Custom" ? "Custom" : (
                  <>KES {tier.price} <span className={`text-[14px] font-normal ${tier.hot ? "text-[rgba(13,12,10,.5)]" : "text-muted-color"}`}>{tier.period}</span></>
                )}
              </div>
              <div className={`text-[12px] mb-6 ${tier.hot ? "text-[rgba(13,12,10,.6)]" : "text-muted-color"}`}>
                {tier.members}
              </div>
              <div className={`h-px mb-5 ${tier.hot ? "bg-[rgba(13,12,10,.15)]" : "bg-[var(--border-color)]"}`} />
              <ul className="list-none flex flex-col gap-[9px] mb-7">
                {tier.features.map((feat, j) => (
                  <li key={j} className={`text-[13px] flex gap-2 items-start ${tier.hot ? "text-[rgba(13,12,10,.75)]" : "text-[rgba(245,239,224,.7)]"}`}>
                    <span className={`shrink-0 font-heading font-bold ${tier.hot ? "text-[rgba(13,12,10,.4)]" : "text-lime"}`}>→</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  if (tier.enterprise) return;
                  document.getElementById("configure")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full py-[13px] font-heading font-bold text-[14px] tracking-[.08em] uppercase cursor-pointer border-none transition-all duration-200 ${
                  tier.hot
                    ? "bg-ink text-lime hover:bg-[#111] hover:-translate-y-px"
                    : tier.enterprise
                    ? "bg-transparent text-terra border border-[rgba(232,85,42,.3)] hover:border-terra"
                    : "bg-transparent text-cream border border-[rgba(245,239,224,.2)] hover:border-lime hover:text-lime"
                }`}
              >
                {tier.enterprise ? "Contact Us" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
