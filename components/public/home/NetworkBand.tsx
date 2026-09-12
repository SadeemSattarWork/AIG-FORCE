"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { networkStats } from "@/lib/stats";
import { roles, formatPay } from "@/lib/roles";
import { CountUp } from "@/components/public/home/CountUp";
import { AvatarCluster } from "@/components/shared/AvatarCluster";

const PAGE = 3;
const EVERY_MS = 4500;

/* Stats on the left, a rotating window of open roles on the right. The
   roles slide up in pages; the dots show where you are and are clickable. */
export function NetworkBand() {
  const reduce = useReducedMotion();
  const pages = Math.ceil(roles.length / PAGE);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), EVERY_MS);
    return () => clearInterval(id);
  }, [pages, reduce]);

  const shown = roles.slice(page * PAGE, page * PAGE + PAGE);

  return (
    <section className="bg-bone px-6 py-20 md:py-28 border-b border-hairline">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow text-blue mb-10">The network</p>
          <dl>
            {networkStats.map((s, i) => (
              <div
                key={s.label}
                className={i === networkStats.length - 1 ? "py-6" : "py-6 border-b border-hairline"}
              >
                <dd className="display text-ink text-4xl md:text-5xl mb-1">
                  <CountUp value={s.value} />
                </dd>
                <dt className="machine text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden lg:block lg:col-span-1" />

        <div className="lg:col-span-6">
          <div className="flex items-center justify-between mb-6">
            <p className="eyebrow text-muted">Latest roles</p>
            <div className="flex gap-2" role="tablist" aria-label="Role pages">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === page ? "bg-blue" : "bg-hairline hover:bg-muted/40"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[15.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={page}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -14 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
                className="border-t border-hairline"
              >
                {shown.map((r) => (
                  <li key={r.slug} className="border-b border-hairline">
                    <Link
                      href={`/for-experts/roles/${r.slug}`}
                      className="group flex items-center justify-between gap-6 py-4"
                    >
                      <span>
                        <span className="block text-ink text-base group-hover:text-blue transition-colors">
                          {r.title}
                        </span>
                        <span className="mt-1 flex items-center gap-2 machine text-muted">
                          <AvatarCluster initials={r.avatars} />
                          {r.hiredRecently} hired recently
                        </span>
                      </span>
                      <span className="machine text-ink shrink-0">{formatPay(r)}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <Link href="/for-experts/roles" className="arrow-link text-blue mt-8 inline-flex">
            View all roles <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
