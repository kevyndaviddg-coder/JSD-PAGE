"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { ReservedMediaBlock } from "@/components/ui/ReservedMediaBlock";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ExpandIcon } from "@/components/ui/Icons";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";

const CATEGORIES = ["Todos", "HVAC industrial", "Ductería", "Ventilación", "Fabricación metálica", "Mantenimiento"] as const;

const PROJECTS = [
  {
    image: "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
    category: "Ventilación",
    title: "Instalación exterior de ventilación industrial",
  },
  {
    image: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
    category: "HVAC industrial",
    title: "Climatización industrial en nave de producción",
  },
  {
    image: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
    category: "Ductería",
    title: "Instalación de ductería aislada en interior industrial",
  },
  {
    image: "/media/jsd/05_ducteria-metalica-para-almacen-industrial_8k.jpg",
    category: "Ductería",
    title: "Ductería metálica para almacén industrial",
  },
  {
    image: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    category: "Ductería",
    title: "Montaje de ductos espirales con plataforma elevadora",
  },
  {
    image: "/media/jsd/07_fabricacion-e-instalacion-de-ductos-circulares-hvac_8k.jpg",
    category: "Ductería",
    title: "Fabricación e instalación de ductos circulares HVAC",
  },
  {
    image: "/media/jsd/08_ducteria-expuesta-para-oficinas-comerciales_8k.jpg",
    category: "HVAC industrial",
    title: "Ductería expuesta para oficinas comerciales",
  },
  {
    image: "/media/jsd/09_sistema-de-ductos-industriales-en-nave_8k.jpg",
    category: "HVAC industrial",
    title: "Sistema de ductos industriales en nave",
  },
  {
    image: "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
    category: "Ventilación",
    title: "Instalación de ducto exterior sobre cubierta",
  },
  {
    image: "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
    category: "Fabricación metálica",
    title: "Fabricación e instalación de bases para equipos HVAC",
  },
  {
    image: "/media/jsd/WhatsApp-Image-2025-08-29-at-2.41.36-PM-1.jpg",
    category: "HVAC industrial",
    title: "Obra reciente 2025",
  },
];

export default function ProyectosPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const filtered =
    filter === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const items: LightboxItem[] = filtered.map((p) => ({
    src: p.image,
    alt: p.title,
    caption: p.title,
    category: p.category,
  }));

  return (
    <>
      <PageHero
        kicker="Obras y trabajos"
        title="Proyectos y obras representativas"
        subtitle="Selección de trabajos ejecutados por JSD. No publicamos nombres ni logos de clientes sin autorización; cuando esté aprobado, se integran a esta galería."
        image="/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Proyectos" }]}
      />

      <Section variant="default">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <Kicker className="mr-3">Filtros</Kicker>
              {CATEGORIES.map((c) => (
                <motion.button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    filter === c
                      ? "border-[color:var(--color-navy)] bg-[color:var(--color-navy)] text-white"
                      : "border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] text-[color:var(--color-steel)] hover:text-[color:var(--color-navy)]"
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </Reveal>

          <RevealStagger
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {filtered.map((p, i) => (
              <RevealItem key={`${p.title}-${filter}`}>
                <motion.button
                  type="button"
                  onClick={() => setLbIndex(i)}
                  whileHover={reduce ? undefined : { y: -4 }}
                  whileTap={reduce ? undefined : { scale: 0.985 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative w-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-bone)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--color-amber)]"
                  aria-label={`Ampliar imagen: ${p.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
                    />
                    <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm ring-1 ring-white/20">
                      {p.category}
                    </span>
                    <span className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-white/20">
                      <ExpandIcon className="size-3.5" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[color:var(--color-ink)]">
                      {p.title}
                    </h3>
                  </div>
                </motion.button>
              </RevealItem>
            ))}

            {filter === "Todos" &&
              [1, 2, 3].map((i) => (
                <RevealItem key={`reserved-${i}`}>
                  <ReservedMediaBlock
                    ratio="4/3"
                    label="Material visual en revisión"
                    description="Coordinando aprobación con el cliente para publicar esta obra."
                  />
                </RevealItem>
              ))}
          </RevealStagger>
        </Container>
      </Section>

      <ContactCTA />

      {lbIndex !== null && (
        <Lightbox items={items} startIndex={lbIndex} onClose={() => setLbIndex(null)} />
      )}
    </>
  );
}
