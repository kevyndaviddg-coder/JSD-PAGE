import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Instalación de sistemas HVAC industrial y comercial",
  description:
    "Diseño, instalación y puesta en marcha de sistemas HVAC para naves industriales, oficinas, laboratorios, hospitales y comercios.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Instalación de sistemas HVAC"
        subtitle="Diseñamos, instalamos y damos mantenimiento a sistemas HVAC para naves industriales, oficinas, tiendas, laboratorios y cualquier espacio que requiera control térmico eficiente."
        image="/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Instalación HVAC" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Instalación de sistemas HVAC",
          paragraphs: [
            "Ejecutamos el diseño, montaje y arranque de sistemas HVAC industriales y comerciales. Trabajamos con equipos de aire acondicionado, ventilación y extracción bajo criterio técnico industrial.",
            "Cada proyecto se ejecuta con personal técnico capacitado y supervisión propia, asegurando eficiencia energética, durabilidad y seguridad operativa desde el primer arranque.",
          ],
        }}
        benefits={[
          "Mayor eficiencia energética y reducción de costos operativos",
          "Diseño técnico bajo plano y especificación del cliente",
          "Equipos de aire acondicionado y ventilación de alta confiabilidad",
          "Soluciones personalizadas según el tipo de industria",
          "Puesta en marcha con reporte de pruebas",
          "Plan de mantenimiento posterior opcional",
        ]}
        applications={[
          "Naves industriales",
          "Oficinas corporativas",
          "Laboratorios",
          "Hospitales",
          "Centros comerciales",
          "Tiendas y retail",
        ]}
        process={[
          { title: "Levantamiento técnico", description: "Visita en sitio, mediciones y entendimiento del proceso." },
          { title: "Diseño y cotización", description: "Selección de equipos, materiales y cálculo térmico." },
          { title: "Instalación", description: "Montaje, conexión y supervisión propia en obra." },
          { title: "Puesta en marcha", description: "Pruebas, balanceo y reporte entregable." },
        ]}
        gallery={[
          "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
          "/media/jsd/08_ducteria-expuesta-para-oficinas-comerciales_8k.jpg",
          "/media/jsd/PHOTO-2023-03-06-11-39-22-4.jpg",
          null,
        ]}
      />
    </>
  );
}
