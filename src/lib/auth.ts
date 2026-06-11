import { cookies } from "next/headers";

export async function setAuthToken(token: string, scope: "gym" | "platform") {
  const cookieStore = await cookies();
  cookieStore.set(`auth_token_${scope}`, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function getAuthToken(scope: "gym" | "platform") {
  const cookieStore = await cookies();
  return cookieStore.get(`auth_token_${scope}`)?.value;
}

export async function clearAuthToken(scope: "gym" | "platform") {
  const cookieStore = await cookies();
  cookieStore.delete(`auth_token_${scope}`);
}

export async function setGymData(gym: { id: string; name: string; slug: string; primaryColor: string }) {
  const cookieStore = await cookies();
  cookieStore.set("gym_data", JSON.stringify(gym), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function getGymData() {
  const cookieStore = await cookies();
  const data = cookieStore.get("gym_data")?.value;
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}
