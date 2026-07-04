"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type Role, formatPay } from "@/lib/roles";

const VISIBLE_SKILLS = 3;

export function RoleCard({ role, index = 0 }: { role: Role; index?: number }) {
  const reduce = useReducedMotion();
  const shown = role.skills.slice(0, VISIBLE_SKILLS);
  const overflow = role.skills.length - shown.length;

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : (index % 3) * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/for-experts/roles/${role.slug}`}
        className="group relative flex flex-col h-full bg-paper border border-hairline p-7 md:p-8 hover:border-blue transition-colors"
      >
        <span className="machine text-muted mb-3">{role.posted}</span>
        <h3 className="display text-ink text-2xl md:text-[1.75rem] leading-tight mb-6 group-hover:text-blue transition-colors">
          {role.title}
        </h3>

        <p className="eyebrow text-muted mb-3">Required skills</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {shown.map((skill) => (
            <span
              key={skill}
              className="text-xs text-ink bg-bone border border-hairline px-3 py-1.5"
            >
              {skill}
            </span>
          ))}
          {overflow > 0 && (
            <span className="text-xs text-muted bg-bone border border-hairline px-3 py-1.5">
              {overflow}+
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <p className="text-sm font-semibold text-ink">
            Pay: {formatPay(role)}
          </p>
          <span
            className="w-11 h-11 border border-hairline flex items-center justify-center text-ink group-hover:border-blue group-hover:text-blue transition-colors"
            aria-hidden="true"
          >
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
