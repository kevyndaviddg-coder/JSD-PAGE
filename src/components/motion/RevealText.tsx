"use client";

/**
 * RevealText — text-reveal scroll-driven palabra por palabra.
 *
 * Patrón base: 21st.dev "Magic Text" (Magic MCP inspiration, similarity 1.616).
 * El patrón original usa `motion/react` directo (no requirió migración).
 * Cada palabra recibe su propio `useTransform` sobre `scrollYProgress`,
 * con un range relativo a su índice. La palabra ghost queda al 20% mientras
 * la versión "iluminada" emerge.
 *
 * Adaptación industrial JSD:
 * - Marcado como `<motion.span>` por palabra, no `<p>` con flex, para que
 *   funcione dentro de cualquier heading (h1/h2) sin romper la maquetación.
 * - Respeta `prefers-reduced-motion`: muestra el texto completo sin animación.
 * - El "ghost" usa opacidad sobre `currentColor`, así hereda el color del
 *   heading padre (white sobre dark, ink sobre light — ambos AAA).
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export function RevealText({
  text,
  className,
  ghostOpacity = 0.18,
  as: Tag = "span",
  offset = ["start 0.85", "start 0.2"] as const,
}: {
  text: string;
  className?: string;
  ghostOpacity?: number;
  as?: "span" | "p" | "div";
  offset?: readonly [string, string];
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: offset as unknown as ["start 0.85", "start 0.2"],
  });
  const words = text.split(" ");

  if (reduce) {
    const Comp = Tag as React.ElementType;
    return <Comp className={className}>{text}</Comp>;
  }

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            ghostOpacity={ghostOpacity}
          >
            {word}
          </Word>
        );
      })}
    </Comp>
  );
}

function Word({
  children,
  progress,
  range,
  ghostOpacity,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  ghostOpacity: number;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block whitespace-nowrap">
      <span aria-hidden style={{ opacity: ghostOpacity }}>
        {children}
      </span>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {children}
      </motion.span>
      {/* SR-friendly: el texto real lo lee 1 vez via aria-hidden ghosts? No.
          Mejor renderizar el word visible y usar aria-label en el parent.
          Aquí mantengo ghosts visuales y dejo que la palabra completa se
          anuncie como parte del párrafo padre (los SR ven el texto real). */}
      <span className="sr-only">{children} </span>
    </span>
  );
}
