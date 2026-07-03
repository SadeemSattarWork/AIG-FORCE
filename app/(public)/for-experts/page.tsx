import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { domains } from "@/lib/domains";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Join as a Domain Expert",
  description:
    "Apply to join AIG Force's expert network. Work on high-value projects with leading companies — remotely, flexibly, and on your terms.",
};

const steps = [
  { number: "01", title: "Apply in Minutes", description: "Tell us your domain, credentials, and what kind of work you're looking for. The application is short and respectful of your time." },
  { number: "02", title: "Pass Vetting", description: "We assess depth — not just years on a CV. Our review covers domain knowledge, project history, and references." },
  { number: "03", title: "Get Matched", description: "Once approved, you'll receive matches with companies looking for exactly your expertise. You choose what to pursue." },
];

const benefits = [
  { title: "Flexible Engagements", description: "Project-based, part-time, or full-time — work in whatever format suits your career." },
  { title: "Remote-First", description: "Every placement is remote by default. Work from anywhere in the world with companies across 60+ countries." },
  { title: "High-Value Work", description: "AIG Force clients are serious companies hiring for meaningful roles. No low-effort gigs." },
  { title: "Vetted Companies", description: "We screen companies just as we screen experts. You'll only be matched with organizations that meet our standards." },
];

export default function ForExpertsPage() {
  return (
    <>
      <section className="bg-white px-6 pt-40 pb-20 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">For Experts</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight mb-6 max-w-3xl">
            Join AIG Force. Work on What Matters.
          </h1>
          <p className="text-[#555555] text-lg max-w-2xl leading-relaxed mb-8">
            We match elite domain experts with companies that need real depth. If you&apos;re among the best in your field, we want to work with you.
          </p>
          <a href="/contact" className="inline-block px-7 py-3.5 rounded-md bg-accent text-white font-medium hover:bg-accent-hover transition-colors text-sm">
            Apply Now →
          </a>
        </div>
      </section>

      <section className="bg-white px-6 py-20 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Process</p>
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="text-5xl font-bold text-[#E8E8E8] block mb-4 tabular-nums">{step.number}</span>
                <h3 className="text-lg font-semibold text-[#111111] mb-2">{step.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-20 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Domains</p>
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-4">Open Domains</h2>
          <p className="text-[#555555] mb-10 max-w-xl">We currently recruit specialists across these domains.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((d) => (
              <a key={d.slug} href={`/experts/${d.slug}`}
                className="group flex items-center gap-3 p-4 bg-white border border-[#E8E8E8] rounded-lg hover:border-accent/40 transition-colors"
              >
                <CheckCircle2 size={16} className="text-accent shrink-0" />
                <span className="text-[#111111] text-sm font-medium">{d.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Benefits</p>
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-12">What You Get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="border-l-2 border-accent/30 pl-6">
                <h3 className="text-lg font-semibold text-[#111111] mb-2">{b.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Ready to join our expert network?" subtext="Apply now and get matched with companies that value your expertise." buttonLabel="Apply Now" href="/contact" />
    </>
  );
}
