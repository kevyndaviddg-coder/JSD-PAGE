# DESIGN_DIRECTION.md — JSD Air Systems Premium V2

> Dirección de arte definida con apoyo de UI/UX Pro Max (`design-system` pattern *Enterprise Gateway* + estilo *Trust & Authority*) y patrones premium de 21st.dev. Tres rutas exploradas, una elegida y justificada. Esta es la única fuente visual del sitio.

---

## 1. Rutas exploradas

### Ruta A — "Corporativo industrial claro"
- Fondo blanco roto (#F6F8FA) dominante, bloques azul marino (#0F172A) intercalados.
- Tipografía: Poppins display + Open Sans body (recomendación UI/UX Pro Max).
- Imágenes con tratamiento neutro, sin filtros.
- Inspiración 21st.dev: navbars flotantes con dropdown rico, hero centrado con video discreto.
- **Pros:** profesional, accesible, fácil de mantener, recuerda estética B2B premium.
- **Contras:** puede sentirse demasiado "SaaS" si se abusan de cards blancas.

### Ruta B — "Editorial premium con video / foto grande"
- Hero de pantalla completa con video reel, overlay degradado azul petróleo + grafito (rgba).
- Titulares display tipo magazine (Poppins Bold), subtítulos espaciados.
- Bloques alternados foto/texto a 50/50, mucho aire.
- Inspiración 21st.dev: hero `video-with-overlay`, secciones `editorial-split`, animaciones reveal-on-scroll.
- **Pros:** convierte el material visual real en protagonista, comunica escala industrial.
- **Contras:** exige fotos/videos en buena resolución (✔ ya tenemos 8K).

### Ruta C — "Industrial técnico moderno"
- Estilo más cercano a HVAC enterprise (Daikin, Carrier, Trane).
- Estructuras tipo blueprint con grid visible, líneas técnicas, tipografía mono ocasional.
- Acentos metálicos (gris acero #94A3B8, naranja JSD #F97316 muy puntual).
- Inspiración 21st.dev: `feature-grid-technical`, `process-timeline`, `stats-with-icons`.
- **Pros:** alinea con el alma técnica del cliente.
- **Contras:** si se exagera, parece "manual técnico" y pierde calidez comercial.

---

## 2. Ruta elegida: B + dosis de C

> **"Editorial premium con anclaje técnico"**. La estructura general toma la Ruta B (hero video + bloques editoriales), pero adopta elementos de la Ruta C en *Capacidades CNC*, *Proceso* y *Stats* para reforzar el lado técnico-industrial sin perder calidez comercial.

### Por qué
- JSD tiene material real fuerte (10 fotos 8K + 5 videos curados). Desperdiciarlo en cards genéricas sería un error.
- El sector HVAC industrial premium se comunica con escala visual y respaldo técnico, no con "look SaaS".
- Esta ruta es **opuesta** al sitio actual (plano y con naranja saturado), pero respeta el contenido y la estructura ya validada.
- Combina la recomendación de UI/UX Pro Max (*Trust & Authority* + *Enterprise Gateway*) sin caer en plantilla corporativa.

---

## 3. Paleta de color final

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-ink` (texto) | `#0B1220` | Texto principal, titulares display |
| `--color-navy` (primario) | `#0F2A47` | Bloques oscuros, secciones acerca, footer |
| `--color-petroleum` (acento corporativo) | `#0E3A5F` | Overlays de hero, fondos editoriales |
| `--color-steel` (gris frío) | `#5B6B7C` | Texto secundario, separadores |
| `--color-ash` (gris pálido) | `#B7C0CC` | Borders, dividers, fondos sutiles |
| `--color-bone` (blanco roto) | `#F4F6F8` | Fondo principal del sitio |
| `--color-paper` | `#FFFFFF` | Cards, formularios |
| `--color-amber` (acento JSD) | `#E07A1F` | SOLO botones primarios y micro-acentos (5% del UI) |
| `--color-whatsapp` | `#25D366` | Botón WhatsApp y FAB |
| `--color-success` | `#16A34A` | Confirmaciones formulario |
| `--color-error` | `#DC2626` | Errores formulario |

**Regla dura:** el naranja `--color-amber` nunca se usa como fondo de sección ni como dominante. Aparece **solo** en CTAs primarios, hover de servicios y micro-detalles (subrayados, dots). El verde solo en WhatsApp.

### Anti-paleta (no usar)
- Gradientes morado/rosa (anti-pattern del design system).
- Negro puro `#000000` (usar `#0B1220` para no perder profundidad).
- Naranja saturado de fondo o cards completas.
- Dark mode global del sitio (sí se permite *modo oscuro local* en bloques editoriales).

---

## 4. Tipografía

| Rol | Familia | Peso | Tracking |
|-----|---------|------|----------|
| Display / H1 | **Poppins** | 600–700 | -0.02em |
| H2 / H3 | Poppins | 500–600 | -0.01em |
| Body | **Open Sans** | 400–500 | 0 |
| Etiquetas / kicker | Open Sans Uppercase 11–12px | 600 | 0.18em |
| Cifras grandes (stats) | Poppins | 700 | -0.03em |

- Carga vía `next/font/google` con `display: 'swap'`.
- Tamaño base 16px mobile / 17px desktop; line-height 1.55 body, 1.1 display.

---

## 5. Sistema de grid y spacing

- Container `max-w-7xl` (1280px) con padding lateral `clamp(1.25rem, 4vw, 3rem)`.
- Gap base 24px; secciones con padding vertical `clamp(4rem, 8vw, 7rem)`.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Grid editorial 12 columnas; las splits foto/texto usan 7/5 o 5/7.

---

## 6. Radius, sombras y elevación

- `--radius-sm 6px · md 10px · lg 16px · xl 24px · pill 9999px`.
- Sombras suaves: `shadow-soft = 0 12px 30px -16px rgba(11,18,32,.18)`, `shadow-lift = 0 24px 60px -24px rgba(11,18,32,.35)`.
- Bordes 1px en tono `--color-ash` para cards claras.
- Sin glass excesivo (anti-pattern: glass < 80% opacidad en modo claro).

---

## 7. Motion principles (Motion / framer-motion)

Animaciones sobrias, hardware-accelerated (transform / opacity).

| Patrón | Duración | Easing | Uso |
|--------|----------|--------|-----|
| Fade-in básico | 500ms | `[0.22, 1, 0.36, 1]` | Hero título, párrafos editoriales |
| Reveal-on-scroll | 700ms | `cubic-bezier(0.16,1,0.3,1)` | Cards de servicios, stats |
| Hover scale tarjeta | 250ms | `easeOut` | Cards (scale 1.015 + shadow-lift) |
| Cross-fade video reel | 800ms | `easeInOut` | Transición entre clips del hero |
| Timeline reveal | 600ms (stagger 120ms) | `easeOut` | Proceso de cotización |
| Parallax sutil | continuo | linear | Solo hero (translateY 0–6%) |

- Respetar `prefers-reduced-motion`: si reduce, eliminar parallax, cross-fade y reveal, dejar solo opacidad.
- Nada de bouncing, spring exagerado, ni rotaciones decorativas.

---

## 8. Componentes premium (referencias 21st.dev)

> Catálogo de patrones usados; el detalle de adaptación va en `COMPONENT_SOURCE.md`.

| Patrón 21st.dev / shadcn | Uso en JSD |
|--------------------------|------------|
| Floating sticky navbar con mega-dropdown | `Navbar` con dropdown 8 servicios |
| Hero video-loop con overlay degradado | `Hero` con reel de 3 clips |
| Editorial split con kicker / título / cifras | `AboutBrief`, `CapabilitiesCNC` |
| Bento-card grid con hover overlay | `ServicesGrid` (8 cards) |
| Stepper / process timeline vertical-horizontal | `ProcessTimeline` |
| Stats counter con kicker | `StatsBar` integrado en About y Footer-pre |
| Footer "mega" con mapa y multi-columna | `Footer` |
| Floating action button | `WhatsAppFab` |

Lista detallada y justificación en `COMPONENT_SOURCE.md`.

---

## 9. Iconografía e ilustración

- Set único: **Lucide** (íconos line, 1.75px stroke).
- Tamaños canónicos 20 / 24 / 32 / 40px.
- Sin emojis como iconografía.
- Ilustraciones: no se generan ilustraciones inventadas; se prioriza foto real.

---

## 10. Tono editorial

- Tercera persona corporativa ("En JSD desarrollamos...", "Nuestro equipo...").
- Frases cortas. Sin marketing-speak vacío.
- Cifras concretas cuando existan. Cuando no, ausencia limpia (nada inventado).
- Mensajes técnicos cuando aplican (ASHRAE, NOM, kW, ton refrigeración), pero sin saturar.

---

## 11. Checklist UI/UX Pro Max aplicado al proyecto

- [x] **Color contrast:** texto principal `#0B1220` sobre `#F4F6F8` → 18.5:1 (AAA).
- [x] **Focus visible** definido globalmente (`outline: 2px solid var(--color-amber)`).
- [x] **Touch targets 44px+** en botones móviles.
- [x] **Alt text obligatorio** en todas las imágenes (descriptivo en español).
- [x] **Viewport meta** correcto en `layout.tsx`.
- [x] **Body 16px+** en mobile.
- [x] **Line-height 1.55** body, 1.1–1.2 display.
- [x] **Line length 65–75ch** en bloques editoriales.
- [x] **prefers-reduced-motion** respetado por todos los componentes Motion.
- [x] **Glass/transparent** no usado en exceso (mínimo 85% de opacidad).
- [x] **Cursor pointer** en cards/links.
- [x] **No emojis** como íconos.
- [x] **Border visible** `border-ash` (no transparent en claro).
- [x] **Z-index escalado** (10 nav · 20 dropdown · 30 modal · 50 FAB).
