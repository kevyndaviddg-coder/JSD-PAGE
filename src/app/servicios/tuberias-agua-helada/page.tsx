import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Tuberías de agua helada",
  description:
    "Diseño, fabricación e instalación de líneas de agua helada para sistemas HVAC centrales y plantas de enfriamiento industrial.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Tuberías de agua helada"
        subtitle="Diseñamos, fabricamos e instalamos líneas de agua helada para sistemas HVAC centrales y plantas de enfriamiento, con materiales industriales según especificación y enfoque en eficiencia energética."
        image="/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Tuberías de agua helada" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Tuberías de agua helada",
          paragraphs: [
            "Diseñamos sistemas que distribuyen agua helada con la menor pérdida térmica posible. Calculamos diámetros, aislamientos y trayectorias para optimizar el desempeño del chiller y reducir consumo eléctrico.",
            "Trabajamos bajo criterio técnico industrial y entregamos pruebas hidrostáticas y reporte de aislamiento por tramo.",
          ],
        }}
        benefits={[
          "Reducción de pérdidas térmicas y consumo energético",
          "Materiales industriales para uso continuo",
          "Transferencia térmica eficiente y operación confiable",
          "Diseño técnico bajo plano del cliente",
          "Pruebas hidrostáticas documentadas",
          "Aislamiento de alto desempeño",
        ]}
        applications={[
          "Sistemas HVAC centrales",
          "Plantas de enfriamiento industrial",
          "Edificios industriales y comerciales",
          "Procesos productivos con control térmico",
          "Hospitales y laboratorios",
        ]}
        process={[
          { title: "Diseño hidráulico", description: "Cálculo de diámetros, presión y trayectoria." },
          { title: "Fabricación", description: "Soldadura y preparación en taller o sitio." },
          { title: "Instalación", description: "Montaje seguro, soportería y aislamiento." },
          { title: "Pruebas y entrega", description: "Hidrostáticas, balanceo y reporte final." },
        ]}
        gallery={[
          "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
          "/media/placeholders/air-conditioning-cooling-tube-on-the-roof-of-a-bui-2024-10-22-09-20-31-utc-1024x683.jpg",
          null,
          null,
        ]}
      />
    </>
  );
}
