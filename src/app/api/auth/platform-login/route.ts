import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { PlatformLoginResponse } from "@/types/api";

const API_URL = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/api/platform/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const { token, admin } = data as PlatformLoginResponse;

  const cookieStore = await cookies();
  cookieStore.set("auth_token_platform", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return NextResponse.json({ admin });
}
