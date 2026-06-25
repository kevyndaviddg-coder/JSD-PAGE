"use client";

/**
 * ProjectsTeaser v5 — Mouse-tracked floating preview (patrón 21st.dev real).
 *
 * Adaptado de "Project Showcase" (21st.dev — similarity 1.874):
 *  Lista de proyectos donde el cursor controla un preview flotante de la
 *  foto, con lerp smoothing 0.15 para movimiento natural. Cross-fade
 *  entre fotos al cambiar de proyecto. Underline animado en el título,
 *  arrow icon slide-in al hover.
 *
 * Adaptación al estilo JSD:
 *  - Surface paper (light) + grid técnico sutil del sistema.
 *  - Floating preview con border ámbar + shadow profunda + label
 *    categoría sobre la foto (no glass plano genérico).
 *  - Tipografía display industrial + año en mono.
 *  - Click → abre el Lightbox existente.
 *  - Mobile: fallback a grid bento (mouse-track no aplica en touch).
 *  - Reduced motion: lerp desactivado, preview sigue al cursor sin
 *    suavizado pero sin animaciones de entrada/salida.
 *
 * Mantengo: lightbox, PremiumEyebrow, stat editorial, reserved strip,
 * final CTA. Sin inventar proyectos ni datos.
 */

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PremiumEyebrow } from "@/components/ui/PremiumEyebrow";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArrowRightIcon,
  CameraIcon,
  ExpandIcon,
} from "@/components/ui/Icons";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

type Project = {
  image: string;
  category: string;
  title: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    image:
      "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
    category: "Ductería",
    title: "Montaje de ductos espirales con plataforma elevadora",
    year: "2024",
  },
  {
    image: "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
    category: "Ventilación industrial",
    title: "Instalación exterior de ventilación industrial",
    year: "2024",
  },
  {
    image:
      "/media/jsd/07_fabricacion-e-instalacion-de-ductos-circulares-hvac_8k.jpg",
    category: "Ductería circular",
    title: "Fabricación e instalación de ductos circulares HVAC",
    year: "2024",
  },
  {
    image: "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
    category: "HVAC exterior",
    title: "Instalación de ducto exterior sobre cubierta",
    year: "2023",
  },
  {
    image: "/media/jsd/WhatsApp-Image-2025-08-29-at-2.41.36-PM-1.jpg",
    category: "Obra reciente",
    title: "Obra reciente — Climatización industrial",
    year: "2025",
  },
];

const LIGHTBOX_ITEMS: LightboxItem[] = PROJECTS.map((p) => ({
  src: p.image,
  alt: p.title,
  caption: p.title,
  category: p.category,
}));

const RESERVED_BLOCKS = [
  {
    label: "Espacio reservado para nueva obra",
    description:
      "Coordinando aprobación con el cliente para integrar las próximas fotos.",
  },
  {
    label: "Próxima obra documentada",
    description:
      "Redilas, trailas y proyectos especiales se integran al confirmar las fotografías.",
  },
];

/* ════════════════ Main ════════════════ */

export function ProjectsTeaser() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="proyectos"
      className="section-pad relative isolate overflow-hidden bg-[color:var(--color-paper)]"
    >
      {/* Grid técnico sutil consistente con ServicesGrid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,42,71,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,42,71,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative">
        {/* Header editorial */}
        <Reveal>
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <PremiumEyebrow tone="light">Obra real · Proyectos</PremiumEyebrow>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
                Evidencia visual de proyectos ejecutados
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-steel)]">
                Recorre la lista — pasa el cursor sobre cada proyecto para ver
                la foto. Click para ampliarla.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex flex-col items-end gap-1 text-right">
                <span className="font-[family-name:var(--font-display)] text-[60px] font-bold leading-none tracking-tight text-[color:var(--color-amber-700)]/90">
                  {String(PROJECTS.length).padStart(2, "0")}
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-ink)]/55">
                  Obras documentadas
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-steel)]/70">
                  + nuevas obras en revisión
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Desktop: mouse-tracked list. Mobile: grid bento simple */}
        <DesktopShowcase onOpen={setLightboxIndex} />
        <MobileGrid onOpen={setLightboxIndex} />

        {/* Reserved strip */}
        <ReservedStrip />

        {/* Final CTA */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <div
              aria-hidden
              className="h-px w-20 bg-gradient-to-r from-transparent via-[color:var(--color-amber)] to-transparent"
            />
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-navy)] hover:text-[color:var(--color-amber-700)]"
            >
              Ver todos los proyectos
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
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

/* ════════════════ Desktop: mouse-tracked showcase ════════════════ */

function DesktopShowcase({ onOpen }: { onOpen: (i: number) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  // Lerp smoothing 0.15 (patrón ProjectShowcase original)
  useEffect(() => {
    if (reduce) {
      setSmoothPosition(mousePosition);
      return;
    }
    const lerp = (s: number, e: number, f: number) => s + (e - s) * f;
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition, reduce]);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mt-12 hidden lg:block"
    >
      {/* Floating image preview que sigue al cursor */}
      <div
        className="pointer-events-none absolute z-30 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-amber)]/35 shadow-[0_30px_80px_-20px_rgba(15,42,71,0.55)] transition-opacity duration-300 ease-out"
        style={{
          left: 0,
          top: 0,
          width: 360,
          height: 240,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 120}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative h-full w-full bg-[color:var(--color-navy)]">
          {PROJECTS.map((p, i) => (
            <Image
              key={p.title}
              src={p.image}
              alt={p.title}
              fill
              sizes="360px"
              className="object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === i ? 1 : 0,
                transform:
                  hoveredIndex === i ? "scale(1)" : "scale(1.08)",
                filter: hoveredIndex === i ? "none" : "blur(6px)",
              }}
            />
          ))}
          {/* Overlay con categoría */}
          {hoveredIndex !== null && (
            <>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/85 via-[color:var(--color-ink)]/20 to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)] shadow-[0_0_8px_rgba(255,184,28,0.55)]" />
                  {PROJECTS[hoveredIndex].category}
                </span>
                <span className="font-[family-name:var(--font-display)] text-[10px] font-semibold tracking-[0.22em] text-white/85">
                  {PROJECTS[hoveredIndex].year}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lista de proyectos */}
      <ul className="relative">
        {PROJECTS.map((project, index) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={index}
            isHovered={hoveredIndex === index}
            onEnter={() => {
              setHoveredIndex(index);
              setIsVisible(true);
            }}
            onLeave={() => {
              setHoveredIndex(null);
              setIsVisible(false);
            }}
            onClick={() => onOpen(index)}
          />
        ))}
        {/* Borde inferior de la lista */}
        <li
          aria-hidden
          className="h-px w-full bg-[color:var(--color-ink)]/12"
        />
      </ul>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  isHovered,
  onEnter,
  onLeave,
  onClick,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative block cursor-pointer border-t border-[color:var(--color-ink)]/12"
    >
      {/* Highlight bg en hover */}
      <div
        className={cn(
          "absolute inset-0 -mx-4 rounded-lg px-4 transition-all duration-300 ease-out",
          isHovered
            ? "scale-100 bg-[color:var(--color-amber)]/[0.04] opacity-100"
            : "scale-95 opacity-0",
        )}
      />
      <div className="relative flex items-start justify-between gap-6 py-7">
        {/* Index + content */}
        <div className="flex flex-1 items-start gap-6">
          <span
            className={cn(
              "shrink-0 font-[family-name:var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.32em] transition-colors duration-300",
              isHovered
                ? "text-[color:var(--color-amber-700)]"
                : "text-[color:var(--color-ink)]/35",
            )}
          >
            /{String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber-700)]">
              {project.category}
            </span>
            <div className="mt-1 inline-flex items-center gap-2.5">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-tight tracking-tight text-[color:var(--color-ink)] sm:text-[22px]">
                <span className="relative">
                  {project.title}
                  {/* Underline animada */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-[color:var(--color-ink)] transition-all duration-300 ease-out",
                      isHovered ? "w-full" : "w-0",
                    )}
                  />
                </span>
              </h3>
              <ArrowRightIcon
                className={cn(
                  "size-4 -rotate-45 transition-all duration-300 ease-out",
                  isHovered
                    ? "translate-x-0 translate-y-0 text-[color:var(--color-ink)] opacity-100"
                    : "-translate-x-2 translate-y-2 text-[color:var(--color-ink)]/40 opacity-0",
                )}
              />
            </div>
          </div>
        </div>

        {/* Year + click hint */}
        <div className="flex shrink-0 items-center gap-4">
          <span
            className={cn(
              "hidden sm:inline-flex font-[family-name:var(--font-display)] text-xs font-semibold tabular-nums tracking-tight transition-colors duration-300",
              isHovered
                ? "text-[color:var(--color-ink)]/70"
                : "text-[color:var(--color-ink)]/40",
            )}
          >
            {project.year}
          </span>
          <ExpandIcon
            className={cn(
              "size-3.5 transition-colors duration-300",
              isHovered
                ? "text-[color:var(--color-amber-700)]"
                : "text-[color:var(--color-ink)]/30",
            )}
          />
        </div>
      </div>
    </motion.li>
  );
}

/* ════════════════ Mobile: grid bento ════════════════ */

function MobileGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
      {PROJECTS.map((p, i) => (
        <motion.li
          key={p.title}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className={cn("list-none", i === 0 && "col-span-2")}
        >
          <button
            type="button"
            onClick={() => onOpen(i)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-navy)] text-left shadow-[var(--shadow-soft)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[color:var(--color-amber)]"
            aria-label={`Ampliar imagen: ${p.title}`}
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(max-width: 1024px) 50vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)]" />
              {p.category}
            </span>
            <div className="absolute inset-x-3 bottom-3 text-white">
              <h3 className="title-shadow font-[family-name:var(--font-display)] text-[13px] font-semibold leading-tight">
                {p.title}
              </h3>
            </div>
          </button>
        </motion.li>
      ))}
    </ul>
  );
}

/* ════════════════ Reserved strip ════════════════ */

function ReservedStrip() {
  return (
    <Reveal>
      <div className="mt-16 sm:mt-20">
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-ink)]/45">
            En coordinación / Próximas obras
          </span>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-[color:var(--color-ink)]/15 to-transparent"
          />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {RESERVED_BLOCKS.map((r) => (
            <li
              key={r.label}
              className="reserved-grid relative flex flex-col gap-2 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-ink)]/15 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-navy)]" />
                  Reservado
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--color-amber)]/25 bg-[color:var(--color-amber)]/10 text-[color:var(--color-amber-700)]">
                  <CameraIcon className="size-3.5" />
                </span>
              </div>
              <h4 className="font-[family-name:var(--font-display)] text-[15px] font-semibold leading-tight text-[color:var(--color-ink)] sm:text-base">
                {r.label}
              </h4>
              <p className="text-[12.5px] leading-relaxed text-[color:var(--color-steel)] sm:text-[13px]">
                {r.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
