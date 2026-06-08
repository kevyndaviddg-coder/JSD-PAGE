import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Servicios — Capacidades integrales en HVAC y fabricación industrial",
  description:
    "Catálogo completo de servicios JSD Air Systems: instalación HVAC, ductería metálica, tuberías de agua helada, mantenimiento, climatización industrial, fabricación metálica CNC, redilas y piezas a medida.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        kicker="Capacidades integrales"
        title="Servicios en HVAC, climatización y fabricación industrial"
        subtitle="Diseñamos, instalamos y damos mantenimiento a sistemas de climatización de gran escala, asegurando eficiencia energética, seguridad y confiabilidad en cada proyecto."
        image="/media/jsd/05_ducteria-metalica-para-almacen-industrial_8k.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      <Section variant="default">
        <Container>
          <Reveal>
            <Kicker>Por qué JSD</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl max-w-3xl">
              Aliado confiable para la industria y el sector comercial.
            </h2>
            <p className="mt-5 max-w-2xl text-[color:var(--color-steel)] leading-relaxed">
              Nuestro personal técnico especializado ejecuta cada proyecto
              bajo supervisión propia. Ofrecemos sistemas de climatización
              diseñados a la medida y fabricación metálica en taller propio
              para ductería, estructuras, redilas y piezas especiales bajo
              plano.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ServicesGrid />
      <ContactCTA />
    </>
  );
}
