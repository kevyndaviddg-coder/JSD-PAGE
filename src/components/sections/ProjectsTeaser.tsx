"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { ReservedMediaBlock } from "@/components/ui/ReservedMediaBlock";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { ArrowRightIcon, ExpandIcon } from "@/components/ui/Icons";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";

type Tile = {
  image: string;
  category: string;
  title: string;
  span?: "wide" | "tall" | "default";
};

const PROJECTS: Tile[] = [
  {
    image: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    category: "Ductería",
    title: "Montaje de ductos espirales con plataforma elevadora",
    span: "wide",
  },
  {
    image: "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
    category: "Ventilación industrial",
    title: "Instalación exterior de ventilación industrial",
  },
  {
    image: "/media/jsd/07_fabricacion-e-instalacion-de-ductos-circulares-hvac_8k.jpg",
    category: "Ductería circular",
    title: "Fabricación e instalación de ductos circulares HVAC",
    span: "tall",
  },
  {
    image: "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
    category: "HVAC exterior",
    title: "Instalación de ducto exterior sobre cubierta",
  },
  {
    image: "/media/jsd/WhatsApp-Image-2025-08-29-at-2.41.36-PM-1.jpg",
    category: "Trabajo reciente",
    title: "Obra reciente 2025",
  },
];

const LIGHTBOX_ITEMS: LightboxItem[] = PROJECTS.map((p) => ({
  src: p.image,
  alt: p.title,
  caption: p.title,
  category: p.category,
}));

export function ProjectsTeaser() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="proyectos" className="section-pad bg-[color:var(--color-paper)]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <Kicker>Case studies — obra real</Kicker>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
                Evidencia visual de proyectos ejecutados
              </h2>
              <p className="mt-4 text-base text-[color:var(--color-steel)] max-w-xl">
                Selección de obras reales de JSD. Click en cualquier proyecto
                para ampliarlo. Algunos espacios quedan reservados con diseño
                premium mientras se aprueba material adicional.
              </p>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-amber)]"
            >
              Ver todos los proyectos <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </Reveal>

        <RevealStagger
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:auto-rows-[210px]"
          stagger={0.07}
        >
          {PROJECTS.map((p, i) => (
            <RevealItem
              key={p.title}
              className={
                p.span === "wide"
                  ? "col-span-2 lg:row-span-2"
                  : p.span === "tall"
                    ? "lg:row-span-2"
                    : ""
              }
            >
              <motion.button
                type="button"
                onClick={() => setLightboxIndex(i)}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block h-full min-h-[210px] w-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-bone)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--color-amber)]"
                aria-label={`Ampliar imagen: ${p.title}`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm ring-1 ring-white/20">
                  {p.category}
                </span>
                <span className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-white/20">
                  <ExpandIcon className="size-3.5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="title-shadow font-[family-name:var(--font-display)] text-base sm:text-lg font-semibold leading-tight text-white">
                    {p.title}
                  </h3>
                </div>
              </motion.button>
            </RevealItem>
          ))}
          <RevealItem>
            <ReservedMediaBlock
              ratio="4/3"
              label="Espacio reservado para nueva obra"
              description="Coordinando aprobación con el cliente para integrar las próximas fotos."
              className="!aspect-auto h-full min-h-[210px]"
            />
          </RevealItem>
          <RevealItem>
            <ReservedMediaBlock
              ratio="4/3"
              label="Pendiente de material visual"
              description="Redilas, trailas y proyectos especiales se integrarán al confirmar las fotografías."
              className="!aspect-auto h-full min-h-[210px]"
            />
          </RevealItem>
        </RevealStagger>
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          items={LIGHTBOX_ITEMS}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
