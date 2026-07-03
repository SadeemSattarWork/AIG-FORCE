"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const solutions = [
  {
    href: "/for-companies",
    title: "For companies",
    sub: "Hire vetted experts in 48 hours.",
  },
  {
    href: "/for-experts",
    title: "For experts",
    sub: "Join the network. Work from anywhere.",
  },
  {
    href: "/supported-countries",
    title: "Global coverage",
    sub: "60+ countries, one process.",
  },
];

export function SolutionsPanel() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, delay, ease: "easeOut" as const },
        };

  return (
    <section
      className="px-6 py-24 md:py-36"
      style={{
        background:
          "linear-gradient(100deg, #2B14E8 0%, #1801AB 48%, #0A0560 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow text-white/60">Solutions</p>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <ul className="space-y-2">
              {solutions.map((solution, i) => (
                <motion.li key={solution.href} {...rise(i * 0.08)}>
                  <Link href={solution.href} className="group block py-6 md:py-8">
                    <span className="flex items-baseline gap-5">
                      <span className="display text-white text-4xl md:text-5xl lg:text-6xl transition-transform duration-300 ease-out group-hover:translate-x-3">
                        {solution.title}
                      </span>
                      <span
                        className="display text-white/0 text-3xl md:text-4xl transition-colors duration-300 group-hover:text-white"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </span>
                    <span className="block mt-3 text-sm text-white/50 group-hover:text-white/80 transition-colors">
                      {solution.sub}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
