import { cn } from "@/lib/utils";

export function Kicker({
  children,
  className,
  tone = "amber",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "amber" | "steel" | "bone";
}) {
  const tones = {
    amber: "text-[color:var(--color-amber)]",
    steel: "text-[color:var(--color-steel)]",
    bone: "text-white/70",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase",
        tones[tone],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "amber" && "bg-[color:var(--color-amber)]",
          tone === "steel" && "bg-[color:var(--color-steel)]",
          tone === "bone" && "bg-white/40",
        )}
      />
      {children}
    </span>
  );
}
