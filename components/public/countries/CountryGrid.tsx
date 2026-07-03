type CountryGridProps = {
  region: string;
  countries: string[];
};

export function CountryGrid({ region, countries }: CountryGridProps) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold text-[#111111] mb-5 pb-3 border-b border-[#E8E8E8]">
        {region}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {countries.map((country) => (
          <span key={country} className="text-sm text-[#555555] hover:text-accent transition-colors py-1">
            {country}
          </span>
        ))}
      </div>
    </div>
  );
}
