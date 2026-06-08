# MOTION_USAGE.md — JSD Air Systems Premium V2

> Inventario de uso real de la librería **`motion`** (sucesor de `framer-motion`) en el sitio JSD. Post-refactor.

## 1. Resumen

| Métrica | Antes | Ahora |
|---|---|---|
| Archivos que importan `motion/react` | 3 | **9** |
| Uso de `whileHover` | 0 | **8 lugares** |
| Uso de `whileTap` | 0 | **5 lugares** |
| Uso de `useScroll` / `useTransform` | 1 (Hero) | 1 (Hero) — mantenido |
| Uso de `useReducedMotion()` | 3 | **9** |
| `AnimatePresence` | 1 (VideoReel) | **4** (Navbar dropdown, Navbar mobile, Lightbox, VideoReel) |
| `IntersectionObserver` para pausar videos | 0 | **3** (VideoReel, CapabilitiesCNC×2, ProcessTimeline) |
| `IntersectionObserver` para FAB awareness | 0 | **1** (WhatsAppFab) |

---

## 2. Mapa archivo → animaciones

### `src/components/motion/Reveal.tsx`
- `Reveal` — `whileInView` + `viewport={{ once: true, margin: '-80px' }}` fade-up 24px, easing `[0.16,1,0.3,1]`.
- `RevealStagger` — Variants con `staggerChildren` 70-120ms.
- `RevealItem` — Variants `hidden`/`visible`, fade-up 20px.
- **Por qué aporta:** ritmo editorial al scrollear; el contenido aparece coordinado, no en bloque.
- **Performance:** `viewport.once` evita re-trigger en cada scroll.

### `src/components/motion/VideoReel.tsx`
- `AnimatePresence mode="wait"` para cross-fade entre clips.
- `motion.video` con `initial={{ opacity: 0, scale: 1.04 }}` → cierre suave a `scale: 1`.
- `useReducedMotion()`: si reduce, muestra solo poster estático.
- `IntersectionObserver` (`threshold: 0.15`): pausa videos fuera de viewport.
- Auto-advance fail-safe con `setTimeout(autoAdvanceMs=10000)`.
- `preload="auto"` solo para el primer clip, resto `preload="metadata"`.
- **Por qué aporta:** transiciones premium entre videos sin saltos bruscos; performance protegido.

### `src/components/sections/Hero.tsx`
- `useScroll({ target: ref, offset: ['start start', 'end start'] })`.
- `useTransform` con clamping:
  - `y`: 0 → -36px (parallax sutil del texto).
  - `opacity`: 1 → 0.55 (fade-out al scrollear).
- `motion.div` envoltorio con `style={{ y, opacity }}`.
- `motion.span` (badge) — fade-in 0.7s delay 0.
- `motion.h1` — fade-up 0.9s delay 0.1.
- `motion.p` — fade-up 0.9s delay 0.2.
- `motion.div` (botones) — fade-up 0.8s delay 0.3.
- `motion.div` (cinta inferior) — fade-up 0.9s delay 0.45.
- **Por qué aporta:** entrada en cascada (kicker → título → subtítulo → CTAs → cinta) que guía el ojo; parallax refuerza profundidad.

### `src/components/sections/AboutBrief.tsx`
- `motion.div` (foto principal): `whileHover={{ y: -4 }}` con transition 0.4s.
- `motion.div` (mini-galería): `whileHover={{ y: -4 }}`.
- `useReducedMotion()` para anular hover si reduce.
- **Por qué aporta:** la foto editorial responde al puntero, sensación premium.

### `src/components/sections/ServicesGrid.tsx`
- `motion.span` (badge "Servicio") — `whileHover={{ y: -2 }}`.
- `GlareCard` wrapper externo — efecto glare mouse-tracked (CSS pure).
- Cards `<Link>` con CSS hover scale (1.05 transform on group-hover).
- **Por qué aporta:** cards corporativas que se sienten táctiles sin caer en flair lúdico.

### `src/components/sections/CapabilitiesCNC.tsx`
- `motion.div` (2 sub-cards): `whileHover={{ y: -2 }}`.
- `motion.li` (cada capability): `whileInView` con `delay: i*0.06` + `whileHover={{ x: 4 }}`.
- `IntersectionObserver` en ambos videos (cnc-laser + cnc-laser-2) — pausan fuera de viewport.
- **Por qué aporta:** la lista de capacidades "respira" al revelarse; cada item se siente como acción al hover.

### `src/components/sections/ProcessTimeline.tsx`
- `motion.div` (cada glass card): `whileHover={{ y: -4, scale: 1.01 }}` + `whileTap={{ scale: 0.99 }}`.
- `useReducedMotion()` gate.
- `IntersectionObserver` en video fondo `proceso-campo.mp4` — pause OOV.
- Overlay gradient tri-stop (más sutil) — visualmente más cinematográfico.
- **Por qué aporta:** las 4 etapas son tarjetas premium; el `whileTap` da sensación de affordance real, no solo decoración.

### `src/components/sections/ProjectsTeaser.tsx`
- `motion.button` por tarjeta: `whileHover={{ y: -3 }}` + `whileTap={{ scale: 0.985 }}`.
- Lightbox al click con `AnimatePresence` + `motion.div` modal: fade-in + scale-up 0.96→1.
- **Por qué aporta:** la galería deja de ser "decoración" y se vuelve interactiva — el usuario expande imágenes y navega con teclado.

### `src/app/proyectos/page.tsx`
- `motion.button` (filtros): `whileTap={{ scale: 0.96 }}`.
- `motion.button` (tiles): `whileHover={{ y: -4 }}` + `whileTap={{ scale: 0.985 }}`.
- Lightbox con AnimatePresence.
- **Por qué aporta:** filtros con feedback táctil; lightbox accesible (Esc/←/→).

### `src/components/layout/Navbar.tsx`
- `AnimatePresence` para mega-dropdown desktop: fade + slide-down 0.2s.
- `AnimatePresence` para menú mobile: opacity + height 0.25s.
- `motion.div`/`motion.div` con `useReducedMotion()` gate.
- **Por qué aporta:** el dropdown se siente "vivo" pero rápido; cero retardo en navegación.

### `src/components/layout/WhatsAppFab.tsx`
- `motion.a` con entrada `initial={{ opacity: 0, scale: 0.5 }}` → `animate={{ scale: 1 }}` delay 1s.
- `whileHover={{ scale: 1.08 }}` + `whileTap={{ scale: 0.95 }}`.
- `IntersectionObserver` sobre `<footer>` — sube el FAB 112px cuando footer es visible.
- `motion-safe:animate-ping` accesible.
- **Por qué aporta:** entrada que invita sin atajar la atención; reacciona y no tapa el footer.

### `src/components/ui/Lightbox.tsx`
- `AnimatePresence` para overlay y para imagen activa.
- `motion.div` overlay: fade 0.2s.
- `motion.div` imagen: scale-up 0.96→1 con `useReducedMotion()` gate.
- Navegación teclado (Escape/←/→).
- **Por qué aporta:** modal premium accesible, con transiciones suaves entre fotos.

### `src/components/ui/Button.tsx`
- CSS `active:scale-[0.97]` (no Motion, pero feedback táctil universal).
- **Por qué aporta:** todos los botones del sitio responden al click sin tener que importar Motion en cada uso.

### `src/components/ui/GlareCard.tsx`
- `onMouseMove` setea CSS vars `--mx`/`--my` → consumidas por `.glare-card::after` (gradient radial).
- **Por qué aporta:** efecto Linear/Aceternity de alta gama sin runtime JS pesado (solo 2 var updates per move).

---

## 3. Performance — cuidados explícitos

| Cuidado | Implementación |
|---|---|
| Pausar videos fuera de viewport | `IntersectionObserver` en `VideoReel`, `CapabilitiesCNC` (×2), `ProcessTimeline` |
| `preload="none"` en videos secundarios | `cnc-laser-2.mp4`, `proceso-campo.mp4`, hero clips 2-3 |
| `viewport={{ once: true }}` en Reveal | evita re-trigger en scroll |
| `useReducedMotion()` shortcircuit | 9 archivos retornan plain div / no-op si reduce |
| `transform`/`opacity` only en animaciones | nada de `width/height`/`top/left` |
| GlareCard CSS-only (sin re-render React) | solo escribe CSS vars |
| AnimatePresence con `mode="wait"` | evita doble video en pantalla durante cross-fade |
| Hero video reel: solo 3 clips (antes 5) | total ~13 MB, autoplay solo el activo |

---

## 4. Animaciones que se DESCARTARON intencionalmente

- **Animar todos los párrafos al scrollear** — habría caído en "Excessive Motion" (regla UI/UX Pro Max HIGH).
- **3D tilt / perspective rotate** — demasiado lúdico para B2B industrial.
- **Spring bouncing en cards** — competiría con la sobriedad del sector.
- **Confetti / particles en CTA** — fuera de tono.
- **Scroll-jacking / pin** — la skill marca esto como HIGH severity (motion sickness).
- **Marquee infinito de servicios** — no aporta y consume CPU continuamente.
