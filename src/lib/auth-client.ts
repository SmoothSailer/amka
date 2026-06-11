export function setAuthTokenClient(token: string, scope: "gym" | "platform") {
  document.cookie = `auth_token_${scope}=${token}; path=/; max-age=${60 * 60 * 24}; samesite=lax`;
}

export function getAuthTokenClient(scope: "gym" | "platform"): string | null {
  const match = document.cookie.match(new RegExp(`auth_token_${scope}=([^;]+)`));
  return match ? match[1] : null;
}

export function clearAuthTokenClient(scope: "gym" | "platform") {
  document.cookie = `auth_token_${scope}=; path=/; max-age=0`;
}

export function setGymDataClient(gym: { id: string; name: string; slug: string; primaryColor: string }) {
  document.cookie = `gym_data=${JSON.stringify(gym)}; path=/; max-age=${60 * 60 * 24}; samesite=lax`;
}

export function getGymDataClient(): { id: string; name: string; slug: string; primaryColor: string } | null {
  const match = document.cookie.match(/gym_data=([^;]+)/);
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch {
      return null;
    }
  }
  return null;
}
