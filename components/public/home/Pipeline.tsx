"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Stage = {
  number: string;
  name: string;
  description: string;
};

const stages: Stage[] = [
  {
    number: "01",
    name: "Application",
    description:
      "Candidates apply once. The system builds a structured profile from every résumé, portfolio, and credential.",
  },
  {
    number: "02",
    name: "AI Résumé Screen",
    description:
      "Our ATS engine parses and scores every application against your brief, weighing every skill so nothing is skimmed.",
  },
  {
    number: "03",
    name: "AI Interview",
    description:
      "Our AI interviewer conducts a structured, role-specific interview with adaptive questions, one consistent rubric, and any timezone.",
  },
  {
    number: "04",
    name: "Scorecard",
    description:
      "Every candidate receives an evidence-backed scorecard, with identical criteria for everyone and zero first-impression bias.",
  },
  {
    number: "05",
    name: "Shortlist & Hire",
    description:
      "You receive a ranked shortlist of the strongest candidates within 48 hours. You interview the finalists and make the call.",
  },
];

export function Pipeline() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const railProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  return (
    <section id="pipeline" className="bg-bone px-6 py-24 md:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Eyebrow — far-left column, GLG style */}
          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">The Pipeline</p>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <motion.h2
              {...rise}
              className="display text-ink text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              From application to <em>offer.</em>
            </motion.h2>
            <motion.p
              {...rise}
              className="text-muted text-base md:text-lg max-w-xl mb-16 md:mb-24"
            >
              Five stages, fully automated and supervised by the humans who
              make the final call.
            </motion.p>

            {/* Stages + scroll rail */}
            <div ref={railRef} className="relative">
              {/* Rail track */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px bg-hairline hidden sm:block"
                aria-hidden="true"
              />
              {/* Rail fill — draws as you scroll */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-px bg-blue origin-top hidden sm:block"
                style={{ scaleY: reduce ? 1 : railProgress }}
                aria-hidden="true"
              />

              <ol className="sm:pl-12 md:pl-16">
                {stages.map((stage, i) => (
                  <motion.li
                    key={stage.number}
                    {...rise}
                    className={
                      i === stages.length - 1
                        ? "py-10 md:py-12"
                        : "py-10 md:py-12 border-b border-hairline"
                    }
                  >
                    <div className="flex items-baseline gap-5 mb-4">
                      <span className="machine text-muted">{stage.number}</span>
                      <h3 className="display text-ink text-3xl md:text-4xl">
                        {stage.name}
                      </h3>
                    </div>
                    <div className="sm:pl-12">
                      <p className="text-sm md:text-base text-muted leading-relaxed max-w-xl">
                        {stage.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
