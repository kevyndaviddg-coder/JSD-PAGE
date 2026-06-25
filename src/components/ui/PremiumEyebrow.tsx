"use client";

/**
 * PremiumEyebrow — Eyebrow/kicker premium global, dos tonos.
 *
 * Reemplazo del `<Kicker>` con raya horizontal por una pill glass con:
 *  - dot ámbar + micro glow controlado
 *  - border sutil + backdrop-blur
 *  - tipografía consistente (10.5px, tracking 0.22em, uppercase, weight 600)
 *  - motion reveal fade + lift + blur clear (once:false, repetible)
 *  - respeta prefers-reduced-motion
 *
 * Tonos:
 *  - `tone="dark"` (default) — para fondos oscuros (navy/petroleum/ink).
 *    bg white/[0.045] + border white/15 + text white/85.
 *  - `tone="light"` — para fondos claros (paper/bone).
 *    bg white/70 + border ink/12 + text ink/75.
 *
 * Patrón 21st.dev "Pill chip industrial" — mismo lenguaje visual que los
 * chips de categoría de ServiceCard y los chips de familia. Mantiene
 * coherencia tipográfica en todo el sitio.
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

export function PremiumEyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const reduce = useReducedMotion();

  const toneClasses =
    tone === "light"
      ? "border-[color:var(--color-ink)]/12 bg-white/70 text-[color:var(--color-ink)]/75"
      : "border-white/15 bg-white/[0.045] text-white/85";

  return (
    <motion.span
      initial={
        reduce ? false : { opacity: 0, y: 6, filter: "blur(4px)" }
      }
      whileInView={
        reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm",
        toneClasses,
        className,
      )}
    >
      <span
        aria-hidden
        className="block h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)] shadow-[0_0_8px_rgba(255,184,28,0.55)]"
      />
      {children}
    </motion.span>
  );
}
