"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Stat = { value: number; suffix: string; label: string };

const stats: Stat[] = [
  { value: 2500, suffix: "+", label: "Experts Vetted" },
  { value: 180, suffix: "+", label: "Companies Served" },
  { value: 5, suffix: "", label: "Domains Covered" },
  { value: 60, suffix: "+", label: "Countries Supported" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || reduce) { setCount(target); return; }
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, step);
    return () => clearInterval(timer);
  }, [active, target, reduce]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#F5F5F5] border-y border-[#E8E8E8] px-6 py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-bold text-[#111111] mb-2 tabular-nums tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              </p>
              <p className="text-xs text-[#555555] font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
