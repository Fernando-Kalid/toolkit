# OPHIRA — Especificación de plantilla corporativa (fuente original)

> Guía maestra del sistema de diseño de OPHIRA para presentaciones. Valores extraídos del código fuente del producto (`globals.css`, `@ophira/ui`). Versión: 2026-06 · Mercado: México (es_MX).

## 1. Esencia de marca

**Qué es OPHIRA:** plataforma B2B2C de planeación de bodas para el mercado mexicano. Herramienta de orquestación gratuita para la pareja; los proveedores pagan por leads calificados.

**Voz de marca:** Calmada, precisa, *luxury-adjacent*. Nunca ruidosa. Debe sentirse como "un amigo pensante que resulta ser organizado", no como un dashboard.

**Tagline principal:** *Menos ruido, más claridad.*

**Frases de apoyo (portadas / cierres):**
- "El siguiente paso, visible."
- "Tu información queda en privado desde el primer dato."
- "Hecho en México, para parejas mexicanas."

**Principios visuales:**
1. **Regla 70 / 20 / 10** — 70% fondo papel (Wax Paper), 20% peso estructural (Future Dusk), 10% acción/acento (Teal).
2. **Calma ≠ beige** — acentos expresivos (Butter, Clavel) solo como lavados decorativos de baja opacidad, máximo uno por diapositiva, nunca como texto ni como color de CTA.
3. **Aire abundante** — márgenes generosos, jerarquía clara, una idea por slide.
4. **Siempre claro** — OPHIRA no tiene modo oscuro; el fondo dominante es papel claro.

## 2. Paleta de color

### 2.1 Colores núcleo

| Token | HEX | RGB | Rol en slides |
|---|---|---|---|
| Wax Paper | `#FAF6EC` | 250, 246, 236 | Fondo primario (70%) |
| Future Dusk | `#2A2A3E` | 42, 42, 62 | Títulos y texto estructural; fondo de slides oscuras (20%) |
| Transformative Teal | `#00707B` | 0, 112, 123 | CTAs, acentos, números clave, éxito (10%) |
| Warm Mist | `#F2EBDB` | 242, 235, 219 | Superficies secundarias, tarjetas, barras |
| Soft Stone | `#DCCFBA` | 220, 207, 186 | Divisores, bordes, líneas finas |
| Muted Ink | `#6E6875` | 110, 104, 117 | Texto secundario, pies, eyebrows |
| Deep Ink | `#1E1E2A` | 30, 30, 42 | Negro de marca |

### 2.2 Neutrales / soporte

| Token | HEX | Uso |
|---|---|---|
| Cherry Mocha | `#4B2A2A` | Acento cálido oscuro ocasional |
| Taupe Warm | `#B8A398` | Neutro cálido medio |
| Glow Spark | `#D4AF37` | Dorado discreto, solo detalles "premium" (líneas, viñetas) |

### 2.3 Acentos expresivos — solo decorativos

Reglas duras: nunca como color de texto sobre fondo claro (contraste ~2.9:1), nunca como CTA (siempre Teal), nunca para advertencia/error. Máximo uno por diapositiva, siempre como lavado de 10–20% de opacidad.

| Token | HEX | Uso |
|---|---|---|
| Butter | `#F2CC5D` | Lavados de celebración, portadas de logros (al 15–20%) |
| Clavel | `#E2725B` | Momentos de marketing, hero de portada (al 10–15%) |

### 2.4 Estados funcionales

| Token | HEX |
|---|---|
| Success | `#00707B` (= Teal) |
| Warning | `#A46A2A` |
| Error | `#7A2E2E` |
| Info | `#2A2A3E` (= Future Dusk) |

## 3. Tipografía

Display: **Fraunces** SemiBold 600 (Google Fonts; fallback Playfair Display / Lora). Cuerpo/UI: **Inter** 400/500/600 (fallback Arial).

Escala original (canvas 1280×720; en pptx 10in ≈ ×0.72):

| Estilo | Fuente | Tamaño original | Notas |
|---|---|---|---|
| H1 portada | Fraunces | 54–60 | tracking −0.02em |
| Título de sección | Fraunces | 40 | |
| H2 slide | Inter 600 | 28–32 | |
| Subtítulo/tarjeta | Fraunces | 22 | |
| Cuerpo | Inter 400 | 16–18 | interlineado 1.6 |
| Secundario/pie | Inter | 13–14 | Muted Ink |
| Eyebrow | Inter 500 | 11–12 | MAYÚSCULAS, tracking +0.2em, Muted Ink |
| Número hero/KPI | Fraunces | 64–120 | Teal o Future Dusk |
| Botón | Inter 600 | 14 | |

**Convención de eyebrow:** texto pequeño en MAYÚSCULAS con tracking amplio sobre cada título. Ej.: `ESTA SEMANA · ALTA PRIORIDAD` → "Tu próximo paso".

## 4. Logo

Archivos oficiales en `apps/web/public/brand/`: `iso_dusk.svg` (isotipo), `horizontal-dusk.svg` (logotipo horizontal), `isologotype_black_transparent.svg`. Área de respeto = altura del isotipo. Sobre Future Dusk usar versión Wax Paper. El nombre en texto se escribe **OPHIRA** en mayúsculas con tracking amplio. Mientras no estén los SVG, usar wordmark tipográfico.

## 5. Layout

16:9. Margen seguro 64pt (≈0.5in en 10in). 12 columnas, gutter 16pt. Tarjetas: radio 12px, borde 1pt Soft Stone, padding 24pt, gap 16–24pt. Sombras suaves: color `#2A2A3E`, ~90% transparencia, blur 16–20, distancia 6, ángulo 90°.

## 6. Layouts maestros

1. **Portada clara**: Wax Paper, un ornamento sangrando (Clavel/15 o Butter/20), eyebrow + H1 Fraunces + subtítulo, logo abajo-izq, fecha abajo-der.
2. **Portada oscura**: Future Dusk, texto Wax Paper, acento Teal en una palabra, logo claro.
3. **Separador de sección**: Warm Mist o Future Dusk, número grande Fraunces, línea Soft Stone.
4. **Título + cuerpo**: eyebrow + H2 + divisor Soft Stone; 1–2 columnas.
5. **Tarjetas/features 2–3 col**: borde Soft Stone, encabezado Fraunces, ícono Teal.
6. **KPI**: 1–4 números hero Fraunces, etiqueta eyebrow. Ej.: `68 confirmados`, `$180,000 MXN`, `12 de 48 tareas`.
7. **Cita**: Future Dusk o Warm Mist, Fraunces grande, detalle Glow Spark.
8. **Gráfica/datos**: Wax Paper, sin ornamentos, rampa §7.3.
9. **Cierre/CTA**: tagline + contacto + píldora Teal; ornamento permitido.

## 7. Componentes

### Botones (Inter 14/600, radio 8px, alto ~40pt)

| Variante | Relleno | Texto | Borde |
|---|---|---|---|
| Primario | Teal | Wax Paper | — |
| Secundario | Warm Mist | Future Dusk | — |
| Outline | transparente | Future Dusk | 1pt Soft Stone |
| Destructivo | Error | Wax Paper | — |

### Badges (rounded-full, 11–12pt/500)

Default: Teal sólido/Wax · Secundario: Warm Mist/Dusk · Outline: borde Stone · Success: Teal 15%/Teal · Warning: Warning 15%/Warning · Error: Error 15%/Error.

### Rampa de gráficas (en orden)

1. Teal `#00707B` (serie principal) 2. Future Dusk 3. Taupe Warm 4. Butter (relleno, no línea) 5. Clavel 6. Soft Stone (resto). Ejes/grillas Soft Stone 0.75–1pt, etiquetas Muted Ink Inter 12. Semántica (Warning/Teal) solo cuando comunica significado.

### Divisores

1pt Soft Stone; detalle premium ocasional 1pt Glow Spark (con moderación).

### Íconos

Lineales, trazo ~1.5pt, esquinas redondeadas (react-icons/fi funciona). Default Future Dusk; activos Teal. Nunca multicolor.

## 8. Ornamentos orgánicos

| Ornamento | Uso |
|---|---|
| Blob | Portadas, estados vacíos |
| Arch | Anclas de sección, cierres |
| Ribbon | Fondos amplios (CTA final, separadores) |

Reglas estrictas: máximo uno por diapositiva; solo Butter/15–20, Clavel/10–15, Teal/10; deben sangrar fuera del canvas; nunca detrás de datos densos.

SVG paths originales:

```
Blob   (viewBox 0 0 200 200):
M100,18 C138,14 172,40 180,76 C188,112 170,152 136,168 C102,184 58,176 36,148 C14,120 16,76 40,48 C57,28 78,21 100,18 Z
Arch   (viewBox 0 0 200 200):
M20,200 L20,100 C20,45 56,16 100,16 C144,16 180,45 180,100 L180,200 Z
Ribbon (viewBox 0 0 480 160):
M0,70 C90,10 190,10 260,60 C330,110 410,110 480,60 L480,104 C410,154 330,154 260,104 C190,54 90,54 0,114 Z
```

## 10. Referencia rápida

```
Fondo / Wax Paper      #FAF6EC
Texto / Future Dusk    #2A2A3E
Acento / Teal          #00707B
Superficie / Warm Mist #F2EBDB
Borde / Soft Stone     #DCCFBA
Texto 2º / Muted Ink   #6E6875
Negro / Deep Ink       #1E1E2A
Dorado / Glow Spark    #D4AF37
Butter (deco)          #F2CC5D
Clavel (deco)          #E2725B
Warning                #A46A2A
Error                  #7A2E2E
Fuente títulos: Fraunces (600)
Fuente cuerpo:  Inter (400/500/600)
Tagline: "Menos ruido, más claridad."
```
