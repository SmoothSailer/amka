export function HeroPhoneMockup() {
  return (
    <div
      className="w-[240px] h-[500px] bg-[#111] rounded-[40px] border-[6px] border-[#2a2826] relative overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,.05),0_48px_100px_rgba(0,0,0,.8)]"
      style={{ animation: "hover-float 7s ease-in-out infinite" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-[#111] rounded-b-[14px] z-10" />
      <div className="w-full h-full overflow-hidden bg-[#111]">
        <div className="px-[14px] pt-[30px] pb-[10px] flex items-center justify-between bg-ink">
          <div className="flex items-center gap-[7px]">
            <div className="w-[28px] h-[28px] rounded-lg bg-lime flex items-center justify-center font-heading font-black text-[14px] text-ink">
              P
            </div>
            <div className="font-heading font-bold text-[14px] tracking-[.04em] uppercase text-cream">
              PowerZone
            </div>
          </div>
          <div className="w-[26px] h-[26px] rounded-full bg-[rgba(245,239,224,.08)] flex items-center justify-center text-[11px]">
            👤
          </div>
        </div>

        <div className="mx-3 my-2 rounded-xl bg-lime p-[14px] text-ink">
          <div className="text-[9px] font-semibold opacity-60 uppercase tracking-[.06em]">
            Good morning, James 👋
          </div>
          <div className="font-heading font-extrabold text-[18px] uppercase">
            Chest & Triceps
          </div>
          <div className="text-[9px] opacity-55 mt-[2px]">
            Bench 62.5kg × 5 · Today · Week 3
          </div>
        </div>

        <div className="flex gap-[6px] mx-3 mt-[6px]">
          {[
            { n: "12", l: "Sessions", c: "text-lime" },
            { n: "3🔥", l: "Streak", c: "text-cream" },
            { n: "87%", l: "Nutrition", c: "text-cream" },
          ].map((s, i) => (
            <div key={i} className="flex-1 bg-[rgba(245,239,224,.06)] rounded-lg p-2 text-center">
              <div className={`font-heading text-[16px] font-extrabold ${s.c}`}>{s.n}</div>
              <div className="text-[8px] text-[rgba(245,239,224,.35)] uppercase tracking-[.04em]">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mx-3 mt-[10px]">
          <div className="text-[9px] uppercase tracking-[.1em] text-[rgba(245,239,224,.3)] mb-[6px] font-semibold">
            Today&apos;s Program
          </div>
          <div className="bg-[rgba(245,239,224,.05)] rounded-lg p-[9px_10px] flex items-center gap-2 mb-[5px]">
            <div className="w-[28px] h-[28px] rounded-[7px] bg-[rgba(202,255,51,.12)] flex items-center justify-center text-[13px] shrink-0">
              🏋️
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-cream">Bench Press</div>
              <div className="text-[8px] text-[rgba(245,239,224,.35)]">62.5kg × 5 sets × 5 reps</div>
            </div>
            <div className="text-[8px] py-[2px] px-2 rounded-full bg-[rgba(202,255,51,.15)] text-lime font-semibold shrink-0">
              +2.5kg
            </div>
          </div>
          <div className="bg-[rgba(245,239,224,.05)] rounded-lg p-[9px_10px] flex items-center gap-2">
            <div className="w-[28px] h-[28px] rounded-[7px] bg-[rgba(245,239,224,.06)] flex items-center justify-center text-[13px] shrink-0">
              💪
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-cream">Tricep Dips</div>
              <div className="text-[8px] text-[rgba(245,239,224,.35)]">BW × 3 × 12</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-around py-[10px] pb-[14px] bg-[rgba(13,12,10,.96)] border-t border-[rgba(245,239,224,.05)]">
          {[
            { icon: "🏠", on: true },
            { icon: "🏋️", on: false },
            { icon: "🥗", on: false },
            { icon: "📈", on: false },
          ].map((item, i) => (
            <div key={i} className={`flex flex-col items-center gap-[2px] ${item.on ? "opacity-100" : "opacity-30"}`}>
              <div className="text-[15px]">{item.icon}</div>
              <div className={`w-[3px] h-[3px] rounded-full ${item.on ? "bg-lime opacity-100" : "opacity-0"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
