import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Qué es un sistema HVAC y cómo elegir el adecuado para tu empresa?",
  description:
    "Guía práctica para entender qué considerar al evaluar un sistema HVAC industrial o comercial: cargas térmicas, eficiencia, normativa y mantenimiento.",
};

export default function PostPage() {
  return (
    <>
      <PageHero
        kicker="Guía técnica · 7 nov 2025"
        title="¿Qué es un sistema HVAC y cómo elegir el adecuado para tu empresa?"
        subtitle="Un repaso útil para responsables de planta, facility managers y áreas técnicas que evalúan instalar o renovar un sistema de climatización."
        image="/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "¿Qué es un sistema HVAC?" },
        ]}
      />

      <Section variant="default">
        <Container size="narrow">
          <Reveal>
            <article className="prose-jsd">
              <h2>¿Qué significa HVAC?</h2>
              <p>
                HVAC viene del inglés <em>Heating, Ventilation and Air Conditioning</em>:
                calefacción, ventilación y aire acondicionado. En México la mayor parte
                de los proyectos industriales y comerciales se enfocan en climatización
                (frío) y ventilación, integrando equipos como chillers, manejadoras,
                ductería y tuberías de agua helada.
              </p>

              <h2>Factores clave para elegir el sistema correcto</h2>
              <ol>
                <li>
                  <strong>Carga térmica del espacio.</strong> Depende del giro, ocupación,
                  procesos, iluminación, ventanas y orientación. Determina la capacidad
                  de enfriamiento necesaria.
                </li>
                <li>
                  <strong>Tipo de operación.</strong> ¿24/7? ¿Turnos? ¿Con procesos
                  críticos? Cambia la redundancia y los planes de mantenimiento.
                </li>
                <li>
                  <strong>Eficiencia energética.</strong> Equipos modernos pueden reducir
                  significativamente el consumo eléctrico, lo que impacta directo en TCO.
                </li>
                <li>
                  <strong>Normativa aplicable.</strong> El diseño debe orientarse al
                  cumplimiento técnico y normativo aplicable según el giro y la ubicación.
                </li>
                <li>
                  <strong>Mantenimiento posterior.</strong> Un buen sistema mal mantenido
                  pierde eficiencia y vida útil en cuestión de meses.
                </li>
              </ol>

              <h2>Errores comunes que evitamos en JSD</h2>
              <ul>
                <li>Cotizar sin levantamiento técnico en sitio.</li>
                <li>Sobredimensionar el equipo &laquo;para asegurar&raquo;.</li>
                <li>Olvidar la ductería y tratarla como segundo plano.</li>
                <li>No considerar plan de mantenimiento desde el inicio.</li>
              </ul>

              <h2>El proceso JSD</h2>
              <p>
                Trabajamos en 4 etapas: levantamiento e ingeniería, diseño y cotización,
                fabricación e instalación, y puesta en marcha con mantenimiento.
                Nuestra capacidad de fabricación interna de ductería y piezas a medida
                permite tiempos cortos y calidad consistente.
              </p>
            </article>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href={whatsappLink("Hola JSD, quiero hablar con un ingeniero sobre HVAC.")}
                target="_blank"
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon className="size-5" /> Hablar con un ingeniero
              </Button>
              <Link
                href="/servicios/instalacion-hvac"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-navy)] hover:text-[color:var(--color-amber)]"
              >
                Ver servicio de instalación HVAC <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
