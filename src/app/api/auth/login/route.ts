import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { AdminLoginResponse } from "@/types/api";

const API_URL = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const { token, admin, tenant } = data as AdminLoginResponse;

  const cookieStore = await cookies();
  cookieStore.set("auth_token_gym", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  cookieStore.set(
    "gym_data",
    JSON.stringify({
      id: tenant.id,
      name: tenant.gymName,
      slug: tenant.slug,
    }),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    }
  );

  return NextResponse.json({ admin, tenant });
}
