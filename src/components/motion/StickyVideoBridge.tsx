"use client";

/**
 * StickyVideoBridge — puente visual entre Hero y siguiente sección.
 *
 * Patrón base: 21st.dev "Animated Video on Scroll" (Magic MCP inspiration,
 * similarity 0.906) — `ContainerScroll` + `ContainerSticky` + `ContainerAnimated`
 * con `useScroll` + `useTransform` para scale, opacity, blur on enter.
 *
 * Adaptación industrial JSD:
 * - El bridge se monta DESPUÉS del Hero como una franja sticky de ~100vh
 *   con un poster (imagen real del cliente) que sirve de continuidad visual.
 * - Sobre el poster se renderiza un eyebrow + título grande que aparece con
 *   scroll y se va difuminando al salir.
 * - Cuando termina el bridge, la siguiente sección (AboutBrief normal) sigue.
 * - Respeta `prefers-reduced-motion`: renderiza estático sin scroll-driven.
 * - Implementado con `motion/react` (no framer-motion).
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function StickyVideoBridge({
  poster,
  alt,
  eyebrow,
  title,
  children,
}: {
  poster: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Poster con escala suave en su recorrido sticky.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);
  // Overlay se intensifica al avanzar.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 0.7, 0.92]);
  // Texto: entra alrededor de 0.25, sale alrededor de 0.75.
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [40, 0, -30]);

  if (reduce) {
    // Versión estática para reduced-motion
    return (
      <section
        ref={ref}
        aria-label={eyebrow}
        className="relative isolate h-[60vh] w-full overflow-hidden bg-[color:var(--color-ink)]"
      >
        <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/55 via-[color:var(--color-ink)]/70 to-[color:var(--color-ink)]/95" />
        <Container className="relative z-10 flex h-full items-center text-white">
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--color-amber)]">{eyebrow}</span>
            <h2 className="title-shadow mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-[64px]">
              {title}
            </h2>
            {children}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label={eyebrow}
      className={cn(
        // ContainerScroll-equivalent: alto que permite el sticky.
        "relative isolate w-full bg-[color:var(--color-ink)]",
        "h-[160svh]",
      )}
    >
      {/* ContainerSticky-equivalent */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)] via-[color:var(--color-ink)]/85 to-[color:var(--color-petroleum)]"
        />

        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="relative z-10 flex h-full items-center text-white">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[color:var(--color-amber)]">
              <span aria-hidden className="h-px w-8 bg-[color:var(--color-amber)]" />
              {eyebrow}
            </span>
            <h2 className="title-shadow mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[68px]">
              {title}
            </h2>
            {children ? <div className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg leading-relaxed">{children}</div> : null}
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
