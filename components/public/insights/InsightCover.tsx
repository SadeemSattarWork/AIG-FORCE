import type { Insight } from "@/lib/insights";

/* Typographic cover — no photos: a soft multi-point gradient mesh in the
   brand's black-and-blue palette, with the article's index as an oversized
   serif numeral. Shared by the homepage grid and the /insights list. */

// Each mesh layers a few radial glows over a dark base for a diffused,
// atmospheric look — Live Wire is the lightest accent, black grounds it.
const meshes = [
  // Deep blue base, wire glow drifting to the top-right
  "radial-gradient(120% 120% at 85% 15%, #2B14E8 0%, rgba(43,20,232,0) 45%), radial-gradient(120% 120% at 15% 90%, #0A0560 0%, rgba(10,5,96,0) 55%), linear-gradient(135deg, #0A0560 0%, #1801AB 100%)",
  // Black base, Force Blue glow rising from bottom-left
  "radial-gradient(130% 130% at 20% 100%, #1801AB 0%, rgba(24,1,171,0) 55%), radial-gradient(100% 100% at 90% 10%, #2B14E8 0%, rgba(43,20,232,0) 40%), linear-gradient(135deg, #0E0E12 0%, #0A0560 100%)",
  // Force Blue base, deep-field shadow settling bottom-right
  "radial-gradient(120% 120% at 10% 20%, #2B14E8 0%, rgba(43,20,232,0) 50%), radial-gradient(130% 130% at 95% 95%, #0E0E12 0%, rgba(14,14,18,0) 55%), linear-gradient(135deg, #1801AB 0%, #0A0560 100%)",
];

export function InsightCover({
  insight,
  index,
  large = false,
}: {
  insight: Insight;
  index: number;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}
      style={{ background: meshes[index % meshes.length] }}
      aria-hidden="true"
    >
      <span className="machine text-white/60 absolute top-4 left-5">
        {insight.tag}
      </span>
    </div>
  );
}
