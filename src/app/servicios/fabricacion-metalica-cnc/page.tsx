import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Fabricación metálica y CNC plasma / láser",
  description:
    "Corte CNC plasma y láser, fabricación de ductería, estructuras, soportes y piezas a medida bajo plano o especificación.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Fabricación metálica y CNC"
        subtitle="Capacidad de fabricación propia: corte CNC plasma y láser, ductería, estructuras metálicas, soportes y piezas a medida bajo plano. Complementamos cada proyecto HVAC con producción interna."
        image="/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Fabricación metálica y CNC" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Fabricación metálica y CNC",
          paragraphs: [
            "Integramos capacidades de corte CNC plasma y láser para producir ductería, bases para equipos, estructuras metálicas y piezas especiales con precisión milimétrica.",
            "La fabricación interna reduce tiempos de obra, garantiza calidad consistente y permite atender requerimientos no estandarizados que un proveedor externo no resuelve.",
          ],
        }}
        benefits={[
          "Corte CNC plasma y láser de alta precisión",
          "Reducción de tiempos de obra",
          "Trazabilidad completa del material",
          "Acabados industriales de alta resistencia",
          "Fabricación bajo plano o especificación",
          "Coordinación directa con el equipo HVAC",
        ]}
        applications={[
          "Bases para equipos HVAC",
          "Soportes estructurales",
          "Ductería rectangular y espiral",
          "Piezas a medida bajo plano",
          "Estructuras y bastidores",
        ]}
        process={[
          { title: "Plano técnico", description: "Recibimos o desarrollamos el plano con el cliente." },
          { title: "Programación CNC", description: "Optimización de corte y consumo de material." },
          { title: "Fabricación y armado", description: "Corte, soldadura y acabado en planta." },
          { title: "Entrega o instalación", description: "Entrega en sitio o instalación con cuadrilla JSD." },
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
