import { getAuthTokenClient } from "@/lib/auth-client";

export function useGymToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = getAuthTokenClient("gym");
  if (!token || token === "undefined" || token === "null") return null;
  return token;
}

export function usePlatformToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = getAuthTokenClient("platform");
  if (!token || token === "undefined" || token === "null") return null;
  return token;
}
