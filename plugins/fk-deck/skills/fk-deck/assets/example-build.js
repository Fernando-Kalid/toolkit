/* STARTER — deck FK. Copia este archivo junto a fk-design.js, adapta el contenido
 * y corre: node example-build.js   (requiere: npm install pptxgenjs) */
const pptxgen = require("pptxgenjs");
const D = require("./fk-design.js");
const { P, F, G, newSlide, eyebrow, hairline, nabla, feynman, footer, header,
        kpi, callout, insight, dataTable, chartOpts } = D;

const pres = new pptxgen();
pres.defineLayout({ name: "FKWIDE", width: G.W, height: G.H });
pres.layout = "FKWIDE";
pres.author = "Fernando Kalid";
const ALL = []; const S = (bg) => { const s = newSlide(pres, bg); ALL.push(s); return s; };

/* 1 · PORTADA (carbón + vértice de Feynman) */
let s = S();
feynman(s, { x: 10.85, y: 1.55 });
nabla(s, G.mx - 0.1, 6.35);
s.addText("FERNANDO KALID", { x: G.mx, y: 0.62, w: 6, h: 0.34, fontFace: F.mono, fontSize: 11,
  color: P.bone, charSpacing: 3.2, valign: "middle", margin: 0 });
eyebrow(s, "Eyebrow de contexto · Julio 2026", { y: 2.42 });
s.addText([{ text: "Un titular ", options: { color: P.bone } }, { text: "con filo.", options: { color: P.navaja } }],
  { x: G.mx, y: 2.82, w: 11.2, h: 1.7, fontFace: F.serif, italic: true, fontSize: 64, valign: "top", margin: 0 });
s.addText("Subtítulo de apoyo en mono — qué es esto y para quién.",
  { x: G.mx, y: 4.9, w: 9.8, h: 0.6, fontFace: F.mono, fontSize: 12.5, color: P.cream, valign: "top", margin: 0 });
footer(s, { right: "Confidencial", noWordmark: true });

/* 2 · CONTENIDO (carbón): header + callouts + insight */
s = S();
header(s, { eyebrow: "Sección · tema", title: "Titular declarativo en Space Grotesk" });
callout(s, { x: G.mx, y: 2.25, w: 5.55, h: 2.2, kicker: "01 · Concepto", fontSize: 12,
  text: "Cuerpo del argumento en Space Grotesk. Una idea por tarjeta, con aire." });
callout(s, { x: G.mx + 5.95, y: 2.25, w: 5.55, h: 2.2, kicker: "02 · Concepto", fontSize: 12,
  text: "La segunda tarjeta contrasta o complementa. El acento navaja marca el kicker." });
insight(s, { x: G.mx, y: 4.85, w: G.cw, h: 1.5, kicker: "El principio",
  text: "La frase que el lector debe recordar va en tarjeta hueso, en Cormorant itálica.", fontSize: 21 });
footer(s, { right: "Sección" });

/* 3 · KPIs (carbón): el número héroe en navaja */
s = S();
header(s, { eyebrow: "Resultados", title: "Los números, desnudos" });
const cW = G.cw / 4;
[["12", "Métrica uno", false], ["4.8x", "Métrica dos", false], ["0", "El dato que duele", true], ["96%", "Métrica cuatro", false]]
.forEach((k, i) => {
  if (i) s.addShape("line", { x: G.mx + i * cW, y: 2.95, w: 0, h: 1.7, line: { color: "FFFFFF", width: 0.75, transparency: 88 } });
  kpi(s, { x: G.mx + i * cW + 0.1, y: 2.9, w: cW - 0.35, value: k[0], label: k[1], hero: k[2] });
});
callout(s, { x: G.mx, y: 4.95, w: G.cw, h: 1.5, kicker: "Lectura", serif: true, fontSize: 14,
  text: "Una frase que interpreta las cifras: qué significan y qué se decide con ellas." });
footer(s, { right: "Resultados" });

/* 4 · TABLA (carbón) */
s = S();
header(s, { eyebrow: "Detalle", title: "Tabla limpia con hairlines" });
dataTable(s, { x: G.mx, y: 2.2, rowH: 0.62, fontSize: 11, cols: [
  { label: "Elemento", w: 3.0 }, { label: "Descripción", w: 5.7 }, { label: "Dato", w: 2.79, align: "right" }],
  rows: [
    [{ t: "Fila uno", b: true }, "Descripción breve del elemento", { t: "42", mono: true }],
    [{ t: "Fila dos", b: true }, "El acento se usa para lo importante", { t: "clave", c: P.navaja }],
    [{ t: "Fila tres", b: true }, "Los datos numéricos van en mono", { t: "1.7x", mono: true }],
  ]});
footer(s, { right: "Detalle" });

/* 5 · CIERRE (carbón) */
s = S();
nabla(s, 1.2, 1.0); nabla(s, G.W - 1.5, 6.0);
eyebrow(s, "El siguiente paso", { y: 2.4, x: 1.4, w: G.W - 2.8, align: "center" });
s.addText("Una línea de cierre en serif.", { x: 1.4, y: 2.85, w: G.W - 2.8, h: 1.15,
  fontFace: F.serif, italic: true, fontSize: 48, color: P.bone, align: "center", valign: "top", margin: 0 });
s.addText("FERNANDO KALID", { x: 0, y: 5.3, w: G.W, h: 0.35, fontFace: F.mono, fontSize: 12,
  color: P.navaja, charSpacing: 3.4, align: "center", valign: "middle", margin: 0 });

/* Notas de orador */
const NOTES = ["Portada.", "Contenido con tarjetas.", "KPIs con héroe en navaja.", "Tabla.", "Cierre."];
ALL.forEach((sl, i) => { if (NOTES[i]) sl.addNotes(NOTES[i]); });

pres.writeFile({ fileName: "FK-Deck.pptx" }).then(f => console.log("WROTE", f));
