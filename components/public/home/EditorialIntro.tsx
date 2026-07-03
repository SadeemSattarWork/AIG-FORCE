"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { value: "2,500+", label: "Experts vetted" },
  { value: "180+", label: "Companies served" },
  { value: "60+", label: "Countries" },
  { value: "48h", label: "Average match time" },
];

export function EditorialIntro() {
  const reduce = useReducedMotion();

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
        <motion.h2
          {...rise}
          className="display text-ink text-4xl md:text-5xl lg:text-6xl max-w-xl mb-16 md:mb-24"
        >
          Machine-speed hiring.
          <br />
          Human-grade <em>judgment.</em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <motion.div {...rise} className="md:col-span-5">
            <p className="text-lg md:text-xl font-semibold text-ink leading-relaxed max-w-md">
              AIG Force runs your entire hiring pipeline, from résumé screening
              to structured AI interviews, and hands you a ranked shortlist of
              the world&apos;s best experts.
            </p>
          </motion.div>

          <div className="hidden md:block md:col-span-1" />

          <motion.div {...rise} className="md:col-span-6 space-y-6">
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Our network spans rigorously vetted specialists across biology,
              software engineering, law, medicine, and finance. Every profile
              is verified before it ever reaches your desk. Depth first, never
              volume.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Our AI interviewer conducts structured, role-specific interviews
              and scores every candidate against the same evidence-based
              rubric. No scheduling bottlenecks, no first-impression bias, no
              lost weeks. You make the final call, with better information.
            </p>
            <Link href="/#pipeline" className="arrow-link text-blue !mt-10">
              See the pipeline <span className="arrow">↗</span>
            </Link>
          </motion.div>
        </div>

        {/* Corner bracket + stat strip */}
        <motion.div {...rise} className="mt-20 md:mt-28">
          <div
            className="w-6 h-6 border-l border-b border-hairline mb-8"
            aria-hidden="true"
          />
          <div className="border-t border-hairline pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="display text-ink text-3xl md:text-4xl mb-1.5">
                  {stat.value}
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
