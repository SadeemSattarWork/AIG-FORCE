import Link from "next/link";

/* Bookends the page with the hero's material — same video, heavier scrim */
export function PreFooterCTA() {
  return (
    <section className="relative bg-ink overflow-hidden">
      <video
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-ink/70 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-44">
        <h2 className="display text-white text-4xl md:text-6xl lg:text-7xl max-w-3xl mb-12">
          Real experts. <em>Intelligent</em> process.
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
          <Link href="/experts" className="arrow-link text-white">
            Meet the network <span className="arrow">↗</span>
          </Link>
          <Link
            href="/contact"
            className="arrow-link text-white/60 hover:text-white transition-colors"
          >
            Start hiring <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
