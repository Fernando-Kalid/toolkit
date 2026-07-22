/* ============================================================================
 * THE SUCCESS PLANNER — Corporate component library (pptxgenjs)
 * Executive-grade reusable blocks built on the brand design system.
 * Everything stays on-system: warm surfaces, italic-serif emotion, grotesque
 * statements, one cognac accent, gold garnish, hairlines, generous air.
 * ==========================================================================*/
const { C, F, G, T, eyebrow, hairline, dot, footer } = require("./sp-design.js");

// Brand categorical palette for charts (warm, never default blue), accent-led.
// Rebuilt each call so it follows the active theme accent (T.accent).
function palette() {
  const second = (T.accent === C.forest) ? T.accent : C.forest;
  return [T.accent, C.gold, second, C.slate, C.sand, C.inkMuted, "7C9885", "C98A5E"];
}
const CHART = palette();

// Semantic status scale (design §2.7) — RAG / deltas
const SEM = {
  progress: "2563EB", ontrack: "3E7C52", risk: "C9603A", pending: C.gold,
  neutral: C.inkMuted, up: "3E7C52", down: "C9603A", flat: C.inkMuted,
};

const shadow = () => ({ type: "outer", color: C.ink, blur: 9, offset: 3, angle: 90, opacity: 0.14 });
const softbox = () => ({ type: "outer", color: C.ink, blur: 12, offset: 4, angle: 90, opacity: 0.10 });

// ---- standard slide header: eyebrow + grotesque title -----------------------
function header(slide, o = {}) {
  eyebrow(slide, o.eyebrow || "", { y: 0.62, color: o.onDark ? C.dimSoft : C.inkMuted });
  slide.addText(o.title || "", {
    x: G.mx, y: 1.0, w: o.titleW ?? G.cw, h: o.titleH ?? 0.95,
    fontFace: F.grot, bold: true, fontSize: o.titleSize ?? 32,
    color: o.onDark ? C.ivory : C.ink, charSpacing: -0.3, valign: "top", margin: 0,
    lineSpacingMultiple: 1.0,
  });
  if (o.lede) slide.addText(o.lede, {
    x: G.mx, y: (o.titleH ? 1.0 + o.titleH : 1.9), w: o.ledeW ?? 9.5, h: 0.5,
    fontFace: F.serif, italic: true, fontSize: 16, color: o.onDark ? C.dim : C.inkMuted,
    valign: "top", margin: 0 });
}

// ---- chapter opener (light, parchment) --------------------------------------
function chapterOpener(pres, o = {}) {
  const s = pres.addSlide();
  s.background = { color: C.parch2 };
  slide_ring(s, { x: 10.6, y: -1.0, d: 3.2, transparency: 82 });
  s.addText(o.num || "01", { x: G.mx, y: 1.15, w: 6, h: 2.4, fontFace: F.grot, bold: true,
    fontSize: 150, color: C.ink, transparency: 88, valign: "top", margin: 0 });
  eyebrow(s, o.kicker || "Capítulo", { y: 3.05, color: T.accent });
  s.addText(o.title || "", { x: G.mx, y: 3.45, w: 10.6, h: 1.5, fontFace: F.serif, italic: true,
    fontSize: 46, color: C.ink, valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
  if (o.sub) s.addText(o.sub, { x: G.mx, y: 5.15, w: 9.2, h: 1.0, fontFace: F.sans, fontSize: 14.5,
    color: C.inkBody, valign: "top", margin: 0, lineSpacingMultiple: 1.3 });
  footer(s, { noWordmark: true });
  return s;
}
function slide_ring(slide, o) {
  slide.addShape("ellipse", { x: o.x, y: o.y, w: o.d, h: o.d, fill: { type: "none" },
    line: { color: C.gold, width: 1, transparency: o.transparency ?? 70 } });
}

// ---- KPI unit: big number + label + optional delta chip ---------------------
function kpi(slide, o = {}) {
  const w = o.w ?? 2.7;
  slide.addText(o.value, { x: o.x, y: o.y, w, h: 0.95, fontFace: F.grot, bold: true,
    fontSize: o.size ?? 44, color: o.hero ? C.gold : (o.onDark ? C.ivory : C.ink),
    align: o.align ?? "left", valign: "middle", margin: 0 });
  slide.addText((o.label || "").toUpperCase(), { x: o.x, y: o.y + 0.95, w, h: 0.32,
    fontFace: F.sans, fontSize: 10, bold: true, color: o.onDark ? C.dimSoft : C.inkMuted,
    charSpacing: 1.3, align: o.align ?? "left", valign: "middle", margin: 0 });
  if (o.delta) deltaChip(slide, { x: o.x, y: o.y + 1.3, text: o.delta, dir: o.deltaDir || "up",
    align: o.align, w });
}

// ---- delta chip: ▲ / ▼ / — with semantic color ------------------------------
function deltaChip(slide, o = {}) {
  const dir = o.dir || "up";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const col = dir === "up" ? SEM.up : dir === "down" ? SEM.down : SEM.flat;
  slide.addText([{ text: arrow + " ", options: { color: col } },
                 { text: o.text, options: { color: col, bold: true } }],
    { x: o.x, y: o.y, w: o.w ?? 2.4, h: 0.3, fontFace: F.sans, fontSize: 11,
      align: o.align ?? "left", valign: "middle", margin: 0 });
}

// ---- status pill (RAG) ------------------------------------------------------
function statusPill(slide, o = {}) {
  const col = SEM[o.status] || SEM.neutral;
  slide.addText([{ text: "● ", options: { color: col } },
                 { text: (o.label || "").toUpperCase(), options: { color: o.onDark ? C.ivory : C.inkBody } }],
    { x: o.x, y: o.y, w: o.w ?? 1.8, h: o.h ?? 0.34, fontFace: F.sans, fontSize: o.fontSize ?? 10,
      bold: true, charSpacing: 0.8, align: "left", valign: "middle", margin: 0 });
}

// ---- progress / bullet bar (value vs target) --------------------------------
function progressBar(slide, o = {}) {
  const w = o.w ?? 4.5, h = o.h ?? 0.24, pct = Math.max(0, Math.min(1, o.pct));
  slide.addShape("roundRect", { x: o.x, y: o.y, w, h, rectRadius: h / 2,
    fill: { color: o.onDark ? C.obsidian : "EEE6D8" }, line: { type: "none" } });
  slide.addShape("roundRect", { x: o.x, y: o.y, w: Math.max(w * pct, h), h, rectRadius: h / 2,
    fill: { color: o.color || T.accent }, line: { type: "none" } });
  if (o.target != null) slide.addShape("line", { x: o.x + w * o.target, y: o.y - 0.05, w: 0, h: h + 0.1,
    line: { color: o.onDark ? C.ivory : C.ink, width: 1 } });
}

// ---- tinted callout box -----------------------------------------------------
function callout(slide, o = {}) {
  const accent = o.accent || T.accent;
  slide.addShape("roundRect", { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.12,
    fill: { color: o.fill || C.cream }, line: { color: accent, width: 1, transparency: o.line ?? 60 },
    shadow: softbox() });
  let yy = o.y + 0.26;
  if (o.kicker) { slide.addText((o.kicker).toUpperCase(), { x: o.x + 0.3, y: yy, w: o.w - 0.6, h: 0.3,
    fontFace: F.sans, fontSize: 10.5, bold: true, color: accent, charSpacing: 1.4, valign: "middle", margin: 0 });
    yy += 0.38; }
  slide.addText(o.text, { x: o.x + 0.3, y: yy, w: o.w - 0.6, h: o.y + o.h - yy - 0.2,
    fontFace: o.serif ? F.serif : F.sans, italic: !!o.serif, fontSize: o.fontSize ?? 13,
    color: C.inkBody, valign: "top", margin: 0, lineSpacingMultiple: 1.22 });
}

// ---- big insight statement (serif hero on tint) -----------------------------
function insight(slide, o = {}) {
  slide.addShape("roundRect", { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.14,
    fill: { color: o.fill || C.sandDeep }, line: { type: "none" } });
  if (o.kicker) slide.addText(o.kicker.toUpperCase(), { x: o.x + 0.5, y: o.y + 0.4, w: o.w - 1, h: 0.3,
    fontFace: F.sans, fontSize: 11, bold: true, color: T.accent, charSpacing: 1.8, valign: "middle", margin: 0 });
  slide.addText(o.text, { x: o.x + 0.5, y: o.y + (o.kicker ? 0.82 : 0.5), w: o.w - 1, h: o.h - (o.kicker ? 1.1 : 0.9),
    fontFace: F.serif, italic: true, fontSize: o.fontSize ?? 26, color: C.ink, valign: "middle",
    margin: 0, lineSpacingMultiple: 1.08 });
}

// ---- clean data table (hairlines, right-aligned numerics) -------------------
// cols: [{label, w, align}]; rows: [[...cells]]; cell may be {t, c, b}
function dataTable(slide, o = {}) {
  const cols = o.cols, x0 = o.x, y0 = o.y, rowH = o.rowH ?? 0.44;
  let cx = x0;
  cols.forEach(col => {
    slide.addText((col.label || "").toUpperCase(), { x: cx, y: y0, w: col.w, h: 0.34,
      fontFace: F.sans, fontSize: 9.5, bold: true, color: C.inkMuted, charSpacing: 1,
      align: col.align || "left", valign: "middle", margin: 0 });
    cx += col.w;
  });
  hairline(slide, { x: x0, y: y0 + 0.4, w: cx - x0, color: C.ink, transparency: 55 });
  o.rows.forEach((row, ri) => {
    const ry = y0 + 0.5 + ri * rowH;
    let rx = x0;
    row.forEach((cell, ci) => {
      const col = cols[ci];
      const val = (cell && cell.t !== undefined) ? cell : { t: cell };
      slide.addText(String(val.t), { x: rx, y: ry, w: col.w, h: rowH,
        fontFace: F.sans, fontSize: o.fontSize ?? 12, bold: !!val.b,
        color: val.c || (ci === 0 ? C.ink : C.inkBody), align: col.align || "left",
        valign: "middle", margin: 0 });
      rx += col.w;
    });
    hairline(slide, { x: x0, y: ry + rowH, w: cx - x0, color: C.ink, transparency: 90 });
  });
  return y0 + 0.5 + o.rows.length * rowH;
}

// ---- 2x2 matrix -------------------------------------------------------------
function matrix2x2(slide, o = {}) {
  const x = o.x, y = o.y, s = o.size;
  slide.addShape("rect", { x, y, w: s, h: s, fill: { color: o.fill || C.cream },
    line: { color: C.ink, width: 0.75, transparency: 80 } });
  slide.addShape("line", { x: x + s / 2, y, w: 0, h: s, line: { color: C.ink, width: 0.75, transparency: 70 } });
  slide.addShape("line", { x, y: y + s / 2, w: s, h: 0, line: { color: C.ink, width: 0.75, transparency: 70 } });
  const q = o.quadrants || [];
  const pos = [[x + 0.2, y + 0.2], [x + s / 2 + 0.2, y + 0.2],
               [x + 0.2, y + s / 2 + 0.2], [x + s / 2 + 0.2, y + s / 2 + 0.2]];
  q.forEach((qq, i) => {
    slide.addText(qq.label.toUpperCase(), { x: pos[i][0], y: pos[i][1], w: s / 2 - 0.4, h: 0.3,
      fontFace: F.sans, fontSize: 10, bold: true, color: qq.hot ? T.accent : C.inkMuted,
      charSpacing: 1, valign: "top", margin: 0 });
    if (qq.items) slide.addText(qq.items, { x: pos[i][0], y: pos[i][1] + 0.34, w: s / 2 - 0.4, h: s / 2 - 0.7,
      fontFace: F.sans, fontSize: 11, color: C.inkBody, valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
  });
  // axis labels
  if (o.xLabel) slide.addText(o.xLabel.toUpperCase(), { x, y: y + s + 0.08, w: s, h: 0.3, fontFace: F.sans,
    fontSize: 9.5, bold: true, color: C.inkMuted, charSpacing: 1.2, align: "center", valign: "middle", margin: 0 });
  if (o.yLabel) slide.addText(o.yLabel.toUpperCase(), { x: x - s / 2 - 0.15, y: y + s / 2 - 0.15, w: s, h: 0.3,
    fontFace: F.sans, fontSize: 9.5, bold: true, color: C.inkMuted, charSpacing: 1.2, align: "center",
    valign: "middle", rotate: 270, margin: 0 });
}

// ---- horizontal timeline / roadmap ------------------------------------------
function timeline(slide, o = {}) {
  const x = o.x, y = o.y, w = o.w, ms = o.milestones, step = w / (ms.length - 1);
  slide.addShape("line", { x, y, w, h: 0, line: { color: C.inkMuted, width: 1.25, transparency: 40 } });
  ms.forEach((m, i) => {
    const nx = x + i * step;
    const done = m.done;
    slide.addShape("ellipse", { x: nx - 0.09, y: y - 0.09, w: 0.18, h: 0.18,
      fill: { color: done ? T.accent : C.bone }, line: { color: T.accent, width: 1.5 } });
    const above = i % 2 === 0;
    slide.addText(m.when.toUpperCase(), { x: nx - 1.1, y: above ? y - 0.78 : y + 0.28, w: 2.2, h: 0.28,
      fontFace: F.sans, fontSize: 10, bold: true, color: T.accent, charSpacing: 1, align: "center", valign: "middle", margin: 0 });
    slide.addText(m.label, { x: nx - 1.1, y: above ? y - 0.5 : y + 0.54, w: 2.2, h: 0.5,
      fontFace: F.sans, fontSize: 11, color: C.inkBody, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
  });
}

// ---- funnel (centered decreasing bars) --------------------------------------
function funnel(slide, o = {}) {
  const x = o.x, y = o.y, wMax = o.w, stages = o.stages, h = o.stageH ?? 0.62, gap = o.gap ?? 0.14;
  const max = stages[0].value;
  stages.forEach((st, i) => {
    const ww = wMax * (0.42 + 0.58 * (st.value / max));
    const sx = x + (wMax - ww) / 2, sy = y + i * (h + gap);
    slide.addShape("roundRect", { x: sx, y: sy, w: ww, h, rectRadius: 0.06,
      fill: { color: palette()[i % 8] }, line: { type: "none" } });
    slide.addText([{ text: st.label + "   ", options: { bold: true } },
                   { text: String(st.value) + (st.suffix || ""), options: { color: C.ivory } }],
      { x: sx, y: sy, w: ww, h, fontFace: F.sans, fontSize: 12.5, color: C.ivory,
        align: "center", valign: "middle", margin: 0 });
    if (o.rates && i > 0) slide.addText(o.rates[i - 1], { x: x + wMax + 0.12, y: sy, w: 1.05, h,
      fontFace: F.sans, fontSize: 11, color: C.inkMuted, valign: "middle", margin: 0 });
  });
}

// ---- process flow (numbered boxes + arrow glyphs) ---------------------------
function processFlow(slide, o = {}) {
  const steps = o.steps, x = o.x, y = o.y, w = o.w, h = o.h ?? 1.9;
  const n = steps.length, gap = 0.5, bw = (w - gap * (n - 1)) / n;
  steps.forEach((st, i) => {
    const bx = x + i * (bw + gap);
    slide.addShape("roundRect", { x: bx, y, w: bw, h, rectRadius: 0.12, fill: { color: C.cream },
      line: { color: C.ink, width: 0.75, transparency: 88 }, shadow: shadow() });
    slide.addText(st.n || String(i + 1), { x: bx + 0.25, y: y + 0.2, w: bw - 0.5, h: 0.7,
      fontFace: F.grot, bold: true, fontSize: 34, color: T.accent, valign: "top", margin: 0 });
    slide.addText(st.title, { x: bx + 0.27, y: y + 0.82, w: bw - 0.54, h: 0.4, fontFace: F.sans,
      fontSize: 13, bold: true, color: C.ink, valign: "top", margin: 0 });
    slide.addText(st.body, { x: bx + 0.27, y: y + 1.2, w: bw - 0.54, h: h - 1.35, fontFace: F.sans,
      fontSize: 11, color: C.inkBody, valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
    if (i < n - 1) slide.addText("→", { x: bx + bw - 0.02, y, w: gap, h, fontFace: F.sans,
      fontSize: 20, color: T.accent, align: "center", valign: "middle", margin: 0 });
  });
}

// ---- pyramid (stacked layers) ----------------------------------------------
function pyramid(slide, o = {}) {
  const layers = o.layers, x = o.x, y = o.y, w = o.w, h = o.h ?? 3.2, n = layers.length;
  const lh = h / n, gap = 0.06;
  layers.forEach((lay, i) => {
    const topW = w * (0.24 + 0.76 * (i / n));
    const botW = w * (0.24 + 0.76 * ((i + 1) / n));
    const ly = y + i * lh;
    // use trapezoid via manual freeform is complex; approximate with centered rect scaled
    const cw = (topW + botW) / 2;
    slide.addShape("trapezoid", { x: x + (w - cw) / 2, y: ly, w: cw, h: lh - gap,
      fill: { color: palette()[i % 8] }, line: { type: "none" } });
    slide.addText(lay.label, { x: x + (w - cw) / 2 + 0.1, y: ly, w: cw - 0.2, h: lh - gap, fontFace: F.sans,
      fontSize: 11.5, bold: true, color: C.ivory, align: "center", valign: "middle", margin: 0 });
    if (lay.note) slide.addText(lay.note, { x: x + w + 0.25, y: ly, w: o.noteW ?? 3.4, h: lh - gap,
      fontFace: F.sans, fontSize: 11, color: C.inkBody, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });
  });
}

// ---- strategy pillars (columns with heading + points) -----------------------
function pillars(slide, o = {}) {
  const items = o.items, x = o.x, y = o.y, w = o.w, h = o.h ?? 3.4, n = items.length, gap = 0.4;
  const cw = (w - gap * (n - 1)) / n;
  items.forEach((it, i) => {
    const cx = x + i * (cw + gap);
    slide.addShape("roundRect", { x: cx, y, w: cw, h, rectRadius: 0.12, fill: { color: C.cream },
      line: { color: C.ink, width: 0.75, transparency: 88 }, shadow: shadow() });
    slide.addText(it.icon || String(i + 1), { x: cx + 0.28, y: y + 0.26, w: cw - 0.56, h: 0.55,
      fontFace: F.serif, italic: true, fontSize: 30, color: C.gold, valign: "top", margin: 0 });
    slide.addText(it.title, { x: cx + 0.28, y: y + 0.92, w: cw - 0.56, h: 0.55, fontFace: F.grot,
      bold: true, fontSize: 15, color: C.ink, valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
    slide.addText(it.points.map((p, k) => ({ text: p, options: { bullet: { code: "2022" },
      breakLine: true, paraSpaceAfter: 6 } })), { x: cx + 0.3, y: y + 1.5, w: cw - 0.58, h: h - 1.7,
      fontFace: F.sans, fontSize: 11.5, color: C.inkBody, valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
  });
}

// ---- waterfall / bridge (manual floating bars) ------------------------------
// items: [{label, value, type:'start'|'delta'|'total'}]
function waterfall(slide, o = {}) {
  const x = o.x, y = o.y, w = o.w, h = o.h, items = o.items;
  const n = items.length, gap = o.gap ?? 0.28, bw = (w - gap * (n - 1)) / n;
  // running totals & ranges
  let run = 0; const bars = [];
  items.forEach(it => {
    if (it.type === "start" || it.type === "total") { bars.push({ lo: 0, hi: it.value, val: it.value, type: it.type }); run = it.value; }
    else { const lo = run, hi = run + it.value; bars.push({ lo: Math.min(lo, hi), hi: Math.max(lo, hi), val: it.value, type: "delta", up: it.value >= 0 }); run = hi; }
  });
  const maxV = o.maxVal ?? Math.max(...bars.map(b => b.hi)) * 1.12;
  const yFor = v => y + h - (v / maxV) * h;
  items.forEach((it, i) => {
    const b = bars[i], bx = x + i * (bw + gap);
    const top = yFor(b.hi), bot = yFor(b.lo);
    const col = b.type === "delta" ? (b.up ? SEM.up : SEM.down) : C.slate;
    slide.addShape("rect", { x: bx, y: top, w: bw, h: Math.max(bot - top, 0.03), fill: { color: col }, line: { type: "none" } });
    // connector to next
    if (i < n - 1) slide.addShape("line", { x: bx + bw, y: yFor(bars[i].type === "total" ? bars[i].hi : (bars[i].type === "start" ? bars[i].hi : bars[i].hi)), w: gap, h: 0, line: { color: C.inkMuted, width: 0.75, dashType: "dash", transparency: 30 } });
    // value label
    slide.addText((it.value >= 0 || it.type !== "delta" ? "" : "") + o.fmt(it.value, it.type), { x: bx - 0.2, y: top - 0.34, w: bw + 0.4, h: 0.3,
      fontFace: F.sans, fontSize: 10.5, bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });
    // category label
    slide.addText(it.label, { x: bx - 0.25, y: y + h + 0.08, w: bw + 0.5, h: 0.5, fontFace: F.sans,
      fontSize: 10, color: C.inkMuted, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  });
}

// ---- modern brand chart options ---------------------------------------------
function chartOpts(bg, o = {}) {
  return Object.assign({
    chartColors: palette(), showLegend: false, showTitle: false,
    catAxisLabelColor: C.inkMuted, valAxisLabelColor: C.inkMuted,
    catAxisLabelFontFace: F.sans, valAxisLabelFontFace: F.sans,
    catAxisLabelFontSize: 10, valAxisLabelFontSize: 10,
    catAxisLineColor: "D9CFC0", valAxisLineColor: "D9CFC0",
    valGridLine: { color: "E8E0D2", size: 0.5 }, catGridLine: { style: "none" },
    chartArea: { fill: { color: bg } }, plotArea: { fill: { color: bg } },
    dataLabelFontFace: F.sans, dataLabelColor: C.ink, dataLabelFontSize: 10,
  }, o);
}

module.exports = {
  CHART, palette, SEM, shadow, softbox, header, chapterOpener, slide_ring, kpi, deltaChip,
  statusPill, progressBar, callout, insight, dataTable, matrix2x2, timeline, funnel,
  processFlow, pyramid, pillars, waterfall, chartOpts,
};
