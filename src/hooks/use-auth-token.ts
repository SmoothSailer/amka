import { getAuthTokenClient } from "@/lib/auth-client";

export function useGymToken(): string | null {
  if (typeof window === "undefined") return null;
  return getAuthTokenClient("gym");
}

export function usePlatformToken(): string | null {
  if (typeof window === "undefined") return null;
  return getAuthTokenClient("platform");
}
