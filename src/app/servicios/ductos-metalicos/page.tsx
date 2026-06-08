import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

export const metadata: Metadata = {
  title: "Fabricación e instalación de ductos metálicos",
  description:
    "Fabricación a medida según planos: ductería galvanizada, inoxidable y de aluminio para aire acondicionado, ventilación y extracción.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Servicio"
        title="Fabricación e instalación de ductos metálicos"
        subtitle="Fabricación a medida según planos y requerimientos técnicos. Trabajamos materiales galvanizados, inoxidables o aluminio para sistemas de aire acondicionado, ventilación y extracción."
        image="/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg"
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Ductos metálicos" },
        ]}
      />
      <ServiceTemplate
        intro={{
          title: "Fabricación e instalación de ductos metálicos",
          paragraphs: [
            "Fabricamos ductería rectangular, circular y espiral en taller propio, con corte CNC plasma / láser para garantizar precisión y consistencia.",
            "La instalación en obra incluye armado, sellado, aislamiento (cuando aplica), izaje y conexión con la red HVAC existente.",
          ],
        }}
        benefits={[
          "Circulación de aire óptima, reduciendo pérdidas energéticas",
          "Materiales industriales según especificación del proyecto",
          "Reducción de fugas y ruido por diseño optimizado",
          "Diseño técnico bajo plano del cliente",
          "Fabricación a medida según plano",
          "Trazabilidad de material y soldaduras",
        ]}
        applications={[
          "Aire acondicionado industrial",
          "Ventilación general",
          "Extracción de aire",
          "Plantas farmacéuticas y alimenticias",
          "Bodegas y centros logísticos",
          "Oficinas comerciales",
        ]}
        process={[
          { title: "Diseño en plano", description: "Modelado 2D/3D según condiciones del proyecto." },
          { title: "Corte y fabricación", description: "Plasma / láser CNC para precisión milimétrica." },
          { title: "Pre-armado en taller", description: "Validamos uniones y geometría antes de salir." },
          { title: "Instalación en obra", description: "Izaje, sellado y conexión con la red HVAC." },
        ]}
        gallery={[
          "/media/jsd/05_ducteria-metalica-para-almacen-industrial_8k.jpg",
          "/media/jsd/06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg",
          "/media/jsd/07_fabricacion-e-instalacion-de-ductos-circulares-hvac_8k.jpg",
          "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
        ]}
      />
    </>
  );
}
