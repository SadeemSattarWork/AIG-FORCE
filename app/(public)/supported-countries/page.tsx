import type { Metadata } from "next";
import { regions } from "@/lib/countries";
import { CountryGrid } from "@/components/public/countries/CountryGrid";

export const metadata: Metadata = {
  title: "Supported Countries & Regions",
  description:
    "AIG Force places experts and serves companies across 60+ countries worldwide. Browse every supported country and region.",
};

export default function SupportedCountriesPage() {
  return (
    <section className="bg-white min-h-screen px-6 pt-40 pb-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          Global Reach
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-5">
          Supported Countries & Regions
        </h1>
        <p className="text-[#555555] text-lg max-w-2xl mb-16 leading-relaxed">
          AIG Force places experts and serves companies across the globe. Below is the full list
          of countries and territories where we operate.
        </p>
        <div>
          {regions.map((region) => (
            <CountryGrid key={region.name} region={region.name} countries={region.countries} />
          ))}
        </div>
      </div>
    </section>
  );
}
