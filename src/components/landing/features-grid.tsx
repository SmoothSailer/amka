"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GYM_OWNER_FEATURES, MEMBER_FEATURES } from "@/lib/landing-data";

export function FeaturesGrid() {
  const [activeTab, setActiveTab] = useState<"gym" | "member">("gym");
  const features = activeTab === "gym" ? GYM_OWNER_FEATURES : MEMBER_FEATURES;

  return (
    <section id="features" className="bg-card border-t border-[var(--border-color)] py-[100px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            Features
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            Everything needed.<br />Nothing extra.
          </div>
        </motion.div>

        <div className="flex gap-[2px] bg-[rgba(245,239,224,.04)] rounded-lg p-1 w-fit my-10 border border-[var(--border-color)]">
          {(["gym", "member"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-md font-heading font-bold text-[15px] tracking-[.06em] uppercase cursor-pointer border-none transition-all duration-200 ${
                activeTab === tab ? "bg-lime text-ink" : "bg-transparent text-muted-color"
              }`}
            >
              {tab === "gym" ? "For Gym Owners" : "For Members"}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-mid border border-[var(--border-color)] rounded-xl p-7 transition-all duration-[250ms] relative overflow-hidden group hover:border-[rgba(202,255,51,.15)] hover:-translate-y-0.5"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-lime scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              <span className="text-[28px] mb-3.5 block">{feat.icon}</span>
              <div className="font-heading font-bold text-[20px] uppercase tracking-[.02em] mb-2">
                {feat.title}
              </div>
              <p className="text-[14px] text-muted-color leading-[1.7]">{feat.desc}</p>
              <span className="inline-block mt-3 text-[10px] font-semibold py-[2px] px-[10px] rounded-full bg-[rgba(245,239,224,.05)] text-muted-color border border-[var(--border-color)] tracking-[.06em] uppercase">
                {feat.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
