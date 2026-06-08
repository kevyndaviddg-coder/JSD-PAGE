import { cn } from "@/lib/utils";

/**
 * BentoGrid — contenedor de rejilla asymétrica.
 * Patrón: shadcn / Aceternity / Linear bento layout.
 * Hijos definen su propio col/row-span vía className.
 */
export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:auto-rows-[210px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * BentoCellSize — utilidad para definir spans con presets semánticos.
 */
export const bentoSize = {
  /** 1 columna × 1 fila — card estándar. */
  sm: "lg:col-span-2 lg:row-span-1",
  /** 1 columna × 2 filas — card vertical. */
  tall: "lg:col-span-2 lg:row-span-2",
  /** 2 columnas × 1 fila — card horizontal. */
  wide: "sm:col-span-2 lg:col-span-3 lg:row-span-1",
  /** 2 columnas × 2 filas — card hero/feature. */
  hero: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  /** 3 columnas × 1 fila — card cinta. */
  band: "sm:col-span-2 lg:col-span-6 lg:row-span-1",
} as const;

export type BentoSize = keyof typeof bentoSize;
