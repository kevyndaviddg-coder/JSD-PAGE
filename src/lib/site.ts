/**
 * Configuración global del sitio JSD Air Systems.
 * Toda la información de marca, navegación, contacto y servicios vive aquí.
 */

export const site = {
  name: "JSD Air Systems",
  shortName: "JSD",
  tagline: "Soluciones integrales en HVAC, climatización y fabricación industrial",
  description:
    "Más de 60 años diseñando, instalando y dando mantenimiento a sistemas HVAC industriales y comerciales: chillers, ductería, ventilación, tuberías de agua helada, fabricación metálica y soluciones a la medida.",
  url: "https://jsdairsystems.com",
  brand: {
    logoWhite: "/media/logo/jsd_color_white-2-1024x225.png",
    logoWhiteAR: 1024 / 225, // aspect ratio horizontal del PNG real
  },
  contact: {
    phoneLandline: "(81) 2073 0663",
    phoneLandlineHref: "tel:+528120730663",
    phoneMobile: "+52 81 1413 8396",
    phoneMobileHref: "tel:+528114138396",
    whatsappNumber: "528114138396",
    whatsappMessage:
      "Hola JSD, me gustaría cotizar un proyecto de climatización / HVAC / fabricación.",
    email1: "ventas01@jsdairsystems.com",
    email2: "ventas02@jsdairsystems.com",
    address: "C. Pájaros Azules 5001, Nuevo Almaguer, 67186 Guadalupe, N.L.",
    addressShort: "Guadalupe, Nuevo León",
    mapsQuery:
      "C.+Pajaros+Azules+5001,+Nuevo+Almaguer,+67186+Guadalupe,+N.L.",
  },
  legal: {
    copyright: `© ${new Date().getFullYear()} JSD Air Systems. Todos los derechos reservados.`,
  },
} as const;

export function whatsappLink(message?: string) {
  const m = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${site.contact.whatsappNumber}?text=${m}`;
}

/**
 * Servicios canónicos — cada uno tiene su propia ruta /servicios/<slug>.
 * Mantener orden estable.
 */
export const services = [
  {
    slug: "instalacion-hvac",
    title: "Instalación de sistemas HVAC",
    short:
      "Diseño, instalación y puesta en marcha de sistemas HVAC para naves industriales, oficinas, laboratorios y comercios.",
    image: "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
    icon: "wind" as const,
  },
  {
    slug: "ductos-metalicos",
    title: "Fabricación e instalación de ductos metálicos",
    short:
      "Ductería a medida según plano en galvanizado, inoxidable o aluminio: aire acondicionado, ventilación y extracción.",
    image: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
    icon: "layers" as const,
  },
  {
    slug: "tuberias-agua-helada",
    title: "Tuberías de agua helada",
    short:
      "Diseño, fabricación e instalación de líneas de agua helada para sistemas HVAC centrales y plantas de enfriamiento.",
    image: "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
    icon: "snowflake" as const,
  },
  {
    slug: "mantenimiento",
    title: "Mantenimiento preventivo y correctivo",
    short:
      "Planes a la medida para equipos industriales, eléctricos, mecánicos y de climatización. Soporte programado y de emergencia.",
    image: "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
    icon: "wrench" as const,
  },
  {
    slug: "climatizacion-industrial-comercial",
    title: "Climatización industrial y comercial",
    short:
      "Soluciones a la medida para naves industriales, hospitales, laboratorios, oficinas y comercios.",
    image: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
    icon: "factory" as const,
  },
  {
    slug: "fabricacion-metalica-cnc",
    title: "Fabricación metálica y CNC",
    short:
      "Corte láser y plasma CNC, ductería propia, estructuras metálicas, soportes y piezas a la medida bajo plano.",
    image: "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
    video: "/media/jsd/video/cnc-laser.mp4",
    icon: "zap" as const,
  },
  {
    slug: "redilas-trailas",
    title: "Redilas y trailas",
    short:
      "Fabricación de redilas y trailas industriales bajo especificación, con la misma planta que respalda nuestros proyectos.",
    image: null,
    icon: "truck" as const,
  },
  {
    slug: "piezas-a-medida",
    title: "Piezas a medida / proyectos especiales",
    short:
      "Piezas bajo plano o especificación: armado, soldadura, acabado y entregables para proyectos no estandarizados.",
    image: null,
    icon: "cog" as const,
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

/**
 * Estructura agrupada de la sección Capacidades en la home.
 *
 * - serviceFamilies: 3 familias × 2-3 servicios reales (8 cards).
 * - tiendaProducts: 3 productos para el ribbon "Próximamente en tienda".
 *
 * Notas de consolidación (vs versión flat anterior):
 *  - "HVAC industrial", "HVAC comercial" y "Climatización integrada" se
 *    consolidan en una sola card "HVAC industrial y comercial". La página
 *    destino (/servicios/climatizacion-industrial-comercial) ya cubre ambos
 *    casos, así que el split anterior generaba 3 cards apuntando al mismo
 *    slug y confundía al lector. Rutas existentes no se rompen.
 *  - "Redilas y trailas" se mueve del grid de servicios al ribbon de tienda.
 *    La página /servicios/redilas-trailas sigue existiendo (sin cambio de
 *    slug) — sólo dejamos de enlazarla desde la home.
 *  - "Piezas a medida" queda en la familia de Fabricación (es servicio, no
 *    producto).
 */

export type ServiceCategoryChip =
  | "HVAC"
  | "DUCTERÍA"
  | "AGUA HELADA"
  | "OPERACIÓN"
  | "FABRICACIÓN"
  | "PRODUCTO";

export type FamilyIconKey = "wind" | "layers" | "zap";

export type FamilyService = {
  title: string;
  short: string;
  category: ServiceCategoryChip;
  image: string;
  video?: string;
  href: string;
};

export type ServiceFamily = {
  chip: string;
  shortLabel: string;
  title: string;
  body: string;
  icon: FamilyIconKey;
  services: FamilyService[];
};

export const serviceFamilies: ServiceFamily[] = [
  {
    chip: "HVAC y climatización",
    shortLabel: "HVAC",
    icon: "wind",
    title: "Diseño, instalación y mantenimiento de sistemas térmicos",
    body: "Equipos y sistemas HVAC para naves industriales, oficinas, retail y espacios técnicos. Diseño térmico, instalación y operación posterior.",
    services: [
      {
        title: "HVAC industrial y comercial",
        short:
          "Climatización completa para naves de producción, oficinas, retail y espacios técnicos. Diseño térmico y selección de equipos según el proceso.",
        category: "HVAC",
        image: "/media/jsd/03_climatizacion-industrial-en-nave-de-produccion_8k.jpg",
        href: "/servicios/climatizacion-industrial-comercial",
      },
      {
        title: "Instalación y puesta en marcha",
        short:
          "Montaje, conexión, balanceo y arranque de equipos HVAC bajo supervisión propia en obra. Reporte de pruebas entregable al cierre.",
        category: "HVAC",
        image: "/media/jsd/02_instalacion-exterior-de-ventilacion-industrial_8k.jpg",
        href: "/servicios/instalacion-hvac",
      },
      {
        title: "Mantenimiento preventivo y correctivo",
        short:
          "Servicios programados, diagnóstico, intervención correctiva y seguimiento técnico para clientes con operación industrial continua.",
        category: "OPERACIÓN",
        image: "/media/jsd/PHOTO-2023-03-06-11-21-00-17.jpg",
        href: "/servicios/mantenimiento",
      },
    ],
  },
  {
    chip: "Ductería, ventilación y agua helada",
    shortLabel: "Ductería",
    icon: "layers",
    title: "Ductería metálica propia y líneas de agua helada",
    body: "Fabricación e instalación de ductería rectangular, circular y espiral, tuberías de agua helada y sistemas de ventilación industrial.",
    services: [
      {
        title: "Ductería metálica fabricada en planta propia",
        short:
          "Rectangular, circular y espiral en galvanizado, inoxidable o aluminio. Corte CNC, armado y montaje por personal técnico propio.",
        category: "DUCTERÍA",
        image: "/media/jsd/04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg",
        href: "/servicios/ductos-metalicos",
      },
      {
        title: "Tuberías de agua helada",
        short:
          "Líneas para sistemas HVAC centrales y plantas de enfriamiento. Diseño hidráulico, aislamiento y pruebas hidrostáticas documentadas.",
        category: "AGUA HELADA",
        image: "/media/jsd/10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg",
        href: "/servicios/tuberias-agua-helada",
      },
      {
        title: "Ventilación y extracción industrial",
        short:
          "Sistemas de ventilación general, extracción de aire y renovación para naves, comercios y procesos productivos.",
        category: "DUCTERÍA",
        image: "/media/jsd/05_ducteria-metalica-para-almacen-industrial_8k.jpg",
        href: "/servicios/ductos-metalicos",
      },
    ],
  },
  {
    chip: "Fabricación a la medida",
    shortLabel: "Fabricación",
    icon: "zap",
    title: "Corte CNC láser y plasma + piezas bajo plano",
    body: "Capacidades de fabricación que complementan los proyectos HVAC y permiten producir estructuras, bases, soportes y piezas no estandarizadas.",
    services: [
      {
        title: "Fabricación metálica y corte CNC",
        short:
          "Corte láser y plasma para ductería propia, estructuras, soportes y piezas a la medida bajo plano del cliente.",
        category: "FABRICACIÓN",
        image: "/media/jsd/01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg",
        video: "/media/jsd/video/cnc-laser.mp4",
        href: "/servicios/fabricacion-metalica-cnc",
      },
      {
        title: "Piezas y estructuras bajo plano",
        short:
          "Piezas metálicas no estandarizadas, soportes, bases y bastidores fabricados bajo especificación del cliente.",
        category: "FABRICACIÓN",
        image: "/media/jsd/09_sistema-de-ductos-industriales-en-nave_8k.jpg",
        href: "/servicios/piezas-a-medida",
      },
    ],
  },
];

export type TiendaProduct = {
  title: string;
  short: string;
  hint: string;
  href: string;
};

export const tiendaProducts: TiendaProduct[] = [
  {
    title: "Redilas y trailas industriales",
    short:
      "Fabricación de redilas y trailas bajo especificación. Se integra al catálogo en línea cuando se publique la tienda.",
    hint: "Catálogo en preparación",
    href: "/tienda",
  },
  {
    title: "Refacciones y filtros HVAC",
    short:
      "Partes para equipos HVAC instalados por JSD y por terceros. Disponibilidad en línea en preparación.",
    hint: "Disponible próximamente",
    href: "/tienda",
  },
  {
    title: "Bases, soportes y accesorios",
    short:
      "Bases metálicas para equipos HVAC, soportes industriales y accesorios a la medida.",
    hint: "Catálogo en preparación",
    href: "/tienda",
  },
];

export type NavItem = { href: string; label: string; hasDropdown?: boolean };

export const nav: readonly NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios", hasDropdown: true },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/contacto", label: "Contacto" },
] as const;

/**
 * Videos reales que se rotan en el hero.
 * 3 clips livianos ~13 MB total con carga progresiva (preload="metadata"
 * solo el primero, el resto preload="none" hasta su turno).
 */
// Reel v5 — orden y selección definidos explícitamente por el cliente.
// Los 6 archivos provienen 1:1 de la carpeta JS VISUAL (coincidencia exacta de
// nombre). Orden respetado. autoAdvance 12s + crossfade. Primer clip liviano
// (preload auto), resto metadata. Nota: reel-6 (MAIN 1) pesa 43 MB — va al
// final con preload="metadata" para no afectar el primer render.
export const heroClips = [
  { src: "/media/jsd/video/reel-1-aerea-refrigeracion.mp4", label: "Toma aérea de equipos de refrigeración" },
  { src: "/media/jsd/video/reel-2-laser-cnc.mp4", label: "Fabricación con láser CNC" },
  { src: "/media/jsd/video/reel-3-equipos-sin-instalar.mp4", label: "Toma aérea de equipos en sitio" },
  { src: "/media/jsd/video/reel-4-aerea-refrigeracion-4.mp4", label: "Toma aérea de equipos de refrigeración" },
  { src: "/media/jsd/video/reel-5-aerea-refrigeracion-7.mp4", label: "Toma aérea de equipos de refrigeración" },
  { src: "/media/jsd/video/reel-6-aerea-main-1.mp4", label: "Toma aérea principal del proyecto" },
] as const;

export const heroFallback =
  "/media/jsd/09_sistema-de-ductos-industriales-en-nave_8k.jpg";
