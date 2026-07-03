"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Dna, Code2, Scale, Stethoscope, TrendingUp, ArrowRight } from "lucide-react";
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

export function DomainCard({ slug, name, icon, description, index = 0, large = false }: DomainCardProps) {
  const Icon = iconMap[icon] ?? Dna;
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/experts/${slug}`}
        className={cn(
          "group flex flex-col bg-white border border-[#E8E8E8] rounded-xl hover:border-accent/40 hover:shadow-sm transition-all duration-300",
          large ? "p-8" : "p-6"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-lg bg-accent/10">
            <Icon size={large ? 24 : 20} className="text-accent" />
          </div>
          <ArrowRight
            size={16}
            className="text-[#E8E8E8] group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 mt-1"
          />
        </div>
        <h3 className={cn("font-semibold text-[#111111] mb-2", large ? "text-xl" : "text-base")}>
          {name}
        </h3>
        <p className={cn("text-[#555555] leading-relaxed", large ? "text-base" : "text-sm")}>
          {description}
        </p>
      </Link>
    </motion.div>
  );
}
