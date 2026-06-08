"use client";

/**
 * ServicesGrid v4 — "Light Premium Industrial" (blueprint editorial).
 *
 * Punto de partida:
 *  v2 era light pero plana / catálogo SaaS.
 *  v3 era dark cinematográfica pero rompía con el resto de secciones light
 *  (Process timeline + Capabilities CNC ya son dark, demasiado dark seguido).
 *  v4 combina:
 *   – Surface clara (paper) con grid técnico tipo blueprint navy 4.5%.
 *   – Ambient orbs tenues (ámbar + navy al 8% blur 140px) para profundidad.
 *   – Dark cards (navy + foto) flotando sobre la superficie clara → contraste
 *     fuerte sin que la sección se sienta pesada.
 *   – Índice mono ámbar grande por familia + hairline ámbar animada.
 *   – Tienda ribbon con cards light tenue (sin imagen) — contrasta con las
 *     cards oscuras de servicios y se lee como "secundaria".
 *
 * Patrones 21st.dev / premium implementados (de verdad):
 *  · "Blueprint surface" — grid técnico navy 4.5% en bg paper, evoca papel
 *    técnico industrial.
 *  · "Ambient depth orbs" — pattern Vercel/Linear traído a light (ámbar +
 *    navy al 8%, blur 140px).
 *  · "Top hairline" — separador ámbar editorial.
 *  · "Editorial mono index" — número grande mono ámbar/85 + label
 *    "Familia / 03" + hairline scaleX por familia.
 *  · "Spotlight Dark Card on Light" — las cards son las únicas piezas
 *    oscuras de la sección. Lift fuerte con shadow ámbar al active.
 *  · "Glass strip bottom" — bottom strip de la card con backdrop-blur y
 *    título + short siempre visibles.
 *  · "Inset border-glow" — sin layout shift, border ámbar/40 al active.
 *  · "Minimal product ribbon" — tienda ribbon clarísimamente subordinada
 *    en tonos light tenue (bg-bone + ash border), sin imágenes, icon-only.
 *  · "Cinematic light CTA" — chip + display copy con ámbar spans + 2
 *    buttons centered, sin caja contenedora.
 *
 * Motion:
 *  · `viewport={{ once: false, amount: 0.25 }}` en cards + headers
 *    → repetible al subir y bajar.
 *  · `cardVariants` con `custom={index}` para stagger 0.07s.
 *  · `familyHeaderVariants` para entrada del bloque editorial.
 *  · Hairline ámbar `scaleX` `origin-left` 0.8s por familia.
 *  · `useInView` margin ±25% por card → spotlight ámbar + inset border.
 *  · Respeta `prefers-reduced-motion`.
 *
 * Título nuevo (vs v3 plano "Lo que JSD diseña, fabrica e instala hoy"):
 *  H2: "HVAC, ductería y fabricación industrial — bajo una sola operación
 *       técnica."
 *  Sub: "Diseñamos, fabricamos e instalamos los sistemas que mantienen tu
 *        operación industrial corriendo. Sin proveedores intermedios."
 *  · Frontload de capacidades (HVAC + ductería + fabricación).
 *  · "Una sola operación técnica" en ámbar — el verdadero diferenciador.
 *  · Sub concreto, verbo de acción, beneficio operacional para el cliente,
 *    cierre punzante de competitividad ("sin proveedores intermedios").
 */

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  LayersIcon,
  TruckIcon,
  WhatsAppIcon,
  WindIcon,
  ZapIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import {
  serviceFamilies,
  tiendaProducts,
  whatsappLink,
  type FamilyService,
  type ServiceFamily,
  type TiendaProduct,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const FAMILY_ICONS = {
  wind: WindIcon,
  layers: LayersIcon,
  zap: ZapIcon,
} as const;

/* ════════════════ Motion variants ════════════════ */

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.07,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const familyHeaderVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ════════════════ Main ════════════════ */

export function ServicesGrid() {
  return (
    <section
      id="servicios"
      className="section-pad relative isolate overflow-hidden bg-[color:var(--color-paper)]"
    >
      {/* ── Depth layers (light premium) ───────────────────── */}

      {/* 1. Grid técnico tipo blueprint — navy 4.5% */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,42,71,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,42,71,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* 2. Orb ámbar top-right — apenas perceptible, sin "tint amarillento" */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-[color:var(--color-amber)]/[0.04] blur-[160px]"
      />

      {/* 3. Orb navy bottom-left — frío de contraste */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[color:var(--color-navy)]/8 blur-[140px]"
      />

      {/* 4. Hairlines top + bottom — separadores editoriales */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-amber)]/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ink)]/15 to-transparent"
      />

      <Container className="relative">
        <SectionHeader />

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {serviceFamilies.map((family, idx) => (
            <FamilyModule key={family.chip} family={family} index={idx} />
          ))}
        </div>

        <TiendaRibbon />
        <FinalCTA />
      </Container>
    </section>
  );
}

/* ════════════════ Section header ════════════════ */

function SectionHeader() {
  return (
    <Reveal>
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <Kicker>Capacidades</Kicker>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-[42px] lg:text-[52px]">
            HVAC, ductería y fabricación industrial — bajo{" "}
            <span className="text-[color:var(--color-amber-700)]">
              una sola operación técnica
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-steel)] sm:text-[17px]">
            Diseñamos, fabricamos e instalamos los sistemas que mantienen tu
            operación industrial corriendo. Sin proveedores intermedios.
          </p>
        </div>

        {/* Stat editorial — capacidades cuantificadas */}
        <div className="hidden lg:block">
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="font-[family-name:var(--font-display)] text-[64px] font-bold leading-none tracking-tight text-[color:var(--color-amber-700)]">
              08
            </span>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-ink)]/55">
              Servicios técnicos
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-steel)]/70">
              + 03 productos en preparación
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ════════════════ Family module ════════════════ */

function FamilyModule({
  family,
  index,
}: {
  family: ServiceFamily;
  index: number;
}) {
  const reduce = useReducedMotion();
  const FamilyIcon = FAMILY_ICONS[family.icon];
  const isLast = index === serviceFamilies.length - 1;

  const cardCount = family.services.length;
  const gridCols =
    cardCount >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 lg:max-w-5xl";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={familyHeaderVariants}
      className="relative"
    >
      {/* Editorial header */}
      <div className="mb-8 sm:mb-10">
        {/* Index mono ámbar + label */}
        <div className="flex items-baseline gap-4">
          <span className="font-[family-name:var(--font-display)] text-[56px] font-bold leading-none tracking-tight text-[color:var(--color-amber-700)]/90 sm:text-[72px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-ink)]/45">
            Familia / {String(serviceFamilies.length).padStart(2, "0")}
          </span>
        </div>

        {/* Hairline ámbar animada */}
        <motion.span
          aria-hidden
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mt-3 block h-px w-20 origin-left bg-gradient-to-r from-[color:var(--color-amber)] to-[color:var(--color-amber)]/0"
        />

        {/* Chip + title + body */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-amber)]/40 bg-[color:var(--color-amber)]/8 px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber-700)]">
              <FamilyIcon className="size-3.5" />
              {family.chip}
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[22px] font-semibold leading-[1.15] tracking-tight text-[color:var(--color-ink)] sm:text-[28px] lg:text-[32px]">
              {family.title}
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-steel)] sm:text-[15px]">
            {family.body}
          </p>
        </div>
      </div>

      {/* Service cards grid */}
      <ul
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5",
          gridCols,
        )}
      >
        {family.services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </ul>

      {/* Module divider — sólo entre familias */}
      {!isLast && (
        <div
          aria-hidden
          className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--color-ink)]/12 to-transparent sm:mt-28"
        />
      )}
    </motion.div>
  );
}

/* ════════════════ Service card (dark on light) ════════════════ */

function ServiceCard({
  service,
  index,
}: {
  service: FamilyService;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement | null>(null);
  const isActive = useInView(ref, {
    margin: "-25% 0px -25% 0px",
    once: false,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <motion.li
      ref={ref}
      custom={index}
      variants={reduce ? undefined : cardVariants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: false, amount: 0.25 }}
      className="list-none"
    >
      <Link
        href={service.href}
        className={cn(
          "group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-navy)] transition-shadow duration-700",
          "shadow-[0_18px_45px_-22px_rgba(15,42,71,0.45)]",
          isActive
            ? "shadow-[0_28px_70px_-22px_rgba(15,42,71,0.55)]"
            : "hover:shadow-[0_25px_60px_-20px_rgba(15,42,71,0.5)]",
        )}
        onMouseEnter={() => {
          if (videoRef.current && !reduce)
            videoRef.current.play().catch(() => {});
        }}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      >
        {/* Foto base */}
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
        />

        {/* Video hover preview */}
        {service.video && (
          <video
            ref={videoRef}
            src={service.video}
            muted
            playsInline
            loop
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Velo dinámico — foto se "enciende" al active */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-colors duration-700",
            isActive
              ? "bg-[color:var(--color-ink)]/20"
              : "bg-[color:var(--color-ink)]/48",
          )}
        />

        {/* Gradiente bottom — legibilidad del strip */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/95 via-[color:var(--color-ink)]/35 to-transparent"
        />

        {/* Active spotlight ámbar */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-700",
            isActive ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(circle at 30% 0%, rgba(255,184,28,0.20), transparent 60%)",
          }}
        />

        {/* Top — category chip + index mono */}
        <div className="absolute inset-x-5 top-5 flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-amber)]" />
            {service.category}
          </span>
          <span className="font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-tight text-white/55">
            /{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom — glass strip con título + short siempre visible */}
        <div className="absolute inset-x-4 bottom-4 rounded-[var(--radius-lg)] border border-white/10 bg-[color:var(--color-ink)]/60 p-4 backdrop-blur-md transition-[border-color,background-color] duration-500 group-hover:border-[color:var(--color-amber)]/40 group-hover:bg-[color:var(--color-ink)]/70 sm:p-5">
          <h4 className="title-shadow font-[family-name:var(--font-display)] text-[16px] font-semibold leading-tight text-white sm:text-[17px]">
            {service.title}
          </h4>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/80 line-clamp-2 sm:text-[13px]">
            {service.short}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber)] transition-transform group-hover:translate-x-1">
              Ver detalle <ArrowRightIcon className="size-3" />
            </span>
            {service.video && (
              <span className="font-[family-name:var(--font-display)] text-[9px] font-bold uppercase tracking-[0.32em] text-[color:var(--color-amber)]/75">
                • Video
              </span>
            )}
          </div>
        </div>

        {/* Active inset border-glow — sin layout shift */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] transition-shadow duration-700",
            isActive
              ? "shadow-[inset_0_0_0_1px_rgba(255,184,28,0.45)]"
              : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
          )}
        />
      </Link>
    </motion.li>
  );
}

/* ════════════════ Tienda ribbon (light tenue) ════════════════ */

function TiendaRibbon() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-24 sm:mt-32">
      <Reveal>
        <div className="border-t border-[color:var(--color-ink)]/12 pt-10 sm:pt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ink)]/15 bg-white px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                <TruckIcon className="size-3.5 text-[color:var(--color-amber)]" />
                Próximamente en tienda industrial
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[22px] font-semibold leading-tight text-[color:var(--color-ink)] sm:text-[26px]">
                Catálogo de productos industriales en preparación.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-steel)] sm:text-[15px]">
                Refacciones, redilas, bases y partes industriales se integran al
                catálogo en línea cuando se publique la tienda. Mientras tanto,
                se cotizan directo.
              </p>
            </div>
            <span className="font-[family-name:var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--color-ink)]/35">
              03 / En preparación
            </span>
          </div>
        </div>
      </Reveal>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
        {tiendaProducts.map((p, i) => (
          <TiendaCard key={p.title} product={p} index={i} reduce={!!reduce} />
        ))}
      </ul>
    </div>
  );
}

function TiendaCard({
  product,
  index,
  reduce,
}: {
  product: TiendaProduct;
  index: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const isActive = useInView(ref, {
    margin: "-25% 0px -25% 0px",
    once: false,
  });

  return (
    <motion.li
      ref={ref}
      custom={index}
      variants={reduce ? undefined : cardVariants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: false, amount: 0.25 }}
      className="list-none"
    >
      <Link
        href={product.href}
        className={cn(
          "group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border bg-[color:var(--color-bone)] p-5 transition-all duration-500 sm:p-6",
          isActive
            ? "border-[color:var(--color-amber)]/35 shadow-[var(--shadow-soft)]"
            : "border-[color:var(--color-ash-200)]",
          "hover:-translate-y-0.5 hover:border-[color:var(--color-amber)]/45 hover:shadow-[var(--shadow-lift)]",
        )}
      >
        {/* Top — chip + icono */}
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-ink)]/15 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-navy)]" />
            Producto
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--color-amber)]/25 bg-[color:var(--color-amber)]/10 text-[color:var(--color-amber-700)] transition-colors group-hover:border-[color:var(--color-amber)]/50">
            <TruckIcon className="size-3.5" />
          </span>
        </div>

        {/* Body */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-base font-semibold leading-tight text-[color:var(--color-ink)] sm:text-[17px]">
            {product.title}
          </h4>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[color:var(--color-steel)] line-clamp-2 sm:text-[13px]">
            {product.short}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber-700)] transition-transform group-hover:translate-x-1">
            {product.hint} <ArrowRightIcon className="size-3" />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

/* ════════════════ Final CTA — cinematográfico light ════════════════ */

function FinalCTA() {
  return (
    <Reveal>
      <div className="relative mt-24 text-center sm:mt-32">
        {/* Hairline ámbar superior */}
        <div
          aria-hidden
          className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--color-amber)] to-transparent sm:mb-14"
        />
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ink)]/15 bg-white px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
          Catálogo completo
        </span>
        <p className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-display)] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--color-ink)] sm:text-[34px] lg:text-[40px]">
          Cada servicio con su{" "}
          <span className="text-[color:var(--color-amber-700)]">
            proceso técnico, aplicaciones
          </span>{" "}
          y galería de obra real.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/servicios" variant="dark" size="lg">
            Ver servicios completos
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button
            href={whatsappLink("Hola JSD, quiero cotizar un proyecto técnico.")}
            target="_blank"
            variant="whatsapp"
            size="lg"
          >
            <WhatsAppIcon className="size-4" />
            Cotizar proyecto
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
