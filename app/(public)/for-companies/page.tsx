import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { domains } from "@/lib/domains";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Hire Elite Domain Experts",
  description:
    "AIG Force connects companies with rigorously vetted specialists across Biology, Software Engineering, Legal, Medical, and Finance. Get matched within 48 hours.",
};

const steps = [
  { number: "01", title: "Submit Your Brief", description: "Tell us the domain, scope, seniority, and timeline. We keep the intake process fast — under 5 minutes." },
  { number: "02", title: "Get Matched", description: "Our team surfaces pre-vetted experts who match your requirements exactly. Expect candidates within 48 hours." },
  { number: "03", title: "Engage Directly", description: "Connect with your expert, agree on terms, and start work. No middlemen, no opaque agency fees." },
];

const valuePoints = [
  { title: "Rigorous Vetting", description: "Every expert passes a multi-stage assessment of domain knowledge, prior work, and references before joining our network." },
  { title: "48-Hour Matching", description: "We move fast. Most clients receive their first matched candidates within two business days of submitting a brief." },
  { title: "Remote-First", description: "Access talent anywhere in the world. Our platform is built for distributed, asynchronous collaboration." },
  { title: "Direct Communication", description: "You talk directly to your expert — no account managers as intermediaries. Faster feedback, faster delivery." },
];

export default function ForCompaniesPage() {
  return (
    <>
      <section className="bg-white px-6 pt-40 pb-20 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">For Companies</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight mb-6 max-w-3xl">
            Hire Elite Domain Experts, Fast
          </h1>
          <p className="text-[#555555] text-lg max-w-2xl leading-relaxed mb-8">
            Stop settling for generalists. AIG Force gives you access to specialists with proven depth across the domains that matter most.
          </p>
          <a href="/contact" className="inline-block px-7 py-3.5 rounded-md bg-accent text-white font-medium hover:bg-accent-hover transition-colors text-sm">
            Get Started →
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
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-4">Domains You Can Hire From</h2>
          <p className="text-[#555555] mb-10 max-w-xl">Deep expert networks across five critical verticals, with more in development.</p>
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
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Why Us</p>
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-12">Why AIG Force</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {valuePoints.map((vp) => (
              <div key={vp.title} className="border-l-2 border-accent/30 pl-6">
                <h3 className="text-lg font-semibold text-[#111111] mb-2">{vp.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{vp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Ready to find your expert?" subtext="Submit a brief and get matched within 48 hours." buttonLabel="Get Started" href="/contact" />
    </>
  );
}
