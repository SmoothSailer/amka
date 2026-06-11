import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token_gym");
  cookieStore.delete("auth_token_platform");
  cookieStore.delete("gym_data");
  return NextResponse.json({ success: true });
}
