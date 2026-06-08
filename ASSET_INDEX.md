# ASSET_INDEX.md — JSD Air Systems Premium V2

> Mapa de todo el material visual real entregado por el cliente (`C:\Users\Usuario 1\Desktop\JS VISUAL`) y copiado al proyecto en `public/media/`. Cada asset declara categoría, página/sección donde se usa y notas. Al final, lista de huecos visuales pendientes y placeholders provisionales.

---

## 1. Ubicación dentro del proyecto

```
public/media/
├── jsd/                    # Material REAL del cliente (siempre primero)
│   ├── 01..10_*.jpg        # 10 fotos industriales 8K numeradas
│   ├── PHOTO-2023-*.jpg    # 3 fotos archivo histórico
│   ├── WhatsApp-Image-2025-08-29-...jpg
│   └── video/
│       ├── hero-aerea-main-1.mp4   (43.5 MB — uso opcional)
│       ├── hero-aerea-main-2.mp4   (7.2 MB — hero principal)
│       ├── hero-grua-aerea.mp4     (3.4 MB — reel)
│       ├── trabajos-campo.mp4      (2.3 MB — reel)
│       └── cnc-laser.mp4           (2.9 MB — sección CNC)
├── logo/
│   ├── jsd_color_white-2-1024x225.png   (logo blanco para fondos oscuros)
│   └── jsd_color_white-2-scaled.png     (versión grande)
└── placeholders/           # Imágenes externas provisionales (NO presentar como obra JSD)
    ├── air-conditioner-outdoor-*.jpg
    ├── air-conditioning-cooling-*.jpg
    └── maintenance-men-working-*.jpg
```

---

## 2. Inventario de fotos reales (cliente)

| Archivo | Categoría | Página / Sección | Notas |
|---------|-----------|------------------|-------|
| `01_fabricacion-e-instalacion-de-bases-para-equipos-hvac_8k.jpg` | Fabricación / HVAC industrial | Servicios › Fabricación de ductos + Home › Stats/About | Base metálica para equipo, plano cenital muy editorial. |
| `02_instalacion-exterior-de-ventilacion-industrial_8k.jpg` | HVAC industrial | Hero secundario · página Climatización industrial | Vista exterior con ductería expuesta. |
| `03_climatizacion-industrial-en-nave-de-produccion_8k.jpg` | HVAC industrial | Página Climatización industrial · ServicesGrid | Nave de producción, evidencia de escala. |
| `04_instalacion-de-ducteria-aislada-en-interior-industrial_8k.jpg` | Ductería | Servicios › Ductos metálicos · Nosotros pilar Instalación | Excelente para mostrar acabado interior. |
| `05_ducteria-metalica-para-almacen-industrial_8k.jpg` | Ductería | ServicesGrid card · Página Ductos | Sólido fondo industrial. |
| `06_montaje-de-ductos-espirales-con-plataforma-elevadora_8k.jpg` | Ductería / Instalación | Hero secundario · Página Ductos | Documenta proceso real con plataforma. |
| `07_fabricacion-e-instalacion-de-ductos-circulares-hvac_8k.jpg` | Ductería circular | Página Ductos · ProjectsTeaser | Foto técnica perfecta para card. |
| `08_ducteria-expuesta-para-oficinas-comerciales_8k.jpg` | HVAC comercial | Página Climatización industrial y comercial · ServicesGrid | Ejemplo comercial. |
| `09_sistema-de-ductos-industriales-en-nave_8k.jpg` | HVAC industrial | About brief Home · Página Climatización | Buena profundidad de campo. |
| `10_instalacion-de-ducto-exterior-sobre-cubierta_8k.jpg` | HVAC exterior | Página Ductos metálicos · Proyectos | Cubierta industrial. |
| `PHOTO-2023-03-06-11-21-00-17.jpg` | Mantenimiento / equipo | Página Mantenimiento · About | Cuadrilla en sitio. |
| `PHOTO-2023-03-06-11-21-48-19.jpg` | Mantenimiento | Página Mantenimiento · Galería | Equipo histórico, alternativa. |
| `PHOTO-2023-03-06-11-39-22-4.jpg` | HVAC instalación | Página Instalación HVAC · About | Foto a color real. |
| `WhatsApp-Image-2025-08-29-at-2.41.36-PM-1.jpg` | Capacidad reciente 2025 | ProjectsTeaser · Contacto | Imagen reciente, útil para "obra 2025". |

---

## 3. Inventario de videos reales (cliente)

| Archivo | Categoría | Uso | Notas |
|---------|-----------|-----|-------|
| `hero-aerea-main-2.mp4` (7.2 MB) | Toma aérea equipos refrigeración | **Hero loop slot #1** | Peso óptimo para web. |
| `hero-grua-aerea.mp4` (3.4 MB) | Elevación con grúa | **Hero loop slot #2** | Acción industrial. |
| `trabajos-campo.mp4` (2.3 MB) | Trabajos en campo | **Hero loop slot #3** | Trabajo humano, calidez. |
| `cnc-laser.mp4` (2.9 MB) | Corte CNC láser | **Sección Capabilities CNC** | Diferenciador clave. |
| `hero-aerea-main-1.mp4` (43.5 MB) | Toma aérea main 1 | Reserva (necesita compresión antes de publicar) | Hoy no se carga por peso; queda en repo para futura compresión a < 8 MB. |

> **Estrategia hero:** `<video>` preload `metadata`, autoplay muted loop, transición cross-fade entre los 3 clips ligeros (~13 MB total con caché). Fallback imagen estática `09_sistema-de-ductos-industriales-en-nave_8k.jpg`.

---

## 4. Logo

- `jsd_color_white-2-1024x225.png` — logo blanco rectangular, ideal para navbar/footer sobre fondo oscuro.
- `jsd_color_white-2-scaled.png` — versión grande, reserva para imprenta.

> **Pendiente cliente:** entregar versión **logo en color sobre fondo claro** y favicon SVG / ICO definitivo. Mientras tanto se aplica filtro `invert` o se compone sobre bloque navy.

---

## 5. Placeholders provisionales (externos)

| Archivo | Origen | Uso provisional | Estado |
|---------|--------|-----------------|--------|
| `air-conditioner-outdoor-unit-from-the-above-...jpg` | Stock externo previo | Card Mantenimiento (mientras no haya foto real específica de plan preventivo) | ⚠ Placeholder provisional pendiente de reemplazo |
| `air-conditioning-cooling-tube-on-the-roof-...jpg` | Stock externo previo | Card Tuberías de agua helada (apoyo) | ⚠ Placeholder provisional pendiente de reemplazo |
| `maintenance-men-working-...jpg` | Stock externo previo | Página Mantenimiento, bloque proceso | ⚠ Placeholder provisional pendiente de reemplazo |

> Regla: estos NO se publican como obra real de JSD. Llevan badge "Imagen referencial — pendiente foto del cliente" donde aplique y se reemplazan en cuanto haya material real.

---

## 6. Mapa página → assets reales

| Página / Sección | Assets reales asignados |
|------------------|--------------------------|
| Home › Hero | Videos `hero-aerea-main-2`, `hero-grua-aerea`, `trabajos-campo` + fallback `09_*.jpg` |
| Home › About 60 años | `PHOTO-2023-03-06-11-39-22-4.jpg` + fondo decorativo de `04_*.jpg` desenfocado |
| Home › ServicesGrid (8 cards) | 01, 04, 03, 07 (real); 02, 05, 08, `cnc-laser.mp4` poster; nuevos cards CNC/Redilas usan `cnc-laser.mp4` poster + placeholder reservado |
| Home › Capabilities CNC | `cnc-laser.mp4` + `01_*.jpg` apoyo |
| Home › Process | sin foto (tipográfico) |
| Home › ProjectsTeaser | 02, 06, 07, 10, `WhatsApp-Image-2025-08-29.jpg`, + 1 "espacio reservado premium" |
| Home › BlogTeaser | imagen genérica de portada del único post real |
| /nosotros | Hero `03_*.jpg`, pilares `04`, `06`, `PHOTO-...-17`. |
| /servicios | Grid usa 01, 03, 04, 07, 08, `cnc-laser.mp4` poster, espacio reservado redilas, espacio reservado piezas a medida. |
| /servicios/instalacion-hvac | Hero `02_*.jpg`, galería `03`, `08`, `PHOTO-...-4`. |
| /servicios/ductos-metalicos | Hero `04_*.jpg`, galería `05`, `06`, `07`, `10`. |
| /servicios/tuberias-agua-helada | Hero `10_*.jpg` (apoyo), placeholder externo `air-conditioning-cooling-...jpg` con badge. |
| /servicios/mantenimiento | Hero `PHOTO-2023-03-06-11-21-00-17.jpg`, galería `PHOTO-...-19`, placeholder `maintenance-men-working-...jpg`. |
| /servicios/climatizacion-industrial-comercial | Hero `03_*.jpg`, galería `08`, `02`. |
| /servicios/fabricacion-metalica-cnc | Hero `cnc-laser.mp4`, galería `01_*.jpg` + 2 espacios reservados. |
| /servicios/redilas-trailas | Espacio reservado premium completo + nota visible. |
| /servicios/piezas-a-medida | Espacio reservado premium + apoyo `01_*.jpg`. |
| /proyectos | Reusa 02, 04, 06, 07, 10 + `WhatsApp...jpg` + 3 cards "Material en revisión". |
| /contacto | Fondo del hero `08_*.jpg` con overlay. |
| /tienda | sin foto (tipográfico minimal). |

---

## 7. Espacios reservados premium para fotos futuras

Se diseña un componente `ReservedMediaBlock` reutilizable que renderiza una tarjeta editorial con badge "Material visual en revisión", marca de agua sutil JSD y CTA "Solicitar levantamiento fotográfico". Se usa en:

- ProjectsTeaser (Home y /proyectos): 1–3 slots.
- /servicios/redilas-trailas: hero + 3 cards galería.
- /servicios/piezas-a-medida: hero + 2 cards galería.
- /servicios/fabricacion-metalica-cnc: 2 cards galería.
- /nosotros: foto del equipo humano + foto de planta.

**Total slots a sustituir cuando el cliente envíe fotos:** 12.

---

## 8. Pendientes que se le piden al cliente en la próxima reunión

1. Foto del equipo / cuadrilla actual (grupal en planta).
2. Foto del exterior de la planta de Pájaros Azules.
3. Foto en alta de redilas y trailas terminadas (3-5).
4. Foto del taller con corte plasma/láser en operación (estática complementaria al video).
5. Foto de mantenimiento preventivo en chiller (idealmente con técnico en EPP completo).
6. Logo en color sobre fondo claro y favicon vectorial.
7. Aprobación para publicar nombres / logos de clientes en sección "Confían en nosotros".
8. Métricas duras (años, m², toneladas refrigeración instaladas, ciclos de mantenimiento, etc.).
9. Certificaciones, registros y NRP del personal técnico.
10. Datos del aviso de privacidad y términos.
