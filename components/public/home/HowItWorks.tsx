"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

type Step = { number: string; title: string; description: string };

const companySteps: Step[] = [
  { number: "01", title: "Submit Your Brief", description: "Tell us what you need — domain, scope, seniority level, and timeline. Takes under 5 minutes." },
  { number: "02", title: "Get Matched", description: "We surface pre-vetted experts whose depth matches your exact requirements, typically within 48 hours." },
  { number: "03", title: "Engage Directly", description: "Connect with your expert, agree on terms, and start work. No middlemen, no bloated agency fees." },
];

const expertSteps: Step[] = [
  { number: "01", title: "Apply in Minutes", description: "Submit your domain, credentials, and experience. We keep the process short and your time respected." },
  { number: "02", title: "Pass Vetting", description: "Our expert review process is rigorous but fair — we assess depth, not just years of experience." },
  { number: "03", title: "Get Matched with Companies", description: "Once approved, you'll be matched with companies looking for exactly your expertise. Flexible, remote-first work." },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex gap-6 py-8 border-b border-[#E8E8E8] last:border-0">
      <span className="text-4xl font-bold text-[#E8E8E8] tabular-nums leading-none shrink-0 select-none">
        {step.number}
      </span>
      <div className="pt-1">
        <h3 className="text-lg font-semibold text-[#111111] mb-2">{step.title}</h3>
        <p className="text-[#555555] text-sm leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [tab, setTab] = useState<"companies" | "experts">("companies");
  const steps = tab === "companies" ? companySteps : expertSteps;

  return (
    <SectionWrapper surface>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Process
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-[#555555] max-w-xl mx-auto mb-8">
          A simple, fast process designed to respect your time.
        </p>

        <div className="inline-flex items-center rounded-lg border border-[#E8E8E8] bg-white p-1">
          <button
            onClick={() => setTab("companies")}
            className={cn(
              "px-5 py-2 rounded-md text-sm font-medium transition-all",
              tab === "companies"
                ? "bg-accent text-white shadow-sm"
                : "text-[#555555] hover:text-[#111111]"
            )}
          >
            For Companies
          </button>
          <button
            onClick={() => setTab("experts")}
            className={cn(
              "px-5 py-2 rounded-md text-sm font-medium transition-all",
              tab === "experts"
                ? "bg-accent text-white shadow-sm"
                : "text-[#555555] hover:text-[#111111]"
            )}
          >
            For Experts
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {steps.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>
    </SectionWrapper>
  );
}
