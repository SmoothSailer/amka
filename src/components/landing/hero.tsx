import { HeroPhoneMockup } from "./hero-phone-mockup";

function AppleStoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>App Store</title>
      <path d="M16.5 11.5c-.08-1.6.74-2.83 2.23-3.72-.85-1.2-2.14-1.89-3.65-1.95-1.54-.07-3.3.9-4.13.9-.86 0-2.28-.86-3.77-.83C5.3 5.95 3.1 7.21 1.88 9.46c-1.53 2.61-.39 6.46 1.1 8.55.74 1.03 1.6 2.19 2.72 2.14 1.1-.05 1.5-.7 2.83-.7 1.3 0 1.68.7 2.83.69 1.18-.02 1.92-1.05 2.62-2.1.84-1.19 1.18-2.35 1.2-2.42-.04-.02-2.3-.9-2.3-3.5zM14 4.26c1-.98 1.88-2.63 1.68-3.86-1.62.07-3.58.89-4.71 2.02-1.07 1.02-1.98 2.74-1.73 3.98 1.8.12 3.66-.74 4.78-2.14z" fill="currentColor" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Google Play</title>
      <path d="M4.05 1.7a2.15 2.15 0 00-.8.17v18.26c.25.11.52.17.8.17.42 0 .84-.11 1.23-.34l9.98-5.77L4.05 1.7z" fill="currentColor" />
      <path d="M15.67 13.07L5.28 19.1c-.42.24-.87.36-1.31.34l9.7-9.7 2 3.33z" fill="currentColor" opacity="0.8" />
      <path d="M15.67 8.93l-2 3.34-1.79-1.8 3.8-1.54z" fill="currentColor" opacity="0.6" />
      <path d="M13.66 9.67l-9.7-9.7c.44-.02.89.1 1.31.34l9.98 5.77-1.59 3.59z" fill="currentColor" opacity="0.8" />
      <path d="M4.05 20.3c.42 0 .85-.1 1.23-.34l10.71-6.2-1.65-1.66L4.05 20.3z" fill="currentColor" opacity="0.5" />
      <path d="M15.28 8.42L12.8 6.93l-1.66 1.67 4.18-1.7-.04 1.52z" fill="currentColor" opacity="0.7" />
      <path d="M14.29 10.76l-10 9.98c.15.06.33.07.49.02l10.21-5.9-.7-4.1z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

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

      <div className="bg-mid border-l border-[var(--border-color)] flex flex-col items-center justify-center relative overflow-hidden p-10 order-1 lg:order-2 min-h-[500px] gap-6">
        <div className="absolute font-heading font-black text-[220px] text-[rgba(202,255,51,.04)] tracking-[-.05em] uppercase bottom-[-20px] left-[-20px] leading-none pointer-events-none select-none">
          AMKA
        </div>
        <HeroPhoneMockup />
        <div className="flex items-center gap-3 z-10">
          <a href="#" className="flex items-center gap-2 bg-[rgba(245,239,224,.08)] border border-[rgba(245,239,224,.12)] rounded-lg px-4 py-2.5 hover:bg-[rgba(245,239,224,.14)] transition-colors group">
            <AppleStoreIcon />
            <div className="text-left">
              <div className="text-[9px] text-muted-color leading-none mb-0.5">Download on</div>
              <div className="text-[13px] font-semibold text-cream leading-none group-hover:text-lime transition-colors">App Store</div>
            </div>
          </a>
          <a href="#" className="flex items-center gap-2 bg-[rgba(245,239,224,.08)] border border-[rgba(245,239,224,.12)] rounded-lg px-4 py-2.5 hover:bg-[rgba(245,239,224,.14)] transition-colors group">
            <PlayStoreIcon />
            <div className="text-left">
              <div className="text-[9px] text-muted-color leading-none mb-0.5">Get it on</div>
              <div className="text-[13px] font-semibold text-cream leading-none group-hover:text-lime transition-colors">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
