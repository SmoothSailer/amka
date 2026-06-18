import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

async function handler(req: NextRequest) {
  const pathParts = req.nextUrl.pathname.split("/api/platform-proxy/");
  const backendPath = "/" + (pathParts[1] || "");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token_platform")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const backendUrl = `${API_URL}${backendPath}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (req.method !== "GET" && req.method !== "DELETE") {
    headers["Content-Type"] = "application/json";
  }

  try {
    const body = req.method !== "GET" && req.method !== "DELETE" ? await req.text() : undefined;

    const res = await fetch(backendUrl, {
      method: req.method,
      headers,
      body: body || undefined,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
