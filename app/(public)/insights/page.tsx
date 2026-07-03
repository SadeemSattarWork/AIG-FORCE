import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on AI interviews, evidence-based screening, and hiring specialists across 60+ countries, from the team behind AIG Force.",
};

export default function InsightsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-bone px-6 pt-40 pb-20 md:pt-48 md:pb-28 mt-0">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow text-blue mb-8">Insights</p>
          <h1 className="display text-ink text-5xl md:text-6xl lg:text-7xl max-w-3xl">
            Notes from the <em>front line</em> of hiring.
          </h1>
        </div>
      </section>

      {/* Article list — editorial rows */}
      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <ul>
            {insights.map((insight, i) => (
              <li
                key={insight.slug}
                id={insight.slug}
                className={
                  i === insights.length - 1
                    ? "py-12 md:py-16"
                    : "py-12 md:py-16 border-b border-hairline"
                }
              >
                <article className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3">
                    <span className="machine text-muted">{insight.date}</span>
                    <span className="machine text-blue">
                      {insight.tag.toLowerCase()}
                    </span>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="display text-ink text-3xl md:text-4xl mb-5 max-w-2xl">
                      {insight.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl mb-6">
                      {insight.excerpt}
                    </p>
                    <p className="machine text-muted">Coming soon</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="border-t border-hairline pt-12 mt-4">
            <p className="text-sm text-muted mb-6 max-w-md">
              Want these in your inbox when they publish? Say hello and
              we&apos;ll add you to the list.
            </p>
            <Link href="/contact" className="arrow-link text-blue">
              Get in touch <span className="arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
