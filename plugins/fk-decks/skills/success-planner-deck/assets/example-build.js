/* STARTER — The Success Planner deck. Copy this next to the assets, adapt the
 * slide bodies to the user's content, then: node example-build.js
 * Requires: npm install pptxgenjs  ·  assets sp-design.js, sp-components.js,
 * logo-ink.png, logo-ivory.png must sit in the SAME folder as this file. */
const pptxgen = require("pptxgenjs");
const D = require("./sp-design.js");
const K = require("./sp-components.js");
const { C, F, G, T, logo, eyebrow, hairline, ring, footer, defineMasters } = D;
const { header, kpi, callout, chartOpts, chapterOpener, SEM } = K;

// Optional re-theme: T.accent = "2D4A3E" (forest) or "1A1A2E" (midnight). Default cognac.

const pres = new pptxgen();
pres.defineLayout({ name: "SPWIDE", width: G.W, height: G.H });   // 13.333 x 7.5
pres.layout = "SPWIDE";
pres.author = "The Success Planner";
defineMasters(pres);                                              // embeds SP_* master layouts
const ALL = []; const S = () => { const s = pres.addSlide(); ALL.push(s); return s; };

/* 1 · COVER (bone, ink logo top-left) */
let s = S(); s.background = { color: C.bone };
logo(s, { x: G.mx, y: 0.6, w: 2.35, variant: "ink" });
ring(s, { x: 10.15, y: 0.95, d: 2.7, transparency: 66 });
eyebrow(s, "Actualización trimestral · 2026", { y: 2.5 });
s.addText([{ text: "Un titular", options: { breakLine: true } }, { text: "que importa" }],
  { x: G.mx, y: 2.9, w: 10.3, h: 1.9, fontFace: F.serif, italic: true, fontSize: 56, color: C.ink,
    charSpacing: -0.5, valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
s.addText("Subtítulo de apoyo en serif itálica.", { x: G.mx, y: 5.2, w: 8.6, h: 1.0,
  fontFace: F.serif, italic: true, fontSize: 22, color: C.inkBody, valign: "top", margin: 0 });
footer(s, { right: "Confidencial", noWordmark: true });

/* 2 · SECTION DIVIDER (onyx — use rarely) */
s = S(); s.background = { color: C.onyx };
ring(s, { x: 11, y: -1, d: 3.2, transparency: 82 });
eyebrow(s, "Capítulo 01", { y: 2.7, w: G.W - 2.8, x: 1.4, align: "center", color: C.dimSoft });
s.addText("El estado del negocio", { x: 1.4, y: 3.15, w: G.W - 2.8, h: 1.4, fontFace: F.serif,
  italic: true, fontSize: 42, color: C.ivory, align: "center", valign: "top", margin: 0 });
s.addText("THE SUCCESS PLANNER", { x: 0, y: 6.9, w: G.W, h: 0.3, fontFace: F.sans, fontSize: 8.5,
  bold: true, color: C.dimSoft, charSpacing: 2.4, align: "center", valign: "middle", margin: 0 });

/* 3 · KPI METRIC (bone) */
s = S(); s.background = { color: C.bone };
header(s, { eyebrow: "Resultados", title: "Los números que importan" });
const cW = G.cw / 4;
[["$128.4M", "Ingresos", "+12% YoY", "up", true], ["24.6%", "Margen", "+180 pb", "up", false],
 ["$18.2M", "Flujo libre", "+14%", "up", false], ["142 d", "Días de caja", "-9 d", "down", false]]
.forEach((k, i) => { if (i) s.addShape("line", { x: G.mx + i * cW, y: 2.95, w: 0, h: 1.7, line: { color: C.ink, width: 0.75, transparency: 88 } });
  kpi(s, { x: G.mx + i * cW + 0.1, y: 2.9, w: cW - 0.2, value: k[0], label: k[1], delta: k[2], deltaDir: k[3], hero: k[4], size: 34 }); });
callout(s, { x: G.mx, y: 4.95, w: G.cw, h: 1.2, kicker: "Lectura", serif: true, fontSize: 15,
  text: "Una frase que interpreta las cifras: qué significan y qué haremos al respecto." });
footer(s, { right: "Resultados" });

/* 4 · CHART (bone) — native + editable */
s = S(); s.background = { color: C.bone };
header(s, { eyebrow: "Gráficas · columnas", title: "Ingresos por trimestre", titleW: 7.5 });
s.addChart(pres.charts.BAR, [{ name: "Ingresos", labels: ["Q1", "Q2", "Q3", "Q4"], values: [4.5, 5.5, 6.2, 7.1] }],
  chartOpts(C.bone, { x: 0.7, y: 2.5, w: 7.6, h: 3.9, barDir: "col", showValue: true, dataLabelPosition: "outEnd", chartColors: [T.accent] }));
callout(s, { x: 8.7, y: 2.6, w: 3.7, h: 3.6, kicker: "Insight", serif: true, fontSize: 16,
  text: "Q4 cierra +58% vs Q1, impulsado por la nueva línea." });
footer(s, { right: "Gráficas" });

/* 5 · CLOSING (onyx, ivory logo) */
s = S(); s.background = { color: C.onyx };
ring(s, { x: 10.6, y: 3.9, d: 3.2, transparency: 80 });
eyebrow(s, "El siguiente paso", { y: 2.55, w: G.W - 2.8, x: 1.4, align: "center", color: C.dimSoft });
s.addText("Gracias.", { x: 1.4, y: 3.0, w: G.W - 2.8, h: 1.2, fontFace: F.serif, italic: true,
  fontSize: 44, color: C.ivory, align: "center", valign: "top", margin: 0 });
logo(s, { center: true, y: 5.35, w: 1.7, variant: "ivory" });

/* Speaker notes (optional) */
const NOTES = ["Portada.", "Divisor de sección.", "KPIs del trimestre.", "Ingresos por trimestre.", "Cierre."];
ALL.forEach((sl, i) => { if (NOTES[i]) sl.addNotes(NOTES[i]); });

pres.writeFile({ fileName: "SuccessPlanner-Deck.pptx" }).then(f => console.log("WROTE", f));
