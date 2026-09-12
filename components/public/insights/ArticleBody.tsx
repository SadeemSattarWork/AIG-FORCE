"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { headingAnchor, type InsightSection } from "@/lib/insights";

/* Article prose with two quiet pieces of motion: a reading-progress rail
   pinned under the navbar, and each section rising in as it enters view.
   Both switch off for readers who prefer reduced motion. */
export function ArticleBody({ sections }: { sections: InsightSection[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.25", "end 0.75"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-20 left-0 right-0 h-0.5 bg-blue origin-left z-40 motion-reduce:hidden"
        style={{ scaleX: reduce ? 0 : progress }}
      />

      <article ref={ref} className="md:col-span-8 lg:col-span-7">
        {sections.map((section, si) => (
          <motion.div
            key={section.heading ?? `intro-${si}`}
            id={section.heading ? headingAnchor(section.heading) : undefined}
            className="scroll-mt-28"
            {...rise}
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
          </motion.div>
        ))}
      </article>
    </>
  );
}
