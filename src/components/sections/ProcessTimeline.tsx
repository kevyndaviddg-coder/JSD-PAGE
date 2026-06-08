"use client";

/**
 * ProcessTimeline — 4 etapas del proceso de cotización JSD.
 *
 * Patrón base: 21st.dev "How It Works" (Magic MCP inspiration, similarity 0.549)
 * — numbered connector con línea horizontal arriba, cards individuales con
 * icon container, title + description + benefits list con checkmarks.
 *
 * Adaptación industrial JSD:
 * - Fondo dark + video sutil (mantengo del pase anterior).
 * - 4 etapas (no 3 como el patrón) — el connector se ajusta a 4 columnas.
 * - Benefits list con CheckIcon real (no fake bullets).
 * - Cada card glass + hover lift + whileTap microinteracción.
 * - Motion (motion/react) — sin framer-motion.
 */

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import {
  ArrowRightIcon,
  CheckIcon,
  CogIcon,
  FactoryIcon,
  HardHatIcon,
  PhoneIcon,
  WhatsAppIcon,
  WrenchIcon,
} from "@/components/ui/Icons";
import { whatsappLink, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    icon: HardHatIcon,
    title: "Levantamiento e ingeniería",
    body: "Analizamos necesidades, hacemos cálculos térmicos y definimos la solución técnica adecuada al espacio y proceso.",
    benefits: [
      "Visita en sitio sin compromiso",
      "Cálculo térmico y de cargas",
      "Solución técnica documentada",
    ],
  },
  {
    n: "02",
    icon: CogIcon,
    title: "Diseño técnico y cotización",
    body: "Preparamos propuesta, alcance, materiales, equipos y tiempos de ejecución con criterio técnico industrial.",
    benefits: [
      "Plano técnico + memoria",
      "Selección de equipos y materiales",
      "Cronograma de obra",
    ],
  },
  {
    n: "03",
    icon: FactoryIcon,
    title: "Fabricación e instalación",
    body: "Producimos ductería propia, integramos equipos y montamos chillers, agua helada y soluciones metálicas con personal técnico.",
    benefits: [
      "Ductería fabricada en planta JSD",
      "Personal técnico especializado",
      "Supervisión en obra",
    ],
  },
  {
    n: "04",
    icon: WrenchIcon,
    title: "Puesta en marcha y mantenimiento",
    body: "Pruebas, verificación de eficiencia y planes de mantenimiento preventivo y correctivo posteriores.",
    benefits: [
      "Pruebas y balanceo",
      "Reporte de entrega",
      "Plan de mantenimiento opcional",
    ],
  },
];

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="cotizar"
      className="section-pad relative isolate overflow-hidden bg-[color:var(--color-ink)] text-white"
    >
      <div aria-hidden className="absolute inset-0">
        <video
          ref={videoRef}
          src="/media/jsd/video/proceso-campo.mp4"
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/90 via-[color:var(--color-ink)]/80 to-[color:var(--color-ink)]/95" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Kicker tone="bone">Cotiza tu proyecto</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[48px]">
              Un proceso estructurado que asegura{" "}
              <span className="text-[color:var(--color-amber)]">calidad y cumplimiento</span>
            </h2>
            <p className="mt-5 text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Cada proyecto sigue cuatro etapas claras. Así sabes en todo
              momento qué entregable recibes y cuándo entra a operación.
            </p>
          </div>
        </Reveal>

        {/* Numbered connector — adoptado del patrón "How It Works" */}
        <Reveal>
          <div className="relative mx-auto mt-14 hidden w-full max-w-4xl md:block">
            <motion.div
              aria-hidden
              className="absolute left-[12.5%] top-1/2 h-0.5 w-[75%] -translate-y-1/2 bg-gradient-to-r from-[color:var(--color-steel)]/30 via-[color:var(--color-amber)]/50 to-[color:var(--color-amber)] origin-left"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="relative grid grid-cols-4">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.15,
                    type: "spring",
                    stiffness: 220,
                  }}
                  className="flex h-10 w-10 items-center justify-center justify-self-center rounded-full bg-[color:var(--color-amber)] font-[family-name:var(--font-display)] text-sm font-bold text-white ring-4 ring-[color:var(--color-ink)] shadow-[var(--shadow-soft)]"
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Steps grid */}
        <RevealStagger
          className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          stagger={0.1}
        >
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <RevealItem key={s.n}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative h-full rounded-[var(--radius-xl)] glass-card p-6 sm:p-7",
                    "transition-all duration-300 hover:bg-white/[0.09] hover:border-[color:var(--color-amber)]/40",
                  )}
                >
                  {/* Icon container — adoptado del HowItWorks pattern */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber)] ring-1 ring-[color:var(--color-amber)]/20">
                    <Icon className="size-5" />
                  </div>

                  {/* Title + step indicator */}
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white leading-tight">
                      {s.title}
                    </h3>
                    <span className="ml-2 font-[family-name:var(--font-display)] text-xl font-bold text-[color:var(--color-amber)]/60">
                      {s.n}
                    </span>
                  </div>

                  <p className="text-sm text-white/75 leading-relaxed mb-5">
                    {s.body}
                  </p>

                  {/* Benefits list con CheckIcon — adoptado del HowItWorks */}
                  <ul className="space-y-2.5 mt-auto pt-4 border-t border-white/10">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-amber)]/25 ring-1 ring-[color:var(--color-amber)]/40">
                          <CheckIcon className="size-2.5 text-[color:var(--color-amber)]" />
                        </span>
                        <span className="text-xs text-white/85 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealStagger>

        {/* CTA */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={whatsappLink("Hola JSD, quiero iniciar un levantamiento técnico.")}
              target="_blank"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon className="size-5" /> Cotizar por WhatsApp
            </Button>
            <Button href={site.contact.phoneMobileHref} variant="outlineLight" size="lg">
              <PhoneIcon className="size-4" /> Llamar ahora
            </Button>
            <Button href="/contacto" variant="ghost" size="lg" className="text-white hover:bg-white/10">
              Formulario completo <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
