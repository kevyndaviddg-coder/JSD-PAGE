"use client";

/**
 * TiendaIndustrial — Escaparate comercial B2B compacto (v2).
 *
 * Un solo escaparate interactivo reemplaza la cadena anterior de bloques
 * casi-redundantes (banner / producto destacado / carrusel / 4 tarjetas de
 * ventajas / banda CTA). Ahora: encabezado breve → escaparate (foto + panel
 * cristal + selector de categoría animado) → franja de confianza compacta →
 * cierre comercial. Solo dos acciones se repiten (arriba/abajo): "Explorar
 * tienda industrial" y "Cotizar un producto" / "Solicitar fabricación a
 * medida". Dentro del escaparate la única acción es "Ver categoría" (link),
 * una acción distinta (navegar) que no compite con las dos anteriores.
 *
 * Dirección visual (21st.dev + UI/UX Pro Max): patrón "product spotlight /
 * collection selector" — foto protagonista con panel de cristal premium
 * (mismo lenguaje que el botón `glass` ya usado en el Hero) y un selector de
 * categoría con indicador activo animado (`layoutId`), no una galería de
 * tarjetas repetidas.
 *
 * Movimiento (Motion): crossfade coordinado foto+texto al cambiar de
 * categoría, indicador activo con spring, swipe con `drag="x"` + resistencia
 * elástica, hover/focus con profundidad sutil. Respeta prefers-reduced-motion
 * (sin drag ni transiciones de posición, solo fade).
 *
 * Sin datos comerciales falsos: no hay precios, descuentos, reseñas ni stock.
 */

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PremiumEyebrow } from "@/components/ui/PremiumEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  FactoryIcon,
  LayersIcon,
  ShieldCheckIcon,
  TruckIcon,
  WhatsAppIcon,
  WrenchIcon,
  ZapIcon,
} from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ════════════════ Datos comerciales (reales) ════════════════ */

type ShopCategory = {
  title: string;
  short: string;
  tag: string;
  image: string;
  icon: typeof TruckIcon;
  href: string;
};

const CATEGORIES: ShopCategory[] = [
  {
    title: "Bases y soportes",
    short:
      "Bases metálicas y soportes industriales fabricados a la medida del equipo HVAC y el sitio.",
    tag: "Fabricación bajo plano",
    image:
      "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
    icon: LayersIcon,
    href: "/servicios/piezas-a-medida",
  },
  {
    title: "Redilas y trailas",
    short:
      "Estructuras para transporte y maniobra industrial fabricadas bajo especificación.",
    tag: "Bajo plano",
    image: "/media/jsd/WhatsApp-Image-2025-08-29-at-2.41.36-PM-1.jpg",
    icon: TruckIcon,
    href: "/servicios/redilas-trailas",
  },
  {
    title: "Refacciones y filtros HVAC",
    short:
      "Partes y consumibles para equipos instalados por JSD y por terceros.",
    tag: "Suministro",
    image: "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
    icon: WrenchIcon,
    href: "/tienda",
  },
  {
    title: "Accesorios y componentes",
    short:
      "Componentes y accesorios para sistemas HVAC e instalaciones industriales.",
    tag: "Consulta disponibilidad",
    image: "/media/jsd/09_sistema-de-ductos-industriales-en-nave_8k.jpg",
    icon: CogIcon,
    href: "/tienda",
  },
  {
    title: "Fabricación especial bajo plano",
    short:
      "Piezas y estructuras no estandarizadas: corte CNC, soldadura y acabado.",
    tag: "A medida",
    image:
      "/media/jsd/07_fabricacion-e-instalacion-de-ductos-circulares-hvac_8k.jpg",
    icon: ZapIcon,
    href: "/servicios/fabricacion-metalica-cnc",
  },
];

const TRUST = [
  { icon: FactoryIcon, label: "Fabricación propia bajo plano" },
  { icon: ShieldCheckIcon, label: "Asesoría técnica directa" },
  { icon: TruckIcon, label: "Suministro y reposición" },
];

/* ════════════════ Sección ════════════════ */

export function TiendaIndustrial() {
  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden bg-[color:var(--color-bone)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ink)]/12 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,42,71,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,42,71,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[color:var(--color-amber)]/[0.06] blur-[120px]"
      />

      <Container className="relative py-20 sm:py-28">
        {/* ── Encabezado comercial breve ── */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <PremiumEyebrow tone="light">
              Tienda industrial · Catálogo JSD
            </PremiumEyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[28px] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-ink)] sm:text-[36px] lg:text-[42px]">
              Todo lo que tu instalación necesita,{" "}
              <span className="text-[color:var(--color-amber-700)]">
                en un solo lugar
              </span>
              .
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--color-steel)] sm:text-[15px]">
              Refacciones, bases, soportes y fabricación especial — suministrados
              y fabricados directo por JSD.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap items-center gap-3">
            <Button href="/tienda" variant="primary" size="lg">
              Explorar tienda industrial
              <ArrowRightIcon className="size-4" />
            </Button>
          </Reveal>
        </div>

        {/* ── Escaparate interactivo (foto + selector animado) ── */}
        <ShowcaseSelector />

        {/* ── Cierre comercial ── */}
        <Reveal>
          <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-[color:var(--color-navy)] shadow-[var(--shadow-lift)] sm:mt-12">
            <div className="relative flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--color-amber)]/15 blur-3xl"
              />
              <h3 className="relative font-[family-name:var(--font-display)] text-[22px] font-semibold leading-tight text-white sm:text-[26px] lg:text-[28px]">
                ¿Listo para equipar tu instalación?
              </h3>
              <div className="relative flex flex-wrap items-center gap-3">
                <Button href="/tienda" variant="primary" size="lg">
                  Explorar tienda industrial
                  <ArrowRightIcon className="size-4" />
                </Button>
                <Button
                  href={whatsappLink(
                    "Hola JSD, necesito fabricación a medida bajo plano.",
                  )}
                  target="_blank"
                  variant="outlineLight"
                  size="lg"
                >
                  <WhatsAppIcon className="size-5" />
                  Solicitar fabricación a medida
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ──────────── Escaparate: foto + panel cristal + selector ──────────── */

function ShowcaseSelector() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];
  const total = CATEGORIES.length;
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const go = (i: number) => setActive(((i % total) + total) % total);
  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  // La categoría activa del selector siempre debe quedar visible, sin
  // importar el método de cambio (click, swipe, teclado o flechas).
  useEffect(() => {
    pillRefs.current[active]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active, reduce]);

  const handleKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 60;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  return (
    <div className="mt-10 sm:mt-12">
      {/* Escenario: foto protagonista + panel cristal */}
      <div
        role="group"
        aria-roledescription="escaparate de categoría"
        aria-label="Categoría destacada de la tienda"
        tabIndex={0}
        onKeyDown={handleKey}
        className="relative h-[440px] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-ink)]/10 shadow-[var(--shadow-lift)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bone)] sm:h-[480px] lg:h-[520px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cat.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: EASE }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
              draggable={false}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/85 via-[color:var(--color-ink)]/20 to-transparent sm:bg-gradient-to-r sm:from-[color:var(--color-ink)]/80 sm:via-[color:var(--color-ink)]/35 sm:to-transparent"
            />
          </motion.div>
        </AnimatePresence>

        {/* Panel de cristal premium con la info comercial — fijo a la
            izquierda, centrado verticalmente, en todos los breakpoints. En
            móvil se reduce ancho/padding para no cubrir casi toda la foto y
            para dejar espacio a las flechas laterales en escritorio. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-start p-4 sm:p-10 sm:pl-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cat.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              className="pointer-events-auto max-w-[13rem] rounded-[var(--radius-lg)] border border-white/20 bg-white/10 p-3.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:max-w-md sm:p-6"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-amber)]/45 bg-[color:var(--color-amber)]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {cat.tag}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[18px] font-semibold leading-tight text-white sm:text-[22px] lg:text-[26px]">
                {cat.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-white/85 sm:text-[13px] lg:text-[14px]">
                {cat.short}
              </p>
              <Link
                href={cat.href}
                className="group mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber)] outline-none focus-visible:underline sm:mt-4"
              >
                Ver categoría
                <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flechas — en escritorio, en los extremos de la imagen sin
            empalmar con el panel de cristal (que arranca después de pl-24).
            En móvil se ocultan aquí: viven debajo de la imagen junto al
            contador, en una zona independiente que no cubre contenido. */}
        <div className="absolute inset-x-3 top-1/2 hidden -translate-y-1/2 items-center justify-between sm:flex">
          <CarouselArrow direction="prev" ariaLabel="Categoría anterior" onClick={prev} />
          <CarouselArrow direction="next" ariaLabel="Categoría siguiente" onClick={next} />
        </div>

        {/* Contador discreto — en escritorio, esquina inferior derecha de la
            imagen, sin tocar el panel de cristal (izquierda). */}
        <div className="absolute bottom-4 right-4 hidden sm:block">
          <ShowcaseCounter active={active} total={total} variant="glass" />
        </div>
      </div>

      {/* Zona independiente móvil: flechas + contador debajo de la imagen,
          sin cubrir contenido. En escritorio no se renderiza (las flechas y
          el contador ya viven sobre la imagen). */}
      <div className="mt-3 flex items-center justify-between gap-3 sm:hidden">
        <CarouselArrow direction="prev" ariaLabel="Categoría anterior" onClick={prev} />
        <ShowcaseCounter active={active} total={total} variant="plain" />
        <CarouselArrow direction="next" ariaLabel="Categoría siguiente" onClick={next} />
      </div>

      {/* Selector de categoría — pills con indicador activo animado */}
      <div
        role="tablist"
        aria-label="Seleccionar categoría"
        className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          const isActive = i === active;
          return (
            <button
              key={c.title}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => go(i)}
              className={cn(
                "relative shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-[12.5px] font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bone)]",
                isActive
                  ? "text-white"
                  : "text-[color:var(--color-steel)] hover:text-[color:var(--color-ink)]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="tiendaActivePill"
                  className="absolute inset-0 rounded-full bg-[color:var(--color-navy)] shadow-[var(--shadow-soft)]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="size-3.5" />
                {c.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Franja de confianza compacta */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 rounded-[var(--radius-lg)] border border-[color:var(--color-ink)]/10 bg-white/70 px-5 py-3.5 backdrop-blur-sm sm:gap-x-8">
        {TRUST.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[color:var(--color-ink)]/75 sm:text-[12.5px]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-amber)]/12 text-[color:var(--color-amber-700)]">
              <Icon className="size-3.5" />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────── Contador discreto "01 / 05" ──────────── */

function ShowcaseCounter({
  active,
  total,
  variant,
}: {
  active: number;
  total: number;
  variant: "glass" | "plain";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold tabular-nums tracking-[0.08em]",
        variant === "glass"
          ? "border border-white/25 bg-white/10 text-white backdrop-blur-md"
          : "border border-[color:var(--color-ink)]/10 bg-white/70 text-[color:var(--color-steel)]",
      )}
    >
      {String(active + 1).padStart(2, "0")}
      <span className="opacity-60">/</span>
      {String(total).padStart(2, "0")}
    </span>
  );
}

/* ──────────── Flecha del escaparate ──────────── */

function CarouselArrow({
  direction,
  ariaLabel,
  onClick,
}: {
  direction: "prev" | "next";
  ariaLabel: string;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="group pointer-events-auto inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white outline-none backdrop-blur-md transition-all duration-300 hover:border-[color:var(--color-amber)]/70 hover:bg-[color:var(--color-amber)] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/55 focus-visible:ring-offset-2 sm:h-12 sm:w-12"
    >
      <Icon
        className={cn(
          "size-4 transition-transform duration-300 sm:size-[18px]",
          direction === "prev"
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5",
        )}
      />
    </button>
  );
}
