import { HeroPhoneMockup } from "./hero-phone-mockup";

export function Hero() {
  return (
    <section className="min-h-screen pt-16 grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(245,239,224,.03) 80px), repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(245,239,224,.03) 80px)",
        }}
      />

      <div className="px-6 md:px-12 py-20 flex flex-col justify-center relative z-1 order-2 lg:order-1">
        <div className="inline-flex items-center gap-[10px] text-[11px] font-semibold tracking-[.12em] uppercase text-lime mb-8">
          <span className="w-8 h-px bg-lime" />
          Nairobi&apos;s Gym Platform
        </div>

        <h1 className="font-heading font-black text-[clamp(72px,8vw,120px)] leading-[.92] tracking-[-.02em] uppercase mb-2">
          <span className="block text-cream">Wake</span>
          <span className="block text-lime">Up.</span>
          <span className="block" style={{ WebkitTextStroke: "2px var(--cream)", color: "transparent" }}>
            Train.
          </span>
          <span className="block text-terra">Repeat.</span>
        </h1>

        <div className="w-full h-px bg-[var(--border-color)] my-8" />

        <p className="text-[17px] text-muted-color leading-[1.75] max-w-[440px] mb-10">
          Amka is the fitness platform East African gyms plug into. Members download{" "}
          <strong className="text-cream font-medium">one app</strong>, find their gym by code or
          location, and get a fully personalized training and nutrition experience — with reminders
          that know exactly what to say.
        </p>

        <div className="flex gap-3 flex-wrap mb-14">
          <button
            onClick={() => document.getElementById("configure")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-lime text-ink px-8 py-4 font-heading font-bold text-[16px] tracking-[.08em] uppercase cursor-pointer border-none transition-all duration-200 hover:bg-cream hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(202,255,51,.2)]"
            style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
          >
            List Your Gym →
          </button>
          <button
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-transparent text-cream px-8 py-4 font-heading font-bold text-[16px] tracking-[.08em] uppercase cursor-pointer border border-[rgba(245,239,224,.2)] transition-all duration-200 hover:border-cream"
          >
            How It Works
          </button>
        </div>

        <div className="flex border-t border-[var(--border-color)]">
          {[
            { num: "400", sup: "+", supClass: "text-lime", lbl: "Nairobi gyms" },
            { num: "1", sup: "app", supClass: "", lbl: "One store listing", pl: "pl-6" },
            { num: "KES", sup: " 1.5k", supClass: "text-lime !text-[16px]", lbl: "Starting / month", pl: "pl-6", numColor: "text-lime" },
          ].map((kpi, i) => (
            <div key={i} className={`flex-1 py-5 ${i < 2 ? "border-r border-[var(--border-color)]" : ""} ${kpi.pl || ""}`}>
              <div className={`font-heading text-[42px] font-black leading-none tracking-[-.02em] ${kpi.numColor || "text-cream"}`}>
                {kpi.num}
                <sup className={`text-[20px] ${kpi.supClass}`}>{kpi.sup}</sup>
              </div>
              <div className="text-[11px] text-muted-color mt-1 tracking-[.04em] uppercase">{kpi.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-mid border-l border-[var(--border-color)] flex items-center justify-center relative overflow-hidden p-10 order-1 lg:order-2 min-h-[500px]">
        <div className="absolute font-heading font-black text-[220px] text-[rgba(202,255,51,.04)] tracking-[-.05em] uppercase bottom-[-20px] left-[-20px] leading-none pointer-events-none select-none">
          AMKA
        </div>
        <HeroPhoneMockup />
      </div>
    </section>
  );
}
