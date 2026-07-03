import Link from "next/link";

type CTABannerProps = {
  heading: string;
  subtext?: string;
  buttonLabel: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABanner({ heading, subtext, buttonLabel, href, secondaryLabel, secondaryHref }: CTABannerProps) {
  return (
    <section className="w-full bg-[#F5F5F5] border-t border-[#E8E8E8] px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">
          {heading}
        </h2>
        {subtext && (
          <p className="text-[#555555] text-lg mb-8 max-w-xl mx-auto">{subtext}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={href}
            className="px-7 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent-hover transition-colors text-sm"
          >
            {buttonLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="px-7 py-3 rounded-md border border-[#E8E8E8] text-[#111111] font-medium hover:border-accent hover:text-accent transition-colors text-sm"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
