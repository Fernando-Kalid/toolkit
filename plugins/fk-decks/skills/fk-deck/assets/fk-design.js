/* ============================================================================
 * FERNANDO KALID — sistema visual personal "FK" (módulo pptxgenjs)
 * Monocromo editorial dark-led: carbón / grafito / hueso · un acento "navaja".
 * Tipos: Space Grotesk (estructura) · Cormorant Garamond itálica (emoción)
 *        · IBM Plex Mono (eyebrows, índices, datos — código de bitácora).
 * Deliberadamente distinto de las marcas del portafolio:
 *   Success Planner/TWC (bone/onyx/cognac/gold) y Ophira (wax/dusk/teal).
 * ==========================================================================*/

const P = {
  carbon: "161616",      // superficie dominante
  panel: "1F1F1F",       // tarjetas sobre carbón
  panel2: "232323",
  bone: "F2EDE3",        // puntuación clara + texto principal sobre carbón
  cream: "D8D1C4",       // cuerpo de texto sobre carbón
  humo: "8F8A83",        // secundario / líneas / eyebrows
  humoDim: "6E6A63",
  navaja: "B23A2E",      // EL acento (rojo óxido — filo)
  slate: "5C6470",       // neutro de apoyo en gráficas
  // variantes para slides hueso (onLight):
  inkOnBone: "1A1817", bodyOnBone: "3B3733", panelOnBone: "EAE2D3", humoOnBone: "6E6862",
};
const F = { grot: "Space Grotesk", serif: "Cormorant Garamond", mono: "IBM Plex Mono" };
const G = { W: 13.333, H: 7.5, mx: 0.92, get cw() { return this.W - 2 * this.mx; }, footerY: 6.94 };
const CHART = [P.navaja, P.bone, P.humo, P.slate]; // ramp de gráficas, navaja lidera

/* ---------- fábrica de slides ---------- */
function newSlide(pres, bg) { const s = pres.addSlide(); s.background = { color: bg || P.carbon }; return s; }

/* ---------- chrome ---------- */
function eyebrow(s, text, o = {}) {
  s.addText((text || "").toUpperCase(), { x: o.x ?? G.mx, y: o.y ?? 0.62, w: o.w ?? G.cw, h: 0.34,
    fontFace: F.mono, fontSize: o.fontSize ?? 10.5, color: o.color ?? P.humo,
    charSpacing: 2.2, align: o.align ?? "left", valign: "middle", margin: 0 });
}
function hairline(s, o = {}) {
  s.addShape("line", { x: o.x ?? G.mx, y: o.y ?? 1.2, w: o.w ?? G.cw, h: 0,
    line: { color: o.color ?? "FFFFFF", width: o.width ?? 0.75, transparency: o.transparency ?? 88 } });
}
// ∇ — micro-marca (gradiente = dirección de máximo crecimiento). Máx 1–2 por slide, en esquinas libres.
function nabla(s, x, y, col) {
  s.addText("∇", { x, y, w: 0.32, h: 0.32, fontFace: F.mono, fontSize: 12, color: col ?? P.humoDim,
    align: "center", valign: "middle", margin: 0 });
}
// Vértice de Feynman — ilustración de firma (interacción/intercambio). Solo portada, divisores o cierre.
function feynman(s, o = {}) {
  const vx = o.x, vy = o.y, sc = o.scale ?? 1, col = o.col ?? P.humo, tr = o.tr ?? 35;
  const L = (x1, y1, x2, y2, arrow) => s.addShape("line", {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipV: (y2 - y1) < 0,
    line: Object.assign({ color: col, width: 1.4, transparency: tr }, arrow ? { endArrowType: "triangle" } : {}) });
  L(vx - 1.35 * sc, vy - 0.85 * sc, vx, vy, true);
  L(vx - 1.35 * sc, vy + 0.85 * sc, vx, vy, true);
  const n = 6, seg = 0.25 * sc, amp = 0.14 * sc;
  for (let j = 0; j < n; j++) {
    const x1 = vx + j * seg, x2 = vx + (j + 1) * seg;
    const y1 = (j === 0) ? vy : (j % 2 ? vy - amp : vy + amp);
    const y2 = (j + 1 === n) ? vy : ((j + 1) % 2 ? vy - amp : vy + amp);
    L(x1, y1, x2, y2, false);
  }
  s.addShape("ellipse", { x: vx - 0.065, y: vy - 0.065, w: 0.13, h: 0.13,
    fill: { color: P.navaja }, line: { type: "none" } });
}
function footer(s, o = {}) {
  const onLight = o.onLight ?? false;
  const col = onLight ? P.humoOnBone : P.humo;
  hairline(s, { y: G.footerY - 0.14, color: onLight ? P.inkOnBone : "FFFFFF", transparency: onLight ? 88 : 90 });
  if (!o.noWordmark) s.addText("FERNANDO KALID", { x: G.mx, y: G.footerY, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 8.5, color: col, charSpacing: 2.4, valign: "middle", margin: 0 });
  if (o.right) s.addText(o.right.toUpperCase(), { x: G.W - G.mx - 5, y: G.footerY, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 8.5, color: col, charSpacing: 1.6, align: "right", valign: "middle", margin: 0 });
}
function header(s, o = {}) {
  const onLight = o.onLight ?? false;
  eyebrow(s, o.eyebrow || "", { color: onLight ? P.humoOnBone : P.humo });
  s.addText(o.title || "", { x: G.mx, y: 1.0, w: o.titleW ?? G.cw, h: o.titleH ?? 0.95,
    fontFace: F.grot, bold: true, fontSize: o.titleSize ?? 30, color: onLight ? P.inkOnBone : P.bone,
    charSpacing: -0.3, valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
  if (o.lede) s.addText(o.lede, { x: G.mx, y: o.ledeY ?? 1.88, w: o.ledeW ?? 10.6, h: 0.5,
    fontFace: F.serif, italic: true, fontSize: 17, color: onLight ? P.bodyOnBone : P.cream,
    valign: "top", margin: 0 });
}

/* ---------- componentes ---------- */
function kpi(s, o = {}) {
  const w = o.w ?? 2.7;
  s.addText(o.value, { x: o.x, y: o.y, w, h: 0.95, fontFace: F.grot, bold: true,
    fontSize: o.size ?? 40, color: o.hero ? P.navaja : P.bone, valign: "middle", margin: 0 });
  s.addText((o.label || "").toUpperCase(), { x: o.x, y: o.y + 0.98, w, h: 0.55,
    fontFace: F.mono, fontSize: 9, color: P.humo, charSpacing: 1.2, valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
}
// Regla de altura: el texto arranca en y+0.62 con kicker (y+0.22 sin) y deja 0.16 abajo.
// h mínima ≈ 0.8 + 0.25×líneas (con kicker) · 0.42 + 0.25×líneas (sin). Añade ~10% de holgura.
function callout(s, o = {}) {
  const onLight = o.onLight ?? false;
  const accent = o.accent || P.navaja;
  s.addShape("roundRect", { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.1,
    fill: { color: onLight ? P.panelOnBone : P.panel }, line: { color: accent, width: 1, transparency: 60 } });
  let yy = o.y + 0.22;
  if (o.kicker) {
    s.addText(o.kicker.toUpperCase(), { x: o.x + 0.32, y: yy, w: o.w - 0.64, h: 0.3,
      fontFace: F.mono, fontSize: 10, color: accent, charSpacing: 1.6, valign: "middle", margin: 0 });
    yy += 0.4;
  }
  s.addText(o.text, { x: o.x + 0.32, y: yy, w: o.w - 0.64, h: o.y + o.h - yy - 0.16,
    fontFace: o.serif ? F.serif : F.grot, italic: !!o.serif, fontSize: o.fontSize ?? 12.5,
    color: onLight ? P.bodyOnBone : P.cream, valign: "top", margin: 0, lineSpacingMultiple: 1.22 });
}
// Tarjeta hueso sobre carbón — la puntuación inversa. Para LA frase de la slide.
function insight(s, o = {}) {
  s.addShape("roundRect", { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.1,
    fill: { color: P.bone }, line: { type: "none" } });
  if (o.kicker) s.addText(o.kicker.toUpperCase(), { x: o.x + 0.45, y: o.y + 0.3, w: o.w - 0.9, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: P.navaja, charSpacing: 1.8, valign: "middle", margin: 0 });
  s.addText(o.text, { x: o.x + 0.45, y: o.y + (o.kicker ? 0.66 : 0.3), w: o.w - 0.9, h: o.h - (o.kicker ? 0.92 : 0.6),
    fontFace: F.serif, italic: true, fontSize: o.fontSize ?? 22, color: P.inkOnBone, valign: "middle",
    margin: 0, lineSpacingMultiple: 1.06 });
}
// Tabla limpia: headers mono, hairlines, primera columna bone bold.
// cols: [{label,w,align}] · rows: celdas string o {t, b(bold), i(italic), c(color), mono}
function dataTable(s, o = {}) {
  const cols = o.cols, x0 = o.x, y0 = o.y, rowH = o.rowH ?? 0.5;
  let cx = x0;
  cols.forEach(col => {
    s.addText((col.label || "").toUpperCase(), { x: cx, y: y0, w: col.w, h: 0.32,
      fontFace: F.mono, fontSize: 9, color: P.humo, charSpacing: 1, align: col.align || "left",
      valign: "middle", margin: 0 });
    cx += col.w;
  });
  hairline(s, { x: x0, y: y0 + 0.38, w: cx - x0, transparency: 70 });
  o.rows.forEach((row, ri) => {
    const ry = y0 + 0.46 + ri * rowH;
    let rx = x0;
    row.forEach((cell, ci) => {
      const col = cols[ci];
      const val = (cell && cell.t !== undefined) ? cell : { t: cell };
      s.addText(String(val.t), { x: rx, y: ry, w: col.w, h: rowH,
        fontFace: val.mono ? F.mono : F.grot, fontSize: o.fontSize ?? 11.5, bold: !!val.b,
        italic: !!val.i, color: val.c || (ci === 0 ? P.bone : P.cream), align: col.align || "left",
        valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
      rx += col.w;
    });
    hairline(s, { x: x0, y: ry + rowH, w: cx - x0, transparency: 90 });
  });
  return y0 + 0.46 + o.rows.length * rowH;
}
function pillars(s, o = {}) {
  const items = o.items, x = o.x, y = o.y, w = o.w, h = o.h ?? 3.4, n = items.length, gap = 0.4;
  const cw = (w - gap * (n - 1)) / n;
  items.forEach((it, i) => {
    const cx = x + i * (cw + gap);
    s.addShape("roundRect", { x: cx, y, w: cw, h, rectRadius: 0.1, fill: { color: P.panel },
      line: { color: "FFFFFF", width: 0.75, transparency: 90 } });
    s.addText(it.icon || String(i + 1).padStart(2, "0"), { x: cx + 0.3, y: y + 0.26, w: cw - 0.6, h: 0.55,
      fontFace: F.mono, fontSize: 20, color: P.navaja, valign: "top", margin: 0 });
    s.addText(it.title, { x: cx + 0.3, y: y + 0.88, w: cw - 0.6, h: 0.5, fontFace: F.grot,
      bold: true, fontSize: 15, color: P.bone, valign: "top", margin: 0 });
    s.addText(it.points.map(p => ({ text: p, options: { bullet: { code: "2022" }, breakLine: true, paraSpaceAfter: 6 } })),
      { x: cx + 0.32, y: y + 1.44, w: cw - 0.62, h: h - 1.64, fontFace: F.grot, fontSize: 11,
        color: P.cream, valign: "top", margin: 0, lineSpacingMultiple: 1.12 });
  });
}
function processFlow(s, o = {}) {
  const steps = o.steps, x = o.x, y = o.y, w = o.w, h = o.h ?? 2.2;
  const n = steps.length, gap = 0.5, bw = (w - gap * (n - 1)) / n;
  steps.forEach((st, i) => {
    const bx = x + i * (bw + gap);
    s.addShape("roundRect", { x: bx, y, w: bw, h, rectRadius: 0.1, fill: { color: P.panel },
      line: { color: "FFFFFF", width: 0.75, transparency: 90 } });
    s.addText(st.n || String(i + 1).padStart(2, "0"), { x: bx + 0.26, y: y + 0.2, w: bw - 0.52, h: 0.6,
      fontFace: F.mono, fontSize: 26, color: P.navaja, valign: "top", margin: 0 });
    s.addText(st.title, { x: bx + 0.27, y: y + 0.86, w: bw - 0.54, h: 0.38, fontFace: F.grot,
      fontSize: 13.5, bold: true, color: P.bone, valign: "top", margin: 0 });
    s.addText(st.body, { x: bx + 0.27, y: y + 1.26, w: bw - 0.54, h: h - 1.42, fontFace: F.grot,
      fontSize: 10.5, color: P.cream, valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
    if (i < n - 1) s.addText("→", { x: bx + bw - 0.03, y, w: gap + 0.06, h, fontFace: F.grot,
      fontSize: 18, color: P.navaja, align: "center", valign: "middle", margin: 0 });
  });
}
function timeline(s, o = {}) {
  const x = o.x, y = o.y, w = o.w, ms = o.milestones, step = w / (ms.length - 1);
  s.addShape("line", { x, y, w, h: 0, line: { color: P.humo, width: 1.25, transparency: 30 } });
  ms.forEach((m, i) => {
    const nx = x + i * step;
    s.addShape("ellipse", { x: nx - 0.09, y: y - 0.09, w: 0.18, h: 0.18,
      fill: { color: m.done ? P.navaja : P.carbon }, line: { color: P.navaja, width: 1.5 } });
    const above = i % 2 === 0;
    s.addText(m.when.toUpperCase(), { x: nx - 1.1, y: above ? y - 0.82 : y + 0.28, w: 2.2, h: 0.28,
      fontFace: F.mono, fontSize: 9.5, color: P.navaja, charSpacing: 1, align: "center", valign: "middle", margin: 0 });
    s.addText(m.label, { x: nx - 1.1, y: above ? y - 0.54 : y + 0.56, w: 2.2, h: 0.5,
      fontFace: F.grot, fontSize: 10.5, color: P.cream, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
  });
}
function dot(s, o) { s.addShape("ellipse", { x: o.x, y: o.y, w: o.d ?? 0.11, h: o.d ?? 0.11, fill: { color: o.color }, line: { type: "none" } }); }
function chartOpts(o = {}) {
  return Object.assign({ chartColors: CHART, showLegend: false, showTitle: false,
    chartArea: { fill: { color: P.carbon } }, plotArea: { fill: { color: P.carbon } },
    catAxisLabelColor: P.humo, valAxisLabelColor: P.humo,
    catAxisLabelFontFace: F.mono, valAxisLabelFontFace: F.mono,
    catAxisLabelFontSize: 9.5, valAxisLabelFontSize: 9.5,
    catAxisLineColor: "3A3A3A", valAxisLineColor: "3A3A3A",
    valGridLine: { color: "2C2C2C", size: 0.5 }, catGridLine: { style: "none" },
    dataLabelFontFace: F.mono, dataLabelColor: P.cream, dataLabelFontSize: 10 }, o);
}

module.exports = { P, F, G, CHART, newSlide, eyebrow, hairline, nabla, feynman, footer,
  header, kpi, callout, insight, dataTable, pillars, processFlow, timeline, dot, chartOpts };
