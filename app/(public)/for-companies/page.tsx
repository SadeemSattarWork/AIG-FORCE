import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@/lib/domains";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { StageSections } from "@/components/public/companies/StageSections";

export const metadata: Metadata = {
  title: "Hire Elite Domain Experts",
  description:
    "AIG Force connects companies with rigorously vetted specialists across Biology, Software Engineering, Legal, Medical, and Finance. Get matched within 48 hours.",
};

const valuePoints = [
  { title: "Rigorous vetting", description: "Every expert passes a multi-stage assessment of domain knowledge, prior work, and references before joining the network." },
  { title: "48-hour matching", description: "The pipeline never sleeps. Most clients receive their ranked shortlist within two business days of submitting a brief." },
  { title: "Evidence, not vibes", description: "AI interview scorecards give your hiring committee comparable, structured data on every candidate, with identical criteria and zero first-impression bias." },
  { title: "Direct engagement", description: "You talk directly to your expert, with no account managers as intermediaries. Faster feedback, faster delivery." },
];

export default function ForCompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Companies"
        title={
          <>
            Hire elite experts, at <em>machine</em> speed.
          </>
        }
        lede="Stop settling for generalists. AIG Force runs your entire hiring pipeline, from screening to AI interviews to scorecards, and hands you a ranked shortlist of proven specialists."
      />

      {/* Process: one section per stage */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow text-blue mb-16 md:mb-24">Process</p>
          <StageSections />
        </div>
      </section>

      {/* Domains — hairline rows */}
      <section className="bg-bone px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Domains</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="display text-ink text-3xl md:text-5xl mb-12">
              Domains you can hire from.
            </h2>
            <ul>
              {domains.map((d) => (
                <li key={d.slug} className="border-b border-hairline last:border-0">
                  <Link
                    href={`/experts/${d.slug}`}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span className="display text-ink text-2xl md:text-3xl group-hover:text-blue transition-colors">
                      {d.name}
                    </span>
                    <span className="arrow-link text-blue">
                      <span className="arrow">↗</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why AIG Force */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Why us</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
              {valuePoints.map((vp) => (
                <div key={vp.title} className="border-t border-ink/80 pt-6">
                  <h3 className="display text-ink text-xl md:text-2xl mb-3">{vp.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{vp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to find your expert?"
        subtext="Submit a brief and get a ranked shortlist within 48 hours."
        buttonLabel="Start hiring"
        href="/contact"
        secondaryLabel="See the pipeline"
        secondaryHref="/#pipeline"
      />
    </>
  );
}
