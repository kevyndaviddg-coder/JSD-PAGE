import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Climatización de espacios industriales y comerciales",
  description:
    "Soluciones a la medida para naves industriales, hospitales, laboratorios, oficinas y comercios con eficiencia energética y bajo nivel de ruido.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Climatización industrial y comercial"
        subtitle="Sistemas de aire acondicionado, ventilación y extracción a la medida para naves industriales, hospitales, laboratorios, oficinas y comercios. Ductería propia y materiales industriales según especificación."
        image="/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Climatización industrial y comercial" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Climatización de espacios industriales y comerciales",
          paragraphs: [
            "Ofrecemos soluciones de climatización completas que combinan equipos, ductería, agua helada y ventilación. Trabajamos en espacios de gran escala que requieren control térmico estable y eficiente.",
            "Cada proyecto integra fabricación propia de ductería en galvanizado, inoxidable o aluminio, lo que asegura tiempos cortos y calidad consistente.",
          ],
        }}
        benefits={[
          "Eficiencia energética optimizada",
          "Durabilidad de alta resistencia",
          "Reducción de fugas y ruido por diseño optimizado",
          "Diseño técnico bajo plano del cliente",
          "Ductería fabricada en taller propio",
          "Soporte y mantenimiento posterior",
        ]}
        applications={[
          "Naves industriales",
          "Hospitales y laboratorios",
          "Oficinas corporativas",
          "Comercios y retail",
          "Centros logísticos",
        ]}
        process={[
          { title: "Levantamiento", description: "Definimos cargas térmicas y trayectorias." },
          { title: "Diseño integral", description: "Equipos, ductería y agua helada coordinados." },
          { title: "Fabricación e instalación", description: "Producción propia + montaje en sitio." },
          { title: "Operación y mantenimiento", description: "Pruebas, balanceo y plan de mantenimiento." },
        ]}
        gallery={[
          "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
          "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
          "/media/jsd/08_ducteria-expuesta-para-oficinas-comerciales_8k.jpg",
          "/media/jsd/09_sistema-de-ductos-industriales-en-nave_8k.jpg",
        ]}
      />
    </>
  );
}
