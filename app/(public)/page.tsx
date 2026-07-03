import type { Metadata } from "next";
import { HeroSection } from "@/components/public/home/HeroSection";
import { EditorialIntro } from "@/components/public/home/EditorialIntro";
import { Pipeline } from "@/components/public/home/Pipeline";
import { ExpertiseAccordion } from "@/components/public/home/ExpertiseAccordion";
import { SolutionsPanel } from "@/components/public/home/SolutionsPanel";
import { Testimonials } from "@/components/public/home/Testimonials";
import { InsightsGrid } from "@/components/public/home/InsightsGrid";
import { PreFooterCTA } from "@/components/public/home/PreFooterCTA";

export const metadata: Metadata = {
  title: { absolute: "AIG Force | Intelligent Hiring for a Changing Workforce" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EditorialIntro />
      <Pipeline />
      <ExpertiseAccordion />
      <SolutionsPanel />
      <Testimonials />
      <InsightsGrid />
      <PreFooterCTA />
    </>
  );
}
