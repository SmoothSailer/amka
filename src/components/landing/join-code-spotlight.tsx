"use client";

import { motion } from "framer-motion";
import { JOIN_CODE_STEPS } from "@/lib/landing-data";

export function JoinCodeSpotlight() {
  return (
    <section id="joincode" className="bg-terra py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 font-heading font-black text-[200px] text-[rgba(255,255,255,.06)] tracking-[-.04em] uppercase pointer-events-none select-none leading-none">
        PWR001
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-[rgba(245,239,224,.7)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[rgba(245,239,224,.7)]" />
            For Members
          </div>
          <div className="font-heading font-black text-[clamp(48px,6vw,88px)] leading-[.95] text-white uppercase">
            Your gym<br />gave you<br />a code.
          </div>
          <p className="text-[16px] text-[rgba(255,255,255,.7)] leading-[1.7] max-w-[400px] mt-4">
            Enter it in Amka. The app re-themes to your gym in seconds. No waiting for app store
            approvals. No separate downloads. One app. Every gym.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {JOIN_CODE_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 items-start bg-[rgba(255,255,255,.1)] rounded-xl p-5 backdrop-blur-sm border border-[rgba(255,255,255,.15)] transition-all duration-200 hover:bg-[rgba(255,255,255,.15)] hover:translate-x-1"
            >
              <div className="font-heading font-black text-[32px] text-[rgba(255,255,255,.3)] leading-none shrink-0 w-8">
                {step.num}
              </div>
              <div>
                <div className="font-semibold text-[15px] text-white mb-1">{step.title}</div>
                <div className="text-[13px] text-[rgba(255,255,255,.65)] leading-[1.6]">{step.desc}</div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[rgba(255,255,255,.12)] rounded-xl p-6 border border-[rgba(255,255,255,.2)] text-center backdrop-blur-sm"
          >
            <div className="text-[11px] uppercase tracking-[.1em] text-[rgba(255,255,255,.6)] mb-[10px]">
              Example join code
            </div>
            <div className="font-heading font-black text-[56px] tracking-[.25em] text-white leading-none">
              PWR001
            </div>
            <div className="text-[12px] text-[rgba(255,255,255,.5)] mt-2">
              6 characters · Uppercase · Given by your gym
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
