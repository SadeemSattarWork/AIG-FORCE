import type { Metadata } from "next";
import { roles } from "@/lib/roles";
import { RolesBoard } from "@/components/public/roles/RolesBoard";
import { networkStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Browse open expert roles at AIG Force. Apply your domain expertise to high-impact AI projects, remotely and on your terms.",
};

export default function RolesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bone px-6 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-blue mb-8">For Experts</p>
          <h1 className="display text-ink text-5xl md:text-7xl mb-6">
            Opportunities
          </h1>
          <p className="text-muted text-base md:text-lg">
            Use your expertise to help train the next generation of AI.
          </p>
        </div>
        <dl className="max-w-3xl mx-auto mt-14 grid grid-cols-3 border border-hairline bg-paper divide-x divide-hairline">
          {networkStats.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <dd className="display text-ink text-2xl md:text-3xl mb-1">{s.value}</dd>
              <dt className="machine text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Board */}
      <section className="bg-paper px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <RolesBoard roles={roles} />
        </div>
      </section>
    </>
  );
}
