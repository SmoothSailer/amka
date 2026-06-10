export const TICKER_ITEMS = [
  "One App",
  "All Nairobi Gyms",
  "Join by Code",
  "Auto Progression",
  "M-Pesa Billing",
  "Gym Transfers",
  "Nearby Discovery",
  "Daily Reminders",
  "Progress Tracking",
  "Class Booking",
];

export const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    icon: "🏢",
    title: "List on Amka",
    desc: "Configure your gym name, logo, and brand colours. We create your space on the platform and generate a unique 6-character join code — your gym's fingerprint on Amka.",
  },
  {
    num: "02",
    icon: "📲",
    title: "Members Download",
    desc: "Share your join code — print it, WhatsApp it, stick it on the wall. Members download Amka once from the Play Store, enter your code, and the entire app themes to your gym instantly.",
  },
  {
    num: "03",
    icon: "🚀",
    title: "Amka Does the Rest",
    desc: "Members get auto-personalized training programs, context-aware daily reminders, nutrition tracking, and progress analytics. You get a dashboard, M-Pesa billing, and retention alerts.",
  },
];

export const JOIN_CODE_STEPS = [
  {
    num: "1",
    title: "Download Amka once",
    desc: "One app on the Play Store and App Store. Free to download for every member.",
  },
  {
    num: "2",
    title: "Enter your gym's code or scan QR",
    desc: "A 6-character code from your gym, or scan the QR code on the notice board.",
  },
  {
    num: "3",
    title: "App themes to your gym instantly",
    desc: "Colors, logo, and gym name fill the app. Feels like your gym built it themselves.",
  },
];

export const NEARBY_GYMS = [
  {
    name: "PowerZone Nairobi",
    location: "Westlands",
    members: 87,
    distance: "340m",
    color: "#CAFF33",
    icon: "🏋️",
    mapTop: "28%",
    mapLeft: "42%",
  },
  {
    name: "IronHouse",
    location: "Parklands",
    members: 142,
    distance: "1.2km",
    color: "#00d4aa",
    icon: "💪",
    mapTop: "45%",
    mapLeft: "65%",
  },
  {
    name: "ZenFit Kilimani",
    location: "Kilimani",
    members: 54,
    distance: "1.8km",
    color: "#E8552A",
    icon: "🧘",
    mapTop: "35%",
    mapLeft: "22%",
  },
  {
    name: "BoxBase",
    location: "CBD",
    members: 0,
    distance: "2.3km",
    color: "#a78bfa",
    icon: "🥊",
    mapTop: "62%",
    mapLeft: "30%",
  },
];

export const TRANSFER_STEPS = [
  {
    num: "1",
    title: "Find your new gym",
    desc: "Search nearby, filter by neighborhood, or enter the join code your new gym gave you. Westlands to Kilimani — it's all on Amka.",
    tag: null,
  },
  {
    num: "2",
    title: "Tap Transfer",
    desc: "One tap in Settings → Change Gym. No forms, no waiting for approval, no cancellation calls. Instant self-service.",
    tag: "Max 3 transfers / 30 days",
  },
  {
    num: "3",
    title: "App re-themes. History intact.",
    desc: "The app immediately themes to your new gym's colours and logo. All your workout logs, weight history, and nutrition data are fully preserved.",
    tag: null,
  },
];

export const GYM_OWNER_FEATURES = [
  {
    icon: "📊",
    title: "Retention Dashboard",
    desc: "See which members are going inactive before they cancel. Automatic alerts when a member hasn't trained in 10+ days — before they ghost you.",
    tag: "Growth & Pro",
  },
  {
    icon: "📍",
    title: "Gym Discovery Listing",
    desc: "Your gym appears in Amka's proximity search. Members who don't have your code yet can find you by location, neighborhood, or name.",
    tag: "All plans",
  },
  {
    icon: "📲",
    title: "M-Pesa Membership Billing",
    desc: "Members pay renewals in-app via STK push. Automatic reconciliation. No manual M-Pesa checking, no chasing payments on WhatsApp.",
    tag: "All plans",
  },
  {
    icon: "📈",
    title: "Benchmark Reports",
    desc: "See how your retention, sessions/member, and churn compare to the Amka platform average across all Nairobi gyms. Know where you stand.",
    tag: "Pro only",
  },
  {
    icon: "🔄",
    title: "Transfer Intelligence",
    desc: "See which gyms you're winning members from and which you're losing to. Inbound and outbound transfers shown in your dashboard — a real competitive signal.",
    tag: "All plans",
  },
  {
    icon: "🎨",
    title: "Deep Gym Theming",
    desc: "Your logo, primary colour, and name fill the entire app for your members. Feels like your gym built a custom app — without any of the cost or wait.",
    tag: "All plans",
  },
];

export const MEMBER_FEATURES = [
  {
    icon: "🏋️",
    title: "Auto-Progression Programs",
    desc: "Smart training plans that automatically increase weights when you hit your targets. Bench 60kg this week → 62.5kg next. No trainer needed.",
    tag: "Powered by wger",
  },
  {
    icon: "🔔",
    title: "Context-Aware Reminders",
    desc: '"Today is Chest Day. Bench 62.5kg × 5 — up from 60kg last week." Not a generic ping. A reminder that knows exactly what you\'re doing today.',
    tag: "Daily at your time",
  },
  {
    icon: "🥗",
    title: "Smart Nutrition Tracking",
    desc: "Log meals, track macros. Reminders only fire when you're actually behind — no nagging when you're on track. Afternoon nudge if you've barely eaten.",
    tag: "Growth & Pro",
  },
  {
    icon: "📉",
    title: "Weekly Progress Summaries",
    desc: "Every Sunday: your weight trend, strength gains by exercise, session consistency %. Watch your progress compound over months.",
    tag: "All plans",
  },
  {
    icon: "🔄",
    title: "Free Gym Transfers",
    desc: "Moved? Changed schedule? Switch to any Amka gym in seconds. Every workout log, weight entry, and nutrition diary comes with you. Zero data loss.",
    tag: "3 per 30 days",
  },
  {
    icon: "🗓",
    title: "Class Booking",
    desc: "See your gym's class schedule, book your spot, get reminders. Zumba, CrossFit, yoga — whatever your gym runs, you can book it in Amka.",
    tag: "Growth & Pro",
  },
];

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "1,500",
    priceNum: 1500,
    period: "/mo",
    members: "Up to 15 active members",
    hot: false,
    features: [
      "Listed on Amka discovery",
      "Gym branding & theming",
      "6-char join code + QR",
      "Workout tracking",
      "Daily push reminders",
      "M-Pesa billing",
      "Transfer visibility",
    ],
  },
  {
    name: "Growth",
    price: "8,000",
    priceNum: 8000,
    period: "/mo",
    members: "Up to 150 active members",
    hot: true,
    features: [
      "Everything in Starter",
      "Trainer accounts & alerts",
      "Class scheduling & booking",
      "Nutrition reminders",
      "Retention dashboard",
      "Weekly progress reports",
      "Inbound transfer reports",
    ],
  },
  {
    name: "Pro",
    price: "15,000",
    priceNum: 15000,
    period: "/mo",
    members: "Up to 400 active members",
    hot: false,
    features: [
      "Everything in Growth",
      "SMS & WhatsApp reminders",
      "Priority discovery placement",
      "Benchmark reports",
      "Custom onboarding flow",
      "Multi-location management",
      "Priority support (24h)",
    ],
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
  },
];

export const CONFIGURATOR_PLANS = [
  {
    plan: "starter",
    name: "Starter",
    sub: "Up to 15 members",
    price: "1,500",
    priceNum: 1500,
    chips: ["Branded App", "Reminders", "M-Pesa"],
    popular: false,
  },
  {
    plan: "growth",
    name: "Growth",
    sub: "Up to 150 members",
    price: "8,000",
    priceNum: 8000,
    chips: ["Trainers", "Classes", "Analytics"],
    popular: true,
  },
  {
    plan: "pro",
    name: "Pro",
    sub: "Up to 400 members",
    price: "15,000",
    priceNum: 15000,
    chips: ["SMS/WhatsApp", "Benchmarks"],
    popular: false,
  },
];

export const BUILD_STEPS = [
  { id: "bs1", icon: "🎨", label: "Applying your branding", dur: 1600 },
  { id: "bs2", icon: "🔑", label: "Generating join code & QR", dur: 1200 },
  { id: "bs3", icon: "📍", label: "Registering gym location", dur: 1000 },
  { id: "bs4", icon: "🏋️", label: "Setting up training engine", dur: 2200 },
  { id: "bs5", icon: "🔔", label: "Configuring reminders", dur: 1500 },
  { id: "bs6", icon: "📲", label: "Registering M-Pesa", dur: 1400 },
  { id: "bs7", icon: "✅", label: "Gym live on Amka", dur: 900 },
];

export const DASHBOARD_KPIS = [
  { label: "Active Members", value: "87", delta: "↑ 12 this month" },
  { label: "Retention Rate", value: "84%", delta: "↑ 13pts vs platform avg (71%)" },
  { label: "App Opens Today", value: "43", delta: "↑ 49% open rate" },
  { label: "MRR (M-Pesa)", value: "KES 261k", delta: "↑ KES 36k this month" },
];

export const WEEKLY_CHECKINS = [45, 72, 55, 90, 62, 38, 18];
export const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export const DASHBOARD_ALERTS = [
  { color: "#E8552A", title: "5 members inactive 10+ days", sub: "Auto-reminder sent this morning" },
  { color: "#4ade80", title: "3 renewals today via M-Pesa", sub: "KES 9,000 collected" },
  { color: "#CAFF33", title: "2 members transferred in", sub: "From IronHouse · This week" },
  { color: "rgba(245,239,224,.3)", title: "You're above platform avg", sub: "84% retention vs 71% Nairobi avg" },
];

export const DASHBOARD_MEMBERS = [
  { initials: "JM", name: "James Mutua", plan: "Growth · Joined Jan 2025", status: "Active", color: "rgba(202,255,51,.12)", textColor: "#CAFF33" },
  { initials: "AW", name: "Amina Wanjiku", plan: "Starter · Joined Feb 2025", status: "New", color: "rgba(232,85,42,.12)", textColor: "#E8552A" },
  { initials: "BK", name: "Brian Kamau", plan: "Growth · Joined Nov 2024", status: "Active", color: "rgba(245,239,224,.07)", textColor: "#F5EFE0" },
  { initials: "FO", name: "Faith Odhiambo", plan: "Starter · Joined Oct 2024", status: "Expired", color: "rgba(232,85,42,.08)", textColor: "#E8552A" },
  { initials: "DN", name: "David Njoroge", plan: "Pro · Joined Mar 2025", status: "New", color: "rgba(202,255,51,.08)", textColor: "#CAFF33" },
];

export const DASHBOARD_TRANSFERS = [
  { direction: "in" as const, name: "Amina Wanjiku", gym: "From IronHouse Parklands", date: "2 days ago" },
  { direction: "in" as const, name: "Kevin Oduya", gym: "From FitBase Kilimani", date: "5 days ago" },
  { direction: "out" as const, name: "Grace Mwangi", gym: "To ZenFit Karen", date: "8 days ago" },
  { direction: "in" as const, name: "Peter Kimani", gym: "From BoxBase CBD", date: "12 days ago" },
];
