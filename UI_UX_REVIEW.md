# UI_UX_REVIEW.md — JSD Air Systems Premium V2

> Revisión técnica del sitio según las reglas de **UI/UX Pro Max** (skill local Python, `~/.claude/skills/ui-ux-pro-max/`). Esta versión refleja el refactor post-auditoría.

## 1. Origen de la validación

- Skill ejecutada: `ui-ux-pro-max` (Python search.py)
- Comandos invocados en esta sesión:
  - `python search.py "industrial corporate HVAC manufacturing premium" --design-system --persist -p "JSD Air Systems Premium V2"`
  - `python search.py "animation accessibility contrast hover reduced-motion" --domain ux -n 12`
  - `python search.py "performance bundle suspense rerender" --stack nextjs -n 8`
- Pattern recomendado por la skill: **Enterprise Gateway** (corporate gateway con video hero, mega menu, solutions by industry, contact sales).
- Style recomendado: **Trust & Authority** (premium/luxury, enterprise software, performance excellent, WCAG AAA).

---

## 2. Problemas detectados por la skill + cómo se aplicó

| Regla UI/UX Pro Max | Severidad | Diagnóstico anterior | Resolución aplicada | Archivo |
|---|---|---|---|---|
| **Color Contrast** (4.5:1 mínimo) | HIGH | Hero h1 con `text-white` se rendreaba como `rgb(11,18,32)` por regla global `h1{color:...}` fuera de layer. | Movido a `@layer base` con `color: inherit`. Tailwind utilities en `@layer utilities` ahora ganan. | `src/app/globals.css` |
| **Motion Sensitivity / Reduced Motion** | HIGH | `useScroll` parallax y `motion-safe:animate-ping` ya respetaban, pero `VideoReel` autoplay no. | `VideoReel`, `WhatsAppFab`, `AboutBrief`, `CapabilitiesCNC`, `ProcessTimeline`, `ProjectsTeaser`, `Navbar`, `Lightbox` ahora invocan `useReducedMotion()` y desactivan motion. | múltiples |
| **Excessive Motion** | HIGH | Hover en cada card + bounce + parallax podían saturar. | Solo 1 micro-interacción por elemento: `whileHover`+`whileTap` mutuamente excluyentes. Scroll bounce solo en CTA del hero. | `Hero.tsx`, `ServicesGrid.tsx` |
| **Duration Timing 150-300ms** | MEDIUM | Algunas transiciones a 700ms (image scale). | Microinteracciones a 200-300ms; image scale 1000ms intencional (premium hover) — documentado. | `Button.tsx` (`duration-200`), cards 300ms |
| **Easing Functions** | LOW | Linear evitado. | `[0.16, 1, 0.3, 1]` (ease-out premium) en todos los Reveal y Motion. | global |
| **Continuous Animation** | MEDIUM | FAB `animate-ping` continuo. | Limitado a `motion-safe:animate-ping` (respeta reduced-motion). Es loading-like indicator. | `WhatsAppFab.tsx` |
| **Loading States** | HIGH | Videos cargan sin placeholder. | `poster` en cada `<video>` + `preload="metadata"` o `"none"` para diferir. | `Hero.tsx`, `CapabilitiesCNC.tsx`, `ProcessTimeline.tsx` |
| **Hover vs Tap** | HIGH | Cards de servicios solo "revelaban" descripción en hover (móvil no la ve). | Cards mobile muestran descripción siempre (no `max-h-0`); desktop la oculta hasta hover. | `ServicesGrid.tsx` (`sm:max-h-0`) |
| **Hover States** | MEDIUM | Faltaba `cursor-pointer` consistente. | `cursor-pointer` en Button cva, en cards `motion.button`. | `Button.tsx`, `ServicesGrid.tsx`, `ProyectosPage.tsx` |
| **Typography Contrast Readability** | HIGH | Texto sobre video tenía baja sombra. | `.title-shadow` con `text-shadow: 0 2px 18px rgba(11,18,32,.55)` + overlay `.hero-overlay` 92% inferior. | `globals.css`, `Hero.tsx`, `ServicesGrid.tsx` |
| **Touch Target Size 44px** | CRITICAL | Botones cumplían (h-11 = 44px). | Mantenido. Mobile menu toggle `h-11 w-11`. | `Navbar.tsx`, `Button.tsx` |
| **Focus States** | CRITICAL | Outline amber 2px definido en globals. | `:focus-visible { outline: 2px solid amber; outline-offset: 3px }` + `focus-visible:outline-*` en motion.button. | `globals.css` |
| **Z-Index Management** | HIGH | Escalado: 10 nav-section, 40 FAB, 50 navbar fixed, 60 lightbox. | Mantenido y documentado. | múltiples |
| **Line Height 1.5-1.75** | MEDIUM | `body { line-height: 1.55 }`. | OK. | `globals.css` |
| **Line Length 65-75ch** | MEDIUM | Párrafos editoriales con `max-w-xl` (~65ch). | OK. | secciones |

---

## 3. Reglas Next.js (stack-specific) aplicadas

| Regla | Estado | Notas |
|---|---|---|
| **Server Components por defecto** | ✅ Parcial | `Footer`, `BlogTeaser` server. Hero, Navbar, ServicesGrid, CNC, Process, Projects → client por Motion. Justificado. |
| **Variable fonts** | ✅ | `next/font/google` con `Poppins` y `Open Sans` variable fonts. |
| **Dynamic imports** | ⚠️ Pendiente | El Lightbox debería ser `next/dynamic({ loading: skeleton })` para no inflar bundle inicial. Fase futura. |
| **Avoid layout shifts** | ✅ | Todas las `<Image>` con `fill` + `sizes`, video con `aspect-*` y `poster`. |
| **Bundle analyzer** | ⚠️ Pendiente | No instalado `@next/bundle-analyzer`. Fase futura. |
| **Suspense streaming** | ⚠️ No aplicado | El sitio es 100% estático prerenderizado (`○ Static` en 19 rutas). No hay data-fetching async. No es necesario por ahora. |
| **Partial Prerendering** | ⚠️ No aplicado | Mismo motivo: sin componentes dinámicos. |

---

## 4. Pre-Delivery Checklist (skill UI/UX Pro Max)

### Visual Quality
- [x] No emojis como iconos (todo SVG inline en `Icons.tsx`).
- [x] Iconografía consistente (line, stroke 1.75, viewBox 24).
- [x] Logo correcto (PNG real del cliente, no inventado).
- [x] Hover states sin layout shift (uso `scale` con `transform-origin: center`, no `width/height`).
- [x] Theme colors directos (`bg-[color:var(--color-navy)]` sin wrappers extra).

### Interaction
- [x] `cursor-pointer` en clickable.
- [x] Hover feedback visible (shadow-lift, scale, color shift, glare).
- [x] Transiciones 200-300ms.
- [x] Focus visible para keyboard nav.

### Light/Dark
- [x] Text contrast AAA (`#0b1220` sobre `#f4f6f8` = 18.5:1).
- [x] Glass cards 60-85% opacidad — visibles en claro.
- [x] Borders visibles (`border-[color:var(--color-ash-200)]`).
- [x] Solo modo claro global (no dark mode toggle por requisito).

### Layout
- [x] Navbar fixed con margen visual (`pt-32` en heros).
- [x] Content no oculto detrás de fixed.
- [x] Max-widths consistentes (`max-w-7xl` global, `max-w-3xl/4xl` heros).
- [x] Sin horizontal scroll en móvil.

### Accesibilidad
- [x] Alt text descriptivo en imágenes principales.
- [x] `aria-label` en buttons icon-only (WhatsApp FAB, mobile menu, Lightbox controls).
- [x] Forms con `<label htmlFor>` (`/contacto`).
- [x] `prefers-reduced-motion` respetado.
- [x] Color no es único indicador (badges + texto).

---

## 5. Lo que sigue pendiente (no se hizo en este pase)

1. **Bundle analyzer real:** instalar `@next/bundle-analyzer` y medir tamaño first-load.
2. **Lighthouse score:** correr Lighthouse contra prod build y documentar score (esperado ~90+ accessibility/best-practices).
3. **`next/dynamic` para Lightbox:** el modal sólo se carga al hacer click, debería ser code-split.
4. **Skeleton screens** durante video buffering del hero (hoy hay poster, no skeleton animado).
5. **Server Components migration:** AboutBrief y secciones con solo Reveal podrían ser server si Reveal usara un wrapper client mínimo.
6. **`@axe-core/react`** o herramienta similar para auditoría a11y automatizada.
7. **Pruebas con lectores de pantalla** reales (VoiceOver, NVDA) — pendiente con usuario.

---

## 6. Anti-patterns del Design System que se respetaron

De acuerdo a la skill, el pattern *Enterprise Gateway* tiene los siguientes anti-patrons que **evitamos**:

- ❌ Playful design — confirmado, el sitio es serio y técnico.
- ❌ Hidden credentials — los datos de contacto son visibles en hero, footer y página de contacto.
- ❌ AI purple/pink gradients — paleta es navy + amber, cero violeta.

Además agregamos por contexto JSD:
- ❌ ASHRAE / NOM como certificación afirmada (cliente no lo confirmó).
- ❌ "1965+" como fecha de fundación (cliente no lo confirmó).
- ❌ "24/7" como SLA (cliente no lo confirmó).
- ❌ Carrusel de logos de clientes (no hay autorización).
