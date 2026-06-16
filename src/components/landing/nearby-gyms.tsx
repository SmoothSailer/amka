"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNearbyGyms, useGymSearch, useNeighborhoods, useNearbyGymsByNeighborhood } from "@/hooks/use-gym-discovery";
import { Search, MapPin } from "lucide-react";

const NAIROBI_CENTER = { lat: -1.2636, lng: 36.8047 };
const ICONS = ["🏋️", "💪", "🏃", "🏢", "🧘", "🥊"];
const COLORS = ["#FF5500", "#2C3E50", "#6C63FF", "#00B894", "#E8552A", "#a78bfa"];

function latLngToPercent(
  lat: number,
  lng: number,
  centerLat: number,
  centerLng: number
): { mapTop: string; mapLeft: string } {
  const latRange = 0.15;
  const lngRange = 0.15;
  const top = 50 - ((lat - centerLat) / latRange) * 40;
  const left = 50 + ((lng - centerLng) / lngRange) * 40;
  return {
    mapTop: `${Math.max(10, Math.min(85, top))}%`,
    mapLeft: `${Math.max(10, Math.min(85, left))}%`,
  };
}

type SearchMode = "nearby" | "text" | "neighborhood";

export function NearbyGyms() {
  const [searchMode, setSearchMode] = useState<SearchMode>("nearby");
  const [searchQuery, setSearchQuery] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const { data: nearbyGyms } = useNearbyGyms(NAIROBI_CENTER.lat, NAIROBI_CENTER.lng, 10);
  const { data: searchResults } = useGymSearch(searchQuery, 10);
  const { data: neighborhoods } = useNeighborhoods();
  const { data: neighborhoodGyms } = useNearbyGymsByNeighborhood(neighborhood, 10);

  const gyms = useMemo(() => {
    if (searchMode === "text" && searchQuery.length >= 2) return searchResults ?? [];
    if (searchMode === "neighborhood" && neighborhood) return neighborhoodGyms ?? [];
    return nearbyGyms ?? [];
  }, [searchMode, searchQuery, neighborhood, searchResults, neighborhoodGyms, nearbyGyms]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length >= 2) {
      setSearchMode("text");
      setNeighborhood("");
    } else {
      setSearchMode("nearby");
    }
  };

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    if (value) {
      setSearchMode("neighborhood");
      setSearchQuery("");
    } else {
      setSearchMode("nearby");
    }
  };

  const mapPins = useMemo(() => {
    if (!gyms?.length) {
      return [
        { mapTop: "40%", mapLeft: "40%", color: "#FF5500", icon: "🏋️" },
        { mapTop: "55%", mapLeft: "60%", color: "#2C3E50", icon: "💪" },
        { mapTop: "60%", mapLeft: "30%", color: "#6C63FF", icon: "🏃" },
        { mapTop: "35%", mapLeft: "55%", color: "#00B894", icon: "🏢" },
      ];
    }
    return gyms.slice(0, 6).map((gym, i) => {
      const pos =
        gym.latitude && gym.longitude
          ? latLngToPercent(gym.latitude, gym.longitude, NAIROBI_CENTER.lat, NAIROBI_CENTER.lng)
          : { mapTop: `${30 + i * 12}%`, mapLeft: `${30 + i * 15}%` };
      return {
        ...pos,
        color: gym.primaryColor || COLORS[i % COLORS.length],
        icon: ICONS[i % ICONS.length],
        name: "gymName" in gym ? (gym as { gymName: string }).gymName : (gym as { name: string }).name,
      };
    });
  }, [gyms]);

  return (
    <section id="nearby" className="bg-mid py-[100px] px-6 md:px-12 border-t border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-lime mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-lime" />
            Gym Discovery
          </div>
          <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[.95] tracking-[-.01em] uppercase mb-4">
            No code?<br />Find gyms<br />near you.
          </div>
          <p className="text-[16px] text-muted-color max-w-[500px] leading-[1.75] mt-4">
            Don&apos;t have a join code yet? Open Amka and tap &quot;Find gyms near me.&quot; We show every
            Amka gym sorted by walking distance —{" "}
            <strong className="text-cream">distance is always first</strong>, never paid placement.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: "📍", text: "Sort by distance — closest gym always first" },
              { icon: "🏘", text: "Filter by Nairobi neighborhood — no GPS needed" },
              { icon: "🔍", text: "Text search by gym name or area" },
              { icon: "📷", text: "Scan QR code at the gym entrance" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[14px] text-muted-color">
                <span className="text-lime text-[18px]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-[var(--border-color)] rounded-2xl p-7 relative overflow-hidden"
        >
          <div className="w-full aspect-[4/3] rounded-[10px] relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a1916 0%,#211f1b 100%)" }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(245,239,224,.04) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(245,239,224,.04) 40px)",
              }}
            />

            {mapPins.map((pin, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center gap-[2px]" style={{ top: pin.mapTop, left: pin.mapLeft }}>
                <div
                  className="w-9 h-9 rounded-[50%_50%_50%_0] -rotate-45 flex items-center justify-center text-[14px] shadow-[0_4px_12px_rgba(0,0,0,.4)]"
                  style={{ background: pin.color }}
                >
                  <span className="rotate-45">{pin.icon}</span>
                </div>
                {"name" in pin && (
                  <div className="bg-[rgba(13,12,10,.9)] text-cream text-[10px] font-semibold py-[3px] px-2 rounded backdrop-blur-sm border border-[rgba(245,239,224,.1)] whitespace-nowrap">
                    {(pin as { name: string }).name.split(" ")[0]}
                  </div>
                )}
              </div>
            ))}

            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-[14px] h-[14px] rounded-full bg-terra"
                style={{ animation: "pulse-ring 2s infinite" }}
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-color" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search gym name or area..."
                  className="w-full bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-2.5 pl-9 pr-3 rounded-lg font-body text-[13px] outline-none transition-border-color duration-200 focus:border-[rgba(202,255,51,.4)] placeholder:text-[rgba(245,239,224,.2)]"
                />
              </div>
              <div className="relative">
                <select
                  value={neighborhood}
                  onChange={(e) => handleNeighborhoodChange(e.target.value)}
                  className="appearance-none bg-[rgba(245,239,224,.04)] border border-[var(--border-color)] text-cream py-2.5 pl-3 pr-8 rounded-lg font-body text-[13px] outline-none cursor-pointer focus:border-[rgba(202,255,51,.4)]"
                >
                  <option value="" className="bg-card">Neighborhood</option>
                  {(neighborhoods ?? []).map((n) => (
                    <option key={n} value={n} className="bg-card">{n}</option>
                  ))}
                </select>
                <MapPin className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-color pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              {!gyms?.length && searchMode === "nearby" && (
                <div className="text-[13px] text-muted-color py-4 text-center">Loading nearby gyms...</div>
              )}
              {!gyms?.length && searchMode === "text" && searchQuery.length >= 2 && (
                <div className="text-[13px] text-muted-color py-4 text-center">No gyms found for &quot;{searchQuery}&quot;</div>
              )}
              {!gyms?.length && searchMode === "neighborhood" && (
                <div className="text-[13px] text-muted-color py-4 text-center">No gyms found in {neighborhood}</div>
              )}
              {gyms.slice(0, 3).map((gym) => {
                const name = "gymName" in gym ? (gym as { gymName: string }).gymName : (gym as { name: string }).name;
                const loc = "location" in gym ? (gym as { location: string | null }).location : null;
                const hood = "neighborhood" in gym ? (gym as { neighborhood: string | null }).neighborhood : null;
                const code = "joinCode" in gym ? (gym as { joinCode: string }).joinCode : "";
                const color = "primaryColor" in gym ? (gym as { primaryColor: string }).primaryColor : "#CAFF33";
                const distance = "distanceLabel" in gym ? (gym as { distanceLabel: string }).distanceLabel : "";
                return (
                  <div
                    key={"id" in gym ? (gym as { id: string }).id : name}
                    className="flex items-center gap-3 bg-[rgba(245,239,224,.03)] border border-[var(--border-color)] rounded-lg p-3 px-[14px] transition-all duration-200 hover:bg-[rgba(245,239,224,.06)] hover:border-[rgba(202,255,51,.2)]"
                  >
                    <div className="w-1 h-10 rounded-sm shrink-0" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-[15px] uppercase tracking-[.03em]">{name}</div>
                      <div className="text-[11px] text-muted-color mt-[1px]">
                        {loc || hood || ""}
                      </div>
                      {code && (
                        <div className="text-[11px] text-lime font-heading font-bold tracking-[.15em] mt-0.5">
                          Join code: {code}
                        </div>
                      )}
                    </div>
                    {distance && (
                      <div className="font-heading font-bold text-[14px] text-lime tracking-[.02em] shrink-0">{distance}</div>
                    )}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <AppleIcon />
                      <AndroidIcon />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
    >
      <title>Download on iOS</title>
      <path d="M10.5 7.5c-.05-1.02.47-1.8 1.42-2.37-.54-.76-1.36-1.2-2.32-1.24-.98-.04-2.1.57-2.63.57-.55 0-1.45-.55-2.4-.53C3.37 3.97 1.97 4.77 1.2 6.2c-.97 1.66-.25 4.1.7 5.44.47.65 1.02 1.39 1.73 1.36.7-.03.96-.45 1.8-.45.83 0 1.07.45 1.8.44.75-.01 1.22-.67 1.67-1.33.53-.76.75-1.5.76-1.54-.02-.01-1.46-.57-1.47-2.23zM8.9 2.9c.64-.75 1.2-1.8 1.07-2.85-1.03.04-2.28.68-3 1.53-.68.77-1.26 1.85-1.1 2.94 1.14.08 2.33-.56 3.04-1.62z" fill="currentColor" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
    >
      <title>Download on Android</title>
      <path d="M9.34 5.52h.78v1.59h-.78zM3.88 5.52h.78v1.59h-.78zM9.56 8.76l.68-1.18c.05-.09.03-.2-.06-.24-.1-.05-.2-.02-.25.07l-.68 1.2c-.67-.3-1.45-.48-2.25-.48-.8 0-1.58.17-2.25.48l-.68-1.2c-.06-.09-.16-.12-.25-.07-.1.05-.12.15-.06.24l.68 1.18c-.72.38-1.22.98-1.34 1.69h8.4c-.12-.71-.62-1.3-1.34-1.69zM7 9.33c-.22 0-.4-.18-.4-.4s.18-.4.4-.4.4.18.4.4-.18.4-.4.4zm1.38 0c-.22 0-.4-.18-.4-.4s.18-.4.4-.4.4.18.4.4-.18.4-.4.4zM11.62 7c-.55 0-1 .45-1 1v1.5c0 .56.45 1 1 1s1-.44 1-1V8c0-.55-.45-1-1-1zm-9.24 0c-.56 0-1 .45-1 1v1.5c0 .56.44 1 1 1 .55 0 1-.44 1-1V8c0-.55-.45-1-1-1zM7.46 2.37l.47-.47c.08-.08.08-.2 0-.28-.07-.08-.2-.08-.27 0l-.52.53C6.5 2.06 5.77 2 5 2s-1.5.05-2.14.15l-.52-.53c-.08-.08-.2-.08-.28 0-.07.08-.07.2 0 .28l.47.47C1.08 3.09.06 4.21 0 5.5h10c-.06-1.3-1.08-2.4-2.54-3.13zM5 3.6c-.2 0-.36-.17-.36-.36s.16-.37.36-.37.36.17.36.37c0 .19-.16.36-.36.36z" fill="currentColor" />
    </svg>
  );
}
