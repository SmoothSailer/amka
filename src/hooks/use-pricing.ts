import { useQuery } from "@tanstack/react-query";
import type { PricingTier } from "@/types/api";

interface PricingResponse {
  tiers: PricingTier[];
}

export function usePricing() {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: () =>
      fetch("/api/pricing").then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch pricing");
        return res.json() as Promise<PricingResponse>;
      }),
  });
}
