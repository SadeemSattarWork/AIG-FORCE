import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AIG Force exists to fix broken expert hiring. Learn about our mission, values, and the team building the world's best domain expert network.",
};

const values = [
  { title: "Depth over breadth", description: "The world's hardest problems get solved by people with genuine mastery, not generalists with a broad CV. Every expert we place has proven depth in their domain." },
  { title: "Trust through rigor", description: "Our vetting is thorough because trust is earned, not assumed. Companies that hire through us know the calibre they're getting before the first meeting." },
  { title: "Direct and transparent", description: "No hidden fees. No agency middlemen. No confusing pricing. The relationship between a company and an expert should be direct and honest." },
  { title: "Remote by default", description: "The best experts are everywhere. We were built for distributed work from day one, connecting talent and opportunity across geographies." },
];


export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Mission"
        title={
          <>
            Expert hiring is broken. We&apos;re <em>fixing</em> it.
          </>
        }
      />

      {/* Story — editorial two-column */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Our Story</p>
          </div>
          <div className="md:col-span-6 space-y-6">
            <p className="text-lg md:text-xl font-semibold text-ink leading-relaxed">
              The best talent in any domain is rarely found through a job
              board. They&apos;re deep in their field, publishing, building,
              and advising, not updating a profile.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Traditional recruiters can&apos;t reach them, and even when they
              do, they lack the domain knowledge to evaluate what they&apos;re
              looking at. AIG Force was built to solve this. We maintain
              curated networks of verified domain experts across biology,
              software engineering, law, medicine, and finance, every person
              reviewed by people who understand their field deeply.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              When a company comes to us, we don&apos;t spray résumés. The
              pipeline screens, interviews, and scores; we find the right
              match, quickly, and connect you directly, without layers of
              account management or inflated agency fees standing between two
              people who need each other.
            </p>
          </div>
        </div>
      </section>

      {/* Values — hairline rows */}
      <section className="bg-bone px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Values</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <ul>
              {values.map((v, i) => (
                <li
                  key={v.title}
                  className={
                    i === values.length - 1
                      ? "py-8 md:py-10"
                      : "py-8 md:py-10 border-b border-hairline"
                  }
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                    <h3 className="display text-ink text-2xl md:text-3xl">{v.title}</h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Leadership</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="display text-ink text-3xl md:text-5xl mb-12">
              The person behind the <em>engine.</em>
            </h2>

            <figure className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-end">
              {/* Photo — drop the headshot at public/team/sadeem-sattar.jpg
                  and it fills this panel. Until then, a styled monogram shows.
                  Using a CSS background (not next/image) so a missing file
                  degrades gracefully instead of failing the build. */}
              <div className="sm:col-span-5">
                <div
                  className="relative aspect-[4/5] overflow-hidden border border-hairline flex items-center justify-center bg-cover bg-top"
                  style={{
                    backgroundImage:
                      "linear-gradient(160deg, rgba(244,244,239,0) 40%, rgba(24,1,171,0.08) 100%), url('/team/sadeem-sattar.jpg')",
                    backgroundColor: "#F4F4EF",
                  }}
                >
                  <span
                    className="display italic text-6xl text-blue/30 select-none"
                    aria-hidden="true"
                  >
                    SS
                  </span>
                </div>
              </div>

              <figcaption className="sm:col-span-7 pb-2">
                <p className="display text-ink text-3xl md:text-4xl mb-2">
                  Sadeem Sattar
                </p>
                <p className="text-blue text-sm font-semibold uppercase tracking-[0.12em] mb-6">
                  CEO &amp; Founder
                </p>
                <p className="text-sm md:text-base text-muted leading-relaxed max-w-md">
                  Sadeem founded AIG Force to fix expert hiring, pairing an
                  AI-native pipeline with human judgment so companies reach the
                  world&apos;s best specialists faster.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want to work with us?"
        subtext="Whether you're a company or an expert, we'd love to hear from you."
        buttonLabel="Get in touch"
        href="/contact"
        secondaryLabel="Join as an expert"
        secondaryHref="/for-experts"
      />
    </>
  );
}
