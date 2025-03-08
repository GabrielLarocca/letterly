import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { PricingPlans } from "@/components/PricingPlans";

export default function Index() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <PricingPlans onSelectPlan={handleSelectPlan} selectedPlan={selectedPlan} />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}