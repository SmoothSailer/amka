"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/landing-data";

export function HowItWorks() {
  return (
    <section id="how" className="py-[100px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            How It Works
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            Three steps.<br />Your gym is live.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-color)] mt-16 border border-[var(--border-color)]">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card p-10 px-8 relative overflow-hidden transition-colors duration-300 hover:bg-[#272421] group"
            >
              <div className="font-heading font-black text-[100px] text-[rgba(202,255,51,.06)] leading-none mb-[-16px] tracking-[-.04em]">
                {step.num}
              </div>
              <span className="text-[32px] mb-4 block">{step.icon}</span>
              <div className="font-heading font-bold text-[24px] tracking-[.01em] uppercase mb-[10px]">
                {step.title}
              </div>
              <p className="text-[14px] text-muted-color leading-[1.7]">{step.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-lime scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
