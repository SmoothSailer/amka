"use client";

import { motion } from "framer-motion";
import { useNearbyGyms } from "@/hooks/use-gym-discovery";

const NAIROBI_CENTER = { lat: -1.2636, lng: 36.8047 };

const MAP_PINS = [
  { mapTop: "25%", mapLeft: "40%", color: "#FF5500", icon: "🏋️" },
  { mapTop: "55%", mapLeft: "28%", color: "#2C3E50", icon: "💪" },
  { mapTop: "40%", mapLeft: "70%", color: "#6C63FF", icon: "🏃" },
  { mapTop: "70%", mapLeft: "55%", color: "#00B894", icon: "🏢" },
];

export function NearbyGyms() {
  const { data: gyms } = useNearbyGyms(NAIROBI_CENTER.lat, NAIROBI_CENTER.lng, 10);

  return (
    <section id="nearby" className="bg-mid py-[100px] px-6 md:px-12 border-t border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            Gym Discovery
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            No code?<br />Find gyms<br />near you.
          </div>
          <p className="text-[16px] text-muted-color max-w-[500px] leading-[1.75] mt-4">
            Don&apos;t have a join code yet? Open Amka and tap &quot;Find gyms near me.&quot; We show every
            Amka gym sorted by walking distance —{" "}
            <strong className="text-cream">distance is always first</strong>, never paid placement.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: "📍", text: "Sort by distance — closest gym always first" },
              { icon: "🏘", text: "Filter by Nairobi neighborhood — no GPS needed" },
              { icon: "🔍", text: "Text search by gym name or area" },
              { icon: "📷", text: "Scan QR code at the gym entrance" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[14px] text-muted-color">
                <span className="text-lime text-[18px]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-[var(--border-color)] rounded-2xl p-7 relative overflow-hidden"
        >
          <div className="w-full aspect-[4/3] rounded-[10px] relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a1916 0%,#211f1b 100%)" }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(245,239,224,.04) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(245,239,224,.04) 40px)",
              }}
            />

            {MAP_PINS.map((pin, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center gap-[2px]" style={{ top: pin.mapTop, left: pin.mapLeft }}>
                <div
                  className="w-9 h-9 rounded-[50%_50%_50%_0] -rotate-45 flex items-center justify-center text-[14px] shadow-[0_4px_12px_rgba(0,0,0,.4)]"
                  style={{ background: pin.color }}
                >
                  <span className="rotate-45">{pin.icon}</span>
                </div>
              </div>
            ))}

            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-[14px] h-[14px] rounded-full bg-terra"
                style={{ animation: "pulse-ring 2s infinite" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] mt-4">
            {!gyms?.length && (
              <div className="text-[13px] text-muted-color py-4 text-center">Loading nearby gyms...</div>
            )}
            {(gyms ?? []).slice(0, 3).map((gym) => (
              <div
                key={gym.id}
                className="flex items-center gap-3 bg-[rgba(245,239,224,.03)] border border-[var(--border-color)] rounded-lg p-3 px-[14px] transition-all duration-200 hover:bg-[rgba(245,239,224,.06)] hover:border-[rgba(202,255,51,.2)]"
              >
                <div className="w-1 h-10 rounded-sm shrink-0" style={{ background: gym.primaryColor }} />
                <div className="flex-1">
                  <div className="font-heading font-bold text-[15px] uppercase tracking-[.03em]">{gym.gymName}</div>
                  <div className="text-[11px] text-muted-color mt-[1px]">
                    {gym.location || gym.neighborhood || ""}{gym.activeMembers > 0 ? ` · ${gym.activeMembers} active members` : ""}
                  </div>
                </div>
                <div className="font-heading font-bold text-[14px] text-lime tracking-[.02em]">{gym.distanceLabel}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
