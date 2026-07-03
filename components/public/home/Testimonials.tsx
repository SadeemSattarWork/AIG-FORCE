"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  pull?: boolean; // renders as the oversized middle quote
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced three weeks of phone screens with one afternoon of reviewing scorecards. The first engineer we hired through AIG Force now leads our platform team.",
    name: "Sarah Okonkwo",
    role: "VP Engineering, fintech",
  },
  {
    quote: "Shortlist in 41 hours. Every candidate was worth the interview.",
    name: "Tomás Rivera",
    role: "Head of Talent, medtech",
    pull: true,
  },
  {
    quote:
      "The AI interview felt fairer than any first round I've done. Same questions, same rubric — my work spoke for itself.",
    name: "Amara Chen",
    role: "Computational Biologist",
  },
  {
    quote:
      "As a specialist in a narrow field, visibility is everything. AIG Force matched me with a company I would never have found on my own.",
    name: "Elena Vasquez",
    role: "Securities Lawyer",
  },
  {
    quote: "The scorecards give us evidence, not vibes. Our hiring committee debates data now.",
    name: "David Osei",
    role: "CTO, logistics platform",
    pull: true,
  },
  {
    quote:
      "I interviewed at 9pm my time, on my own schedule, with zero scheduling ping-pong. Offer within the week.",
    name: "Priya Nair",
    role: "ML Engineer",
  },
];

const PAGE_SIZE = 3;
const pageCount = Math.ceil(testimonials.length / PAGE_SIZE);

export function Testimonials() {
  const [page, setPage] = useState(0);
  const reduce = useReducedMotion();

  const visible = testimonials.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const arrowClass =
    "p-2 text-white/50 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-white/50";

  return (
    <section className="bg-blue px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-8 mb-16 md:mb-24">
          <h2 className="display text-white text-4xl md:text-5xl lg:text-6xl max-w-lg">
            Valued and trusted, on <em>both</em> sides of the hire.
          </h2>
          <div className="flex items-center gap-2 shrink-0" role="group" aria-label="Testimonial pages">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous testimonials"
              className={arrowClass}
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page === pageCount - 1}
              aria-label="Next testimonials"
              className={arrowClass}
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {visible.map((t) => (
              <figure
                key={t.name}
                className="border-l border-white/25 pl-7 md:pl-8 flex flex-col justify-between min-h-[280px] md:min-h-[340px]"
              >
                <blockquote
                  className={
                    t.pull
                      ? "display text-white text-2xl md:text-3xl leading-snug mb-10"
                      : "text-white/85 text-sm md:text-base leading-relaxed mb-10"
                  }
                >
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3.5">
                  <span
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-sm font-semibold"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-white text-sm font-semibold">
                      {t.name}
                    </span>
                    <span className="block text-white/50 text-xs mt-0.5">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
