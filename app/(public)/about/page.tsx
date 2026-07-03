import type { Metadata } from "next";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AIG Force exists to fix broken expert hiring. Learn about our mission, values, and the team building the world's best domain expert network.",
};

const values = [
  { title: "Depth Over Breadth", description: "We believe the world's hardest problems get solved by people with genuine mastery — not generalists with a broad CV. Every expert we place has proven depth in their domain." },
  { title: "Trust Through Rigor", description: "Our vetting is thorough because trust is earned, not assumed. Companies that hire through us know the calibre they're getting before the first meeting." },
  { title: "Direct and Transparent", description: "No hidden fees. No agency middlemen. No confusing pricing. We believe the relationship between a company and an expert should be direct and honest." },
  { title: "Remote by Default", description: "The best experts are everywhere. We were built for distributed work from day one — connecting talent and opportunity across geographies." },
];

const teamPlaceholders = [
  { name: "Founder", role: "CEO & Co-Founder" },
  { name: "Co-Founder", role: "CTO & Co-Founder" },
  { name: "Head of Vetting", role: "Expert Relations" },
  { name: "Head of Growth", role: "Business Development" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white px-6 pt-40 pb-24 border-b border-[#E8E8E8]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-6">Our Mission</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight leading-tight">
            Expert hiring is broken. We&apos;re fixing it.
          </h1>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-20 border-b border-[#E8E8E8]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-6">Our Story</h2>
          <div className="space-y-5 text-[#555555] leading-relaxed">
            <p>
              The best talent in any domain is rarely found through a job board. They&apos;re deep in their field — publishing, building, advising — not updating a LinkedIn profile. Traditional recruiters can&apos;t reach them, and even when they do, they lack the domain knowledge to evaluate what they&apos;re looking at.
            </p>
            <p>
              AIG Force was built to solve this. We maintain curated networks of verified domain experts across Biology, Software Engineering, Legal, Medical, and Finance. Every person in our network has been reviewed by people who understand their field deeply.
            </p>
            <p>
              When a company comes to us, we don&apos;t spray resumes. We find the right match, quickly, and connect them directly — without layers of account management or inflated agency fees standing between two people who need each other.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 border-b border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Values</p>
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl p-7">
                <h3 className="text-lg font-semibold text-[#111111] mb-3">{v.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Team</p>
          <h2 className="text-3xl font-bold text-[#111111] tracking-tight mb-12">The Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamPlaceholders.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-full aspect-square bg-[#E8E8E8] rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-3xl text-[#555555]">◉</span>
                </div>
                <p className="font-semibold text-[#111111] text-sm">{member.name}</p>
                <p className="text-[#555555] text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want to work with us?"
        subtext="Whether you're a company or an expert, we'd love to hear from you."
        buttonLabel="Get in Touch"
        href="/contact"
        secondaryLabel="Join as Expert"
        secondaryHref="/for-experts"
      />
    </>
  );
}
