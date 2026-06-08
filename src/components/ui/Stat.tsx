import { cn } from "@/lib/utils";

export function Stat({
  value,
  label,
  hint,
  className,
  tone = "default",
}: {
  value: string;
  label: string;
  hint?: string;
  className?: string;
  tone?: "default" | "light";
}) {
  // Tipografía adaptativa: textos cortos pueden ser display grandes,
  // strings largas se reducen para no romper la rejilla.
  const isShort = value.length <= 4;
  const isMedium = value.length > 4 && value.length <= 8;
  const sizeClass = isShort
    ? "text-4xl sm:text-5xl"
    : isMedium
      ? "text-3xl sm:text-4xl"
      : "text-2xl sm:text-3xl";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] leading-none",
          sizeClass,
          tone === "light" ? "text-white" : "text-[color:var(--color-ink)]",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "mt-2 text-sm font-semibold tracking-tight",
          tone === "light" ? "text-white/85" : "text-[color:var(--color-navy)]",
        )}
      >
        {label}
      </span>
      {hint ? (
        <span
          className={cn(
            "mt-1 text-xs leading-relaxed",
            tone === "light" ? "text-white/60" : "text-[color:var(--color-steel)]",
          )}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
