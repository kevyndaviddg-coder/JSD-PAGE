import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Mantenimiento preventivo y correctivo",
  description:
    "Planes de mantenimiento a la medida para equipos industriales, eléctricos, mecánicos y de climatización. Soporte técnico de emergencia.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Mantenimiento preventivo y correctivo"
        subtitle="Servicios de mantenimiento para equipos industriales, eléctricos, mecánicos y de climatización. Diseñamos cada plan a la medida del cliente para asegurar continuidad operativa y ahorro."
        image="/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Mantenimiento" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Mantenimiento preventivo y correctivo",
          paragraphs: [
            "Mantenemos tus instalaciones en condiciones óptimas evitando paros inesperados, mejorando seguridad y extendiendo la vida útil de los sistemas.",
            "Cada plan se diseña a la medida: frecuencia, alcance, refacciones, reporte y atención de emergencia. Trabajamos chillers, manejadoras, bombas, ductería, líneas de agua helada y equipos de proceso.",
          ],
        }}
        benefits={[
          "Prevención de fallas y reducción de tiempos muertos",
          "Menor consumo energético y mayor eficiencia operativa",
          "Cumplimiento con normas técnicas y de seguridad industrial",
          "Atención programada y soporte técnico de emergencia",
          "Reporte fotográfico y bitácora por visita",
          "Planeación anual y refacciones críticas listas",
        ]}
        applications={[
          "Chillers y manejadoras",
          "Equipos de proceso industrial",
          "Sistemas eléctricos y mecánicos",
          "Líneas de agua helada",
          "Compresores y bombas",
        ]}
        process={[
          { title: "Diagnóstico inicial", description: "Inventario de equipos y evaluación de estado." },
          { title: "Plan a medida", description: "Definimos frecuencia, alcance y refacciones." },
          { title: "Ejecución", description: "Visitas programadas + soporte de emergencia." },
          { title: "Reporte mensual", description: "Bitácora, fotos y recomendaciones." },
        ]}
        gallery={[
          "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
          "/media/jsd/PHOTO-2023-03-06-11-21-48-19.jpg",
          "/media/placeholders/maintenance-men-working-to-get-all-the-condo-air-c-2025-02-15-16-49-47-utc-1024x683.jpg",
          null,
        ]}
      />
    </>
  );
}
