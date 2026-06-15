import { NextResponse } from "next/server";

const API_URL = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

async function getPlatformToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/api/platform/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.PLATFORM_ADMIN_EMAIL || "admin@amka.app",
        password: process.env.PLATFORM_ADMIN_PASSWORD || "admin123!",
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.token || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const token =
    process.env.PLATFORM_ADMIN_TOKEN ||
    (await getPlatformToken());

  if (!token) {
    return NextResponse.json(
      { error: "Unable to authenticate with the platform. Please try again later." },
      { status: 503 }
    );
  }

  const res = await fetch(`${API_URL}/api/tenants/provision`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
