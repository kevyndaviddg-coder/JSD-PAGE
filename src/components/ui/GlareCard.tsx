"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * GlareCard — wrapper que aplica un brillo radial siguiendo el cursor.
 *
 * Patrón: Aceternity UI "Glare Card" / Linear hover effect.
 * Implementación propia: setea CSS vars --mx --my en mouse move,
 * que el `.glare-card::after` (en globals.css) consume.
 *
 * Compatible con cualquier elemento — útil para cards premium.
 */
export function GlareCard({
  className,
  children,
  as: Tag = "div",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      onMouseMove={onMove}
      className={cn("glare-card", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
