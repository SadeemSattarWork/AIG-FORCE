import { domains } from "@/lib/domains";
import { DomainCard } from "@/components/public/experts/DomainCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export function DomainOverview() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Our Domains
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">
          Deep Expertise Across Critical Domains
        </h2>
        <p className="text-[#555555] max-w-xl mx-auto">
          We don&apos;t do generalists. Every expert in our network holds deep, verifiable mastery in their field.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {domains.map((domain, i) => (
          <DomainCard
            key={domain.slug}
            slug={domain.slug}
            name={domain.name}
            icon={domain.icon}
            description={domain.description}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
