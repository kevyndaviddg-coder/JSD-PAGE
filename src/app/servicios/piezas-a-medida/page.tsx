import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Piezas a medida y proyectos especiales",
  description:
    "Piezas bajo plano, armado, acabado y entregables para proyectos industriales especiales.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Piezas a medida / proyectos especiales"
        subtitle="Piezas bajo plano o especificación: armado, acabado y entregables para proyectos industriales no estandarizados. La capacidad de fabricación interna nos permite atender requerimientos puntuales."
        image="/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Piezas a medida" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Piezas a medida y proyectos especiales",
          paragraphs: [
            "Cuando el catálogo no resuelve, fabricamos a medida. Atendemos bases de equipos, soportes, bastidores, piezas metálicas no estándar y proyectos puntuales bajo plano del cliente o desarrollo conjunto.",
            "Cada pieza pasa por validación dimensional antes de salir del taller.",
          ],
        }}
        benefits={[
          "Fabricación bajo plano o especificación",
          "Acabados industriales",
          "Validación dimensional",
          "Tiempos cortos al producir internamente",
          "Coordinación con instalación HVAC cuando aplica",
          "Trazabilidad del material",
        ]}
        applications={[
          "Bases y soportes para equipos",
          "Bastidores y estructuras puntuales",
          "Piezas no estandarizadas",
          "Proyectos especiales bajo plano",
        ]}
        process={[
          { title: "Plano o boceto", description: "Recibimos o levantamos el requerimiento." },
          { title: "Validación técnica", description: "Confirmamos viabilidad y materiales." },
          { title: "Fabricación", description: "Corte, armado y acabado." },
          { title: "Entrega", description: "Validación dimensional y entrega documentada." },
        ]}
        gallery={[
          "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
          null,
          null,
          null,
        ]}
      />
    </>
  );
}
