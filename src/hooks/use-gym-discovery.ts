import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { GymSearchResult, GymNearby, GymPublicProfile } from "@/types/api";

export function useGymSearch(query: string, limit = 20) {
  return useQuery({
    queryKey: ["gyms", "search", query, limit],
    queryFn: () =>
      apiClient
        .get<{ results: GymSearchResult[] }>(`/api/gyms/search?q=${encodeURIComponent(query)}&limit=${limit}`)
        .then((r) => r.results),
    enabled: query.length >= 2,
  });
}

export function useNearbyGyms(lat: number, lng: number, radius = 5) {
  return useQuery({
    queryKey: ["gyms", "nearby", lat, lng, radius],
    queryFn: () => apiClient.get<GymNearby[]>(`/api/gyms/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
    enabled: !!lat && !!lng,
  });
}

export function useNearbyGymsByNeighborhood(neighborhood: string, limit = 10) {
  return useQuery({
    queryKey: ["gyms", "nearby", "neighborhood", neighborhood, limit],
    queryFn: () =>
      apiClient.get<GymNearby[]>(`/api/gyms/nearby?neighborhood=${encodeURIComponent(neighborhood)}&limit=${limit}`),
    enabled: !!neighborhood,
  });
}

export function useNeighborhoods() {
  return useQuery({
    queryKey: ["gyms", "neighborhoods"],
    queryFn: () =>
      apiClient.get<{ neighborhoods: string[] }>("/api/gyms/neighborhoods").then((r) => r.neighborhoods),
  });
}

export function useValidateJoinCode(code: string) {
  return useQuery({
    queryKey: ["gyms", "validate-code", code],
    queryFn: () => apiClient.get<GymPublicProfile>(`/api/gyms/validate-code/${code}`),
    enabled: !!code,
  });
}

export function useGymProfile(slug: string) {
  return useQuery({
    queryKey: ["gyms", "profile", slug],
    queryFn: () => apiClient.get<GymPublicProfile>(`/api/gyms/${slug}`),
    enabled: !!slug,
  });
}
