import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { domains, getDomainBySlug } from "@/lib/domains";
import { DomainCard } from "@/components/public/experts/DomainCard";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";

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
  { number: "01", title: "Submit your brief", description: "Describe the role, required expertise, and timeline.", annotation: "brief_received" },
  { number: "02", title: "The pipeline runs", description: "Our ATS screens the domain network and our AI interviewer scores every candidate against your brief.", annotation: "shortlist_ready · 48h" },
  { number: "03", title: "You make the call", description: "Interview the finalists and engage directly — no agency bloat.", annotation: "offer_sent" },
];

export default async function DomainPage(props: PageProps<"/experts/[domain]">) {
  const { domain } = await props.params;
  const d = getDomainBySlug(domain);
  if (!d) notFound();

  const related = domains.filter((r) => d.relatedSlugs.includes(r.slug));

  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title={d.name}
        lede={d.longDescription}
        backHref="/experts"
        backLabel="All domains"
      />

      {/* Specializations — machine chips */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue">Specializations</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <div className="flex flex-wrap gap-2.5">
              {d.specializations.map((spec) => (
                <span
                  key={spec}
                  className="machine text-ink border border-hairline px-3.5 py-2"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process — editorial numbered rows */}
      <section className="bg-bone px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Process</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="display text-ink text-3xl md:text-5xl mb-12 md:mb-16">
              How to hire a {d.name.toLowerCase()} <em>expert.</em>
            </h2>
            <ol>
              {hiringSteps.map((step, i) => (
                <li
                  key={step.number}
                  className={
                    i === hiringSteps.length - 1
                      ? "py-8 md:py-10"
                      : "py-8 md:py-10 border-b border-hairline"
                  }
                >
                  <div className="flex items-baseline gap-5 mb-3">
                    <span className="machine text-muted">{step.number}</span>
                    <h3 className="display text-ink text-2xl md:text-3xl">{step.title}</h3>
                  </div>
                  <div className="sm:pl-12 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-3">
                    <p className="text-sm md:text-base text-muted leading-relaxed max-w-md">
                      {step.description}
                    </p>
                    <span className="machine text-blue shrink-0">{step.annotation}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Related domains */}
      {related.length > 0 && (
        <section className="bg-paper px-6 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <p className="eyebrow text-blue mb-12">Related domains</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl">
              {related.map((r, i) => (
                <DomainCard
                  key={r.slug}
                  slug={r.slug}
                  name={r.name}
                  icon={r.icon}
                  description={r.description}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        heading={`Hire a ${d.name.toLowerCase()} expert.`}
        subtext="Submit your brief and receive a ranked shortlist within 48 hours."
        buttonLabel="Start hiring"
        href="/contact"
      />
    </>
  );
}
