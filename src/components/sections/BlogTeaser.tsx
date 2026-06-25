"use client";

/**
 * BlogTeaser v5 — Magazine featured + mouse-tracked upcoming list.
 *
 * Bloque featured:
 *  - Layout magazine: imagen side + content panel side con tipografía
 *    editorial display y meta-tags.
 *
 * Bloque "Próximos recursos":
 *  - Adopta el patrón "Project Showcase" de 21st.dev (similarity 1.874):
 *    lista editorial con cursor-tracked preview flotante. Aquí el preview
 *    muestra el icono + título del recurso en una mini-card glass.
 *  - Coherente con la sección de Proyectos (mismo patrón → ritmo del home).
 *  - Reduced motion: lerp desactivado.
 */

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PremiumEyebrow } from "@/components/ui/PremiumEyebrow";
import {
  ArrowRightIcon,
  LayersIcon,
  WrenchIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const FEATURED = {
  slug: "que-es-un-sistema-hvac",
  title: "¿Qué considerar antes de instalar un sistema HVAC industrial?",
  excerpt:
    "Guía práctica de decisiones técnicas: cargas térmicas, eficiencia, ductería, mantenimiento y criterios de selección de equipos para proyectos industriales y comerciales.",
  date: "7 de noviembre, 2025",
  category: "Guía técnica",
  readTime: "8 min de lectura",
  image: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
  metaTags: ["HVAC industrial", "Diseño térmico", "Selección de equipos"],
};

type UpcomingRecord = {
  title: string;
  category: string;
  icon: typeof WrenchIcon;
  preview: string;
};

const UPCOMING: UpcomingRecord[] = [
  {
    title: "Mantenimiento preventivo HVAC: cómo reducir paros y costos",
    category: "Mantenimiento",
    icon: WrenchIcon,
    preview:
      "Análisis editorial del equipo técnico sobre planes de mantenimiento programado.",
  },
  {
    title: "Ductería y ventilación industrial: claves de eficiencia",
    category: "Ductería",
    icon: LayersIcon,
    preview:
      "Buenas prácticas en diseño, fabricación e instalación de ductería metálica.",
  },
];

const TOPICS = [
  "HVAC industrial",
  "Ductería metálica",
  "Mantenimiento preventivo",
  "Fabricación CNC",
];

export function BlogTeaser() {
  return (
    <section id="blog" className="section-pad bg-[color:var(--color-bone)]">
      <Container>
        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <PremiumEyebrow tone="light">Recursos · Guías técnicas</PremiumEyebrow>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
                Centro de conocimiento técnico
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-steel)] sm:text-[17px]">
                Recursos editoriales preparados por el equipo técnico de JSD.
                Decisiones, criterios y buenas prácticas para proyectos HVAC
                industriales.
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-1.5 sm:max-w-xs sm:justify-end">
              {TOPICS.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center rounded-full border border-[color:var(--color-ink)]/12 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink)]/65 backdrop-blur-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Featured magazine card */}
        <FeaturedCard />

        {/* Próximos recursos — mouse-tracked list */}
        <UpcomingShowcase />

        {/* Final CTA */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <div
              aria-hidden
              className="h-px w-20 bg-gradient-to-r from-transparent via-[color:var(--color-amber)] to-transparent"
            />
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-navy)] hover:text-[color:var(--color-amber-700)]"
            >
              Ver todo el blog
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════ Featured magazine card ════════════════ */

function FeaturedCard() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="mt-12"
    >
      <Link
        href={`/blog/${FEATURED.slug}`}
        className="group relative grid overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-paper)] shadow-[var(--shadow-soft)] transition-[border-color,box-shadow] duration-500 hover:border-[color:var(--color-amber)]/35 hover:shadow-[var(--shadow-lift)] lg:grid-cols-[1.1fr_1fr]"
      >
        {/* Image side */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-navy)] lg:aspect-auto lg:min-h-[460px]">
          <Image
            src={FEATURED.image}
            alt={FEATURED.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-[color:var(--color-ink)]/55 via-transparent to-[color:var(--color-ink)]/10"
          />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)] shadow-[0_0_8px_rgba(255,184,28,0.55)]" />
              {FEATURED.category}
            </span>
            <span className="font-[family-name:var(--font-display)] text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/85">
              {FEATURED.readTime}
            </span>
          </div>
          <span className="absolute bottom-6 left-7 font-[family-name:var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.32em] text-white/65">
            /01 · Artículo destacado
          </span>
        </div>

        {/* Content side */}
        <div className="flex flex-col gap-5 p-6 sm:p-8 lg:gap-6 lg:p-10">
          <div className="flex items-center gap-4">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-steel)]">
              {FEATURED.date}
            </span>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-[color:var(--color-ink)]/15 to-transparent"
            />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-[22px] font-semibold leading-[1.15] text-[color:var(--color-ink)] sm:text-[26px] lg:text-[30px]">
            {FEATURED.title}
          </h3>
          <p className="text-[14px] leading-relaxed text-[color:var(--color-steel)] sm:text-[15px] lg:text-[15.5px]">
            {FEATURED.excerpt}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {FEATURED.metaTags.map((m) => (
              <li
                key={m}
                className="inline-flex items-center rounded-full border border-[color:var(--color-amber)]/25 bg-[color:var(--color-amber)]/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber-700)]"
              >
                {m}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber-700)] transition-transform group-hover:translate-x-1">
            Leer artículo completo
            <ArrowRightIcon className="size-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ════════════════ Upcoming mouse-tracked showcase ════════════════ */

function UpcomingShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

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

  const HoveredIcon =
    hoveredIndex !== null ? UPCOMING[hoveredIndex].icon : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mt-14"
    >
      {/* Header del bloque */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-ink)]/55">
          Próximos recursos / En preparación
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-[color:var(--color-ink)]/15 to-transparent"
        />
      </div>

      {/* Floating preview que sigue al cursor (desktop) */}
      <div
        className="pointer-events-none absolute z-30 hidden overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-amber)]/35 bg-[color:var(--color-paper)]/95 shadow-[0_25px_60px_-20px_rgba(15,42,71,0.5)] backdrop-blur-md transition-opacity duration-300 ease-out lg:block"
        style={{
          left: 0,
          top: 0,
          width: 300,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 80}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {hoveredIndex !== null && HoveredIcon && (
          <div className="flex items-start gap-3 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[color:var(--color-amber)]/25 bg-[color:var(--color-amber)]/10 text-[color:var(--color-amber-700)]">
              <HoveredIcon className="size-4" />
            </span>
            <div className="min-w-0">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink)]/45">
                Vista previa · {UPCOMING[hoveredIndex].category}
              </span>
              <p className="mt-1.5 text-[12.5px] leading-snug text-[color:var(--color-ink)]/80">
                {UPCOMING[hoveredIndex].preview}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lista upcoming */}
      <ul>
        {UPCOMING.map((u, i) => (
          <UpcomingRow
            key={u.title}
            item={u}
            index={i}
            isHovered={hoveredIndex === i}
            onEnter={() => {
              setHoveredIndex(i);
              setIsVisible(true);
            }}
            onLeave={() => {
              setHoveredIndex(null);
              setIsVisible(false);
            }}
          />
        ))}
        <li
          aria-hidden
          className="h-px w-full bg-[color:var(--color-ink)]/12"
        />
      </ul>
    </div>
  );
}

function UpcomingRow({
  item,
  index,
  isHovered,
  onEnter,
  onLeave,
}: {
  item: UpcomingRecord;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const reduce = useReducedMotion();
  const Icon = item.icon;
  const num = String(index + 2).padStart(2, "0");

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative block cursor-default border-t border-[color:var(--color-ink)]/12"
    >
      <div
        className={cn(
          "absolute inset-0 -mx-4 rounded-lg px-4 transition-all duration-300 ease-out",
          isHovered
            ? "scale-100 bg-[color:var(--color-amber)]/[0.04] opacity-100"
            : "scale-95 opacity-0",
        )}
      />
      <div className="relative flex items-start justify-between gap-6 py-6 sm:py-7">
        <div className="flex flex-1 items-start gap-5">
          {/* Index mono */}
          <span
            className={cn(
              "shrink-0 font-[family-name:var(--font-display)] text-[28px] font-bold leading-none tracking-tight transition-colors duration-300 sm:text-[36px]",
              isHovered
                ? "text-[color:var(--color-amber-700)]"
                : "text-[color:var(--color-amber-700)]/40",
            )}
          >
            /{num}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-amber)]/25 bg-[color:var(--color-amber)]/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber-700)]">
                <Icon className="size-3" />
                {item.category}
              </span>
            </div>
            <h4 className="mt-3 font-[family-name:var(--font-display)] text-[16px] font-semibold leading-tight text-[color:var(--color-ink)] sm:text-[17px]">
              <span className="relative">
                {item.title}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-[color:var(--color-ink)]/40 transition-all duration-300 ease-out",
                    isHovered ? "w-full" : "w-0",
                  )}
                />
              </span>
            </h4>
          </div>
        </div>

        <span
          className={cn(
            "shrink-0 font-[family-name:var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.32em] transition-colors duration-300",
            isHovered
              ? "text-[color:var(--color-ink)]/55"
              : "text-[color:var(--color-ink)]/35",
          )}
        >
          En preparación
        </span>
      </div>
    </motion.li>
  );
}
