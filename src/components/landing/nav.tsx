"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "How It Works", href: "#how" },
  { label: "Nearby Gyms", href: "#nearby" },
  { label: "Transfers", href: "#transfer" },
  { label: "Pricing", href: "#pricing" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-6 md:px-12 h-16 flex items-center justify-between bg-[rgba(13,12,10,.9)] backdrop-blur-xl border-b border-[var(--border-color)]">
      <div className="font-heading font-black text-[28px] tracking-[.02em] text-cream">
        Am<em className="text-lime not-italic">ka</em>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] font-medium text-muted-color no-underline tracking-[.04em] transition-colors duration-200 uppercase hover:text-cream"
          >
            {link.label}
          </a>
        ))}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="bg-transparent text-cream px-[18px] py-[9px] font-heading font-bold text-[15px] tracking-[.06em] uppercase cursor-pointer border border-[rgba(245,239,224,.2)] transition-all duration-200 hover:border-lime hover:text-lime"
          >
            Login
          </button>
          <button
            onClick={() => document.getElementById("configure")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-lime text-ink px-[22px] py-[9px] font-heading font-bold text-[15px] tracking-[.06em] uppercase cursor-pointer border-none transition-all duration-200 hover:bg-cream hover:-translate-y-px"
            style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
          >
            List Your Gym
          </button>
        </div>
      </div>

      <button
        className="md:hidden text-cream bg-transparent border-none cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[rgba(13,12,10,.98)] backdrop-blur-xl border-b border-[var(--border-color)] md:hidden flex flex-col p-6 gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[14px] font-medium text-muted-color no-underline tracking-[.04em] uppercase py-2 hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              router.push("/login");
            }}
            className="text-[14px] font-medium text-muted-color no-underline tracking-[.04em] uppercase py-2 hover:text-cream bg-transparent border-none cursor-pointer text-left"
          >
            Login
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              document.getElementById("configure")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-lime text-ink px-[22px] py-[12px] font-heading font-bold text-[15px] tracking-[.06em] uppercase cursor-pointer border-none mt-2"
            style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
          >
            List Your Gym
          </button>
        </div>
      )}
    </nav>
  );
}
