import type { Metadata } from "next";
import { regions } from "@/lib/countries";
import { CountryGrid } from "@/components/public/countries/CountryGrid";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Supported Countries & Regions",
  description:
    "AIG Force places experts and serves companies across 60+ countries worldwide. Browse every supported country and region.",
};

export default function SupportedCountriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Coverage"
        title={
          <>
            One platform. <em>Sixty-plus</em> countries.
          </>
        }
        lede="AIG Force places experts and serves companies across the globe. Below is the full list of countries and territories where we operate."
      />

      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          {regions.map((region) => (
            <CountryGrid
              key={region.name}
              region={region.name}
              countries={region.countries}
            />
          ))}
        </div>
      </section>

      <CTABanner
        heading="Don't see your country?"
        subtext="Coverage grows every quarter. Tell us where you are and we'll let you know when we arrive."
        buttonLabel="Get in touch"
        href="/contact"
      />
    </>
  );
}
