import Link from "next/link";
import { stories } from "@/lib/stories";
import { AvatarCluster } from "@/components/shared/AvatarCluster";

export function StoriesStrip({ bg = "bg-paper" }: { bg?: "bg-paper" | "bg-bone" }) {
  return (
    <section className={`${bg} px-6 py-20 md:py-28`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-8 border-b border-hairline pb-8 mb-14">
          <p className="eyebrow text-blue">From the network</p>
          <Link href="/for-experts/roles" className="arrow-link text-ink hover:text-blue transition-colors">
            Join them <span className="arrow">↗</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {stories.map((s) => (
            <figure key={s.name} className="border-t border-ink/80 pt-6 flex flex-col">
              <blockquote className="display text-ink text-xl md:text-2xl leading-snug mb-8">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <AvatarCluster initials={[s.initials]} size="md" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">{s.name}</span>
                  <span className="machine text-muted">{s.field} · {s.country}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
