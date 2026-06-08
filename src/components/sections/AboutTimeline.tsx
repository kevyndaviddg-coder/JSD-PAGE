"use client";

/**
 * AboutTimeline — Vertical timeline editorial de la trayectoria JSD.
 *
 * Patrón base: 21st.dev "Modern Timeline" (Magic MCP inspiration, similarity 0.813)
 * — vertical line + animated scroll progress + avatar circular por item +
 * status badge + card con descripción + progress bar al fondo.
 *
 * Adaptación industrial JSD (cero framer-motion, todo motion/react):
 * - Avatar circular → foto chica del hito real del cliente.
 * - Status (completed/current/upcoming) → era (Origen/Escala/Integración/Hoy).
 * - Cards: glass sobre superficie clara, sin shadcn deps (uso primitivos JSD).
 * - Progress bar inferior → indicador visual del peso del hito.
 * - Scroll line animada con `whileInView` scaleY 0→1.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { CheckIcon, FactoryIcon, HardHatIcon, ZapIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Era = "fundacion" | "expansion" | "integracion" | "hoy";

type TimelineItem = {
  era: string;
  title: string;
  description: string;
  image?: string;
  icon: typeof FactoryIcon;
  status: Era;
};

const ITEMS: TimelineItem[] = [
  {
    era: "Origen técnico",
    title: "Inicio en climatización industrial",
    description:
      "JSD nace en climatización y refrigeración industrial, atendiendo plantas, fábricas y comercios con instalación y mantenimiento de equipos HVAC.",
    image: "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
    icon: HardHatIcon,
    status: "fundacion",
  },
  {
    era: "Escala industrial",
    title: "Proyectos de gran calado",
    description:
      "Crecimiento en naves industriales, edificios comerciales, hospitales y laboratorios. Especialización en chillers, ductería y tuberías de agua helada.",
    image: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
    icon: FactoryIcon,
    status: "expansion",
  },
  {
    era: "Integración HVAC + obra",
    title: "Ductería propia y servicio especializado",
    description:
      "Capacidades integradas: ingeniería, instalación, puesta en marcha y mantenimiento preventivo/correctivo desde una sola empresa.",
    image: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    icon: CheckIcon,
    status: "integracion",
  },
  {
    era: "Hoy",
    title: "Fabricación metálica + CNC láser",
    description:
      "Hoy ampliamos el alcance con corte láser/plasma CNC, ductería propia, estructuras, soportes, redilas, trailas y piezas a la medida bajo plano.",
    image: "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
    icon: ZapIcon,
    status: "hoy",
  },
];

const STATUS_CONFIG: Record<Era, { ring: string; bar: string; label: string; pct: string }> = {
  fundacion: {
    ring: "ring-[color:var(--color-steel)]/40",
    bar: "bg-[color:var(--color-steel)]",
    label: "Fundación",
    pct: "30%",
  },
  expansion: {
    ring: "ring-[color:var(--color-navy)]/40",
    bar: "bg-[color:var(--color-navy)]",
    label: "Expansión",
    pct: "55%",
  },
  integracion: {
    ring: "ring-[color:var(--color-petroleum)]/45",
    bar: "bg-[color:var(--color-petroleum)]",
    label: "Integración",
    pct: "80%",
  },
  hoy: {
    ring: "ring-[color:var(--color-amber)]/55",
    bar: "bg-[color:var(--color-amber)]",
    label: "En curso",
    pct: "100%",
  },
};

export function AboutTimeline() {
  const reduce = useReducedMotion();

  return (
    <section id="trayectoria" className="section-pad bg-[color:var(--color-bone)]">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <Kicker>Línea de evolución</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
              Más de seis décadas integrando capacidades
            </h2>
            <p className="mt-5 max-w-2xl text-base text-[color:var(--color-steel)]">
              De climatización industrial a una empresa que integra ingeniería,
              instalación, mantenimiento y fabricación metálica desde la misma
              planta.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 max-w-4xl mx-auto">
          <div
            className="relative"
            role="list"
            aria-label="Línea de evolución JSD Air Systems"
          >
            {/* Línea estática */}
            <div
              aria-hidden
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-[color:var(--color-ash-200)]"
            />

            {/* Línea animada (scroll progress) */}
            <motion.div
              aria-hidden
              className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-[color:var(--color-navy)] via-[color:var(--color-petroleum)] to-[color:var(--color-amber)] origin-top"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />

            <div className="space-y-10 sm:space-y-14">
              {ITEMS.map((item, index) => {
                const cfg = STATUS_CONFIG[item.status];
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    role="listitem"
                    initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="relative group"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Avatar circular */}
                      <motion.div
                        whileHover={reduce ? undefined : { scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="relative shrink-0"
                      >
                        <div
                          className={cn(
                            "relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[color:var(--color-bone)] shadow-[var(--shadow-soft)] ring-4",
                            cfg.ring,
                          )}
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[color:var(--color-navy)] flex items-center justify-center">
                              <Icon className="size-5 text-white" />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Card */}
                      <motion.div
                        whileHover={reduce ? undefined : { y: -3 }}
                        transition={{ duration: 0.25 }}
                        className="flex-1 min-w-0"
                      >
                        <div
                          className={cn(
                            "relative rounded-[var(--radius-xl)] border bg-[color:var(--color-paper)]/70 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300",
                            "border-[color:var(--color-ash-200)]",
                            "group-hover:border-[color:var(--color-navy)]/30 group-hover:shadow-[var(--shadow-soft)]",
                          )}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold text-[color:var(--color-ink)] leading-tight">
                                {item.title}
                              </h3>
                              <div className="mt-1 flex items-center gap-2 text-xs text-[color:var(--color-steel)]">
                                <Icon className="size-3.5 text-[color:var(--color-amber)]" />
                                <span className="font-semibold uppercase tracking-[0.18em]">
                                  {item.era}
                                </span>
                              </div>
                            </div>

                            <span
                              className={cn(
                                "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ring-1",
                                cfg.ring,
                                "bg-[color:var(--color-bone)] text-[color:var(--color-ink)]",
                              )}
                            >
                              <span className={cn("h-1.5 w-1.5 rounded-full", cfg.bar)} />
                              {cfg.label}
                            </span>
                          </div>

                          <p className="text-sm sm:text-base text-[color:var(--color-steel)] leading-relaxed mb-4">
                            {item.description}
                          </p>

                          {/* Progress bar */}
                          <div
                            className="h-1 bg-[color:var(--color-ash-200)] rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={parseInt(cfg.pct)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Progreso ${item.era}`}
                          >
                            <motion.div
                              className={cn("h-full rounded-full", cfg.bar)}
                              initial={reduce ? false : { width: 0 }}
                              whileInView={{ width: cfg.pct }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.1,
                                delay: index * 0.18 + 0.5,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
