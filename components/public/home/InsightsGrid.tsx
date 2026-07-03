"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { insights } from "@/lib/insights";
import { InsightCover } from "@/components/public/insights/InsightCover";

export function InsightsGrid() {
  const reduce = useReducedMotion();
  const [feature, ...rest] = insights.slice(0, 3);

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  return (
    <section className="bg-paper px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">
        <motion.div
          {...rise}
          className="flex items-center justify-between gap-8 border-b border-hairline pb-8 mb-16"
        >
          <p className="eyebrow text-blue">Insights</p>
          <Link href="/insights" className="arrow-link text-ink hover:text-blue transition-colors">
            Discover more <span className="arrow">↗</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">

          {/* Feature article */}
          <motion.article {...rise} className="lg:col-span-7">
            <Link href="/insights" className="group block">
              <InsightCover insight={feature} index={0} large />
              <div className="flex items-center justify-between mt-5 mb-6">
                <span className="machine text-muted">{feature.date}</span>
                <span className="arrow-link text-blue">
                  Read more <span className="arrow">↗</span>
                </span>
              </div>
              <h3 className="display text-ink text-3xl md:text-4xl max-w-lg mb-5 group-hover:text-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-xl border-b border-hairline pb-8">
                {feature.excerpt}
              </p>
            </Link>
          </motion.article>

          <div className="hidden lg:block lg:col-span-1" />

          {/* Secondary articles */}
          <div className="lg:col-span-4 flex flex-col gap-14">
            {rest.map((insight, i) => (
              <motion.article key={insight.slug} {...rise}>
                <Link href="/insights" className="group block">
                  <InsightCover insight={insight} index={i + 1} />
                  <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 mt-5 items-start">
                    <h3 className="display text-ink text-xl md:text-2xl group-hover:text-blue transition-colors">
                      {insight.title}
                    </h3>
                    <span className="machine text-muted pt-1.5">{insight.date}</span>
                    <span />
                    <span className="arrow-link text-blue justify-self-end">
                      Read more <span className="arrow">↗</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
