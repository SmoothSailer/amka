import { NextResponse } from "next/server";

const API_URL = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/pricing`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {}

  const tiers = [
    {
      name: "Starter",
      price: "1,500",
      priceNum: 1500,
      period: "/mo",
      members: "Up to 15 active members",
      hot: false,
      enterprise: false,
      features: [
        "Listed on Amka discovery",
        "Gym branding & theming",
        "6-char join code + QR",
        "Workout tracking",
        "Daily push reminders",
        "M-Pesa billing",
        "Transfer visibility",
      ],
      chips: ["Branded App", "Reminders", "M-Pesa"],
    },
    {
      name: "Growth",
      price: "8,000",
      priceNum: 8000,
      period: "/mo",
      members: "Up to 150 active members",
      hot: true,
      enterprise: false,
      features: [
        "Everything in Starter",
        "Trainer accounts & alerts",
        "Class scheduling & booking",
        "Nutrition reminders",
        "Retention dashboard",
        "Weekly progress reports",
        "Inbound transfer reports",
      ],
      chips: ["Trainers", "Classes", "Analytics"],
    },
    {
      name: "Pro",
      price: "15,000",
      priceNum: 15000,
      period: "/mo",
      members: "Up to 400 active members",
      hot: false,
      enterprise: false,
      features: [
        "Everything in Growth",
        "SMS & WhatsApp reminders",
        "Priority discovery placement",
        "Benchmark reports",
        "Custom onboarding flow",
        "Multi-location management",
        "Priority support (24h)",
      ],
      chips: ["SMS & WhatsApp", "Benchmarks", "Priority"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      priceNum: 0,
      period: "",
      members: "Unlimited · White-label",
      hot: false,
      enterprise: true,
      features: [
        "Own app store listing",
        "White-label Flutter build",
        "Custom domain",
        "Dedicated infrastructure",
        "API access",
        "SLA + dedicated support",
      ],
      chips: [],
    },
  ];

  return NextResponse.json({ tiers });
}
