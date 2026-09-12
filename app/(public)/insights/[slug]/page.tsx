import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insights, getInsightBySlug } from "@/lib/insights";
import { InsightCover } from "@/components/public/insights/InsightCover";
import { CTABanner } from "@/components/shared/CTABanner";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return { title: insight.title, description: insight.excerpt };
}

const anchor = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const index = insights.findIndex((i) => i.slug === slug);
  const more = insights.filter((i) => i.slug !== slug).slice(0, 2);
  const headings = insight.sections.filter((s) => s.heading);

  return (
    <>
      {/* Hero */}
      <section className="bg-bone px-6 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/insights"
            className="machine text-muted hover:text-blue transition-colors inline-block mb-10"
          >
            ← All insights
          </Link>
          <p className="eyebrow text-blue mb-8">{insight.tag}</p>
          <h1 className="display text-ink text-4xl md:text-6xl lg:text-7xl max-w-4xl mb-8">
            {insight.title}
          </h1>
          <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            {insight.excerpt}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10">
            <span className="machine text-muted">{insight.date}</span>
            <span className="machine text-muted">{insight.readTime} read</span>
            <span className="machine text-muted">By the AIG Force team</span>
          </div>
        </div>
      </section>

      {/* Body — sticky cover + contents on the left, prose on the right */}
      <section className="bg-paper px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32">
              <InsightCover insight={insight} index={index} />
              {headings.length > 0 && (
                <nav aria-label="In this piece" className="hidden md:block mt-8">
                  <p className="eyebrow text-muted mb-4">In this piece</p>
                  <ol className="space-y-2.5">
                    {headings.map((s) => (
                      <li key={s.heading}>
                        <a
                          href={`#${anchor(s.heading!)}`}
                          className="text-sm text-muted hover:text-blue transition-colors leading-snug block"
                        >
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
          </aside>

          <article className="md:col-span-8 lg:col-span-7">
            {insight.sections.map((section, si) => (
              <div
                key={section.heading ?? `intro-${si}`}
                id={section.heading ? anchor(section.heading) : undefined}
                className="scroll-mt-28"
              >
                {section.heading && (
                  <h2 className="display text-ink text-2xl md:text-3xl mt-14 mb-5">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, pi) => (
                  <p
                    key={pi}
                    className={
                      si === 0 && pi === 0
                        ? "text-lg md:text-xl font-semibold text-ink leading-relaxed mb-6"
                        : "text-base md:text-lg text-muted leading-relaxed mb-6"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* More reading */}
      <section className="bg-bone px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-8 border-b border-hairline pb-8 mb-14">
            <p className="eyebrow text-blue">More insights</p>
            <Link href="/insights" className="arrow-link text-ink hover:text-blue transition-colors">
              All insights <span className="arrow">↗</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14 max-w-4xl">
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="group block">
                <InsightCover insight={m} index={insights.indexOf(m)} />
                <span className="machine text-muted block mt-5 mb-3">{m.date}</span>
                <h3 className="display text-ink text-xl md:text-2xl group-hover:text-blue transition-colors mb-4">
                  {m.title}
                </h3>
                <span className="arrow-link text-blue">
                  Read more <span className="arrow">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Hiring for depth?"
        subtext="Submit a brief and receive a ranked shortlist within 48 hours."
        buttonLabel="Start hiring"
        href="/contact"
        secondaryLabel="Join our expert network"
        secondaryHref="/for-experts/roles"
      />
    </>
  );
}
