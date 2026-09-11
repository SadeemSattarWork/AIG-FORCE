import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

const routes = [
  { href: "/", label: "Home" },
  { href: "/experts", label: "The network" },
  { href: "/for-experts/roles", label: "Opportunities" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="bg-bone px-6 pt-40 pb-24 md:pt-48 md:pb-32 min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <p className="machine text-muted mb-8">Error 404</p>
        <h1 className="display text-ink text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-8">
          That page isn&apos;t <em>here.</em>
        </h1>
        <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed mb-14">
          The link may be out of date, or the page may have moved. These are the
          places most people are looking for.
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {routes.map((r) => (
            <Link key={r.href} href={r.href} className="arrow-link text-blue">
              {r.label} <span className="arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
