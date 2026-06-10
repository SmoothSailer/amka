"use client";

import { useState, useCallback } from "react";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Ticker } from "@/components/landing/ticker";
import { HowItWorks } from "@/components/landing/how-it-works";
import { JoinCodeSpotlight } from "@/components/landing/join-code-spotlight";
import { NearbyGyms } from "@/components/landing/nearby-gyms";
import { GymTransfers } from "@/components/landing/gym-transfers";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { Pricing } from "@/components/landing/pricing";
import { Configurator } from "@/components/landing/configurator";
import { CheckoutModal } from "@/components/landing/checkout-modal";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { Footer } from "@/components/landing/footer";
import { CustomCursor } from "@/components/landing/custom-cursor";
import { generateJoinCode, generateSlug } from "@/lib/configurator-utils";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [selectedPrice, setSelectedPrice] = useState("1500");
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashGymName, setDashGymName] = useState("PowerZone Nairobi");
  const [dashCode, setDashCode] = useState("PWR001");
  const [dashSlug, setDashSlug] = useState("powerzone-nairobi");

  const handleOpenModal = useCallback((plan: string, price: string) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setModalOpen(true);
  }, []);

  const handleBuildComplete = useCallback(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>('#configure input[type="text"]');
    const name = inputs[0]?.value || "PowerZone Nairobi";
    setDashGymName(name);
    setDashCode(generateJoinCode(name));
    setDashSlug(generateSlug(name));
    setModalOpen(false);
    setShowDashboard(true);
    setTimeout(() => {
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <Ticker />
      <HowItWorks />
      <JoinCodeSpotlight />
      <NearbyGyms />
      <GymTransfers />
      <FeaturesGrid />
      <Pricing />
      <Configurator onOpenModal={handleOpenModal} />
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        price={selectedPrice}
        gymName={dashGymName}
        onComplete={handleBuildComplete}
      />
      {showDashboard && (
        <div id="dashboard">
          <DashboardPreview gymName={dashGymName} joinCode={dashCode} slug={dashSlug} />
        </div>
      )}
      <Footer />
    </>
  );
}
