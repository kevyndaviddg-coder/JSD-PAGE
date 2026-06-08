import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Fabricación de redilas y trailas industriales",
  description:
    "Redilas y trailas industriales fabricadas a la medida bajo especificación. Estructura, herrería, soldadura y acabados.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Redilas y trailas"
        subtitle="Fabricación de redilas y trailas industriales con acabados a la medida y bajo especificación. Aprovechamos la misma planta de fabricación metálica que respalda los proyectos HVAC."
        image="/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Redilas y trailas" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Fabricación de redilas y trailas",
          paragraphs: [
            "Construimos redilas y trailas industriales adaptadas a cada operación: capacidad de carga, dimensiones, accesos, suspensión y acabado. Cada unidad pasa por revisión estructural antes de entregarse.",
            "El material visual completo de esta capacidad está en preparación. Estamos coordinando con el cliente para integrar nuevas fotografías de unidades recientes.",
          ],
        }}
        benefits={[
          "Diseño a la medida",
          "Estructura, herrería y soldadura supervisadas",
          "Acabados industriales de alta resistencia",
          "Trazabilidad del material",
          "Coordinación con proveedores de suspensión / eje",
          "Entrega documentada",
        ]}
        applications={[
          "Transporte interno de planta",
          "Movimiento de equipos HVAC",
          "Logística industrial",
          "Proyectos especiales bajo plano",
        ]}
        process={[
          { title: "Definición técnica", description: "Capacidad, dimensiones y especificación." },
          { title: "Plano y cotización", description: "Plano formal con materiales y tiempos." },
          { title: "Fabricación", description: "Estructura, soldadura y acabado." },
          { title: "Entrega", description: "Pruebas, documentación y entrega física." },
        ]}
        gallery={[null, null, null, null]}
      />
    </>
  );
}
