"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/* "1,400+" counts 0 → 1,400 the first time it scrolls into view, keeping any
   prefix and suffix. Static for readers who prefer reduced motion. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = m ? Number(m[2].replace(/,/g, "")) : NaN;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce || Number.isNaN(target) ? target : 0);

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) return;
    const c = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, reduce, target]);

  if (Number.isNaN(target) || !m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {m[1]}{shown.toLocaleString("en-GB")}{m[3]}
    </span>
  );
}
