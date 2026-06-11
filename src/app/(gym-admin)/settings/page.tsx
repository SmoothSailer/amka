"use client";

import { useTenant } from "@/hooks/use-gym-admin";
import { getGymDataClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const gymData = getGymDataClient();
  const { data: gym, isLoading } = useTenant(gymData?.id ?? "");

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (gym) {
      navigator.clipboard.writeText(gym.joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading || !gym) return <div className="text-cream">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-black text-4xl text-cream uppercase">Settings</h1>
        <p className="text-muted-foreground mt-2">Gym configuration and preferences</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 space-y-6">
        <div>
          <Label className="text-cream text-sm uppercase tracking-wider">Join Code</Label>
          <div className="flex gap-3 mt-2">
            <Input
              type="text"
              value={gym.joinCode}
              readOnly
              className="flex-1 bg-background border-border font-heading font-black text-2xl tracking-widest text-center"
            />
            <Button onClick={handleCopy} variant="outline" className="border-border text-cream hover:bg-card/80">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" className="border-border text-cream hover:bg-card/80">
              <RefreshCw className="w-4 h-4 mr-2" />
              Rotate
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Share this code with members to join your gym
          </p>
        </div>

        <div>
          <Label className="text-cream text-sm uppercase tracking-wider">Gym Slug</Label>
          <Input
            type="text"
            value={gym.slug}
            readOnly
            className="mt-2 bg-background border-border"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Your gym&apos;s unique URL: amka.app/{gym.slug}
          </p>
        </div>

        <div>
          <Label className="text-cream text-sm uppercase tracking-wider">Notification Preferences</Label>
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
              <span className="text-cream">New member joins</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
              <span className="text-cream">Member transfers</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border" />
              <span className="text-cream">Payment received</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-cream">Weekly summary email</span>
            </label>
          </div>
        </div>

        <div>
          <Label className="text-cream text-sm uppercase tracking-wider">Operating Hours</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-muted-foreground text-xs">Opens</Label>
              <Input type="time" defaultValue="06:00" className="mt-1 bg-background border-border" />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Closes</Label>
              <Input type="time" defaultValue="22:00" className="mt-1 bg-background border-border" />
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary text-ink hover:bg-primary/90 font-heading font-bold uppercase tracking-wider">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
