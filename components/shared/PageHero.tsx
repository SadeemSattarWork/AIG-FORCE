import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  backHref?: string;
  backLabel?: string;
};

/* Inner-page opener — bone band, eyebrow + serif headline, GLG cadence */
export function PageHero({ eyebrow, title, lede, backHref, backLabel }: PageHeroProps) {
  return (
    <section className="bg-bone px-6 pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="max-w-7xl mx-auto">
        {backHref && (
          <Link
            href={backHref}
            className="machine text-muted hover:text-blue transition-colors inline-block mb-10"
          >
            ← {backLabel ?? "Back"}
          </Link>
        )}
        <p className="eyebrow text-blue mb-8">{eyebrow}</p>
        <h1 className="display text-ink text-4xl md:text-6xl lg:text-7xl max-w-4xl">
          {title}
        </h1>
        {lede && (
          <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed mt-8">
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
