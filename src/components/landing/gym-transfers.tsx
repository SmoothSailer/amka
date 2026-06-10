"use client";

import { motion } from "framer-motion";
import { TRANSFER_STEPS } from "@/lib/landing-data";

export function GymTransfers() {
  return (
    <section id="transfer" className="py-[100px] px-6 md:px-12 border-t border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            Gym Transfers
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            Moved house?<br />Switch gyms.<br />Keep everything.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-16">
          <div>
            <p className="text-[16px] text-muted-color max-w-[500px] leading-[1.75]">
              Your fitness history belongs to you — not your gym. Transfer to any Amka gym instantly
              and every workout log, weight entry, and nutrition diary comes with you.
            </p>

            <div className="flex flex-col mt-8">
              {TRANSFER_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex gap-5 py-6 ${i < TRANSFER_STEPS.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[rgba(202,255,51,.1)] border border-[rgba(202,255,51,.3)] flex items-center justify-center font-heading font-extrabold text-[16px] text-lime">
                      {step.num}
                    </div>
                    {i < TRANSFER_STEPS.length - 1 && <div className="w-px flex-1 bg-[var(--border-color)] mt-1.5" />}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-[18px] uppercase tracking-[.02em] mb-1">
                      {step.title}
                    </div>
                    <div className="text-[14px] text-muted-color leading-[1.65]">{step.desc}</div>
                    {step.tag && (
                      <span className="inline-block mt-2 text-[11px] font-semibold py-[3px] px-[10px] rounded-full bg-[rgba(202,255,51,.08)] text-lime border border-[rgba(202,255,51,.2)] tracking-[.04em] uppercase">
                        {step.tag}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:sticky lg:top-20"
          >
            <div className="flex justify-center relative py-5">
              <div className="w-[160px] h-[320px] rounded-[28px] border-[5px] border-[#2a2826] relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,.6)] transition-all duration-500 bg-[#1a1916] -rotate-6 translate-x-5 z-[1] hover:-rotate-2 hover:translate-x-2.5 hover:scale-105 hover:z-[3]">
                <div className="w-full h-full overflow-hidden">
                  <div className="p-[18px_10px_8px] flex items-center gap-1.5" style={{ background: "#1a1a2e" }}>
                    <div className="w-5 h-5 rounded-[5px] flex items-center justify-center font-heading text-[10px] font-black shrink-0 bg-[#ff5500] text-white">P</div>
                    <div className="font-heading text-[10px] font-bold uppercase tracking-[.04em] text-cream">PowerZone</div>
                  </div>
                  <div className="mx-2 rounded-lg p-2.5 bg-[#ff5500] text-white">
                    <div className="text-[7px] opacity-60 uppercase tracking-[.06em] mb-0.5">Week 8 · Day 3</div>
                    <div className="font-heading text-[12px] font-extrabold uppercase">Leg Day</div>
                  </div>
                  <div className="flex gap-1 mx-2 mt-1.5">
                    <div className="flex-1 bg-[rgba(255,255,255,.05)] rounded-[5px] p-[5px] text-center">
                      <div className="font-heading text-[12px] font-extrabold text-[#ff5500]">47</div>
                      <div className="text-[6px] text-[rgba(245,239,224,.3)] uppercase tracking-[.04em]">Sessions</div>
                    </div>
                    <div className="flex-1 bg-[rgba(255,255,255,.05)] rounded-[5px] p-[5px] text-center">
                      <div className="font-heading text-[12px] font-extrabold text-cream">-3kg</div>
                      <div className="text-[6px] text-[rgba(245,239,224,.3)] uppercase tracking-[.04em]">Progress</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around py-2 pb-2.5 bg-[rgba(13,12,10,.95)] border-t border-[rgba(255,255,255,.04)]">
                    <span className="text-[12px] opacity-100">🏠</span>
                    <span className="text-[12px] opacity-30">🏋️</span>
                    <span className="text-[12px] opacity-30">🥗</span>
                    <span className="text-[12px] opacity-30">📈</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-lime rounded-full flex items-center justify-center text-[18px] z-10"
                style={{ animation: "pulse-lime 2.5s infinite" }}
              >
                →
              </div>

              <div className="w-[160px] h-[320px] rounded-[28px] border-[5px] border-[#2a2826] relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,.6)] transition-all duration-500 bg-[#1a1916] rotate-4 -translate-x-5 z-[2] hover:rotate-1 hover:-translate-x-2.5 hover:scale-105 hover:z-[4]">
                <div className="w-full h-full overflow-hidden">
                  <div className="p-[18px_10px_8px] flex items-center gap-1.5" style={{ background: "#0a1628" }}>
                    <div className="w-5 h-5 rounded-[5px] flex items-center justify-center font-heading text-[10px] font-black shrink-0 bg-[#00d4aa] text-white">I</div>
                    <div className="font-heading text-[10px] font-bold uppercase tracking-[.04em] text-[#00d4aa]">IronHouse</div>
                  </div>
                  <div className="mx-2 rounded-lg p-2.5 bg-[#00d4aa] text-[#0a1628]">
                    <div className="text-[7px] opacity-60 uppercase tracking-[.06em] mb-0.5">Week 8 · Day 3</div>
                    <div className="font-heading text-[12px] font-extrabold uppercase">Leg Day</div>
                  </div>
                  <div className="flex gap-1 mx-2 mt-1.5">
                    <div className="flex-1 bg-[rgba(255,255,255,.05)] rounded-[5px] p-[5px] text-center">
                      <div className="font-heading text-[12px] font-extrabold text-[#00d4aa]">47</div>
                      <div className="text-[6px] text-[rgba(245,239,224,.3)] uppercase tracking-[.04em]">Sessions</div>
                    </div>
                    <div className="flex-1 bg-[rgba(255,255,255,.05)] rounded-[5px] p-[5px] text-center">
                      <div className="font-heading text-[12px] font-extrabold text-cream">-3kg</div>
                      <div className="text-[6px] text-[rgba(245,239,224,.3)] uppercase tracking-[.04em]">Progress</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around py-2 pb-2.5 bg-[rgba(13,12,10,.95)] border-t border-[rgba(255,255,255,.04)]">
                    <span className="text-[12px] opacity-100">🏠</span>
                    <span className="text-[12px] opacity-30">🏋️</span>
                    <span className="text-[12px] opacity-30">🥗</span>
                    <span className="text-[12px] opacity-30">📈</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[rgba(202,255,51,.06)] border border-[rgba(202,255,51,.15)] rounded-xl p-5 flex items-start gap-3.5">
              <div className="text-[24px] shrink-0">🔒</div>
              <div>
                <div className="font-heading font-bold text-[16px] uppercase tracking-[.03em] text-lime mb-1">
                  History always preserved
                </div>
                <div className="text-[13px] text-muted-color leading-[1.6]">
                  47 sessions, 8 weeks of weight entries, nutrition logs — all yours. Transfers only
                  change your gym. Never your data.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
