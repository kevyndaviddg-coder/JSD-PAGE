import { CameraIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function ReservedMediaBlock({
  className,
  label = "Material visual en revisión",
  description = "Espacio reservado para foto del cliente. Estamos coordinando la sesión fotográfica para esta obra.",
  ratio = "4/3",
}: {
  className?: string;
  label?: string;
  description?: string;
  ratio?: "4/3" | "16/9" | "1/1" | "3/4";
}) {
  const ratioClass: Record<string, string> = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
  };
  return (
    <div
      className={cn(
        "reserved-grid relative flex flex-col justify-between rounded-[var(--radius-lg)] border border-[color:var(--color-ash-200)] p-6 sm:p-8 overflow-hidden",
        ratioClass[ratio],
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(15,42,71,0.05),transparent_60%)]"
      />
      <div className="relative flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-navy)] backdrop-blur">
          <CameraIcon className="size-3.5" />
          JSD
        </span>
        <span className="inline-flex rounded-full bg-[color:var(--color-amber)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-amber-700)]">
          Pendiente
        </span>
      </div>
      <div className="relative max-w-sm">
        <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-ink)] leading-tight">
          {label}
        </p>
        <p className="mt-2 text-sm text-[color:var(--color-steel)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
