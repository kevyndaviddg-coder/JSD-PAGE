"use client";

/**
 * Hero — portada principal Home, refactorizada por partes.
 *
 * Cambios en este pase (Hero/About part):
 * - Reel actualizado a 5 clips industriales/técnicos (`heroClips` en site.ts):
 *   se removieron `hero-aerea-main-2` y `trabajos-campo` (los menos
 *   convincentes según feedback). Se sumaron `hero-grua-2`, `hero-aereo-3`,
 *   `equipos-sin-instalar`, `trabajos-campo-2`.
 * - Saturación reducida: se eliminaron stats grid de 4, flecha scroll cue
 *   y línea inferior "HVAC industrial · Fabricación a medida" que competían
 *   con los CTAs.
 * - Copy más directo: título corto + subtítulo concreto.
 * - CTA primario único en amber (Cotizar), 2 secundarios calmados.
 * - Microinteracciones Motion: fade-up stagger, parallax sutil del bloque
 *   completo con `useScroll`+`useTransform`.
 * - Indicador del reel queda visible pero más discreto (ya está en VideoReel).
 * - Respeta `prefers-reduced-motion` vía `useReducedMotion()`.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { VideoReel } from "@/components/motion/VideoReel";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { heroClips, heroFallback, whatsappLink } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -32]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.5]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] flex items-end overflow-hidden bg-[color:var(--color-ink)]"
    >
      {/* Video reel */}
      <div className="absolute inset-0">
        <VideoReel
          clips={heroClips}
          fallback={heroFallback}
          className="absolute inset-0 h-full w-full"
        />
        <div aria-hidden className="absolute inset-0 hero-overlay" />
      </div>

      <Container className="relative z-10 pb-28 pt-32 sm:pb-32 sm:pt-44">
        <motion.div style={{ y, opacity }} className="max-w-3xl text-white">
          {/* Eyebrow — más sobrio que el badge glass anterior */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[color:var(--color-amber)]"
          >
            <span aria-hidden className="h-px w-8 bg-[color:var(--color-amber)]" />
            JSD Air Systems
          </motion.span>

          {/* Título limpio, directo */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="title-shadow mt-5 font-[family-name:var(--font-display)] text-[42px] font-semibold leading-[1.02] tracking-[-0.02em] text-white sm:text-[60px] lg:text-[80px]"
          >
            HVAC, climatización y{" "}
            <span className="text-[color:var(--color-amber)]">fabricación industrial</span>.
          </motion.h1>

          {/* Subtítulo conciso */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="title-shadow mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Más de 60 años en ingeniería, instalación y mantenimiento de
            chillers, ductería, agua helada, mantenimiento y fabricación
            metálica a la medida.
          </motion.p>

          {/* CTAs: primario amber + 2 secundarios menos competitivos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              href={whatsappLink("Hola JSD, quiero cotizar un proyecto.")}
              target="_blank"
              variant="primary"
              size="lg"
            >
              <WhatsAppIcon className="size-5" />
              Cotizar proyecto
            </Button>
            <Button href="/servicios" variant="outlineLight" size="lg">
              Ver servicios
              <ArrowRightIcon className="size-4" />
            </Button>
            <Button
              href="/nosotros"
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Conocer JSD
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
