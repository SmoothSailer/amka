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
import { Footer } from "@/components/landing/footer";
import { CustomCursor } from "@/components/landing/custom-cursor";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [selectedPrice, setSelectedPrice] = useState("1500");
  const [gymName, setGymName] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [gymPrimaryColor, setGymPrimaryColor] = useState("#CAFF33");
  const [gymSecondaryColor, setGymSecondaryColor] = useState("#0D0C0A");

  const handleOpenModal = useCallback(
    (
      plan: string,
      price: string,
      name: string,
      options: { location: string; primaryColor: string; secondaryColor: string }
    ) => {
      setSelectedPlan(plan);
      setSelectedPrice(price);
      setGymName(name);
      setGymLocation(options.location);
      setGymPrimaryColor(options.primaryColor);
      setGymSecondaryColor(options.secondaryColor);
      setModalOpen(true);
    },
    []
  );

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
        gymName={gymName || "Your Gym"}
        gymLocation={gymLocation}
        primaryColor={gymPrimaryColor}
        secondaryColor={gymSecondaryColor}
      />
      <Footer />
    </>
  );
}
