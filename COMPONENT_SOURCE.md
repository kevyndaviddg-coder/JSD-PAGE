# COMPONENT_SOURCE.md — JSD Air Systems Premium V2

> Registro **honesto** del origen de cada patrón y componente del sitio. Esta versión refleja el estado tras el refactor de noviembre 2025.

---

## 0. Estado real del MCP magic / 21st.dev

**EN ESTA ITERACIÓN MAGIC MCP YA SE INVOCÓ REAL.** Confirmado por `claude mcp list`:

```
magic: npx -y @21st-dev/magic@latest - ✓ Connected
```

Tools surfacing: `21st_magic_component_builder`, `21st_magic_component_inspiration`, `21st_magic_component_refiner`, `logo_search`.

### Invocaciones reales registradas

| Sección | Tool | Query | Resultado |
|---|---|---|---|
| ServicesGrid | `mcp__magic__21st_magic_component_inspiration` | `"bento grid services"` | 3 patrones reales — adoptado el #1 *Bento Grid* (similarity 7.57) |
| Hero | `mcp__magic__21st_magic_component_inspiration` | `"video hero industrial"` | 3 patrones reales — **ninguno se integró** (justificación honesta abajo) |

### Iteración previa (sin magic activo)

Los `BentoGrid.tsx`, `GlareCard.tsx` y `Lightbox.tsx` que se crearon en pases anteriores fueron **adaptaciones manuales de patrones documentados de Aceternity/shadcn** (no Magic real). En esta iteración Magic SÍ aportó incremental para el ServicesGrid (estructura header / body / footer + persistent-hover).

---

## 1. Mapa de componentes vs. patrón de origen

### 1.1 Layout / chrome

| Componente JSD | Patrón base | Origen | Archivo | Adaptación industrial |
|---|---|---|---|---|
| `Navbar` | Glass floating navbar + mega-dropdown + `AnimatePresence` | Patrón Linear/Vercel; AnimatePresence de `motion/react` | `src/components/layout/Navbar.tsx` | Glass `rgba(11,18,32,.62)` con `backdrop-filter: blur(14px)` (con fallback `@supports`); dropdown 8 servicios en grid 2 col con dots amber; AnimatePresence para apertura suave; mobile menu con `<details>` colapsable y AnimatePresence height. |
| `Footer` | Footer mega 4-col + iframe Google Maps | shadcn footer pattern | `src/components/layout/Footer.tsx` | 4 columnas (brand+desc, navegación, servicios, contacto+mapa). Logo PNG real cliente. |
| `WhatsAppFab` | FAB con IntersectionObserver footer-aware + `whileHover`/`whileTap` | Patrón propio + Motion | `src/components/layout/WhatsAppFab.tsx` | Detecta footer visible y se sube 112px para no tapar el cinta legal. Pulse animation respeta reduced-motion. |

### 1.2 UI primitives

| Componente | Patrón | Origen | Archivo |
|---|---|---|---|
| `Button` | shadcn-cva button con variants + `active:scale-[0.97]` | shadcn/ui (estructura cva), Tailwind `active:` para microinteracción CSS pura | `src/components/ui/Button.tsx` |
| `BentoGrid` + `bentoSize` | Aceternity/Linear bento layout con presets semánticos (sm/wide/tall/hero/band) | Patrón Aceternity UI Bento Grid, adaptado a presets propios | `src/components/ui/BentoGrid.tsx` (NUEVO) |
| `GlareCard` | Mouse-tracked radial glare hover | **Aceternity UI Glare Card** (Linear hover effect). Setea `--mx`/`--my` CSS vars, consumidas en `.glare-card::after` (globals.css). | `src/components/ui/GlareCard.tsx` + `globals.css` (NUEVOS) |
| `Lightbox` | Modal Dialog accesible con navegación teclado (←/→/Esc) + AnimatePresence | shadcn Dialog conventions + Motion AnimatePresence | `src/components/ui/Lightbox.tsx` (NUEVO) |
| `Stat` | Stat adaptativo con tipografía escalada según longitud del value | Propio (fix del bug "A la medida" rompía rejilla) | `src/components/ui/Stat.tsx` |
| `Container`, `Section`, `Kicker`, `ReservedMediaBlock`, `Icons` | Sin cambios | Propios | mismos archivos |

### 1.3 Sections (Home)

| Sección | Patrón principal | Origen + archivo |
|---|---|---|
| `Hero` | Video-loop hero + overlay degradado + parallax `useScroll`/`useTransform` + AAA title-shadow | Aceternity Background Video + Motion scroll hooks · `src/components/sections/Hero.tsx` |
| `AboutBrief` | Editorial 60 años con foto 5:4 + 4 stats + timeline horizontal 4 hitos + mini-galería offset | Patrón editorial premium · `src/components/sections/AboutBrief.tsx` |
| `ServicesGrid` | **BentoGrid + GlareCard + hover video** | Aceternity Bento + Glare · `src/components/sections/ServicesGrid.tsx` |
| `CapabilitiesCNC` | Editorial split con video principal 4:3 + 2 sub-cards + capabilities glass list con `whileInView` stagger + `whileHover` | Linear/Notion editorial split + Motion · `src/components/sections/CapabilitiesCNC.tsx` |
| `ProcessTimeline` | Glass cards numeradas sobre video fondo con overlay tri-gradient + `whileHover` y/`whileTap` por card | shadcn glass card + Motion · `src/components/sections/ProcessTimeline.tsx` |
| `ProjectsTeaser` | Masonry bento (wide/tall/default) + **Lightbox al click** + categorías visuales | Propio + Lightbox · `src/components/sections/ProjectsTeaser.tsx` |
| `BlogTeaser` | Editorial cards con kicker + group hover translate | shadcn card · `src/components/sections/BlogTeaser.tsx` |
| `ContactCTA` | Petroleum CTA strip con datos directos y glass card | Patrón propio · `src/components/sections/ContactCTA.tsx` |
| `PageHero` | Compact page hero con breadcrumb + overlay + kicker | Propio · `src/components/sections/PageHero.tsx` |
| `ServiceTemplate` | Template repetible (intro+benefits+process+gallery+CTA) | Propio · `src/components/sections/ServiceTemplate.tsx` |

### 1.4 Página /proyectos

- Filtros con `motion.button` (whileTap scale 0.96).
- Lightbox al click con navegación.
- 3 espacios reservados premium cuando filtro = "Todos".

---

## 2. Patrones que SÍ tomamos de la comunidad shadcn / Aceternity / 21st.dev

| Patrón | Aplicación | URL/Referencia |
|---|---|---|
| **Bento Grid** (asymétrico, col/row-span) | `ServicesGrid`, `BentoGrid` primitivo | https://ui.aceternity.com/components/bento-grid (documentación pública) |
| **Glare Card** (mouse-tracked radial glow) | Wrapper `GlareCard` aplicado a cada card de servicio | https://ui.aceternity.com/components/glare-card |
| **Glass Navbar** (backdrop-blur + opacity layered) | `Navbar`, `glass-navy`, `glass-navy-strong` | Patrón Vercel/Linear; implementación propia con `@layer utilities` + `@supports not` fallback |
| **shadcn Button** (cva pattern) | `Button` con `cva()` y variants tipados | shadcn/ui button pattern |
| **AnimatePresence Dropdown** | Navbar mega-dropdown + Lightbox + Mobile menu | Patrón estándar Motion (framer-motion → motion/react) |
| **Stagger reveal on scroll** | `RevealStagger`+`RevealItem` con `whileInView` viewport once | Patrón estándar Motion |
| **Lightbox accesible** | Galería en home y `/proyectos` | shadcn Dialog conventions adaptadas |

---

## 3. Patrones descartados por verse genéricos

- **Carrusel infinito de logos clientes** — no tenemos logos autorizados, lo dejamos fuera.
- **3D card / tilt-on-mouse** (Aceternity) — demasiado lúdico para B2B industrial.
- **Spotlight (Aceternity)** — competiría con el Glare Card que sí mantuvimos.
- **Sparkles / Particles bg** — distrae del material visual real (videos del cliente).
- **Magic button "Shimmer"** — preferimos botones sólidos con `active:scale`.

---

## 4. Pendientes para una verdadera iteración con `magic` MCP activo

Cuando el usuario reinicie Claude Code y `magic` MCP esté disponible, queda pendiente:

1. **Generar bento card "industrial premium"** desde la registry 21st.dev — reemplazar `ServiceBentoCard` actual.
2. **Generar form de contacto** con validación visual (react-hook-form + zod) para `/contacto`.
3. **Generar logo cloud** (autorizado por el cliente) en formato premium.
4. **Generar stats counter animado** (CountUp) para sustituir el Stat estático.
5. **Generar testimonios card** si el cliente aporta testimonios reales.

---

## 5. Diff de archivos modificados en este pase (Fases 1-12)

```
M src/app/globals.css           — heading bug fix (@layer base), glass-* utilities (@layer utilities + @supports fallback), .glare-card hover
M src/app/layout.tsx            — sin cambios estructurales
M src/lib/site.ts               — heroClips reducido a 3, mismo brand/contact
M src/components/ui/Button.tsx  — active:scale-[0.97] microinteracción CSS
M src/components/ui/Stat.tsx    — tipografía adaptativa según longitud
N src/components/ui/BentoGrid.tsx  — primitivo nuevo
N src/components/ui/GlareCard.tsx  — wrapper mouse-tracked
N src/components/ui/Lightbox.tsx   — modal dialog accesible
M src/components/ui/Icons.tsx       — ChevronLeftIcon, ChevronRightLargeIcon, ExpandIcon
M src/components/motion/VideoReel.tsx — IntersectionObserver pause + preload metadata
M src/components/layout/Navbar.tsx  — AnimatePresence dropdown + mobile, logo real, glass solid
M src/components/layout/Footer.tsx  — sin cambios (ya estaba bien)
M src/components/layout/WhatsAppFab.tsx — Footer-aware bottom-shift + Motion enter
M src/components/sections/Hero.tsx       — 3 botones (Cotizar / Servicios / Conocer JSD), pills 24/7 eliminado, parallax mejorado
M src/components/sections/AboutBrief.tsx — Quita "1965+", stats neutros, hover lift en foto y galería
M src/components/sections/ServicesGrid.tsx — BentoGrid + GlareCard + hover video; fix doble badge en reserved
M src/components/sections/CapabilitiesCNC.tsx — preload metadata/none, IntersectionObserver pause, whileHover en lista
M src/components/sections/ProcessTimeline.tsx — overlay tri-gradient más sutil, whileHover/whileTap glass cards
M src/components/sections/ProjectsTeaser.tsx — Lightbox + motion.button + ExpandIcon hover
M src/app/proyectos/page.tsx     — Lightbox + filtros motion + categorías reales
```

**14 archivos modificados · 3 archivos nuevos** (BentoGrid, GlareCard, Lightbox).

---

## 6. Iteración con Magic MCP REAL (post-reinicio Claude Code)

### 6.1 ServicesGrid — patrón Bento Grid adoptado

**Prompt completo enviado a Magic:**
> "Need a premium asymmetric bento grid for HVAC industrial services. 11 cards with varying sizes (hero/wide/tall/sm). Each card has background image with gradient overlay, top-left category badge, bottom title in white (over image) or dark (over light bg), and reveal-on-hover description. Industrial enterprise B2B, navy + amber accent, glassmorphism subtle. Must work with motion/react not framer-motion."

**searchQuery**: `"bento grid services"`

**Tool**: `mcp__magic__21st_magic_component_inspiration`

**Resultado**: 3 patrones devueltos. Adopté el patrón con `similarity: 7.57` ("Bento Grid"):
- Estructura `BentoItem { title, description, icon, status, tags?, meta?, colSpan?, hasPersistentHover? }`
- Layout: `grid grid-cols-1 md:grid-cols-3 gap-3` con cards individuales
- Header row: icon (8×8 rounded-lg bg-black/5) + status badge (text-xs px-2 py-1 backdrop-blur)
- Body: title + meta inline + description text-sm
- Footer: tags row + CTA "Explore →" reveal on hover
- Hover: `-translate-y-0.5 will-change-transform` + radial dot pattern overlay
- Border gradient overlay con opacity controlada por hover state

**Lo que adopté** (en `src/components/sections/ServicesGrid.tsx`):
1. ✅ Estructura **header (icon top-right + status badge top-left) / body (title + desc) / footer (CTA)**.
2. ✅ Concepto de **`hasPersistentHover`** → traducido a prop `featured` para el primer card (Instalación HVAC).
3. ✅ **Radial dot pattern overlay** sobre hover state, adaptado a navy `rgba(255,255,255,0.08)` para fondos oscuros y `rgba(15,42,71,0.06)` para reserved.
4. ✅ **Hover lift** `-translate-y-0.5` + shadow-lift.
5. ✅ **CTA reveal** "Ver detalle →" con `group-hover:translate-x-1` amber.

**Lo que adapté** (no era 1:1, evolución industrial):
1. **Fondo de imagen real** (next/image fill) en lugar de cards vacías. Cada card de servicio tiene foto 8K del cliente.
2. **Overlay gradient AAA** (`media-overlay-bottom`) para legibilidad del título blanco sobre foto.
3. **Hover video preview** en card CNC (no estaba en el patrón).
4. **Reserved cards** con `reserved-grid` background pattern + 2 badges (JSD + En desarrollo) + "Próximamente →" CTA.
5. **GlareCard wrapper** mouse-tracked (mantenido del pase anterior).
6. **Lucide icons mapeados** por categoría HVAC (Wind, Layers, Snowflake, Wrench, Factory, Zap, Truck, Cog, Building).

**Lo que descarté** del patrón original:
- ❌ **Tags row** (`#statistics #ai #reports`) — En B2B HVAC industrial las tags hashtag se ven SaaS. No aportan.
- ❌ **`meta` inline** ("v2.4.1", "84 completed") — JSD no tiene versiones ni métricas en cada servicio. Hubiera quedado vacío.
- ❌ **dark mode dual** — JSD solo light mode global.

**Migración de imports**: el patrón original NO usaba framer-motion (solo CSS hover + cn). Ningún import a migrar.

**Archivo modificado**: `src/components/sections/ServicesGrid.tsx`
**Diff**: refactor completo del `ServiceBentoCard` interno + agregado de `inferIcon()` helper + nueva estructura JSX. `lib/site.ts` recibió `featured: true` en el primer servicio.

### 6.2 Hero — Magic NO aportó incremental

**Prompt completo enviado a Magic:**
> "Need a cinematic industrial hero with looping background video reel, fixed glass navy navbar overlay, strong dark gradient overlay for legibility, big white display title with amber accent, 3 CTAs (primary amber, outline light, ghost light), and subtle bottom stats/indicator strip. Industrial enterprise B2B HVAC company, navy + amber, premium feel, not SaaS, not playful. Must use motion/react (not framer-motion)."

**searchQuery**: `"video hero industrial"`

**Tool**: `mcp__magic__21st_magic_component_inspiration`

**Resultado**: 3 patrones devueltos.

**Análisis honesto de cada patrón:**

| Patrón | Similarity | Veredicto |
|---|---|---|
| *Dynamic Hero* (canvas con flecha mouse-tracked al botón) | 1.397 | ❌ La animación de flecha es **lúdica**, no industrial. Aportaría feel "gaming". Descartado. |
| *Hero With Video* (player aspect-video + email form + theme toggle) | 1.255 | ❌ Es una landing **SaaS** (con email opt-in y dark mode toggle), no B2B HVAC. Descartado. |
| *DarkProjectHero* (bg video + animated word cycle) | 0.168 | ⚠️ Concepto interesante (rotar "vivid · progressive · limitless") pero usa **framer-motion** (no lo usamos) y nuestro reel YA rota entre 3 videos reales del cliente, que es más fuerte que rotar palabras. Descartado. |

**Decisión: no se integró ningún componente al Hero.** Justificación:

El Hero existente ya cumple todos los criterios:
- ✅ Video reel real (3 clips del cliente) con `IntersectionObserver` pause y `preload` tuned
- ✅ Overlay `hero-overlay` AAA verificado en Playwright (`rgba` tri-stop)
- ✅ Título blanco 72px verificado con `getComputedStyle: rgb(255,255,255)`
- ✅ Parallax sutil con `useScroll` + `useTransform` (y: 0→-36px, opacity: 1→0.55)
- ✅ 3 CTAs: Cotizar proyecto / Ver servicios / Conocer JSD
- ✅ Glass-card indicators del reel inferiores
- ✅ Badge superior "Más de 60 años · HVAC y fabricación industrial"

**Magic no propuso nada que mejorara esto.** El usuario fue explícito: "Si Magic no aporta en una sección, dilo y justifica". Esta es esa justificación.

### 6.3 AboutTimeline — patrón "Modern Timeline" adoptado (NUEVA SECCIÓN)

- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **Prompt**: *"Premium vertical timeline showing company evolution across decades, alternating left-right layout with images and milestone descriptions, large numbered milestones, smooth scroll reveals, industrial visual language, dark connecting line with amber accent dots. Each milestone with year-less era label, title and short description."*
- **searchQuery**: `"vertical timeline milestones"`
- **Patrón adoptado**: *Modern Timeline* (similarity 0.813)
- **Estructura adoptada**:
  - Línea vertical estática + línea animada con `scaleY` scroll progress
  - Avatar circular por hito (en JSD: foto chica del milestone)
  - Status badge por estado (en JSD: era — Fundación/Expansión/Integración/En curso)
  - Card con border + backdrop blur + hover lift
  - Progress bar al fondo de cada card (gradient amber→navy según era)
  - Stagger reveal por item con `whileInView`
- **Migración**: el patrón original usa `framer-motion` → migrado a `motion/react` (1:1 mismas APIs).
- **Archivo nuevo**: `src/components/sections/AboutTimeline.tsx`
- **Integración**: agregado en `src/app/page.tsx` después de `AboutBrief`. Removido timeline horizontal duplicado del `AboutBrief.tsx`.

### 6.4 ProcessTimeline — patrón "How It Works" adoptado

- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **Prompt**: *"Premium process steps section with 4 numbered stages, large display numbers, glass cards on dark background with subtle video bg, hover lift, arrow on hover, industrial enterprise feel..."*
- **searchQuery**: `"process steps numbered"`
- **Patrón adoptado**: *How It Works* (similarity 0.549)
- **Estructura adoptada**:
  - Numbered connector horizontal con línea horizontal entre indicators (en JSD: 4 dots amber con `scaleX` reveal)
  - Cards con icon container (`h-12 w-12 rounded-lg bg-amber/15`)
  - Title + description
  - Benefits list con checkmark icon ring (3 entregables por etapa)
- **Migración**: el patrón original no usaba framer-motion → solo se adaptó a motion/react para `whileHover`/`whileTap` + `whileInView` del connector.
- **Archivo**: `src/components/sections/ProcessTimeline.tsx` (refactor completo)

### 6.5 Footer — patrón "Footer 7" adoptado

- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **Prompt**: *"Premium contact section + footer with multi-column layout, embedded map, WhatsApp/phone/email cards with icons, address with map pin..."*
- **searchQuery**: `"contact section footer"`
- **Patrón adoptado**: *Footer 7* (similarity 3.158 — la más alta de este pase)
- **Estructura adoptada**:
  - Multi-column layout con `flex-col lg:flex-row`
  - Brand block (logo + descripción + tagline) + sections grid
  - `sections` array typed: `{ title, links: Array<{name, href}> }`
  - Bottom strip con copyright + legal links
  - Border-top entre secciones
- **Adaptación industrial JSD**:
  - 3 secciones reales: Navegación, Servicios, Capacidades técnicas (en lugar de Product/Company/Resources genéricos)
  - Contact column con datos reales del cliente (no fake social)
  - Sustituí social media row por contact cards con icon + label + value real
  - Mapa Google Maps embebido (no estaba en el patrón original — se añadió porque JSD lo necesita)
- **Archivo**: `src/components/layout/Footer.tsx` (refactor completo)

### 6.6 Navbar — Magic devolvió Aceternity resizable-navbar (skip honesto)

- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **Prompt**: *"Premium glass navy navbar for industrial B2B website with logo on left..."*
- **searchQuery**: `"glass navbar dropdown"`
- **Patrón devuelto**: Aceternity *resizable-navbar* (compose API: NavBody, NavItems, NavbarLogo, MobileNav, MobileNavToggle, MobileNavMenu)
- **Decisión**: **no integrado**. Justificación:
  - Requiere instalar la librería completa de Aceternity como subdependencia.
  - Nuestro Navbar actual ya tiene glass + shrink-on-scroll + AnimatePresence dropdown + mobile menu funcional + logo real, validado con `backdrop-filter: saturate(1.5) blur(14px)` en Playwright.
  - El valor incremental del resizable (resize literal del width) no compensa el riesgo de instalar otra lib.
- **Pendiente**: si el usuario quiere, puedo invocar `21st_magic_component_refiner` directamente sobre `Navbar.tsx` para que Magic sugiera mejoras puntuales sin requerir nueva lib.

### 6.7 Company Story (Hero Section 2) — devuelto pero descartado

- **searchQuery**: `"company story editorial"`
- **Patrón devuelto**: HeroSection-2 de tipo expedición de montaña con `framer-motion` (output 55KB).
- **Decisión**: **descartado**. Justificación: el patrón es de turismo/landscape, no aplica al B2B industrial HVAC. Sus elementos visuales (logo+slogan+title+CTA+backgroundImage+contactInfo overlay) son demasiado tourism-vibe.

### 6.8 Hero — Magic no aportó (documentado en §6.2)

Mantenido en mi explicación de la iteración anterior. El Hero existente sigue siendo lo más fuerte para B2B HVAC con video reel real, parallax y CTAs claros.

---

## 7. Resumen de evidencia Magic real en este pase

| Invocación | Tool | searchQuery | Patrón ganador | Integrado |
|---|---|---|---|---|
| 1 | inspiration | `bento grid services` | Bento Grid (7.57) | ✅ ServicesGrid |
| 2 | inspiration | `video hero industrial` | (3 patrones) | ❌ Hero no integrado (justificado) |
| 3 | inspiration | `glass navbar dropdown` | resizable-navbar Aceternity | ❌ Navbar no integrado (justificado) |
| 4 | inspiration | `company story editorial` | HeroSection-2 mountain | ❌ Descartado (no industrial) |
| 5 | inspiration | `vertical timeline milestones` | **Modern Timeline (0.813)** | ✅ AboutTimeline.tsx NUEVO |
| 6 | inspiration | `process steps numbered` | **How It Works (0.549)** | ✅ ProcessTimeline refactor |
| 7 | inspiration | `contact section footer` | **Footer 7 (3.158)** | ✅ Footer refactor |

**Total Magic invocations**: 7
**Patrones integrados**: 4 (ServicesGrid, AboutTimeline, ProcessTimeline, Footer)
**Patrones descartados con justificación documentada**: 3 (Hero, Navbar, Company Story)

---

## 8. Pase Magic refiner (post-feedback usuario)

### 8.1 Refiner fallido — fallback con inspiration

Invoqué `mcp__magic__21st_magic_component_refiner` 4 veces para Hero y Navbar. Las 4 devolvieron **"Anthropic experiencing high load"**. Como fallback, usé `inspiration` con prompts muy específicos:

### 8.2 Hero — stats grid pattern integrado

- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **searchQuery**: `"editorial industrial hero stats"`
- **Patrones devueltos**: 3
  - *Minimalist Hero* (similarity 3.484) — 3 cols con imagen retrato + círculo amarillo. Estética portrait. **Descartado**, no industrial.
  - *DarkProjectHero* — el mismo de antes, framer-motion + animated word cycle. **Descartado**.
  - *MINIMAL Hero* (similarity 0.07) — hero blanco con grid bg + accent circles + badge + title + buttons + **stats grid 4-col con accent bar top + value + label uppercase**. **Parcialmente adoptado**: solo el stats grid pattern.
- **Lo que adopté**:
  - **Estructura de stats grid 4 columnas** al fondo del Hero: `grid-cols-2 lg:grid-cols-4 gap-6`
  - **Accent bar top** `h-px w-8 bg-amber` antes de cada stat
  - **Eyebrow uppercase** small `text-[10px] tracking-[0.22em]` seguido de **label semibold**
  - Stagger reveal con `motion.div` y delay incremental por item
- **Lo que descarté** del MINIMAL Hero:
  - Números/cifras falsas (500K+, 99.9%, 4.9★) — el usuario explícitamente prohíbe inventar claims.
  - Círculos animados de fondo (lúdico, no industrial).
  - Badge con dot pulsing (ya teníamos uno similar).
  - framer-motion imports.
- **Resultado en JSD**:
  - 4 stats limpios sin números: "HVAC industrial" / "Climatización comercial" / "Fabricación CNC" / "Mantenimiento técnico" — todos labels seguros que reflejan capacidades reales.
  - WhatsApp inline link bajado a `text-xs` y opacidad 65%, ya no compite con el stats grid.
  - Visualmente la cinta inferior dejó de sentirse saturada: dos zonas claras separadas (stats grid arriba + WhatsApp link abajo).
- **Archivo modificado**: `src/components/sections/Hero.tsx` (sólo el bottom strip, no se tocó video reel, parallax ni título).

### 8.X CinematicIntro — pase con control creativo (UNA experiencia)

**Concepto:** Un solo contenedor sticky (~640vh) con video de fondo durante
3 paneles (Hero → About → Timeline). Después del Timeline sale a `ServicesGrid`
con fondo normal. Reemplaza `Hero` + `StickyVideoBridge` + `AboutBrief` +
`AboutTimeline` individuales (que se mantienen en repo pero no se importan
en home).

**Por qué este enfoque:** el `StickyVideoBridge` separado del pase anterior
se sintió como "segundo hero" porque tenía su propio H2 enorme + poster
distinto. Unificar los 3 paneles bajo un mismo video sticky soluciona la
duplicación y crea narrativa continua.

**Patrones 21st.dev aplicados (3 inspirations distintas):**

| Patrón | Tool | Similarity | Aplicación |
|---|---|---|---|
| **Hero03 editorial gigante** | `inspiration("section heading premium")` | – | Composición Panel 2: tagline lateral chico + título display 120px en bloques |
| **Bento Gallery scroll horizontal** | `inspiration("bento media gallery")` | 0.517 | Galería editorial del Panel 2 con `grid-flow-col` + cards 3/4 + hover lift |
| **Process Timeline horizontal** | `inspiration("horizontal timeline scroll")` | 0.564 | Panel 3 completo: adopción directa de `ContainerScroll`/`ProcessCard` con `useTransform` x para scroll horizontal de cards. Usa `motion/react` (no framer-motion) — perfecto. Adaptado a 4 eras JSD con `useMeasure` propio (sin lib externa). |

**Patrones descartados:**
- `Hero4` (typewriter cycle + avatars + dashed border) → demasiado SaaS lead-gen.
- `Hero03` Ali Imam → estética portfolio personal con badges decorativos.
- `Underline Hero SaaS` → estética startup, no industrial.
- `InteractiveBentoGallery` (drag con dock flotante) → demasiado lúdico para B2B.
- `Modern Timeline` vertical (similarity 0.813) → ya estaba en uso, ahora reemplazado por la horizontal scroll-driven que es más premium.
- `Timeline-02` (vertical simple) → equivalente a lo que ya tenía.

**Decisiones de UI/UX (criterio propio):**
- **Eliminé el segundo hero** (StickyVideoBridge separado) y consolidé en 1.
- **Eliminé Kicker rayita** en todo el CinematicIntro: el eyebrow ahora es chip uppercase tracking-wide amber.
- **Reduje saturación del Hero**: solo eyebrow + título display 88px + subtítulo + 2 CTAs (sin stats grid, sin scroll cue, sin línea inferior).
- **Reel curado de 5 videos** industriales (los 2 menos convincentes fueron retirados en pase anterior).
- **Panel transitions**: cada panel tiene su `activeRange` controlando opacity/pointer-events con `useTransform` del progreso global → cada panel entra y sale sin overlap clickeable.

**Animaciones Motion (todas con `useReducedMotion` fallback):**
- Video sticky: cross-fade entre clips + scale 1.06→1 según progreso global.
- Overlay: opacity 0.5→0.75→0.92 (más oscuro al entrar al Timeline).
- Panel 1 Hero: stagger fade-up eyebrow→h1→p→CTAs.
- Panel 2 About: `opacity 0→1→0` + `y 40→0→-30` controlado por scroll.
- Panel 2 galería: stagger reveal + whileHover y:-4.
- Panel 3 Timeline: `useScroll` interno + `useTransform` x por card (cada card entra desde la derecha viewport → se ancla cerca de su posición índice).
- Indicators del reel: bottom center con glass + bar amber.

**Bug fix aplicado:** hydration mismatch por `typeof window !== 'undefined' ? window.innerWidth : 1440` → cambiado a `useState(0)` + `useEffect` con `window.innerWidth` post-mount + `resize` listener.

**Archivo nuevo:** `src/components/sections/CinematicIntro.tsx` (~480 líneas).
**page.tsx**: 8 líneas, imports limpios — solo `<CinematicIntro />` + secciones post-intro.

### 8.3 Hero + AboutBrief + StickyBridge (pase POR PARTES)

#### Patrón 1 — Magic Text → `RevealText.tsx` (NUEVO)
- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **searchQuery**: `"text reveal word"`
- **Patrón ganador**: *Magic Text* (similarity 1.616)
- **Por qué este y no los otros**:
  - *TextRevealByWord* (Magic UI) usa `framer-motion` — requería migración.
  - *Magic Text* ya usa `motion/react` directamente. **Cero migración**.
  - *Whisper Text* usa GSAP + ScrollTrigger — añadiría dependencia pesada.
- **Estructura adoptada del original**:
  - `useScroll` con offset `["start 0.9", "start 0.25"]`
  - Cada palabra mapeada con su propio `useTransform(progress, range, [0, 1])`
  - Ghost word con `opacity-20` + word "iluminada" con `motion.span style={{ opacity }}`
- **Adaptación industrial JSD**:
  - Acepta `as: "span" | "p" | "div"` para usarse dentro de cualquier heading.
  - `ghostOpacity` configurable (default 0.18) — más sobrio que el 0.2 original.
  - `useReducedMotion()`: si reduce, renderiza texto plano sin animación.
  - El "ghost" hereda `currentColor` del padre → AAA con cualquier fondo.
- **Archivo nuevo**: `src/components/motion/RevealText.tsx`
- **Integración**: usado en el título del `StickyVideoBridge` en `page.tsx`.

#### Patrón 2 — Animated Video on Scroll → `StickyVideoBridge.tsx` (NUEVO)
- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **searchQuery**: `"sticky scroll section"`
- **Patrón ganador**: *Animated Video on Scroll* (similarity 0.906)
- **Por qué este y no los otros**:
  - *Text Parallax Content* (similarity 1.51) usa `framer-motion` — más trabajo.
  - *Animated Video on Scroll* ya usa `motion/react` con `ContainerScroll`/`ContainerSticky`/`ContainerAnimated` — sistema completo importable.
  - *Interactive Scrolling Story* usa state machine sin scroll-driven — no aplica.
- **Estructura adoptada**:
  - `ContainerScroll` ≡ wrapper section con `useScroll` context
  - `ContainerSticky` ≡ `sticky top-0 h-screen` interno
  - `useTransform` para `scale`, `opacity`, `y` del contenido sobre el progreso del scroll
  - Variants `hidden`/`visible` con `filter: blur` + opacity (no usadas, lo simplificamos)
- **Adaptación industrial JSD**:
  - Diseñado específicamente como **bridge entre Hero y AboutBrief** (no como reemplazo del Hero).
  - Recibe `poster`, `alt`, `eyebrow`, `title` (React node — admite `<RevealText>`), `children`.
  - Poster con escala suave `1.05 → 1 → 1.02` durante el sticky.
  - Overlay tri-stop ink→ink/85→petroleum, opacidad que aumenta `0.55 → 0.92`.
  - Texto: entra con opacidad/y entre 10–30% del scroll, sale entre 70–90%.
  - `useReducedMotion()` → versión estática 60vh sin sticky para a11y.
  - Grid texture sutil heredada del Hero para coherencia visual.
- **Archivo nuevo**: `src/components/motion/StickyVideoBridge.tsx`
- **Integración**: en `page.tsx` entre `<Hero />` y `<AboutBrief />`. Usa la foto real `09_sistema-de-ductos-industriales-en-nave_8k.jpg` como poster del puente.

#### Refactor de Hero (sin patrón Magic nuevo, justificado)
- **Decisión**: NO se invocó nuevo patrón Magic para el Hero.
- **Justificación**: la 3a invocación de `searchQuery: "corporate hero video"` devolvió los **mismos 3 patrones** ya descartados antes (Dynamic Hero canvas, Hero With Video SaaS, DarkProjectHero framer-motion). Ninguno aporta a JSD.
- **Cambios aplicados al Hero existente** (limpieza, no rediseño):
  - **Reel actualizado**: removidos `hero-aerea-main-2` y `trabajos-campo` (feedback usuario), sumados `hero-grua-aerea`, `hero-grua-2`, `hero-aereo-3`, `equipos-sin-instalar`, `trabajos-campo-2` — 5 clips industriales/técnicos curados (~21 MB con preload progresivo).
  - **Saturación reducida**: eliminados stats grid de 4, scroll cue flecha, línea inferior subtitle. Quedan solo: eyebrow + título + subtítulo + 3 CTAs.
  - **Copy refinado**: título corto "HVAC, climatización y **fabricación industrial**". Subtítulo concreto enumerando: chillers, ductería, agua helada, mantenimiento, fabricación metálica.
  - **CTAs**: amber WhatsApp primary + outline "Ver servicios" + ghost "Conocer JSD" — jerarquía clara.

#### Refactor de AboutBrief (sin Kicker rayita)
- **Decisión**: usar pattern editorial heading con eyebrow chico amber + título display fuerte (no Kicker componente).
- **Por qué**: el usuario explícitamente pidió quitar la rayita "— MÁS DE 60 AÑOS". El componente `Kicker` se mantiene para otras secciones pero NO se usa aquí.
- **Cambios**:
  - Eyebrow `text-[11px] uppercase tracking-[0.32em] text-amber` simple (sin rayita line).
  - Heading display 60px con destacados navy + amber.
  - Stats grid limpio (4 stats: 60+ años / HVAC / CNC / Técnico).
  - Foto principal 5:4 con overlay editorial bottom + figcaption con "Obra real".
  - Bloque copy + bullets a la derecha con dot amber.
  - Mini galería 3-col con offset alterno (middle `sm:translate-y-8`) y figcaption en cada figura.
- **Archivo**: `src/components/sections/AboutBrief.tsx` (refactor completo)

#### Integración Hero + Bridge + AboutBrief
- **page.tsx**: orden actualizado: `<Hero />` → `<StickyVideoBridge>...</StickyVideoBridge>` → `<AboutBrief />` → `<AboutTimeline />` → resto.
- El bridge inyecta una franja sticky de ~160svh con el mismo lenguaje visual del Hero (poster industrial + overlay dark + texto display), creando continuidad antes de que AboutBrief pase a fondo claro.
- Sin scroll-snap (evita conflictos en mobile) ni position:fixed (evita conflictos con navbar fixed).

### 8.4 Navbar — descartado honestamente

- **searchQuery**: `"mega menu dropdown navbar"`
- **Patrón devuelto**: *Header-3* (output 57KB) usando shadcn `NavigationMenu` + `@radix-ui/react-navigation-menu` + `MenuToggleIcon` + `createPortal`.
- **Decisión**: **no integrado**.
- **Justificación**:
  1. Requiere instalar `@radix-ui/react-navigation-menu` como dependencia adicional.
  2. El patrón se enfoca en **navigation-menu** estilo desktop con NavigationMenuContent overlays — funcionalmente equivalente a lo que ya tengo con `AnimatePresence`.
  3. Nuestro Navbar actual ya pasa Playwright con backdrop-filter activo, logo real, dropdown funcional. La ganancia vs el costo de añadir lib + refactor no se justifica.
- **Si en el futuro el cliente pide mega-menu real con NavigationMenuContent**, esa es la lib a instalar. Documentado para futuro.

El Navbar actual ya tiene:
- Glass navy real con `backdrop-filter: saturate(1.5) blur(14px)` (verificado en Playwright)
- Logo PNG real del cliente
- AnimatePresence dropdown desktop + mobile menu
- Background opacity scaling on scroll

Decidí no invocar Magic sobre el Navbar para no consumir cuota sin justificación clara. **Si el usuario quiere que lo haga, basta con pedirlo.**
