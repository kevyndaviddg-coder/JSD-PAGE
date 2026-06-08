"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArrowRightIcon,
  CheckIcon,
  LayersIcon,
  ScissorsIcon,
  ZapIcon,
  TruckIcon,
  CogIcon,
} from "@/components/ui/Icons";

const CAPABILITIES = [
  { icon: ZapIcon, label: "Corte CNC láser de alta precisión" },
  { icon: ScissorsIcon, label: "Corte plasma CNC" },
  { icon: LayersIcon, label: "Fabricación de ductería propia" },
  { icon: CogIcon, label: "Estructuras metálicas, soportes y bases" },
  { icon: TruckIcon, label: "Redilas y trailas industriales (en desarrollo)" },
  { icon: CheckIcon, label: "Armado, soldadura, acabado e instalación" },
];

/**
 * Hook: pausa un <video> cuando sale del viewport para no consumir CPU.
 */
function useViewportVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [ref]);
}

export function CapabilitiesCNC() {
  const reduce = useReducedMotion();
  const mainVideo = useRef<HTMLVideoElement | null>(null);
  const altVideo = useRef<HTMLVideoElement | null>(null);
  useViewportVideo(mainVideo);
  useViewportVideo(altVideo);

  return (
    <section className="section-pad surface-dark relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-amber)]/15 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="space-y-4">
              {/* Video láser principal */}
              <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-white/10 shadow-[var(--shadow-glow)]">
                <video
                  ref={mainVideo}
                  src="/media/jsd/video/cnc-laser.mp4"
                  poster="/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-navy)]/70 via-transparent to-transparent"
                />
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-amber)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Corte láser CNC · en operación
                </div>
              </div>

              {/* Video secundario + foto */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-[var(--radius-lg)] border border-white/10"
                >
                  <video
                    ref={altVideo}
                    src="/media/jsd/video/cnc-laser-2.mp4"
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
                    Detalle de corte láser
                  </span>
                </motion.div>
                <motion.div
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-[var(--radius-lg)] border border-white/10"
                >
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg')" }}
                    role="img"
                    aria-label="Fabricación de bases metálicas para equipos HVAC"
                  />
                  <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
                    Bases para equipos HVAC
                  </span>
                </motion.div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Kicker tone="bone">Fabricación · CNC láser · proyectos a medida</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[48px]">
              Fabricación metálica, corte láser y{" "}
              <span className="text-[color:var(--color-amber)]">proyectos a la medida</span>.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              Además de HVAC y climatización, JSD fabrica ductería propia,
              estructuras, soportes y piezas especiales bajo plano. Redilas,
              trailas y proyectos especiales se suman al alcance
              progresivamente.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CAPABILITIES.map(({ icon: Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={reduce ? undefined : { x: 4 }}
                  className="flex items-start gap-3 rounded-[var(--radius-md)] glass-card p-4"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber)]">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm text-white/90 leading-snug">{label}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/servicios/fabricacion-metalica-cnc" variant="primary" size="md">
                Conocer fabricación CNC
                <ArrowRightIcon className="size-4" />
              </Button>
              <Button href="/servicios/redilas-trailas" variant="outlineLight" size="md">
                Redilas y trailas
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
