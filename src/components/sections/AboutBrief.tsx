"use client";

/**
 * AboutBrief — Sección "Más de 60 años de trayectoria".
 *
 * Refactor de este pase:
 * - Se quita el Kicker tipo rayita "— MÁS DE 60 AÑOS DE TRAYECTORIA"
 *   (feedback del usuario: no le gusta esa estética).
 * - Heading reforzado con tracking display más fuerte, sin badge encima.
 * - Composición foto+mini-galería rediseñada como stacked media (patrón
 *   editorial premium):
 *     - Imagen principal grande con overlay editorial bottom (eyebrow +
 *       título de obra).
 *     - 3 tarjetas pequeñas con `whileInView` stagger desplazadas para
 *       sensación de columna acomodada (offset alterno).
 * - Copy editorial industrial: trayectoria + alcance + evolución hacia
 *   fabricación y CNC.
 * - Motion: reveal stagger en imágenes, hover lift, parallax sutil en la
 *   foto principal.
 * - Sin claims falsos (sin años exactos ni certificaciones).
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

const MINI_GALLERY: Array<{ src: string; caption: string; offset?: string }> = [
  {
    src: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
    caption: "Ductería aislada en interior industrial",
  },
  {
    src: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    caption: "Montaje de ductos espirales",
    offset: "sm:translate-y-8",
  },
  {
    src: "/media/jsd/PHOTO-2023-03-06-11-39-22-4.jpg",
    caption: "Trabajo en sitio",
  },
];

export function AboutBrief() {
  const reduce = useReducedMotion();

  return (
    <section id="acerca" className="section-pad bg-[color:var(--color-paper)]">
      <Container>
        {/* Heading — sin Kicker rayita. Eyebrow chico amber + título display fuerte. */}
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-amber)]">
              Acerca de JSD
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-5xl lg:text-[60px]">
              Más de seis décadas de oficio en{" "}
              <span className="text-[color:var(--color-navy)]">climatización industrial</span>,{" "}
              hoy integrando{" "}
              <span className="text-[color:var(--color-amber)]">fabricación metálica</span>.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-steel)] sm:text-lg">
              JSD Air Systems desarrolla proyectos de climatización y HVAC para
              plantas industriales, edificios comerciales y espacios
              especializados. Hoy ampliamos el alcance con corte CNC láser y
              plasma, ductería propia, estructuras, soportes y piezas a la
              medida bajo plano.
            </p>
          </div>
        </Reveal>

        {/* Stats limpios bajo el heading, sin Kicker, sin "1965+" */}
        <Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            <Stat value="60+" label="Años de trayectoria" hint="Generación continua" />
            <Stat value="HVAC" label="Industrial y comercial" hint="Chillers · ductería · agua helada" />
            <Stat value="CNC" label="Láser y plasma" hint="Ductería · estructuras · piezas" />
            <Stat value="Técnico" label="Personal especializado" hint="Instalación y mantenimiento" />
          </div>
        </Reveal>

        {/* Stacked media composition (patrón editorial: foto principal + 3 columnas con offset) */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Foto editorial principal */}
          <Reveal>
            <motion.figure
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lift)]">
                <Image
                  src="/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg"
                  alt="Climatización industrial en nave de producción ejecutada por JSD"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 media-overlay-side" />
                <figcaption className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-amber)]">
                    <span aria-hidden className="h-px w-6 bg-[color:var(--color-amber)]" />
                    Obra real
                  </span>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug max-w-md text-white">
                    Climatización industrial en nave de producción
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          </Reveal>

          {/* Bloque editorial copy + CTA */}
          <Reveal delay={0.05}>
            <div>
              <p className="text-base leading-relaxed text-[color:var(--color-steel)]">
                Nuestra ingeniería se aplica tanto a sistemas HVAC y agua helada
                como a ductería propia, estructuras y piezas metálicas bajo
                plano. Cada proyecto combina diseño técnico, fabricación en
                planta JSD e instalación supervisada.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[color:var(--color-ink)]">
                {[
                  "Diseño térmico y selección de equipos",
                  "Ductería propia: galvanizado, inoxidable, aluminio",
                  "Tuberías de agua helada y sistemas de ventilación",
                  "Fabricación metálica con corte CNC láser y plasma",
                  "Mantenimiento preventivo y correctivo posterior",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-amber)]" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/nosotros" variant="dark" size="md">
                  Saber más de JSD
                  <ArrowRightIcon className="size-4" />
                </Button>
                <Button href="/servicios" variant="outline" size="md">
                  Ver capacidades
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mini galería editorial — stagger con offset alterno */}
        <RevealStagger className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5" stagger={0.12}>
          {MINI_GALLERY.map((g, i) => (
            <RevealItem key={g.src}>
              <motion.figure
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-[var(--radius-lg)] aspect-[4/3] shadow-[var(--shadow-soft)] ${
                  g.offset ?? ""
                }`}
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.06]"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium leading-snug">
                  {g.caption}
                </figcaption>
              </motion.figure>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
