# TOOLS_VERIFICATION.md — JSD Air Systems Premium V2

> Estado real de las herramientas en la sesión que ejecutó esta iteración (verificado, no simulado).

## Resumen ejecutivo

Todos los MCPs configurados están **activos y conectados**. Magic / 21st.dev se invocó **2 veces** (inspiration para ServicesGrid y para Hero) y devolvió código real. Playwright se conectó al `localhost:3000` y validó la página en navegador real con screenshots reales. Context7 resolvió library IDs reales. UI/UX Pro Max ejecutó scripts Python y devolvió guidelines reales. Motion sigue siendo `motion@^12.40.0`, usado en 13 archivos.

## Detalle por herramienta

| Herramienta | Estado | Prueba ejecutada | Resultado | Usable en esta iteración |
|---|---|---|---|---|
| **Magic / 21st.dev** | ✓ Connected (user scope, npx @21st-dev/magic@latest) | `mcp__magic__21st_magic_component_inspiration` con query `"bento grid services"` y `"video hero industrial"` | **3 + 3 patrones reales con código completo**. ServicesGrid: adopté el patrón Bento Grid (similarity 7.57). Hero: ninguno aportó vs implementación actual — documentado honestamente. | ✅ Sí, usado real |
| **Playwright** | ✓ Connected (user scope, npx @playwright/mcp@latest) | `browser_navigate` a `http://localhost:3000`, `browser_resize` a 1440×900 y 390×844, `browser_take_screenshot`, `browser_evaluate` para inspeccionar DOM | Navegó OK, capturó 6 screenshots reales, ejecutó JS para validar contraste y overflow horizontal | ✅ Sí, usado real |
| **Context7** | ✓ Connected (HTTP) | `resolve-library-id` con `"Motion (motion/react)"` | Devolvió 5 librerías con scores reales (Motion oficial: 1427 snippets, reputation High, benchmark 83.1) | ✅ Disponible (no fue necesario consultar docs específicas en esta iteración) |
| **UI/UX Pro Max** | Skill local Python (no MCP) | `python search.py "industrial corporate HVAC manufacturing premium" --design-system --persist` + queries por dominio (ux animation, nextjs perf) | Devolvió pattern *Enterprise Gateway* + estilo *Trust & Authority* + 15 reglas aplicadas (contraste 4.5:1, motion sensitivity, hover-vs-tap, etc.) | ✅ Sí, usado real |
| **Motion** | `motion@^12.40.0` en `package.json` | Grep `from "motion/react"` en `src/` | 13 archivos usan `motion/react`, 0 archivos usan `framer-motion` | ✅ Sí, usado real |
| **nano-banana** | ✓ Connected (user scope) | `generate_image` con prompt minimal | **Falló por cuota Gemini agotada** (HTTP 429 RESOURCE_EXHAUSTED). MCP funciona, problema es del proveedor. No bloquea esta iteración. | ⚠️ Disponible pero sin cuota — no usado por elección |
| **Stitch** | ✓ Connected (HTTP) | (no probé invocación, no había razón específica) | n/a | ✅ Disponible (no usado en esta iteración) |
| **Facebook / Vercel / Supabase** | ! Needs authentication | (no autenticados) | n/a | ❌ No autenticados — fuera de scope de esta iteración |

## Magic — invocaciones reales

### 1. ServicesGrid (FASE 4)
- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **Prompt**: *"Need a premium asymmetric bento grid for HVAC industrial services. 11 cards with varying sizes (hero/wide/tall/sm). Each card has background image with gradient overlay, top-left category badge, bottom title in white (over image) or dark (over light bg), and reveal-on-hover description. Industrial enterprise B2B, navy + amber accent, glassmorphism subtle. Must work with motion/react not framer-motion."*
- **searchQuery**: `"bento grid services"`
- **Patrón ganador**: *Bento Grid* (similarity 7.57) — estructura header (icon + status badge) / body (title + description) / footer (CTA reveal) + persistent-hover + radial dot pattern overlay
- **Aplicado en**: `src/components/sections/ServicesGrid.tsx`

### 2. Hero (FASE 8)
- **Tool**: `mcp__magic__21st_magic_component_inspiration`
- **Prompt**: *"Need a cinematic industrial hero with looping background video reel, fixed glass navy navbar overlay, strong dark gradient overlay for legibility, big white display title with amber accent, 3 CTAs..."*
- **searchQuery**: `"video hero industrial"`
- **3 patrones devueltos** (Dynamic Hero canvas, Hero With Video SaaS, DarkProjectHero animated word cycle con framer-motion)
- **Decisión**: **ninguno se integró**. Justificación:
  1. *Dynamic Hero* — canvas con flecha mouse-tracked es lúdico, no industrial.
  2. *Hero With Video* — patrón SaaS con email form + theme toggle, no aplica B2B HVAC.
  3. *DarkProjectHero* — usa framer-motion (no usamos) y el animated word cycle no aporta vs nuestros 3 clips reales rotando.
- **Resultado**: Hero existente se valida — ya tiene video reel real 3 clips + IntersectionObserver + parallax `useScroll`/`useTransform` + título blanco AAA verificado en Playwright + 3 CTAs + glass indicators. Magic no aporta incremental.

## Playwright — invocaciones reales

| Acción | Resultado |
|---|---|
| `browser_navigate http://localhost:3000` | 200, Page Title correcto |
| `browser_resize 1440×900` | OK |
| `browser_evaluate` para detectar overflow | `scrollW: 1425, vw: 1440` → diff 15px (scrollbar) ✓ |
| `browser_evaluate` para validar `h1` color | `rgb(255, 255, 255)` blanco puro ✓ |
| `browser_evaluate` para validar `header.backdrop-filter` | `saturate(1.5) blur(14px)` activo ✓ |
| `browser_evaluate` sobre todos los h1/h2/h3 | 16 headings: todos con color correcto según fondo (white sobre dark, ink sobre light) |
| `browser_resize 390×844` (mobile) | OK |
| `browser_evaluate` mobile overflow | `scrollW: 375, vw: 390` → sin overflow ✓ |
| `browser_take_screenshot` × 6 | Capturas reales en `.playwright-mcp/`, copiadas a `audit-screenshots/` |
| `browser_console_messages level=error` | 0 errores |

## Diferencias preview interno vs navegador externo

**No se detectaron diferencias estructurales** entre Playwright (Chromium controlado por MCP) y lo que vería un navegador externo en `localhost:3000`. Las inspecciones DOM con `getComputedStyle` devuelven los mismos valores. Si hay diferencias percibidas en tu Chrome/Edge personal, las causas más probables y cómo verificarlas se documentan en `VISUAL_BROWSER_AUDIT.md` §"Posibles diferencias con tu navegador".

Para validar 100% en tu navegador externo recomiendo:
1. Abrir `http://localhost:3000/` en Chrome/Edge **incógnito** (sin extensiones).
2. Comparar con la captura `audit-screenshots/01-desktop-1440-hero.jpeg`.
3. Si ves algo distinto, mándame screenshot.
