# VISUAL_BROWSER_AUDIT.md — Auditoría visual de JSD Premium V2

> Auditoría real ejecutada con Playwright MCP + `getComputedStyle` sobre `http://localhost:3000/`. Screenshots en `audit-screenshots/`.

## Resumen

| Aspecto | Estado |
|---|---|
| Bug global de contraste (h1/h2/h3) | ✅ Resuelto (validado en navegador con `getComputedStyle`) |
| Overflow horizontal desktop 1440 | ✅ No (scrollW 1425 = vw 1440 − 15 scrollbar) |
| Overflow horizontal mobile 390 | ✅ No (scrollW 375 < vw 390) |
| Console errors | ✅ 0 |
| Console warnings | ✅ 0 |
| Build TS pass | ✅ 2.6s, 19 rutas |
| Navbar `backdrop-filter` activo | ✅ `saturate(1.5) blur(14px)` |
| Logo real PNG en navbar | ✅ `jsd_color_white-2-1024x225.png` |
| Hero h1 color en navegador real | ✅ `rgb(255, 255, 255)` |
| Cards de servicios sin empalmes | ✅ 1 badge top + título bottom + CTA bottom — separados |

## Qué se ve bien (validado en Playwright)

1. **Hero** — Título blanco 72px sobre overlay degradado hero-overlay. Subtítulo blanco/85. Badge glass-card top + 3 CTAs visibles. Indicators del video reel inferiores. Sin empalmes.
2. **AboutBrief 60+ años** — Editorial con foto 5:4 + 4 stats (60+ / HVAC / CNC / Técnico) + timeline horizontal 4 hitos + mini-galería offset. Stats con tipografía adaptativa (sin "A la medida" oversized).
3. **ServicesGrid (NUEVO bento)** — 9 cards activas + 2 reservadas premium. Badge "Servicio" o "Destacado" top-left, ícono Lucide top-right, título display abajo, descripción reveal en hover desktop / visible mobile, CTA "Ver detalle" amber. Card hero `featured` con persistent hover (HVAC industrial).
4. **CapabilitiesCNC** — Video láser principal + video secundario + foto bases. Etiqueta correcta "Corte láser CNC · en operación". Lista de capabilities con whileInView stagger + whileHover.
5. **ProcessTimeline** — Video proceso-campo de fondo + 4 glass cards numeradas con whileHover y/whileTap. H2 + H3 en blanco sobre dark.
6. **ProjectsTeaser** — Masonry asymétrico con click → Lightbox accesible. Hover ExpandIcon. 2 espacios reservados.
7. **Footer** — Logo real + 4 columnas + mapa Google Maps embed.
8. **WhatsApp FAB** — Entry motion delay 1s + footer-aware (sube 112px cuando footer visible).
9. **Tienda** — Placeholder elegante con copy aprobado, sin catálogo.

## Qué puede verse distinto en tu navegador externo

| Posible diferencia | Causa probable | Cómo verificar |
|---|---|---|
| Tamaño del título del hero | Tu zoom de navegador ≠ 100% | `Ctrl+0` en Chrome/Edge para reset zoom |
| Videos no autoplay | Política de browser que bloquea autoplay de audio (poco probable, son muted) o ahorro de batería | Verifica que `chrome://flags` no tenga `Autoplay policy` modificado |
| Glass del navbar se ve plano | Hardware acceleration deshabilitado | Chrome → Settings → System → Use hardware acceleration ON |
| Fonts diferentes | Aún cargando | Espera 1-2s tras hard refresh (`Ctrl+Shift+R`) |
| Extensiones del browser | uBlock / Dark Reader / Stylebot pueden inyectar CSS | Probar en **modo incógnito** sin extensiones |
| DevicePixelRatio | Tu monitor 4K vs nuestra Playwright Chromium @1.0 | Sin impacto en layout, solo en nitidez de fotos |
| Scrollbar width | Windows 11 vs 10, OS-level setting | Diferencia ≤ 15px, no afecta layout |

**Recomendación final:** Abre `http://localhost:3000/` en Chrome **incógnito sin extensiones** y compáralo con las capturas en `audit-screenshots/`. Si ves diferencia significativa, mándame screenshot.

## Secciones con riesgo de empalme (revisadas)

- ✅ Hero: badge + título + subtítulo + CTAs — separados con margin-top fluido.
- ✅ ServicesGrid: badge top-left (z-10), ícono top-right (z-10), título bottom (z-10) — no overlap.
- ✅ Reserved cards: badge JSD + badge "En desarrollo" + ícono — 3 elementos en 2 zonas (top row + bottom block), bien separados.
- ✅ ProcessTimeline: número 5xl + "Paso" + título + descripción + arrow — todos en glass card vertical con padding.
- ✅ ProjectsTeaser: badge top-left + expand icon top-right + título bottom — bien separados con overlay gradient.

## Secciones con contraste validado

Inspección DOM sobre 16 headings en home:

```
H1 "Soluciones integrales..."          rgb(255,255,255) sobre video           ✓
H2 "Una empresa consolidada..."        rgb(11,18,32)    sobre rgb(255,255,255) ✓
H2 "Servicios de HVAC..."              rgb(11,18,32)    sobre bone            ✓
H2 "Fabricación metálica..."           rgb(255,255,255) sobre rgb(11,18,32)   ✓
H2 "Un proceso estructurado..."        rgb(255,255,255) sobre rgb(11,18,32)   ✓
H2 "Evidencia visual..."               rgb(11,18,32)    sobre rgb(255,255,255) ✓
H2 "Últimos blogs..."                  rgb(11,18,32)    sobre rgb(244,246,248) ✓
H2 "Cuéntanos qué necesitas..."        rgb(255,255,255) sobre rgb(14,58,95)   ✓
H3 cards CNC capabilities              rgb(255,255,255) sobre dark            ✓
H3 cards process timeline              rgb(255,255,255) sobre dark            ✓
H3 cards projects (sobre fotos)        rgb(255,255,255) sobre overlay         ✓
H3 cards blog                          rgb(11,18,32)    sobre light           ✓
```

## Diferencias detectadas entre preview interno y navegador real (Playwright)

**Cero diferencias estructurales** entre Playwright Chromium y lo que devuelve `getComputedStyle` en el navegador. Los anteriores reportes de "se ve bien en preview pero mal en navegador externo" se debían al bug global `h1{color:var(--color-ink)}` fuera de `@layer`, que YA fue corregido movido a `@layer base`. Ahora ambos coinciden.

## Pendientes (no son problemas, son mejoras futuras)

1. Comprimir `hero-aerea-main-1.mp4` (43 MB → <8 MB) para sumarlo al reel.
2. Lighthouse score (no se ejecutó en esta iteración).
3. Dynamic import del `Lightbox` para reducir bundle inicial (`next/dynamic`).
4. Bundle analyzer (`@next/bundle-analyzer`) no instalado.
5. Server Components: secciones con solo Reveal podrían ser server si Reveal aislara un client wrapper.
