import type { Metadata } from "next";
import { domains } from "@/lib/domains";
import { DomainCard } from "@/components/public/experts/DomainCard";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Expert Domains",
  description:
    "Browse AIG Force's expert domains — Biology, Software Engineering, Legal, Medical, and Finance. Every expert is rigorously vetted before joining our network.",
};

export default function ExpertsPage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title={
          <>
            Five domains. <em>Verified</em> depth in each.
          </>
        }
        lede="We recruit only at the top of each field. Select a domain to see the specializations we cover and the experts we place."
      />

      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {domains.map((domain, i) => (
              <DomainCard
                key={domain.slug}
                slug={domain.slug}
                name={domain.name}
                icon={domain.icon}
                description={domain.description}
                index={i}
                large
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Need an expert in a specific domain?"
        subtext="Tell us your requirements. The pipeline does the rest."
        buttonLabel="Get in touch"
        href="/contact"
      />
    </>
  );
}
