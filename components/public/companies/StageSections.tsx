"use client";

import { motion, useReducedMotion } from "framer-motion";

type Stage = { number: string; title: string; body: string; gets: string[]; mesh: string };

const stages: Stage[] = [
  {
    number: "01",
    title: "Submit your brief.",
    body: "Tell us the domain, scope, seniority and timeline. Intake takes under five minutes, and a person reads every brief before the pipeline starts.",
    gets: ["A written rubric built from your brief", "Weighted criteria you can edit", "A named contact from day one"],
    mesh: "radial-gradient(120% 120% at 85% 15%, #2B14E8 0%, rgba(43,20,232,0) 45%), radial-gradient(120% 120% at 15% 90%, #0A0560 0%, rgba(10,5,96,0) 55%), linear-gradient(135deg, #0A0560 0%, #1801AB 100%)",
  },
  {
    number: "02",
    title: "The pipeline runs.",
    body: "Our ATS screens the network against your brief, then our AI interviewer runs a structured, role-specific interview with every candidate who clears it, in any timezone.",
    gets: ["Every candidate scored on one rubric", "Adaptive follow-ups, fixed scoring", "No scheduling, no first-impression bias"],
    mesh: "radial-gradient(130% 130% at 20% 100%, #1801AB 0%, rgba(24,1,171,0) 55%), radial-gradient(100% 100% at 90% 10%, #2B14E8 0%, rgba(43,20,232,0) 40%), linear-gradient(135deg, #0E0E12 0%, #0A0560 100%)",
  },
  {
    number: "03",
    title: "Hire from a ranked shortlist.",
    body: "Within 48 hours you receive the strongest candidates, each with an evidence-backed scorecard. You interview the finalists and make the call.",
    gets: ["Scorecards with quoted evidence", "Direct contact, no account managers", "Runners-up considered for later briefs"],
    mesh: "radial-gradient(120% 120% at 10% 20%, #2B14E8 0%, rgba(43,20,232,0) 50%), radial-gradient(130% 130% at 95% 95%, #0E0E12 0%, rgba(14,14,18,0) 55%), linear-gradient(135deg, #1801AB 0%, #0A0560 100%)",
  },
];

/* Each stage: text on one side, a slow-breathing brand mesh on the other
   carrying the stage number in oversized serif. Sides alternate. */
export function StageSections() {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-24 md:space-y-32">
      {stages.map((s, i) => (
        <div key={s.number} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={i % 2 ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"}
          >
            <p className="machine text-muted mb-4">{s.number}</p>
            <h3 className="display text-ink text-3xl md:text-4xl mb-5">{s.title}</h3>
            <p className="text-muted text-base leading-relaxed mb-8">{s.body}</p>
            <p className="eyebrow text-ink mb-4">What you get</p>
            <ul className="border-t border-hairline">
              {s.gets.map((g) => (
                <li key={g} className="border-b border-hairline py-3 text-sm text-muted flex gap-3">
                  <span className="text-blue" aria-hidden="true">▪</span>
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="hidden lg:block lg:col-span-1" />

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative aspect-[4/3] overflow-hidden ${i % 2 ? "lg:col-span-6 lg:order-1" : "lg:col-span-6"}`}
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: s.mesh }}
              animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="absolute left-8 bottom-4 display text-white/15 text-[11rem] leading-none select-none">
              {s.number}
            </span>
            <span className="absolute top-6 left-8 machine text-white/60">Stage {s.number} of 03</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
