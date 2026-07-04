import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@/lib/domains";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Join as a Domain Expert",
  description:
    "Apply to join AIG Force's expert network. Work on high-value projects with leading companies, remotely, flexibly, and on your terms.",
};

const steps = [
  { number: "01", title: "Apply in minutes", description: "Tell us your domain, credentials, and the work you want. The application is short and respectful of your time." },
  { number: "02", title: "Interview once, fairly", description: "Our AI interviewer assesses your depth on the same rubric as everyone else, in any timezone, with no scheduling ping-pong and no first-impression bias." },
  { number: "03", title: "Get matched", description: "Once approved, you're matched with companies looking for exactly your expertise. You choose what to pursue." },
];

const benefits = [
  { title: "Flexible engagements", description: "Project-based, part-time, or full-time. Work in whatever format suits your career." },
  { title: "Remote-first", description: "Every placement is remote by default. Work from anywhere, with companies across 60+ countries." },
  { title: "High-value work", description: "AIG Force clients are serious companies hiring for meaningful roles. No low-effort gigs." },
  { title: "Vetted companies", description: "We screen companies as rigorously as we screen experts. You'll only be matched with organizations that meet our standards." },
];

export default function ForExpertsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Experts"
        title={
          <>
            Your depth, <em>seen.</em>
          </>
        }
        lede="We match elite domain experts with companies that need real depth. One structured interview puts your work in front of organizations you'd never find alone."
      />

      {/* Primary CTA — straight to the open roles board */}
      <section className="bg-bone px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <Link href="/for-experts/roles" className="arrow-link text-blue text-base">
            View open opportunities <span className="arrow">↗</span>
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Process</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <ol>
              {steps.map((step, i) => (
                <li
                  key={step.number}
                  className={
                    i === steps.length - 1
                      ? "py-8 md:py-10"
                      : "py-8 md:py-10 border-b border-hairline"
                  }
                >
                  <div className="flex items-baseline gap-5 mb-3">
                    <span className="machine text-muted">{step.number}</span>
                    <h3 className="display text-ink text-2xl md:text-3xl">{step.title}</h3>
                  </div>
                  <div className="sm:pl-12">
                    <p className="text-sm md:text-base text-muted leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Open domains */}
      <section className="bg-bone px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Domains</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="display text-ink text-3xl md:text-5xl mb-12">
              Open <em>domains.</em>
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

      {/* Benefits */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">What you get</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
              {benefits.map((b) => (
                <div key={b.title} className="border-t border-ink/80 pt-6">
                  <h3 className="display text-ink text-xl md:text-2xl mb-3">{b.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to join the network?"
        subtext="Browse open opportunities and apply to the roles that match your expertise."
        buttonLabel="View open roles"
        href="/for-experts/roles"
      />
    </>
  );
}
