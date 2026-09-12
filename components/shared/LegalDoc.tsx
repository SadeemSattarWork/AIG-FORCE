import { PageHero } from "@/components/shared/PageHero";

export type LegalSection = {
  heading: string;
  paras?: string[];
  /** Rendered as a hairline-separated definition list when `term` is set. */
  bullets?: { term?: string; text: string }[];
  /** Paragraphs that belong after the list rather than before it. */
  parasAfter?: string[];
};

type Props = {
  title: React.ReactNode;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/* Shared shell for /privacy and /terms, same editorial grid as the rest of
   the site, with the revision date parked in the sticky left column. */
export function LegalDoc({ title, updated, intro, sections }: Props) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={intro} />

      <section className="bg-paper px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-32">
              <p className="eyebrow text-muted mb-3">Last updated</p>
              <p className="machine text-ink">{updated}</p>
            </div>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <ol className="counter-reset">
              {sections.map((section, i) => (
                <li
                  key={section.heading}
                  className={
                    i === sections.length - 1
                      ? "py-8 md:py-10"
                      : "py-8 md:py-10 border-b border-hairline"
                  }
                >
                  <div className="flex items-baseline gap-5 mb-5">
                    <span className="machine text-muted shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display text-ink text-2xl md:text-3xl">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="sm:pl-12 space-y-4">
                    {section.paras?.map((p) => (
                      <p
                        key={p}
                        className="text-sm md:text-base text-muted leading-relaxed max-w-2xl"
                      >
                        {p}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="max-w-2xl border-t border-hairline">
                        {section.bullets.map((b) => (
                          <li
                            key={b.text}
                            className="border-b border-hairline py-3.5 text-sm md:text-base text-muted leading-relaxed"
                          >
                            {b.term && (
                              <strong className="text-ink font-semibold">
                                {b.term}.{" "}
                              </strong>
                            )}
                            {b.text}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.parasAfter?.map((p) => (
                      <p
                        key={p}
                        className="text-sm md:text-base text-muted leading-relaxed max-w-2xl"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
