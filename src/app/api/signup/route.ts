import { NextResponse } from "next/server";

const API_URL = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;
const PLATFORM_TOKEN = process.env.PLATFORM_ADMIN_TOKEN;

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/api/platform/tenants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(PLATFORM_TOKEN ? { Authorization: `Bearer ${PLATFORM_TOKEN}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
