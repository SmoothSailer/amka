"use client";

import { useState } from "react";
import {
  DASHBOARD_KPIS,
  WEEKLY_CHECKINS,
  WEEKDAY_LABELS,
  DASHBOARD_ALERTS,
  DASHBOARD_MEMBERS,
  DASHBOARD_TRANSFERS,
} from "@/lib/landing-data";

interface DashboardPreviewProps {
  gymName: string;
  joinCode: string;
  slug: string;
}

const TABS = ["Overview", "Members", "Transfers", "Join Code"] as const;
type Tab = (typeof TABS)[number];

export function DashboardPreview({ gymName, joinCode, slug }: DashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <section className="py-20 px-6 md:px-12 bg-mid border-t border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[12px] text-muted-color uppercase tracking-[.1em] mb-1.5">Your Dashboard</div>
            <div className="font-heading font-black text-[48px] uppercase tracking-[-.02em] leading-none">
              {gymName || "PowerZone Nairobi"}
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#4ade80]">
            <div className="w-2 h-2 rounded-full bg-[#4ade80]" style={{ animation: "pulse 2s infinite" }} />
            Live on Amka
          </div>
        </div>

        <div className="flex gap-[2px] bg-[rgba(245,239,224,.04)] rounded-md p-1 border border-[var(--border-color)] mb-8 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-[9px] px-5 rounded-[4px] font-heading font-bold text-[14px] tracking-[.06em] uppercase cursor-pointer border-none transition-all duration-200 ${
                activeTab === tab ? "bg-lime text-ink" : "bg-transparent text-muted-color"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Members" && <MembersTab />}
        {activeTab === "Transfers" && <TransfersTab />}
        {activeTab === "Join Code" && <JoinCodeTab code={joinCode} slug={slug} />}
      </div>
    </section>
  );
}

function OverviewTab() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[2px] mb-[2px] bg-[var(--border-color)]">
        {DASHBOARD_KPIS.map((kpi, i) => (
          <div key={i} className="bg-card p-6">
            <div className="text-[11px] uppercase tracking-[.1em] text-muted-color mb-2">{kpi.label}</div>
            <div className="font-heading text-[36px] font-black leading-none tracking-[-.01em]">{kpi.value}</div>
            <div className="text-[12px] text-[#4ade80] mt-1">{kpi.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[2px] bg-[var(--border-color)]">
        <div className="bg-card p-7">
          <div className="font-heading font-bold text-[18px] uppercase tracking-[.03em] mb-5">Weekly Check-ins</div>
          <div className="flex items-end gap-1.5 h-20">
            {WEEKLY_CHECKINS.map((val, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm min-h-[4px] cursor-default transition-opacity duration-200 hover:opacity-70"
                style={{
                  height: `${val}%`,
                  background: i === 3 ? "var(--lime)" : `rgba(202,255,51,${0.12 + (val / 100) * 0.35})`,
                }}
              />
            ))}
          </div>
          <div className="flex mt-1.5">
            {WEEKDAY_LABELS.map((lbl, i) => (
              <div key={i} className="flex-1 text-center text-[9px] text-muted-color uppercase tracking-[.06em]">{lbl}</div>
            ))}
          </div>
        </div>

        <div className="bg-card p-7">
          <div className="font-heading font-bold text-[18px] uppercase tracking-[.03em] mb-5">Alerts</div>
          {DASHBOARD_ALERTS.map((alert, i) => (
            <div key={i} className={`py-3 flex gap-3 items-start ${i < DASHBOARD_ALERTS.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}>
              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: alert.color }} />
              <div>
                <div className="text-[13px] font-medium">{alert.title}</div>
                <div className="text-[11px] text-muted-color mt-[2px]">{alert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembersTab() {
  return (
    <div className="bg-card p-7">
      <div className="font-heading font-bold text-[18px] uppercase tracking-[.03em] mb-5">Active Members</div>
      {DASHBOARD_MEMBERS.map((member, i) => (
        <div key={i} className={`flex items-center gap-3 py-2.5 ${i < DASHBOARD_MEMBERS.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-extrabold text-[14px] shrink-0" style={{ background: member.color, color: member.textColor }}>
            {member.initials}
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-medium">{member.name}</div>
            <div className="text-[11px] text-muted-color">{member.plan}</div>
          </div>
          <span className={`text-[10px] py-[2px] px-[10px] rounded-full font-semibold tracking-[.04em] uppercase ${
            member.status === "Active" ? "bg-[rgba(74,222,128,.1)] text-[#4ade80]" :
            member.status === "New" ? "bg-[rgba(202,255,51,.1)] text-lime" :
            "bg-[rgba(232,85,42,.1)] text-terra"
          }`}>
            {member.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function TransfersTab() {
  return (
    <div className="bg-card p-7">
      <div className="font-heading font-bold text-[18px] uppercase tracking-[.03em] mb-5">Transfer Activity · Last 30 Days</div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-[rgba(202,255,51,.06)] border border-[rgba(202,255,51,.15)] rounded-lg p-4 text-center">
          <div className="font-heading text-[36px] font-black text-lime">+7</div>
          <div className="text-[12px] text-muted-color">Members transferred in</div>
        </div>
        <div className="bg-[rgba(232,85,42,.06)] border border-[rgba(232,85,42,.15)] rounded-lg p-4 text-center">
          <div className="font-heading text-[36px] font-black text-terra">-3</div>
          <div className="text-[12px] text-muted-color">Members transferred out</div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {DASHBOARD_TRANSFERS.map((t, i) => (
          <div key={i} className="flex items-center gap-3 bg-[rgba(245,239,224,.03)] border border-[var(--border-color)] rounded-lg p-3 px-[14px]">
            <div className={`font-heading font-extrabold text-[18px] ${t.direction === "in" ? "text-lime" : "text-terra"}`}>
              {t.direction === "in" ? "↓ IN" : "↑ OUT"}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium">{t.name}</div>
              <div className="text-[11px] text-muted-color">{t.gym}</div>
            </div>
            <div className="text-[11px] text-muted-color">{t.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JoinCodeTab({ code, slug }: { code: string; slug: string }) {
  return (
    <div className="flex flex-col gap-4 max-w-[420px]">
      <div className="bg-[rgba(202,255,51,.06)] border border-[rgba(202,255,51,.2)] rounded-[10px] p-8 text-center">
        <div className="text-[11px] uppercase tracking-[.1em] text-muted-color mb-2">Your gym&apos;s join code</div>
        <div className="font-heading font-black text-[64px] tracking-[.3em] text-lime leading-none">{code}</div>
        <div className="text-[12px] text-muted-color mt-2">
          Members enter this in Amka to join your gym ·{" "}
          <span className="text-lime">amka.app/{slug}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 py-3 font-heading font-bold text-[13px] tracking-[.06em] uppercase cursor-pointer border-none transition-all duration-200 rounded bg-lime text-ink">
          Download QR Code
        </button>
        <button className="flex-1 py-3 font-heading font-bold text-[13px] tracking-[.06em] uppercase cursor-pointer transition-all duration-200 rounded bg-transparent text-cream border border-[rgba(245,239,224,.2)] hover:border-cream">
          Copy WhatsApp Link
        </button>
      </div>
      <div className="text-[13px] text-muted-color p-3 bg-[rgba(245,239,224,.03)] border border-[var(--border-color)] rounded-md">
        💡 Print your QR code and stick it at reception. Members scan → download Amka → they&apos;re in.
      </div>
    </div>
  );
}
