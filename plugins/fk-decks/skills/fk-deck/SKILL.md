---
name: fk-deck
description: >-
  Generate on-brand FERNANDO KALID personal-brand presentations as PowerPoint
  .pptx (imports cleanly into Google Slides). Use whenever the user asks to
  create, build, design, or update a presentation, deck, slides, pitch,
  keynote, board update, propuesta, or report for Fernando Kalid or "con mi
  marca / estilo FK / marca personal de Fernando" — even if they just say "haz
  una presentación" in a Fernando Kalid personal context (his ventures' OWN
  branded decks are different skills: Success Planner/Winners Circle and
  Ophira have their own). Applies the exact FK design system: dark editorial
  (carbón/grafito surfaces, hueso punctuation), single "navaja" oxide-red
  accent, Space Grotesk + Cormorant Garamond italic + IBM Plex Mono, the ∇
  micro-mark and Feynman-vertex signature, hairlines-only chrome, and the
  executive component library (KPIs, callouts, insight cards, tables, pillars,
  process flows, timelines, dark-themed charts).
---

# FK Deck — presentaciones de la marca personal Fernando Kalid

Construye decks que se ven y se sienten como la marca personal de Fernando
Kalid ("criterio con recibos": editorial oscuro, preciso, con filo). Generas
un `.pptx` real con **pptxgenjs** y el módulo de diseño incluido — nunca
slides blancas con bullets.

**Qué es este sistema (y qué no).** Es la marca de la PERSONA, deliberadamente
distinta de las marcas de su portafolio: Success Planner/The Winners Circle
(bone/onyx/cognac/gold — skill `success-planner-deck`) y Ophira (wax/dusk/teal
— skill `ophira-deck`). Comparten gramática (monocromo + serif itálica para
emoción + un solo acento), pero los parámetros son propios e invertidos:
FK es **dark-led** donde TWC es claro. Si el deck es PARA un venture, usa el
skill de ese venture; si es DE Fernando (estrategia personal, keynote suyo,
bitácora, media kit, propuesta como asesor), usa este.

## Assets incluidos (en `assets/`)

- `fk-design.js` — tokens (`P` colores, `F` fuentes, `G` geometría, `CHART`),
  chrome (`newSlide`, `eyebrow`, `hairline`, `footer`, `header`, `nabla`,
  `feynman`) y componentes (`kpi`, `callout`, `insight`, `dataTable`,
  `pillars`, `processFlow`, `timeline`, `dot`, `chartOpts`).
- `example-build.js` — starter validado (portada → contenido → KPIs → tabla →
  cierre). Cópialo y adapta; sus coordenadas ya pasaron QA visual.
- `fix_notes_order.py` — post-proceso obligatorio (pptxgenjs escribe XML
  ligeramente desordenado).

## Workflow (cada vez)

1. **Contenido primero.** Reúne el contenido real (audiencia, propósito,
   datos, mensajes) antes de tocar código. Si falta, pregunta o investiga.
   Idioma por defecto: español (es_MX); el usuario puede pedir inglés.
2. **Planea la lista de slides**, un layout por idea (catálogo abajo).
3. **Workspace:**
   ```bash
   cp <skill>/assets/{fk-design.js,example-build.js,fix_notes_order.py} .
   npm install pptxgenjs
   ```
4. **Autoría** en un build script partiendo de `example-build.js`. Contenido
   real del usuario; cero placeholders.
5. **Build:** `node build.js`
6. **Recomprime y corrige XML** (obligatorio):
   ```bash
   python <pptx-skill>/scripts/rezip.py Deck.pptx   # del skill pptx, si está
   python fix_notes_order.py Deck.pptx
   ```
7. **QA visual.** Renderiza a imágenes e inspecciona (idealmente con un
   subagente de ojos frescos) buscando desbordes, encimes y contraste:
   ```bash
   python <pptx-skill>/scripts/office/soffice.py --headless --convert-to pdf Deck.pptx
   pdftoppm -jpeg -r 100 Deck.pdf slide
   ```
   Las tres fuentes NO están en el sandbox de render: LibreOffice sustituye
   por una sans más ancha. Eso es esperado — en la máquina del usuario y en
   Google Slides renderizan bien. No lo trates como defecto, pero SÍ deja
   ~10% de holgura en cajas de texto y no confíes en ajustes exactos.
8. **Entrega** el `.pptx` con `present_files`, mencionando: las fuentes son
   Google Fonts (Space Grotesk, Cormorant Garamond, IBM Plex Mono) — Google
   Slides las trae; PowerPoint local requiere instalarlas (gratis).

## Reglas de diseño (no negociables)

- **Superficies dark-led:** carbón (`P.carbon`) domina; hueso (`P.bone`) es
  puntuación — **2–3 slides máximo** (la tesis/quote central, un divisor).
  Es la inversión deliberada del sistema claro de sus productos. Nunca blanco
  ni negro puros.
- **Roles tipográficos, jamás mezclados:** Space Grotesk bold (`F.grot`) =
  títulos declarativos y cuerpo; Cormorant Garamond itálica (`F.serif`) =
  emoción, tesis, quotes, portada; IBM Plex Mono (`F.mono`) = eyebrows
  (UPPERCASE + tracking), índices, etiquetas, cifras — el código "bitácora
  de laboratorio". Un dato numérico dentro de tabla va en mono.
- **Un acento: navaja (`P.navaja`).** Marca el número héroe, la palabra
  clave, los kickers, los vértices — nunca rellenos grandes ni fondos.
  Prohibido introducir el coñac/dorado de TWC o el teal de Ophira.
- **Glifos de física con trabajo asignado:** `nabla()` = micro-marca en
  esquinas libres, máx 1–2 por slide y nunca encimada a texto; `feynman()` =
  firma SOLO en portada, divisores o cierre, en zona despejada (revisa que no
  choque con el titular). No agregues ecuaciones como decoración.
- **Chrome:** solo `hairline()` — cero barras de color, cero subrayados
  decorativos. Footer con wordmark FERNANDO KALID (mono, tracked). Márgenes
  `G.mx` (0.92") y aire generoso; una idea por slide.
- **Alturas de callout (lección aprendida a golpes):** el texto arranca en
  y+0.62 con kicker (y+0.22 sin); reserva `h ≥ 0.8 + 0.25×líneas` con kicker
  (`0.42 + 0.25×líneas` sin) y añade 10% de holgura — el desborde vertical
  sobre el footer es el defecto #1 de este formato.
- **Gráficas:** nativas de pptxgenjs, siempre con `chartOpts()` (fondos
  carbón, ejes/etiquetas legibles en oscuro, ramp `CHART` con navaja al
  frente). Acompaña toda gráfica con un `callout`/`insight` que diga la
  lectura. En donas, omite data labels y usa tabla-leyenda con `dot()`.
- **Toda slide lleva un visual** (KPI, tarjeta, tabla, diagrama, gráfica o
  el tipo-como-héroe de portada). Nada de título+bullets pelones.

## Catálogo de layouts (patrones en `example-build.js` y validados en QA)

- **Portada:** carbón + wordmark mono arriba-izq + `feynman()` arriba-der +
  titular serif itálica 60–66pt (palabra clave en navaja) + sub en mono.
- **Divisor:** hueso + eyebrow centrado + título serif itálica + `nabla()`
  en esquinas — puntuación inversa, úsalo una vez.
- **Contenido:** `header()` + 2 `callout()` lado a lado + `insight()` al pie
  para LA frase (tarjeta hueso = énfasis máximo del sistema).
- **KPIs:** fila de 4 con separadores `hairline` verticales; el dato que
  importa en navaja (`hero: true`) — uno solo por slide.
- **Tabla:** `dataTable()` — headers mono, primera columna bone bold, valores
  clave en navaja, numéricos en mono. Máx ~7 filas (rowH 0.58–0.74) para no
  invadir el footer (hairline en y=6.80).
- **Diagramas:** `processFlow` (pasos numerados en mono navaja), `pillars`
  (3–4 tarjetas), `timeline` (hitos alternados arriba/abajo; enmarca con
  x: mx+1.1, w: cw−2.2 para que las etiquetas extremas no salgan de margen).
- **Cierre:** carbón + línea serif itálica centrada + wordmark en navaja
  centrado + `nabla()` en esquinas.

## Registro (voz visual)

El asombro de este sistema es la **desnudez precisa** — números sin maquillaje,
aire, un solo acento — nunca el volumen. Si una slide "grita" (colores extra,
cajas apretadas, tres ideas), está fuera de sistema: recorta. En caso de duda
entre agregar y quitar, quita.

## Guardrails

Sí: dark-led con hueso como golpe; serif itálica para lo que debe sentirse;
mono para lo que debe medirse; navaja solo donde decides; aire.
No: superficies blancas/negras puras; más de un acento; fuentes mezcladas de
rol; ornamentos que no sean hairlines/∇/Feynman; slides sin visual; texto de
cuerpo a más de ~62 caracteres de ancho; colores de otras marcas del
portafolio.
