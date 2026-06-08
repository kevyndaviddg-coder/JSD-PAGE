# SITE_STRUCTURE.md — JSD Air Systems Premium V2

> Estructura completa del nuevo sitio. Conserva la lógica del sitio actual y amplía con los nuevos alcances de JS Group (fabricación metálica, CNC, redilas/trailas, piezas a medida).

---

## 1. Árbol de rutas (Next.js App Router)

```
src/app/
├── layout.tsx                 # Layout raíz: fuentes, navbar, footer, WhatsApp FAB
├── page.tsx                   # /  Home one-page premium
├── nosotros/
│   └── page.tsx               # /nosotros
├── servicios/
│   ├── page.tsx               # /servicios  (índice con 8 cards)
│   ├── instalacion-hvac/page.tsx
│   ├── ductos-metalicos/page.tsx
│   ├── tuberias-agua-helada/page.tsx
│   ├── mantenimiento/page.tsx
│   ├── climatizacion-industrial-comercial/page.tsx
│   ├── fabricacion-metalica-cnc/page.tsx
│   ├── redilas-trailas/page.tsx
│   └── piezas-a-medida/page.tsx
├── proyectos/
│   └── page.tsx               # /proyectos  (galería + espacios reservados)
├── blog/
│   ├── page.tsx               # listado
│   └── [slug]/page.tsx        # detalle (1 post real cargado)
├── contacto/
│   └── page.tsx               # /contacto
└── tienda/
    └── page.tsx               # placeholder "próxima etapa"
```

Componentes en `src/components/` agrupados por categoría (`layout/`, `sections/`, `ui/`, `motion/`).

---

## 2. Home (one-page)

| # | Sección | Componente | Notas |
|---|---------|------------|-------|
| 1 | Navbar | `layout/Navbar` | Logo + 7 links + dropdown servicios + CTA WhatsApp |
| 2 | Hero | `sections/Hero` | Video reel con 3 clips reales (main-2, grua, trabajos), overlay azul petróleo, título + subtítulo + 3 CTAs |
| 3 | Acerca / 60 años | `sections/AboutBrief` | Foto real grande (PHOTO-2023-...), texto narrativo, 4 stats (60+, 5000+, 100+, 24/7), CTA "Saber más" |
| 4 | Servicios principales | `sections/ServicesGrid` | 8 cards interactivas con imágenes reales y hover de descripción |
| 5 | CTA hacia /servicios | `sections/CTASectionInline` | Botón "Conoce todos nuestros servicios" |
| 6 | Fabricación metálica + CNC | `sections/CapabilitiesCNC` | Bloque editorial: video CNC + lista de capacidades + foto plasma/láser |
| 7 | Proceso de cotización | `sections/ProcessTimeline` | Timeline 4 pasos con Motion reveal |
| 8 | Proyectos / Obras | `sections/ProjectsTeaser` | 6 cards (4 reales con fotos 8K + 2 espacios reservados premium) |
| 9 | Blog teaser | `sections/BlogTeaser` | 1 post real + tarjetas "Próximamente" |
| 10 | CTA final / contacto | `sections/ContactCTA` | Datos directos + botones (WhatsApp, llamar, correo) |
| 11 | Footer | `layout/Footer` | Mapa, logo, datos, links navegación + servicios, derechos |
| 12 | WhatsApp FAB | `layout/WhatsAppFab` | Fijo, esquina inferior derecha |

---

## 3. Página /nosotros

- Hero compacto con foto industrial + título "Más de 60 años construyendo confianza".
- Bloque narrativo: trayectoria + especialidad + propósito.
- 3 pilares: **Ingeniería**, **Instalación**, **Mantenimiento** (con fotos reales 04/05/06).
- Capacidades industriales: 8 capacidades listadas con íconos Lucide.
- Stats / promesas técnicas (60+ años · ASHRAE/NOM · personal certificado · soporte 24/7).
- CTA "Cotiza tu próximo proyecto".

## 4. Página /servicios (índice)

- Hero corto con título "Capacidades integrales".
- Grid de **8 servicios** con foto real, título, descripción breve, link a la página detalle.
- CTA WhatsApp.

## 5. Páginas de servicios detalladas

Cada `/servicios/<slug>` sigue la misma plantilla:

1. Hero del servicio (imagen real categorizada).
2. Descripción técnica (2-3 párrafos editoriales).
3. Beneficios (4-6 bullets con íconos).
4. Aplicaciones (chips de industrias).
5. Proceso (timeline simplificada de 3-4 pasos).
6. Galería 2x2 (fotos reales o espacios reservados).
7. CTA WhatsApp + Cotización.

Slugs:
- `instalacion-hvac`
- `ductos-metalicos`
- `tuberias-agua-helada`
- `mantenimiento`
- `climatizacion-industrial-comercial`
- `fabricacion-metalica-cnc`
- `redilas-trailas`
- `piezas-a-medida`

## 6. Página /proyectos

- Filtros por categoría (HVAC industrial, Ductería, Agua helada, Mantenimiento, Fabricación, Redilas).
- 6-10 cards: las que tienen foto real usan foto; las que no tienen, usan card **"Material visual en revisión"** con diseño premium (no plantilla).
- Nota legal: "No se publican nombres de clientes sin autorización."

## 7. Página /contacto

- Hero con CTA.
- 2 columnas: formulario + datos directos (teléfono, WhatsApp, correos, dirección).
- Mapa embebido (Google Maps iframe con coordenadas de Pájaros Azules 5001).
- Tarjeta "Agendar visita técnica" (WhatsApp prellenado).
- Reiteración de horario abierto a confirmación.

## 8. Página /blog

- Listado: 1 post real + tarjetas "Próximamente" con título tentativo (no inventar contenido).
- Detalle `/blog/que-es-un-sistema-hvac`: artículo formateado, autor JSD, fecha 7 nov 2025, CTA contacto.

## 9. Página /tienda (placeholder)

- Hero centrado: "Tienda industrial — próxima etapa".
- Subtexto: "Estamos preparando un catálogo de partes, refacciones HVAC y piezas metálicas estándar. Mientras tanto, escríbenos por WhatsApp para cotizar a la medida."
- Botón WhatsApp + Botón "Ver servicios".
- **No** catálogo, **no** carrito, **no** productos.

---

## 10. Navegación global

### Navbar (desktop)
`Inicio · Nosotros · Servicios ▼ · Proyectos · Blog · Tienda · Contacto · [WhatsApp]`

Dropdown Servicios:
1. Instalación de sistemas HVAC
2. Fabricación e instalación de ductos metálicos
3. Tuberías de agua helada
4. Mantenimiento preventivo y correctivo
5. Climatización industrial y comercial
6. Fabricación metálica y CNC
7. Redilas y trailas
8. Piezas a medida / proyectos especiales

Botón "Ver todos los servicios →" al pie del dropdown.

### Navbar (mobile)
Menú hamburguesa full-screen, mismo orden, dropdown colapsable, CTA WhatsApp grande al final.

### Footer
- Columna 1: logo JSD + 3 líneas de descripción.
- Columna 2: Navegación principal.
- Columna 3: Servicios (8 links).
- Columna 4: Contacto + mapa pequeño.
- Pie: © 2025 JSD Air Systems · Aviso de privacidad · Términos.

---

## 11. Anti-estructura (lo que NO se hace)

- No se crea catálogo de tienda.
- No se inventan nombres de clientes ni cifras no respaldadas.
- No se publica un dashboard ni grids tipo SaaS.
- No se reproduce el layout actual con dominante naranja.
- No se duplican CTAs hasta saturar la home.
