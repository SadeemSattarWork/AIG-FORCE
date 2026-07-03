"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Dna, Code2, Scale, Stethoscope, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Dna,
  Code2,
  Scale,
  Stethoscope,
  TrendingUp,
};

type DomainCardProps = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  index?: number;
  large?: boolean;
};

/* Flat editorial tile — hairline top rule, serif name, quiet arrow link */
export function DomainCard({ slug, name, icon, description, index = 0, large = false }: DomainCardProps) {
  const Icon = iconMap[icon] ?? Dna;
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/experts/${slug}`}
        className={cn(
          "group flex flex-col h-full border-t border-ink/80 hover:border-blue transition-colors",
          large ? "pt-8 pb-4" : "pt-6 pb-3"
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h3
            className={cn(
              "display text-ink group-hover:text-blue transition-colors",
              large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}
          >
            {name}
          </h3>
          <Icon
            size={large ? 22 : 18}
            className="text-blue shrink-0 mt-1.5"
            aria-hidden="true"
          />
        </div>
        <p className={cn("text-muted leading-relaxed mb-6", large ? "text-sm md:text-base" : "text-sm")}>
          {description}
        </p>
        <span className="arrow-link text-blue mt-auto">
          View domain <span className="arrow">↗</span>
        </span>
      </Link>
    </motion.div>
  );
}
