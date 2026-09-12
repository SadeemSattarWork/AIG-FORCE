import { cn } from "@/lib/utils";

const tones = ["bg-blue", "bg-wire", "bg-field"];

/* Overlapping initials in the three brand blues. Used wherever we show who
   is behind a number. */
export function AvatarCluster({ initials, size = "sm" }: { initials: string[]; size?: "sm" | "md" }) {
  const dim = size === "md" ? "w-9 h-9 text-[11px]" : "w-6 h-6 text-[9px]";
  return (
    <span className="inline-flex" aria-hidden="true">
      {initials.map((ini, i) => (
        <span
          key={ini + i}
          className={cn(
            "rounded-full text-white font-semibold flex items-center justify-center ring-2 ring-paper",
            dim,
            tones[i % tones.length],
            i > 0 && "-ml-2"
          )}
        >
          {ini}
        </span>
      ))}
    </span>
  );
}
