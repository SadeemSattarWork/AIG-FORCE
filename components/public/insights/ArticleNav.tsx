"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type NavItem = { id: string; label: string };

/* "In this piece" — tracks the section under the reader and slides a blue
   marker to it. Scroll-driven rather than IntersectionObserver so the
   answer is deterministic: the last heading above the 30% line is active,
   and the final section wins once you reach the bottom. */
export function ArticleNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const reduce = useReducedMotion();

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActive(atBottom ? els[els.length - 1].id : current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav aria-label="In this piece">
      <p className="eyebrow text-muted mb-4">In this piece</p>
      <ol className="relative border-l border-hairline">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="article-nav-marker"
                  aria-hidden="true"
                  className="absolute -left-px top-0 bottom-0 w-0.5 bg-blue"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 36 }
                  }
                />
              )}
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={cn(
                  "block pl-4 py-1.5 text-sm leading-snug transition-colors duration-200",
                  isActive ? "text-ink font-medium" : "text-muted hover:text-ink"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
