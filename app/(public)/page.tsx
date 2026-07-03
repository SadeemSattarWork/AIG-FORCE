import type { Metadata } from "next";
import { HeroSection } from "@/components/public/home/HeroSection";

export const metadata: Metadata = {
  title: { absolute: "AIG Force" },
};
import { StatsSection } from "@/components/public/home/StatsSection";
import { DomainOverview } from "@/components/public/home/DomainOverview";
import { HowItWorks } from "@/components/public/home/HowItWorks";
import { CTABanner } from "@/components/shared/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection
        heading="Hire the World's Top Domain Experts"
        sub="AIG Force connects companies with rigorously vetted specialists in Biology, Software Engineering, Legal, Medical, and Finance — faster than any traditional recruiter."
        primaryCTA={{ label: "Hire Experts", href: "/for-companies" }}
        secondaryCTA={{ label: "Join as Expert", href: "/for-experts" }}
      />
      <StatsSection />
      <DomainOverview />
      <HowItWorks />
      <CTABanner
        heading="Ready to hire the best?"
        subtext="Tell us what you need. We'll match you with the right expert within 48 hours."
        buttonLabel="Hire Experts"
        href="/contact"
        secondaryLabel="Join as Expert"
        secondaryHref="/for-experts"
      />
    </>
  );
}
