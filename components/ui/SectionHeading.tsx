import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  index: string; // Mandatory oversized section index like "01", "02"
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  index,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-4xl relative",
        align === "center" && "mx-auto text-center"
      )}
    >
      <div className={cn("flex items-baseline gap-4 mb-2", align === "center" && "justify-center")}>
        <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tighter opacity-15 text-text-secondary">
          {index}
        </span>
        <span
          id={id}
          className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan"
        >
          {"// "}{eyebrow}
        </span>
      </div>
      
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-wide leading-[1.1] sm:text-4xl lg:text-5xl text-glow-cyan">
        <span className="chrome-text block">{title}</span>
      </h2>
      
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-text-secondary max-w-2xl font-sans">
          {description}
        </p>
      ) : null}
    </div>
  );
}
