import type { Metadata } from "next";
import { domains } from "@/lib/domains";
import { DomainCard } from "@/components/public/experts/DomainCard";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Expert Domains",
  description:
    "Browse AIG Force's expert domains — Biology, Software Engineering, Legal, Medical, and Finance. Every expert is rigorously vetted before joining our network.",
};

export default function ExpertsPage() {
  return (
    <>
      <section className="bg-white px-6 pt-40 pb-16 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
            Our Domains
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-5 max-w-2xl">
            Our Expert Domains
          </h1>
          <p className="text-[#555555] text-lg max-w-2xl leading-relaxed">
            We recruit only at the top of each field. Select a domain below to learn about the
            experts we place and the specializations we cover.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        subtext="Tell us your requirements and we'll find the right match."
        buttonLabel="Get in Touch"
        href="/contact"
      />
    </>
  );
}
