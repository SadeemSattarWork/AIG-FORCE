"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { domains } from "@/lib/domains";

export function ExpertiseAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="bg-paper px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          <div className="md:col-span-3">
            <p className="eyebrow text-blue md:sticky md:top-32">Expertise</p>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="display text-ink text-4xl md:text-5xl mb-14 md:mb-20 max-w-lg">
              Five domains. <em>Verified</em> depth in each.
            </h2>

            <ul>
              {domains.map((domain) => {
                const isOpen = open === domain.slug;
                return (
                  <li key={domain.slug} className="border-b border-hairline">
                    <button
                      onClick={() => setOpen(isOpen ? null : domain.slug)}
                      aria-expanded={isOpen}
                      aria-controls={`domain-panel-${domain.slug}`}
                      className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left group"
                    >
                      <span className="display text-ink text-2xl md:text-4xl group-hover:text-blue transition-colors">
                        {domain.name}
                      </span>
                      <Plus
                        size={26}
                        strokeWidth={1.2}
                        className={cn(
                          "shrink-0 text-ink transition-transform duration-300",
                          isOpen && "rotate-45 text-blue"
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`domain-panel-${domain.slug}`}
                          initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={
                            reduce
                              ? { opacity: 1 }
                              : { height: "auto", opacity: 1 }
                          }
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10 max-w-2xl">
                            <p className="text-sm md:text-base text-muted leading-relaxed mb-7">
                              {domain.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                              {domain.specializations.slice(0, 8).map((spec) => (
                                <span
                                  key={spec}
                                  className="machine text-ink border border-hairline px-3 py-1.5"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                            <Link
                              href={`/experts/${domain.slug}`}
                              className="arrow-link text-blue"
                            >
                              View domain <span className="arrow">↗</span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
