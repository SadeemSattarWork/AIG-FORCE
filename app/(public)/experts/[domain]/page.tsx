import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Dna, Code2, Scale, Stethoscope, TrendingUp } from "lucide-react";
import { domains, getDomainBySlug } from "@/lib/domains";
import { DomainCard } from "@/components/public/experts/DomainCard";
import { CTABanner } from "@/components/shared/CTABanner";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Dna, Code2, Scale, Stethoscope, TrendingUp,
};

export function generateStaticParams() {
  return domains.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata(props: PageProps<"/experts/[domain]">): Promise<Metadata> {
  const { domain } = await props.params;
  const d = getDomainBySlug(domain);
  if (!d) return {};
  return {
    title: `${d.name} Experts`,
    description: `Hire elite ${d.name} experts through AIG Force. ${d.description}`,
  };
}

const hiringSteps = [
  { number: "01", title: "Submit Your Brief", description: "Describe the role, required expertise, and timeline." },
  { number: "02", title: "Expert Matching", description: "We surface pre-vetted candidates from our domain network within 48 hours." },
  { number: "03", title: "Engage Directly", description: "Connect with your chosen expert and start work — no agency bloat." },
];

export default async function DomainPage(props: PageProps<"/experts/[domain]">) {
  const { domain } = await props.params;
  const d = getDomainBySlug(domain);
  if (!d) notFound();

  const Icon = iconMap[d.icon] ?? Dna;
  const related = domains.filter((r) => d.relatedSlugs.includes(r.slug));

  return (
    <>
      <section className="bg-white px-6 pt-40 pb-16 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <Link href="/experts" className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-accent transition-colors mb-8">
            ← All Domains
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-accent/10">
              <Icon size={28} className="text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-5">{d.name} Experts</h1>
          <p className="text-[#555555] text-lg max-w-2xl leading-relaxed">{d.longDescription}</p>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-16 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">Specializations</p>
          <div className="flex flex-wrap gap-3">
            {d.specializations.map((spec) => (
              <span key={spec} className="text-sm text-accent bg-accent/10 rounded-full px-4 py-1.5 font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Process</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-10">
            How to Hire a {d.name} Expert
          </h2>
          <div className="flex flex-col gap-0 max-w-2xl">
            {hiringSteps.map((step) => (
              <div key={step.number} className="flex gap-6 py-8 border-b border-[#E8E8E8] last:border-0">
                <span className="text-4xl font-bold text-[#E8E8E8] shrink-0 tabular-nums leading-none">{step.number}</span>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-[#111111] mb-1">{step.title}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#F5F5F5] px-6 py-16 border-b border-[#E8E8E8]">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Related</p>
            <h2 className="text-xl font-semibold text-[#111111] mb-6">Related Domains</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r, i) => (
                <DomainCard key={r.slug} slug={r.slug} name={r.name} icon={r.icon} description={r.description} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        heading={`Hire a ${d.name} Expert`}
        subtext="Submit your brief and get matched within 48 hours."
        buttonLabel={`Hire a ${d.name} Expert`}
        href="/contact"
      />
    </>
  );
}
