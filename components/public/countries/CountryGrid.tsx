type CountryGridProps = {
  region: string;
  countries: string[];
};

export function CountryGrid({ region, countries }: CountryGridProps) {
  return (
    <div className="mb-16">
      <div className="flex items-baseline justify-between border-b border-hairline pb-4 mb-6">
        <h2 className="display text-ink text-2xl md:text-3xl">{region}</h2>
        <span className="machine text-muted">
          {countries.length} countries
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1.5">
        {countries.map((country) => (
          <span
            key={country}
            className="text-sm text-muted hover:text-blue transition-colors py-1"
          >
            {country}
          </span>
        ))}
      </div>
    </div>
  );
}
