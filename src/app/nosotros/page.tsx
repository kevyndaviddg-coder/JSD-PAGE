import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { ContactCTA } from "@/components/sections/ContactCTA";
import {
  ShieldCheckIcon,
  GaugeIcon,
  WrenchIcon,
  HardHatIcon,
  FactoryIcon,
  WindIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Nosotros — Más de 60 años en HVAC industrial",
  description:
    "Conoce a JSD Air Systems: 60+ años especializados en ingeniería, instalación, mantenimiento y fabricación HVAC industrial y comercial.",
};

const PILLARS = [
  {
    icon: HardHatIcon,
    title: "Ingeniería",
    body: "Cálculos térmicos, levantamientos en sitio y propuestas técnicas con criterio industrial.",
    image: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
  },
  {
    icon: FactoryIcon,
    title: "Instalación",
    body: "Montaje especializado de chillers, ductería, tuberías de agua helada y soluciones metálicas con personal técnico.",
    image: "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
  },
  {
    icon: WrenchIcon,
    title: "Mantenimiento",
    body: "Planes preventivos y correctivos para equipos industriales, eléctricos, mecánicos y de climatización.",
    image: "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
  },
];

const CAPACITIES = [
  { icon: WindIcon, label: "Climatización industrial y comercial" },
  { icon: FactoryIcon, label: "HVAC para naves de producción" },
  { icon: WrenchIcon, label: "Mantenimiento preventivo y correctivo" },
  { icon: GaugeIcon, label: "Tuberías de agua helada" },
  { icon: ShieldCheckIcon, label: "Diseño técnico bajo plano y especificación del cliente" },
  { icon: HardHatIcon, label: "Personal técnico especializado" },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        kicker="Acerca de JSD"
        title="Más de 60 años construyendo confianza técnica"
        subtitle="En JSD Air Systems somos especialistas en ingeniería, instalación y mantenimiento de sistemas HVAC industriales y comerciales. Trabajamos climatización, ventilación, ductería y tuberías de agua helada en proyectos industriales de gran escala."
        image="/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
      />

      <Section variant="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <Kicker>Nuestro propósito</Kicker>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Soluciones diseñadas a la medida, ejecutadas con precisión técnica.
              </h2>
              <p className="mt-5 text-[color:var(--color-steel)] leading-relaxed">
                Nuestro compromiso es brindar a cada cliente un sistema de
                climatización diseñado a la medida, optimizando tiempo, costo y
                desempeño en cada proyecto. Trabajamos en plantas industriales,
                edificios comerciales y espacios residenciales bajo criterio
                técnico industrial.
              </p>
              <p className="mt-4 text-[color:var(--color-steel)] leading-relaxed">
                Hoy ampliamos nuestras capacidades con fabricación metálica,
                corte CNC láser y plasma, redilas, trailas y piezas a medida
                bajo plano. Una sola empresa para HVAC y fabricación industrial.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
                <Stat value="60+" label="Años" hint="Trayectoria continua" />
                <Stat value="11" label="Capacidades" hint="HVAC + Fabricación" />
                <Stat value="Programado" label="Mantenimiento" hint="Preventivo y correctivo" />
                <Stat value="A la medida" label="Criterio técnico industrial" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lift)]">
                <Image
                  src="/media/jsd/PHOTO-2023-03-06-11-39-22-4.jpg"
                  alt="Equipo JSD trabajando en sitio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Pilares */}
      <Section variant="bone">
        <Container>
          <Reveal>
            <Kicker>Tres pilares</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl max-w-2xl">
              Ingeniería, instalación y mantenimiento como una sola disciplina.
            </h2>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-6 md:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, body, image }) => (
              <RevealItem key={title}>
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-paper)] shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div aria-hidden className="absolute inset-0 media-overlay-bottom" />
                  </div>
                  <div className="p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[color:var(--color-navy)] text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-ink)]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--color-steel)] leading-relaxed">{body}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Capacidades */}
      <Section variant="default">
        <Container>
          <Reveal>
            <Kicker>Capacidad industrial</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl max-w-2xl">
              Lo que ejecutamos hoy
            </h2>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPACITIES.map(({ icon: Icon, label }) => (
              <RevealItem key={label}>
                <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--color-navy)] text-white">
                    <Icon className="size-4" />
                  </span>
                  <p className="text-sm text-[color:var(--color-ink)] leading-snug">{label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal>
            <div className="mt-12 rounded-[var(--radius-xl)] border border-[color:var(--color-ash-200)] bg-[color:var(--color-bone)] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-ink)]">
                    Compromisos técnicos
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {[
                      "Levantamiento técnico antes de cotizar",
                      "Supervisión propia en obra",
                      "Diseño técnico bajo plano del cliente",
                      "Reporte de pruebas y puesta en marcha",
                    ].map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-[color:var(--color-steel)]">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-[color:var(--color-amber)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href="/contacto" variant="dark" size="lg">
                  Cotiza tu próximo proyecto
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
