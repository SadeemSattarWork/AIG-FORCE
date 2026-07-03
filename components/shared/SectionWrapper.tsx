import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: React.ReactNode;
  surface?: boolean;
  className?: string;
  id?: string;
};

export function SectionWrapper({ children, surface = false, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-6 py-20 md:py-28",
        surface ? "bg-[#F5F5F5]" : "bg-white",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
