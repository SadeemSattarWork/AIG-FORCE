import Link from "next/link";

type CTABannerProps = {
  heading: string;
  subtext?: string;
  buttonLabel: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/* Full-bleed Force Blue closing panel — serif statement + arrow links */
export function CTABanner({ heading, subtext, buttonLabel, href, secondaryLabel, secondaryHref }: CTABannerProps) {
  return (
    <section
      className="w-full px-6 py-24 md:py-32"
      style={{
        background:
          "linear-gradient(100deg, #1801AB 0%, #0A0560 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="display text-white text-4xl md:text-5xl lg:text-6xl max-w-3xl mb-6">
          {heading}
        </h2>
        {subtext && (
          <p className="text-white/60 text-base md:text-lg mb-12 max-w-xl leading-relaxed">
            {subtext}
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
          <Link href={href} className="arrow-link text-white">
            {buttonLabel} <span className="arrow">↗</span>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="arrow-link text-white/60 hover:text-white transition-colors"
            >
              {secondaryLabel} <span className="arrow">↗</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
