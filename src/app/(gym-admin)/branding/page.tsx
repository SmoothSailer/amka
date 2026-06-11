"use client";

import { useState } from "react";
import { useTenant } from "@/hooks/use-gym-admin";
import { getGymDataClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BrandingPage() {
  const gymData = getGymDataClient();
  const { data: gym, isLoading } = useTenant(gymData?.id ?? "");

  const [primaryColor, setPrimaryColor] = useState(gym?.primaryColor || "#CAFF33");
  const [secondaryColor, setSecondaryColor] = useState(gym?.secondaryColor || "#0D0C0A");
  const [description, setDescription] = useState(gym?.description || "");

  if (isLoading || !gym) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Branding</h1>
        <p className="text-muted-foreground mt-2">Customize your gym&apos;s look and feel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-xl p-8 space-y-6">
          <div>
            <Label className="text-cream text-sm uppercase tracking-wider">Primary Color</Label>
            <div className="flex gap-3 mt-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-12 rounded-lg cursor-pointer border border-border"
              />
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 bg-background border-border"
              />
            </div>
          </div>

          <div>
            <Label className="text-cream text-sm uppercase tracking-wider">Secondary Color</Label>
            <div className="flex gap-3 mt-2">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-16 h-12 rounded-lg cursor-pointer border border-border"
              />
              <Input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1 bg-background border-border"
              />
            </div>
          </div>

          <div>
            <Label className="text-cream text-sm uppercase tracking-wider">Gym Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 bg-background border-border min-h-[120px]"
            />
          </div>

          <div>
            <Label className="text-cream text-sm uppercase tracking-wider">Logo</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <Button className="w-full bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
            Save Changes
          </Button>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <h3 className="font-heading font-bold text-lg text-cream mb-6">Live Preview</h3>
          <div className="w-[220px] h-[450px] mx-auto bg-[#111] rounded-[36px] border-[6px] border-[#2a2826] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[68px] h-[20px] bg-[#111] rounded-b-xl z-10" />
            <div className="w-full h-full overflow-hidden">
              <div className="px-[14px] pt-[30px] pb-[10px] flex items-center gap-[7px]" style={{ background: secondaryColor }}>
                <div
                  className="w-[28px] h-[28px] rounded-lg flex items-center justify-center font-heading font-black text-[14px]"
                  style={{ background: primaryColor, color: secondaryColor }}
                >
                  {gym.gymName.charAt(0)}
                </div>
                <div className="font-heading font-bold text-[14px] tracking-[.04em] uppercase text-cream">
                  {gym.gymName.split(" ")[0]}
                </div>
              </div>
              <div className="mx-3 my-2 rounded-xl p-[14px]" style={{ background: primaryColor, color: secondaryColor }}>
                <div className="text-[9px] font-semibold opacity-60 uppercase">Good morning</div>
                <div className="font-heading font-extrabold text-[18px] uppercase">Chest & Triceps</div>
              </div>
              <div className="flex gap-[6px] mx-3 mt-[6px]">
                <div className="flex-1 rounded-lg p-2 text-center" style={{ background: `${primaryColor}22` }}>
                  <div className="font-heading text-[16px] font-extrabold" style={{ color: primaryColor }}>12</div>
                  <div className="text-[8px] text-muted-foreground uppercase">Sessions</div>
                </div>
                <div className="flex-1 bg-[rgba(245,239,224,.06)] rounded-lg p-2 text-center">
                  <div className="font-heading text-[16px] font-extrabold text-cream">3</div>
                  <div className="text-[8px] text-muted-foreground uppercase">Streak</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="font-heading font-bold text-cream">{gym.gymName.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground">amka.app/{gym.slug}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
