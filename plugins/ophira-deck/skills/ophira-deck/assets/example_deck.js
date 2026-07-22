/* OPHIRA — Plantilla corporativa (~32 slides) */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FiCheckCircle, FiCalendar, FiUsers, FiTrendingUp, FiShield, FiTarget,
  FiHeart, FiDollarSign, FiClock, FiStar, FiMail, FiGlobe, FiLayers,
  FiZap, FiEye, FiLock, FiPackage, FiPhone,
} = require("react-icons/fi");

/* ---------- Tokens ---------- */
const WAX = "FAF6EC", DUSK = "2A2A3E", TEAL = "00707B", MIST = "F2EBDB";
const STONE = "DCCFBA", INK2 = "6E6875", DEEP = "1E1E2A", GOLD = "D4AF37";
const BUTTER = "F2CC5D", CLAVEL = "E2725B", WARN = "A46A2A", ERR = "7A2E2E";
const TAUPE = "B8A398";
/* tints pre-blended over Wax Paper */
const TEAL15 = "D4E2DB", WARN15 = "EDE1CF", ERR15 = "E7D8D0";
const F = "Fraunces", I = "Inter";
const RAMP = [TEAL, DUSK, TAUPE, BUTTER, CLAVEL, STONE];

const cardShadow = () => ({ type: "outer", color: DUSK, blur: 12, offset: 3, angle: 90, opacity: 0.10 });

/* ---------- Ornaments (SVG -> PNG w/ alpha) ---------- */
const PATHS = {
  blob:   { d: "M100,18 C138,14 172,40 180,76 C188,112 170,152 136,168 C102,184 58,176 36,148 C14,120 16,76 40,48 C57,28 78,21 100,18 Z", vb: "0 0 200 200", w: 1400, h: 1400 },
  arch:   { d: "M20,200 L20,100 C20,45 56,16 100,16 C144,16 180,45 180,100 L180,200 Z", vb: "0 0 200 200", w: 1400, h: 1400 },
  ribbon: { d: "M0,70 C90,10 190,10 260,60 C330,110 410,110 480,60 L480,104 C410,154 330,154 260,104 C190,54 90,54 0,114 Z", vb: "0 0 480 160", w: 2400, h: 800 },
};
async function orn(kind, hex, opacity) {
  const p = PATHS[kind];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${p.vb}" width="${p.w}" height="${p.h}"><path d="${p.d}" fill="#${hex}" fill-opacity="${opacity}"/></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
async function icon(Comp, hex, size = 320) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: String(size), strokeWidth: 1.7 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

/* ---------- Build ---------- */
(async () => {
  const orns = {
    blobClavel: await orn("blob", CLAVEL, 0.13),
    blobButter: await orn("blob", BUTTER, 0.18),
    blobTeal:   await orn("blob", TEAL, 0.10),
    archTeal:   await orn("arch", TEAL, 0.16),
    archStoneD: await orn("arch", STONE, 0.14),
    archButter: await orn("arch", BUTTER, 0.18),
    ribButter:  await orn("ribbon", BUTTER, 0.18),
    ribClavel:  await orn("ribbon", CLAVEL, 0.11),
    ribTealD:   await orn("ribbon", TEAL, 0.20),
  };
  const ic = {};
  const defs = {
    check: [FiCheckCircle, TEAL], cal: [FiCalendar, TEAL], users: [FiUsers, TEAL],
    trend: [FiTrendingUp, TEAL], shield: [FiShield, TEAL], target: [FiTarget, TEAL],
    heart: [FiHeart, TEAL], dollar: [FiDollarSign, TEAL], clock: [FiClock, TEAL],
    star: [FiStar, TEAL], mail: [FiMail, WAX], globe: [FiGlobe, WAX],
    layers: [FiLayers, TEAL], zap: [FiZap, TEAL], eye: [FiEye, TEAL],
    lock: [FiLock, TEAL], pkg: [FiPackage, TEAL], phone: [FiPhone, WAX],
    usersDusk: [FiUsers, DUSK], calDusk: [FiCalendar, DUSK], shieldDusk: [FiShield, DUSK],
  };
  for (const k of Object.keys(defs)) ic[k] = await icon(defs[k][0], defs[k][1]);

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "OPHIRA";
  pres.title = "OPHIRA — Plantilla corporativa";
  const W = 10, H = 5.625, M = 0.5, CW = W - 2 * M;

  /* ---------- helpers ---------- */
  let pageNum = 0;
  function slideNew(bg) {
    const s = pres.addSlide();
    s.background = { color: bg };
    pageNum++;
    return s;
  }
  function footer(s, dark = false) {
    const c = dark ? TAUPE : INK2;
    s.addText("OPHIRA", { x: M, y: H - 0.34, w: 1.6, h: 0.22, fontFace: I, fontSize: 8.5, bold: true, charSpacing: 3, color: c, margin: 0 });
    s.addText(String(pageNum).padStart(2, "0"), { x: W - M - 0.6, y: H - 0.34, w: 0.6, h: 0.22, fontFace: I, fontSize: 8.5, color: c, align: "right", margin: 0 });
  }
  function eyebrow(s, txt, x, y, w, opts = {}) {
    s.addText(txt.toUpperCase(), { x, y, w, h: 0.24, fontFace: I, fontSize: 10.5, charSpacing: 2.4, color: opts.color || INK2, margin: 0, align: opts.align || "left" });
  }
  function h2(s, txt, x = M, y = 0.62, w = CW, opts = {}) {
    s.addText(txt, { x, y, w, h: 0.5, fontFace: I, fontSize: 23, bold: true, color: opts.color || DUSK, margin: 0 });
    if (opts.divider !== false) s.addShape(pres.shapes.LINE, { x, y: y + 0.58, w, h: 0, line: { color: STONE, width: 1 } });
  }
  function header(s, eb, title, opts = {}) {
    eyebrow(s, eb, M, 0.34, CW, opts);
    h2(s, title, M, 0.62, CW, opts);
  }
  function card(s, x, y, w, h, opts = {}) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h, rectRadius: 0.09,
      fill: { color: opts.fill || WAX },
      line: opts.line === false ? { type: "none" } : { color: opts.lineColor || STONE, width: 1 },
      shadow: opts.shadow ? cardShadow() : undefined,
    });
  }
  function badge(s, txt, x, y, kind = "success", w = 1.15) {
    const map = {
      default:   { f: TEAL, t: WAX, ln: null },
      secondary: { f: MIST, t: DUSK, ln: null },
      outline:   { f: WAX, t: DUSK, ln: STONE },
      success:   { f: TEAL15, t: TEAL, ln: null },
      warning:   { f: WARN15, t: WARN, ln: null },
      error:     { f: ERR15, t: ERR, ln: null },
    };
    const m = map[kind];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.28, rectRadius: 0.14, fill: { color: m.f }, line: m.ln ? { color: m.ln, width: 1 } : { type: "none" } });
    s.addText(txt, { x, y: y + 0.01, w, h: 0.26, fontFace: I, fontSize: 9.5, bold: true, color: m.t, align: "center", valign: "middle", margin: 0 });
  }
  function ctaPill(s, txt, x, y, w = 2.1, variant = "primary") {
    const v = variant === "primary" ? { f: TEAL, t: WAX, ln: null } : variant === "secondary" ? { f: MIST, t: DUSK, ln: null } : { f: WAX, t: DUSK, ln: STONE };
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.44, rectRadius: 0.08, fill: v.f ? { color: v.f } : { type: "none" }, line: v.ln ? { color: v.ln, width: 1 } : { type: "none" } });
    s.addText(txt, { x, y, w, h: 0.44, fontFace: I, fontSize: 12, bold: true, color: v.t, align: "center", valign: "middle", margin: 0 });
  }
  function wordmark(s, x, y, dark = false, size = 13) {
    s.addText("OPHIRA", { x, y, w: 2.2, h: 0.32, fontFace: I, fontSize: size, bold: true, charSpacing: 3.5, color: dark ? WAX : DUSK, margin: 0 });
  }
  function divider(sec, title, sub, style, ornament) {
    const s = slideNew(style === "dark" ? DUSK : MIST);
    if (ornament) s.addImage({ data: ornament.data, x: ornament.x, y: ornament.y, w: ornament.w, h: ornament.h });
    s.addText(sec, { x: M, y: 1.05, w: 3.4, h: 1.7, fontFace: F, fontSize: 96, bold: true, color: style === "dark" ? TEAL : TEAL, margin: 0 });
    s.addShape(pres.shapes.LINE, { x: M, y: 3.0, w: 3.2, h: 0, line: { color: style === "dark" ? "4A4A62" : STONE, width: 1 } });
    eyebrow(s, "SECCIÓN", M, 3.22, 4, { color: style === "dark" ? TAUPE : INK2 });
    s.addText(title, { x: M, y: 3.5, w: 7.6, h: 0.75, fontFace: F, fontSize: 34, bold: true, color: style === "dark" ? WAX : DUSK, margin: 0 });
    s.addText(sub, { x: M, y: 4.3, w: 6.6, h: 0.55, fontFace: I, fontSize: 12.5, color: style === "dark" ? TAUPE : INK2, margin: 0 });
    footer(s, style === "dark");
    s.addNotes("Separador de sección. Duplica esta slide y cambia número, título y descripción. Alterna fondos Warm Mist y Future Dusk entre secciones.");
    return s;
  }

  /* ================= 1. PORTADA (clara) ================= */
  {
    const s = slideNew(WAX);
    s.addImage({ data: orns.blobClavel, x: 6.4, y: -1.6, w: 5.2, h: 5.2 });
    eyebrow(s, "PRESENTACIÓN CORPORATIVA · JULIO 2026", M, 1.5, 7);
    s.addText("Título de la presentación", { x: M, y: 1.82, w: 8.2, h: 1.7, fontFace: F, fontSize: 44, bold: true, color: DUSK, margin: 0, lineSpacingMultiple: 1.08 });
    s.addText("Subtítulo o mensaje de apoyo — una sola línea, en tono calmado.", { x: M, y: 3.55, w: 7.2, h: 0.45, fontFace: I, fontSize: 14, color: INK2, margin: 0 });
    wordmark(s, M, H - 0.62);
    s.addText("Cliente / Fecha · Ciudad de México", { x: W - M - 3.4, y: H - 0.60, w: 3.4, h: 0.3, fontFace: I, fontSize: 10, color: INK2, align: "right", margin: 0 });
    s.addNotes("Portada principal (clara). Un solo ornamento (blob Clavel al 13%) sangrando fuera del canvas. Sustituye título, subtítulo, cliente y fecha.");
  }

  /* ================= 2. PORTADA ALTERNA (oscura) ================= */
  {
    const s = slideNew(DUSK);
    s.addImage({ data: orns.archTeal, x: 7.1, y: 2.2, w: 4.2, h: 4.2 });
    eyebrow(s, "PROPUESTA · CONFIDENCIAL", M, 1.5, 7, { color: TAUPE });
    s.addText([
      { text: "Menos ruido, ", options: { color: WAX } },
      { text: "más claridad.", options: { color: "7FC5CC" } },
    ], { x: M, y: 1.82, w: 8.4, h: 1.7, fontFace: F, fontSize: 42, bold: true, margin: 0, lineSpacingMultiple: 1.08 });
    s.addText("Versión oscura para propuestas y keynotes ejecutivos.", { x: M, y: 3.55, w: 7.0, h: 0.45, fontFace: I, fontSize: 14, color: TAUPE, margin: 0 });
    wordmark(s, M, H - 0.62, true);
    s.addText("ophira.mx", { x: W - M - 2.2, y: H - 0.60, w: 2.2, h: 0.3, fontFace: I, fontSize: 10, color: TAUPE, align: "right", margin: 0 });
    s.addNotes("Portada alterna sobre Future Dusk. El acento Teal se aplica a una sola palabra o línea del título.");
  }

  /* ================= 3. AGENDA ================= */
  {
    const s = slideNew(WAX);
    header(s, "HOJA DE RUTA", "Agenda");
    const items = [
      ["01", "Gestión y equipos", "Estado de proyectos, OKRs, presupuesto y equipo"],
      ["02", "Dirección ejecutiva", "Resumen ejecutivo, finanzas, riesgos y roadmap"],
      ["03", "Clientes", "Propuesta de valor, casos de éxito y paquetes"],
      ["04", "Proveedores", "Modelo de leads, alianzas y condiciones"],
      ["05", "Cierre", "Siguientes pasos y contacto"],
      ["06", "Anexo", "Guía rápida del sistema de diseño"],
    ];
    items.forEach((it, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = M + col * (CW / 2 + 0.1), y = 1.55 + row * 1.15, w = CW / 2 - 0.2;
      s.addText(it[0], { x, y, w: 0.85, h: 0.7, fontFace: F, fontSize: 30, bold: true, color: TEAL, margin: 0 });
      s.addText(it[1], { x: x + 0.95, y: y + 0.02, w: w - 0.95, h: 0.3, fontFace: I, fontSize: 14, bold: true, color: DUSK, margin: 0 });
      s.addText(it[2], { x: x + 0.95, y: y + 0.34, w: w - 0.95, h: 0.55, fontFace: I, fontSize: 10.5, color: INK2, margin: 0 });
    });
    footer(s);
    s.addNotes("Agenda en dos columnas con números en Fraunces Teal. Ajusta la cantidad de puntos según la reunión.");
  }

  /* ================= SECCIÓN 01 — LAYOUTS BASE ================= */
  divider("01", "Layouts de contenido", "Patrones base reutilizables: texto, tarjetas, métricas, datos y citas.", "mist",
    { data: orns.archButter, x: 7.3, y: 2.0, w: 4.4, h: 4.4 });

  /* ---- 5. Título + cuerpo (1 col + aside) ---- */
  {
    const s = slideNew(WAX);
    header(s, "ESTA SEMANA · ALTA PRIORIDAD", "Título + cuerpo con nota lateral");
    s.addText([
      { text: "Este layout sostiene una sola idea con aire abundante. Úsalo para narrativas, contexto de mercado o resúmenes de decisión.", options: { breakLine: true } },
      { text: "", options: { breakLine: true } },
      { text: "El cuerpo se escribe en Inter regular, interlineado holgado, alineado a la izquierda. Evita párrafos de más de cuatro líneas; una idea por diapositiva.", options: {} },
    ], { x: M, y: 1.55, w: 5.5, h: 2.4, fontFace: I, fontSize: 13, color: DUSK, margin: 0, lineSpacingMultiple: 1.35 });
    card(s, 6.35, 1.5, 3.15, 2.5, { fill: MIST, line: false });
    eyebrow(s, "NOTA CLAVE", 6.6, 1.75, 2.7);
    s.addText("“El siguiente paso, visible.”", { x: 6.6, y: 2.05, w: 2.65, h: 0.85, fontFace: F, fontSize: 16, bold: true, italic: true, color: DUSK, margin: 0 });
    s.addText("Usa la tarjeta Warm Mist para destacar una cifra, una cita corta o una advertencia.", { x: 6.6, y: 2.95, w: 2.65, h: 0.85, fontFace: I, fontSize: 10.5, color: INK2, margin: 0 });
    footer(s);
    s.addNotes("Layout 6.4 del sistema: eyebrow + H2 + divisor Soft Stone. Columna de texto + tarjeta lateral Warm Mist.");
  }

  /* ---- 6. Dos columnas ---- */
  {
    const s = slideNew(WAX);
    header(s, "COMPARATIVA", "Contenido a dos columnas");
    const cols = [
      { t: "Situación actual", items: ["Procesos manuales dispersos en hojas de cálculo", "Sin visibilidad del siguiente paso", "Comunicación fragmentada con terceros"] },
      { t: "Con OPHIRA", items: ["Orquestación en una sola plataforma", "Prioridades claras semana a semana", "Leads y acuerdos trazables de inicio a fin"] },
    ];
    cols.forEach((c, i) => {
      const x = M + i * (CW / 2 + 0.15), w = CW / 2 - 0.25;
      s.addText(c.t, { x, y: 1.5, w, h: 0.4, fontFace: F, fontSize: 17, bold: true, color: i === 1 ? TEAL : DUSK, margin: 0 });
      s.addText(c.items.map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 12 }, breakLine: true, paraSpaceAfter: 10 } })),
        { x, y: 2.0, w, h: 2.4, fontFace: I, fontSize: 12.5, color: DUSK, margin: 0, lineSpacingMultiple: 1.2 });
    });
    s.addShape(pres.shapes.LINE, { x: W / 2, y: 1.55, w: 0, h: 2.7, line: { color: STONE, width: 1 } });
    footer(s);
    s.addNotes("Dos columnas separadas por línea Soft Stone vertical. La columna 'nuestra' puede llevar encabezado Teal.");
  }

  /* ---- 7. Tarjetas / features 3 col ---- */
  {
    const s = slideNew(WAX);
    header(s, "QUÉ INCLUYE", "Tarjetas de características");
    const feats = [
      [ic.cal, "Planeación guiada", "Checklist viviente que prioriza el siguiente paso según la fecha del evento."],
      [ic.users, "Invitados y RSVP", "Lista única, confirmaciones en tiempo real y mesas resueltas sin fricción."],
      [ic.shield, "Privacidad primero", "Tu información queda en privado desde el primer dato. Sin spam de proveedores."],
    ];
    feats.forEach((f, i) => {
      const w = (CW - 0.5) / 3, x = M + i * (w + 0.25);
      card(s, x, 1.5, w, 2.65, { shadow: true });
      s.addImage({ data: f[0], x: x + 0.28, y: 1.8, w: 0.38, h: 0.38 });
      s.addText(f[1], { x: x + 0.28, y: 2.32, w: w - 0.56, h: 0.55, fontFace: F, fontSize: 15.5, bold: true, color: DUSK, margin: 0 });
      s.addText(f[2], { x: x + 0.28, y: 2.92, w: w - 0.56, h: 1.05, fontFace: I, fontSize: 10.5, color: INK2, margin: 0, lineSpacingMultiple: 1.25 });
    });
    footer(s);
    s.addNotes("Tarjetas Wax Paper con borde Soft Stone, radio 12px, sombra suave. Íconos lineales en Teal. Funciona de 2 a 3 columnas.");
  }

  /* ---- 8. KPI ---- */
  {
    const s = slideNew(WAX);
    header(s, "MÉTRICAS DEL MES", "Números que importan");
    const kpis = [
      ["68", "invitados confirmados", TEAL],
      ["$180,000", "MXN presupuesto activo", DUSK],
      ["12 / 48", "tareas completadas", TEAL],
    ];
    kpis.forEach((k, i) => {
      const w = (CW - 0.5) / 3, x = M + i * (w + 0.25);
      s.addText(k[0], { x, y: 2.0, w, h: 0.95, fontFace: F, fontSize: 36, bold: true, color: k[2], align: "center", margin: 0 });
      s.addShape(pres.shapes.LINE, { x: x + w / 2 - 0.35, y: 3.15, w: 0.7, h: 0, line: { color: GOLD, width: 1 } });
      eyebrow(s, k[1], x, 3.3, w, { align: "center" });
    });
    s.addText("Los números hero van en Fraunces; alterna Teal (dato clave) y Future Dusk (contexto). Máximo cuatro por slide.",
      { x: M, y: 4.15, w: CW, h: 0.5, fontFace: I, fontSize: 10.5, color: INK2, align: "center", margin: 0 });
    footer(s);
    s.addNotes("Layout KPI 6.6. Línea Glow Spark de 1pt como detalle premium bajo cada cifra. Ejemplos reales del producto.");
  }

  /* ---- 9. Gráfica de barras ---- */
  {
    const s = slideNew(WAX);
    header(s, "DATOS · SIN ORNAMENTOS", "Gráfica de barras");
    s.addChart(pres.charts.BAR, [
      { name: "Leads calificados", labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], values: [120, 168, 214, 236, 305, 362] },
      { name: "Leads convertidos", labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], values: [38, 52, 71, 84, 118, 141] },
    ], {
      x: M, y: 1.45, w: 6.4, h: 3.5, barDir: "col", chartColors: [TEAL, STONE],
      catAxisLabelColor: INK2, valAxisLabelColor: INK2, catAxisLabelFontSize: 10, valAxisLabelFontSize: 10,
      valGridLine: { color: STONE, size: 0.5 }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "b", legendColor: INK2, legendFontSize: 10,
      valAxisLineColor: STONE, catAxisLineColor: STONE, showTitle: false,
    });
    eyebrow(s, "LECTURA", 7.25, 1.6, 2.3);
    s.addText("La serie clave siempre en Teal; el resto en neutrales para que destaque.", { x: 7.25, y: 1.9, w: 2.3, h: 1.0, fontFace: I, fontSize: 11, color: DUSK, margin: 0, lineSpacingMultiple: 1.3 });
    s.addText("+201%", { x: 7.25, y: 3.0, w: 2.3, h: 0.7, fontFace: F, fontSize: 34, bold: true, color: TEAL, margin: 0 });
    eyebrow(s, "CRECIMIENTO SEMESTRAL", 7.25, 3.7, 2.3);
    footer(s);
    s.addNotes("Grillas y ejes en Soft Stone finos, etiquetas Muted Ink. Nunca coloques ornamentos detrás de datos.");
  }

  /* ---- 10. Gráfica de línea + dona ---- */
  {
    const s = slideNew(WAX);
    header(s, "TENDENCIAS Y DISTRIBUCIÓN", "Línea y dona");
    s.addChart(pres.charts.LINE, [
      { name: "Parejas activas", labels: ["Q1 25", "Q2 25", "Q3 25", "Q4 25", "Q1 26", "Q2 26"], values: [420, 610, 890, 1240, 1710, 2320] },
      { name: "Proveedores", labels: ["Q1 25", "Q2 25", "Q3 25", "Q4 25", "Q1 26", "Q2 26"], values: [80, 120, 175, 240, 335, 470] },
    ], {
      x: M, y: 1.5, w: 5.4, h: 3.4, lineSize: 2.5, lineSmooth: true, chartColors: [TEAL, TAUPE],
      catAxisLabelColor: INK2, valAxisLabelColor: INK2, catAxisLabelFontSize: 9.5, valAxisLabelFontSize: 9.5,
      valGridLine: { color: STONE, size: 0.5 }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "b", legendColor: INK2, legendFontSize: 10,
      valAxisLineColor: STONE, catAxisLineColor: STONE,
    });
    s.addChart(pres.charts.DOUGHNUT, [
      { name: "Mix", labels: ["Venues", "Foto y video", "Banquete", "Otros"], values: [34, 26, 22, 18] },
    ], {
      x: 6.15, y: 1.5, w: 3.35, h: 3.4, chartColors: [TEAL, DUSK, TAUPE, STONE],
      showLegend: true, legendPos: "b", legendColor: INK2, legendFontSize: 10,
      showPercent: false, holeSize: 60,
    });
    footer(s);
    s.addNotes("Rampa de gráficas: Teal → Future Dusk → Taupe → Butter → Clavel → Soft Stone.");
  }

  /* ---- 11. Tabla ---- */
  {
    const s = slideNew(WAX);
    header(s, "DETALLE", "Tabla de datos");
    const th = { fill: { color: MIST }, color: DUSK, bold: true, fontFace: I, fontSize: 11, valign: "middle" };
    const td = { color: DUSK, fontFace: I, fontSize: 10.5, valign: "middle" };
    const tm = { color: INK2, fontFace: I, fontSize: 10.5, valign: "middle" };
    s.addTable([
      [{ text: "Concepto", options: th }, { text: "Responsable", options: th }, { text: "Fecha", options: th }, { text: "Monto", options: th }, { text: "Estado", options: th }],
      [{ text: "Anticipo del venue", options: td }, { text: "María R.", options: tm }, { text: "15 jul 2026", options: tm }, { text: "$45,000 MXN", options: td }, { text: "Pagado", options: { ...td, color: TEAL, bold: true } }],
      [{ text: "Banquete (2ª exhibición)", options: td }, { text: "Carlos V.", options: tm }, { text: "01 ago 2026", options: tm }, { text: "$60,000 MXN", options: td }, { text: "Cerca del límite", options: { ...td, color: WARN, bold: true } }],
      [{ text: "Fotografía y video", options: td }, { text: "María R.", options: tm }, { text: "20 ago 2026", options: tm }, { text: "$38,000 MXN", options: td }, { text: "Pendiente", options: tm }],
      [{ text: "Música en vivo", options: td }, { text: "Carlos V.", options: tm }, { text: "05 sep 2026", options: tm }, { text: "$52,000 MXN", options: td }, { text: "Excedido", options: { ...td, color: ERR, bold: true } }],
    ], { x: M, y: 1.5, w: CW, colW: [2.9, 1.5, 1.4, 1.6, 1.6], border: { pt: 0.75, color: STONE }, rowH: 0.42, margin: 0.08 });
    s.addText("Encabezado en Warm Mist, bordes Soft Stone de 0.75pt. Estados con colores funcionales: Teal, Warning y Error.",
      { x: M, y: 4.2, w: CW, h: 0.4, fontFace: I, fontSize: 10, color: INK2, margin: 0 });
    footer(s);
    s.addNotes("Plantilla de tabla. Duplica filas según necesites; conserva la semántica de color en la columna de estado.");
  }

  /* ---- 12. Timeline ---- */
  {
    const s = slideNew(WAX);
    header(s, "PROCESO", "Línea de tiempo");
    const steps = [
      ["1", "Descubrimiento", "Kickoff, alcance y metas", "jul 2026"],
      ["2", "Diseño", "Prototipos y validación", "ago 2026"],
      ["3", "Implementación", "Desarrollo por sprints", "sep–oct 2026"],
      ["4", "Lanzamiento", "Go-live y medición", "nov 2026"],
    ];
    const y0 = 2.5;
    s.addShape(pres.shapes.LINE, { x: M + 0.4, y: y0, w: CW - 0.8, h: 0, line: { color: STONE, width: 1.25 } });
    steps.forEach((st, i) => {
      const w = CW / 4, cx = M + w * i + w / 2;
      s.addShape(pres.shapes.OVAL, { x: cx - 0.19, y: y0 - 0.19, w: 0.38, h: 0.38, fill: { color: i < 2 ? TEAL : WAX }, line: { color: i < 2 ? TEAL : STONE, width: 1.25 } });
      s.addText(st[0], { x: cx - 0.19, y: y0 - 0.19, w: 0.38, h: 0.38, fontFace: I, fontSize: 11, bold: true, color: i < 2 ? WAX : INK2, align: "center", valign: "middle", margin: 0 });
      eyebrow(s, st[3], cx - w / 2 + 0.1, y0 - 0.85, w - 0.2, { align: "center" });
      s.addText(st[1], { x: cx - w / 2 + 0.1, y: y0 + 0.42, w: w - 0.2, h: 0.32, fontFace: F, fontSize: 14.5, bold: true, color: DUSK, align: "center", margin: 0 });
      s.addText(st[2], { x: cx - w / 2 + 0.1, y: y0 + 0.78, w: w - 0.2, h: 0.6, fontFace: I, fontSize: 10, color: INK2, align: "center", margin: 0 });
    });
    footer(s);
    s.addNotes("Timeline horizontal. Nodos completados en Teal sólido; futuros en contorno Soft Stone.");
  }

  /* ---- 13. Cita (oscura) ---- */
  {
    const s = slideNew(DUSK);
    s.addText("“", { x: M - 0.05, y: 0.7, w: 1.4, h: 1.5, fontFace: F, fontSize: 110, bold: true, color: GOLD, margin: 0 });
    s.addText("Se sintió como tener un amigo pensante que resulta ser increíblemente organizado.",
      { x: 1.15, y: 1.75, w: 7.7, h: 1.8, fontFace: F, fontSize: 27, bold: true, color: WAX, margin: 0, lineSpacingMultiple: 1.2, italic: true });
    s.addShape(pres.shapes.LINE, { x: 1.15, y: 3.85, w: 0.55, h: 0, line: { color: GOLD, width: 1 } });
    s.addText("Ana & Diego — boda en Valle de Bravo, 2026", { x: 1.15, y: 3.98, w: 6.5, h: 0.35, fontFace: I, fontSize: 12, color: TAUPE, margin: 0 });
    footer(s, true);
    s.addNotes("Cita sobre Future Dusk con comilla Glow Spark discreta. También funciona sobre Warm Mist con texto Future Dusk.");
  }

  /* ================= SECCIÓN 02 — MANAGEMENT ================= */
  divider("02", "Gestión y equipos", "Rituales de operación: estado de proyectos, OKRs, presupuesto y equipo.", "dark",
    { data: orns.ribTealD, x: -0.8, y: 3.9, w: 12, h: 2.2 });

  /* ---- 15. Estado de proyecto (RAG) ---- */
  {
    const s = slideNew(WAX);
    header(s, "REVISIÓN SEMANAL", "Estado de proyectos");
    const rows = [
      ["Migración a la nueva app de proveedores", "Equipo Plataforma", "En curso · sprint 14 de 16", "success", "En tiempo"],
      ["Lanzamiento del plan Pro para vendors", "Growth", "Pricing en validación con 12 cuentas", "warning", "En riesgo"],
      ["Integración de pagos (SPEI + tarjetas)", "Equipo Core", "Bloqueado por certificación bancaria", "error", "Bloqueado"],
      ["Programa de referidos de parejas", "Marketing", "Fase de diseño, kickoff 15 jul", "secondary", "Por iniciar"],
    ];
    rows.forEach((r, i) => {
      const y = 1.5 + i * 0.78;
      card(s, M, y, CW, 0.66);
      s.addText(r[0], { x: M + 0.25, y: y + 0.08, w: 4.3, h: 0.28, fontFace: I, fontSize: 12, bold: true, color: DUSK, margin: 0 });
      s.addText(r[1] + " · " + r[2], { x: M + 0.25, y: y + 0.36, w: 5.9, h: 0.24, fontFace: I, fontSize: 9.5, color: INK2, margin: 0 });
      badge(s, r[4], M + CW - 1.55, y + 0.19, r[3], 1.3);
    });
    footer(s);
    s.addNotes("Layout management: filas-tarjeta con badge de estado RAG (Teal/Warning/Error al 15%). Máximo 5 filas por slide.");
  }

  /* ---- 16. OKRs ---- */
  {
    const s = slideNew(WAX);
    header(s, "Q3 2026", "OKRs del trimestre");
    const okrs = [
      ["O1 · Ser la herramienta default de planeación en CDMX", "2,500 parejas activas", 0.72, "1,800 / 2,500"],
      ["O2 · Monetizar la red de proveedores", "$4.2M MXN en ingresos por leads", 0.55, "$2.3M / $4.2M"],
      ["O3 · Excelencia operativa", "NPS ≥ 60 en ambos lados del marketplace", 0.87, "NPS 52 → 58"],
    ];
    okrs.forEach((o, i) => {
      const y = 1.55 + i * 0.95;
      s.addText(o[0], { x: M, y, w: 5.6, h: 0.3, fontFace: I, fontSize: 12.5, bold: true, color: DUSK, margin: 0 });
      s.addText("KR: " + o[1], { x: M, y: y + 0.3, w: 5.6, h: 0.26, fontFace: I, fontSize: 10, color: INK2, margin: 0 });
      const bx = 6.5, bw = 2.4;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: y + 0.12, w: bw, h: 0.2, rectRadius: 0.1, fill: { color: MIST }, line: { color: STONE, width: 0.75 } });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: y + 0.12, w: Math.max(bw * o[2], 0.2), h: 0.2, rectRadius: 0.1, fill: { color: TEAL }, line: { type: "none" } });
      s.addText(o[3], { x: bx, y: y + 0.38, w: bw, h: 0.22, fontFace: I, fontSize: 9, color: INK2, margin: 0 });
      s.addText(Math.round(o[2] * 100) + "%", { x: bx + bw + 0.12, y: y + 0.02, w: 0.85, h: 0.4, fontFace: F, fontSize: 17, bold: true, color: TEAL, margin: 0, valign: "middle" });
      if (i < 2) s.addShape(pres.shapes.LINE, { x: M, y: y + 0.78, w: CW, h: 0, line: { color: STONE, width: 0.75 } });
    });
    footer(s);
    s.addNotes("OKRs con barras de progreso: pista Warm Mist con borde Soft Stone, relleno Teal. Porcentaje en Fraunces.");
  }

  /* ---- 17. Presupuesto ---- */
  {
    const s = slideNew(WAX);
    header(s, "FINANZAS OPERATIVAS", "Presupuesto vs. real");
    s.addChart(pres.charts.BAR, [
      { name: "Presupuesto", labels: ["Producto", "Marketing", "Ventas", "Operación", "Alianzas"], values: [980, 620, 450, 380, 210] },
      { name: "Real", labels: ["Producto", "Marketing", "Ventas", "Operación", "Alianzas"], values: [910, 700, 405, 372, 188] },
    ], {
      x: M, y: 1.45, w: 6.3, h: 3.45, barDir: "col", chartColors: [STONE, TEAL],
      catAxisLabelColor: INK2, valAxisLabelColor: INK2, catAxisLabelFontSize: 9.5, valAxisLabelFontSize: 9.5,
      valGridLine: { color: STONE, size: 0.5 }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "b", legendColor: INK2, legendFontSize: 10,
      valAxisLineColor: STONE, catAxisLineColor: STONE, valAxisTitle: "Miles MXN",
    });
    card(s, 7.1, 1.5, 2.45, 1.55, { fill: MIST, line: false });
    eyebrow(s, "ALERTA", 7.32, 1.7, 2.0);
    s.addText("Marketing +13% sobre presupuesto", { x: 7.32, y: 1.98, w: 2.05, h: 0.6, fontFace: I, fontSize: 11.5, bold: true, color: WARN, margin: 0 });
    s.addText("Reasignación propuesta desde Alianzas.", { x: 7.32, y: 2.58, w: 2.05, h: 0.42, fontFace: I, fontSize: 9.5, color: INK2, margin: 0 });
    s.addText("−3.1%", { x: 7.1, y: 3.35, w: 2.45, h: 0.65, fontFace: F, fontSize: 30, bold: true, color: TEAL, margin: 0, align: "center" });
    eyebrow(s, "GASTO TOTAL VS PLAN", 7.1, 4.02, 2.45, { align: "center" });
    footer(s);
    s.addNotes("Presupuesto vs real. La semántica Warning se usa solo en el texto de alerta, nunca como decoración.");
  }

  /* ---- 18. Equipo ---- */
  {
    const s = slideNew(WAX);
    header(s, "QUIÉNES SOMOS", "Equipo responsable");
    const team = [
      ["FR", "Fernanda Ríos", "Dirección", "Estrategia y alianzas clave"],
      ["JM", "Julián Mora", "Producto", "Roadmap y experiencia de pareja"],
      ["SC", "Sofía Cantú", "Comercial", "Red de proveedores y ventas"],
      ["AL", "Andrés Luna", "Tecnología", "Plataforma, datos y seguridad"],
    ];
    team.forEach((t, i) => {
      const w = (CW - 0.75) / 4, x = M + i * (w + 0.25);
      card(s, x, 1.5, w, 2.6);
      s.addShape(pres.shapes.OVAL, { x: x + w / 2 - 0.4, y: 1.8, w: 0.8, h: 0.8, fill: { color: DUSK }, line: { type: "none" } });
      s.addText(t[0], { x: x + w / 2 - 0.4, y: 1.8, w: 0.8, h: 0.8, fontFace: F, fontSize: 18, bold: true, color: WAX, align: "center", valign: "middle", margin: 0 });
      s.addText(t[1], { x: x + 0.1, y: 2.75, w: w - 0.2, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: DUSK, align: "center", margin: 0 });
      eyebrow(s, t[2], x + 0.1, 3.07, w - 0.2, { align: "center", color: TEAL });
      s.addText(t[3], { x: x + 0.14, y: 3.38, w: w - 0.28, h: 0.6, fontFace: I, fontSize: 9.5, color: INK2, align: "center", margin: 0 });
    });
    footer(s);
    s.addNotes("Tarjetas de equipo: avatar de iniciales sobre Future Dusk (sustituir por foto circular). Rol en eyebrow Teal.");
  }

  /* ================= SECCIÓN 03 — C-SUITE ================= */
  divider("03", "Dirección ejecutiva", "Board updates: resumen, finanzas, riesgos y estrategia.", "mist",
    { data: orns.blobTeal, x: 7.2, y: -1.4, w: 4.6, h: 4.6 });

  /* ---- 20. Resumen ejecutivo ---- */
  {
    const s = slideNew(WAX);
    header(s, "BOARD UPDATE · Q2 2026", "Resumen ejecutivo");
    const kpis = [["$2.3M", "ingresos MXN", "+38% QoQ"], ["1,800", "parejas activas", "+29% QoQ"], ["470", "proveedores pro", "+40% QoQ"]];
    kpis.forEach((k, i) => {
      const w = 2.05, x = M + i * (w + 0.2);
      s.addText(k[0], { x, y: 1.55, w, h: 0.75, fontFace: F, fontSize: 34, bold: true, color: TEAL, margin: 0 });
      eyebrow(s, k[1], x, 2.32, w);
      s.addText(k[2], { x, y: 2.56, w, h: 0.26, fontFace: I, fontSize: 10.5, bold: true, color: DUSK, margin: 0 });
    });
    s.addShape(pres.shapes.LINE, { x: M, y: 3.05, w: CW, h: 0, line: { color: STONE, width: 0.75 } });
    s.addText([
      { text: "Lo esencial: ", options: { bold: true } },
      { text: "el marketplace alcanzó ingreso positivo por cohorte en mayo. La prioridad del Q3 es escalar la oferta de proveedores en Guadalajara y Monterrey sin degradar la calidad de leads.", options: {} },
    ], { x: M, y: 3.25, w: 6.1, h: 1.5, fontFace: I, fontSize: 12, color: DUSK, margin: 0, lineSpacingMultiple: 1.3 });
    card(s, 6.95, 3.25, 2.55, 1.5, { fill: MIST, line: false });
    eyebrow(s, "DECISIÓN SOLICITADA", 7.15, 3.45, 2.2);
    s.addText("Aprobar $6M MXN para expansión regional.", { x: 7.15, y: 3.73, w: 2.2, h: 0.85, fontFace: I, fontSize: 11, bold: true, color: DUSK, margin: 0 });
    footer(s);
    s.addNotes("Una slide, una decisión. KPIs arriba, narrativa breve y tarjeta con la decisión solicitada al consejo.");
  }

  /* ---- 21. Finanzas ---- */
  {
    const s = slideNew(WAX);
    header(s, "P&L SIMPLIFICADO", "Trayectoria financiera");
    s.addChart(pres.charts.BAR, [
      { name: "Ingresos", labels: ["Q3 25", "Q4 25", "Q1 26", "Q2 26", "Q3 26e", "Q4 26e"], values: [0.8, 1.2, 1.7, 2.3, 3.1, 4.2] },
      { name: "Gasto operativo", labels: ["Q3 25", "Q4 25", "Q1 26", "Q2 26", "Q3 26e", "Q4 26e"], values: [1.5, 1.7, 1.9, 2.1, 2.4, 2.7] },
    ], {
      x: M, y: 1.45, w: 6.35, h: 3.45, barDir: "col", chartColors: [TEAL, DUSK],
      catAxisLabelColor: INK2, valAxisLabelColor: INK2, catAxisLabelFontSize: 9.5, valAxisLabelFontSize: 9.5,
      valGridLine: { color: STONE, size: 0.5 }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "b", legendColor: INK2, legendFontSize: 10,
      valAxisLineColor: STONE, catAxisLineColor: STONE, valAxisTitle: "Millones MXN",
    });
    eyebrow(s, "PUNTO DE EQUILIBRIO", 7.2, 1.7, 2.3);
    s.addText("Q4 2026", { x: 7.2, y: 1.98, w: 2.3, h: 0.7, fontFace: F, fontSize: 32, bold: true, color: DUSK, margin: 0 });
    s.addText("Con el plan de expansión aprobado y CAC estable en $410 MXN por proveedor.", { x: 7.2, y: 2.75, w: 2.3, h: 1.0, fontFace: I, fontSize: 10.5, color: INK2, margin: 0, lineSpacingMultiple: 1.3 });
    s.addText("18 meses", { x: 7.2, y: 3.8, w: 2.3, h: 0.45, fontFace: F, fontSize: 20, bold: true, color: TEAL, margin: 0 });
    eyebrow(s, "RUNWAY ACTUAL", 7.2, 4.28, 2.3);
    footer(s);
    s.addNotes("Ingresos en Teal (serie clave), gasto en Future Dusk. Cifras 'e' = estimadas.");
  }

  /* ---- 22. Riesgos ---- */
  {
    const s = slideNew(WAX);
    header(s, "GOBIERNO CORPORATIVO", "Riesgos y mitigación");
    const risks = [
      ["Concentración en CDMX", "El 68% del ingreso proviene de una sola plaza.", "Expansión GDL/MTY en Q3; meta 45% para Q2 2027.", "warning", "Medio"],
      ["Dependencia de leads pagados", "Un solo modelo de monetización activo.", "Plan Pro por suscripción en pilotaje con 12 vendors.", "warning", "Medio"],
      ["Certificación de pagos", "Bloqueo regulatorio en integración SPEI.", "Proveedor alterno contratado; ETA 30 días.", "error", "Alto"],
      ["Retención de talento clave", "Equipo senior pequeño y muy demandado.", "Plan de equity refresh aprobado por el comité.", "success", "Bajo"],
    ];
    risks.forEach((r, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const w = (CW - 0.25) / 2, x = M + col * (w + 0.25), y = 1.5 + row * 1.62;
      card(s, x, y, w, 1.45);
      s.addText(r[0], { x: x + 0.22, y: y + 0.14, w: w - 1.55, h: 0.3, fontFace: I, fontSize: 12, bold: true, color: DUSK, margin: 0 });
      badge(s, r[4], x + w - 1.12, y + 0.16, r[3], 0.9);
      s.addText(r[1], { x: x + 0.22, y: y + 0.48, w: w - 0.44, h: 0.4, fontFace: I, fontSize: 9.5, color: INK2, margin: 0 });
      s.addText([{ text: "Mitigación: ", options: { bold: true, color: TEAL } }, { text: r[2], options: { color: DUSK } }],
        { x: x + 0.22, y: y + 0.9, w: w - 0.44, h: 0.48, fontFace: I, fontSize: 9.5, margin: 0 });
    });
    footer(s);
    s.addNotes("Matriz de riesgos 2×2 con badges de severidad. La mitigación siempre en Teal para señalar acción.");
  }

  /* ---- 23. Roadmap estratégico ---- */
  {
    const s = slideNew(WAX);
    header(s, "36 MESES", "Roadmap estratégico");
    const phases = [
      ["2026 · Consolidar", ["Liderazgo en CDMX", "Punto de equilibrio", "NPS 60+"], TEAL],
      ["2027 · Expandir", ["Top 5 plazas de México", "Plan Pro para vendors", "App móvil nativa"], DUSK],
      ["2028 · Diversificar", ["Eventos sociales (XV, corporativos)", "Financiamiento embebido", "Serie B"], "4B2A2A"],
    ];
    phases.forEach((p, i) => {
      const w = (CW - 0.5) / 3, x = M + i * (w + 0.25);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.5, w, h: 0.5, rectRadius: 0.08, fill: { color: p[2] }, line: { type: "none" } });
      s.addText(p[0], { x, y: 1.5, w, h: 0.5, fontFace: I, fontSize: 12.5, bold: true, color: WAX, align: "center", valign: "middle", margin: 0 });
      card(s, x, 2.15, w, 2.15);
      s.addText(p[1].map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: j < p[1].length - 1, paraSpaceAfter: 8 } })),
        { x: x + 0.22, y: 2.38, w: w - 0.44, h: 1.75, fontFace: I, fontSize: 11, color: DUSK, margin: 0, lineSpacingMultiple: 1.15 });
    });
    footer(s);
    s.addNotes("Horizontes estratégicos en tres columnas. Cabeceras con la rampa Teal → Dusk → Taupe.");
  }

  /* ================= SECCIÓN 04 — CLIENTES ================= */
  divider("04", "Clientes", "Materiales de cara a parejas: propuesta de valor, historias y paquetes.", "mist",
    { data: orns.archButter, x: -1.1, y: 2.2, w: 4.2, h: 4.2 });

  /* ---- 25. Propuesta de valor ---- */
  {
    const s = slideNew(WAX);
    header(s, "PARA PAREJAS", "Por qué OPHIRA");
    const feats = [
      [ic.eye, "El siguiente paso, visible", "Cada semana sabes exactamente qué decidir y qué puede esperar. Sin listas infinitas."],
      [ic.lock, "Privacidad desde el primer dato", "Los proveedores solo te contactan cuando tú lo decides. Cero llamadas no pedidas."],
      [ic.heart, "Gratis para la pareja", "La plataforma completa sin costo: checklist, invitados, presupuesto y mesas."],
    ];
    feats.forEach((f, i) => {
      const y = 1.55 + i * 1.02;
      s.addShape(pres.shapes.OVAL, { x: M, y: y, w: 0.62, h: 0.62, fill: { color: TEAL15 }, line: { type: "none" } });
      s.addImage({ data: f[0], x: M + 0.16, y: y + 0.16, w: 0.3, h: 0.3 });
      s.addText(f[1], { x: M + 0.9, y: y + 0.0, w: 5.4, h: 0.32, fontFace: F, fontSize: 15.5, bold: true, color: DUSK, margin: 0 });
      s.addText(f[2], { x: M + 0.9, y: y + 0.34, w: 5.6, h: 0.55, fontFace: I, fontSize: 11, color: INK2, margin: 0, lineSpacingMultiple: 1.2 });
    });
    card(s, 7.15, 1.55, 2.35, 2.95, { fill: MIST, line: false });
    s.addText("9 de 10", { x: 7.15, y: 2.0, w: 2.35, h: 0.7, fontFace: F, fontSize: 30, bold: true, color: TEAL, align: "center", margin: 0 });
    eyebrow(s, "PAREJAS RECOMIENDAN OPHIRA", 7.35, 2.78, 1.95, { align: "center" });
    s.addText("Encuesta post-boda, n=214, 2026", { x: 7.35, y: 3.45, w: 1.95, h: 0.5, fontFace: I, fontSize: 9, color: INK2, align: "center", margin: 0 });
    footer(s);
    s.addNotes("Filas ícono + texto (ícono lineal Teal en círculo Teal 15%). Tarjeta lateral con prueba social.");
  }

  /* ---- 26. Caso de éxito (celebración Butter) ---- */
  {
    const s = slideNew(WAX);
    s.addImage({ data: orns.blobButter, x: -1.7, y: -1.7, w: 4.6, h: 4.6 });
    eyebrow(s, "CASO DE ÉXITO · CELEBRACIÓN", M, 0.9, 6);
    s.addText("Ana & Diego: 180 invitados,\ncero hojas de cálculo.", { x: M, y: 1.2, w: 6.4, h: 1.5, fontFace: F, fontSize: 28, bold: true, color: DUSK, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText("Planearon su boda en Valle de Bravo en 9 meses usando solo OPHIRA: checklist, presupuesto, RSVP y acomodo de mesas. Contrataron 8 proveedores dentro de la plataforma.",
      { x: M, y: 2.8, w: 5.6, h: 1.1, fontFace: I, fontSize: 12, color: DUSK, margin: 0, lineSpacingMultiple: 1.35 });
    const stats = [["9", "meses de planeación"], ["8", "proveedores contratados"], ["100%", "RSVP digital"]];
    stats.forEach((st, i) => {
      const x = M + i * 2.0;
      s.addText(st[0], { x, y: 4.0, w: 1.8, h: 0.6, fontFace: F, fontSize: 30, bold: true, color: TEAL, margin: 0 });
      eyebrow(s, st[1], x, 4.62, 1.8);
    });
    card(s, 6.7, 2.2, 2.8, 2.5, { fill: DUSK, line: false, shadow: true });
    s.addText("“Nunca sentimos que se nos escapaba nada.”", { x: 6.95, y: 2.5, w: 2.3, h: 1.2, fontFace: F, fontSize: 15, bold: true, italic: true, color: WAX, margin: 0, lineSpacingMultiple: 1.25 });
    s.addText("— Ana G., julio 2026", { x: 6.95, y: 4.05, w: 2.3, h: 0.3, fontFace: I, fontSize: 10, color: TAUPE, margin: 0 });
    footer(s);
    s.addNotes("Slide de celebración: único lugar donde el lavado Butter (18%) es protagonista. Tarjeta de cita en Future Dusk.");
  }

  /* ---- 27. Paquetes ---- */
  {
    const s = slideNew(WAX);
    header(s, "PARA PROVEEDORES", "Paquetes y precios");
    const plans = [
      ["Básico", "$0", "para siempre", ["Perfil público verificado", "3 leads de cortesía al mes", "Mensajería con parejas"], "outline", false],
      ["Pro", "$1,490", "MXN / mes", ["Leads calificados ilimitados", "Posicionamiento en búsquedas", "Estadísticas de conversión", "Insignia de proveedor Pro"], "primary", true],
      ["Estudio", "$3,900", "MXN / mes", ["Todo lo de Pro", "Hasta 5 marcas / sedes", "Gerente de cuenta dedicado"], "outline", false],
    ];
    plans.forEach((p, i) => {
      const w = (CW - 0.5) / 3, x = M + i * (w + 0.25), hi = p[5];
      card(s, x, 1.42, w, 3.35, hi ? { fill: DUSK, line: false, shadow: true } : {});
      const tc = hi ? WAX : DUSK, sc = hi ? TAUPE : INK2;
      s.addText(p[0], { x: x + 0.24, y: 1.62, w: w - 0.48, h: 0.3, fontFace: F, fontSize: 15, bold: true, color: tc, margin: 0 });
      s.addText([{ text: p[1], options: { fontSize: 26, bold: true, color: hi ? "7FC5CC" : TEAL } }, { text: "  " + p[2], options: { fontSize: 10, color: sc } }],
        { x: x + 0.24, y: 1.95, w: w - 0.48, h: 0.5, fontFace: F, margin: 0 });
      s.addText(p[3].map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 9 }, breakLine: j < p[3].length - 1, paraSpaceAfter: 6 } })),
        { x: x + 0.24, y: 2.55, w: w - 0.48, h: 1.45, fontFace: I, fontSize: 9.5, color: hi ? WAX : DUSK, margin: 0 });
      ctaPill(s, hi ? "Empezar ahora" : "Saber más", x + 0.24, 4.18, w - 0.48, hi ? "primary" : "outline");
    });
    footer(s);
    s.addNotes("Pricing de 3 columnas; el plan destacado usa tarjeta Future Dusk con CTA Teal. Los CTA siempre son Teal, nunca Butter/Clavel.");
  }

  /* ================= SECCIÓN 05 — PROVEEDORES ================= */
  divider("05", "Proveedores", "Pitch a vendors: cómo funciona el modelo de leads y la alianza.", "dark",
    { data: orns.archStoneD, x: 7.4, y: 2.3, w: 4.1, h: 4.1 });

  /* ---- 29. Funnel de leads ---- */
  {
    const s = slideNew(WAX);
    header(s, "MODELO DE LEADS", "Del interés al contrato");
    const stages = [
      ["Parejas activas buscando tu categoría", "2,320", 8.6],
      ["Solicitudes de información enviadas", "1,140", 6.8],
      ["Leads calificados entregados", "486", 5.0],
      ["Contratos cerrados", "141", 3.7],
    ];
    stages.forEach((st, i) => {
      const y = 1.5 + i * 0.82, w = st[2], x = M;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.64, rectRadius: 0.09, fill: { color: i === 2 ? TEAL : (i === 3 ? DUSK : MIST) }, line: i < 2 ? { color: STONE, width: 1 } : { type: "none" } });
      s.addText(st[0], { x: x + 0.24, y, w: w - 1.5, h: 0.64, fontFace: I, fontSize: 11.5, bold: i >= 2, color: i >= 2 ? WAX : DUSK, valign: "middle", margin: 0 });
      s.addText(st[1], { x: x + w - 1.3, y, w: 1.05, h: 0.64, fontFace: F, fontSize: 19, bold: true, color: i >= 2 ? WAX : DUSK, align: "right", valign: "middle", margin: 0 });
    });
    s.addText("29%", { x: 7.35, y: 2.6, w: 2.1, h: 0.7, fontFace: F, fontSize: 38, bold: true, color: TEAL, margin: 0, align: "center" });
    eyebrow(s, "CONVERSIÓN LEAD → CONTRATO", 7.3, 3.32, 2.2, { align: "center" });
    s.addText("Solo pagas por leads calificados. Sin comisiones sobre el contrato.", { x: 7.35, y: 3.75, w: 2.1, h: 0.8, fontFace: I, fontSize: 10, color: INK2, align: "center", margin: 0 });
    footer(s);
    s.addNotes("Funnel horizontal: etapas neutras en Warm Mist, el lead calificado (producto que se vende) en Teal, el cierre en Dusk.");
  }

  /* ---- 30. Alianza / condiciones ---- */
  {
    const s = slideNew(WAX);
    header(s, "ALIANZA COMERCIAL", "Cómo trabajamos juntos");
    const left = [
      [ic.check, "Leads verificados", "Cada lead incluye fecha, sede tentativa, presupuesto y nivel de intención."],
      [ic.clock, "Respuesta en 24 h", "Los leads no respondidos en 24 horas se reasignan; la velocidad protege tu conversión."],
      [ic.star, "Reputación bilateral", "Parejas y proveedores se califican; el ranking premia el buen servicio, no el gasto."],
    ];
    left.forEach((f, i) => {
      const y = 1.55 + i * 1.0;
      s.addShape(pres.shapes.OVAL, { x: M, y, w: 0.62, h: 0.62, fill: { color: TEAL15 }, line: { type: "none" } });
      s.addImage({ data: f[0], x: M + 0.16, y: y + 0.16, w: 0.3, h: 0.3 });
      s.addText(f[1], { x: M + 0.9, y: y, w: 4.6, h: 0.3, fontFace: F, fontSize: 14.5, bold: true, color: DUSK, margin: 0 });
      s.addText(f[2], { x: M + 0.9, y: y + 0.32, w: 4.8, h: 0.6, fontFace: I, fontSize: 10.5, color: INK2, margin: 0, lineSpacingMultiple: 1.2 });
    });
    card(s, 6.75, 1.55, 2.75, 3.0);
    eyebrow(s, "CONDICIONES CLAVE", 7.0, 1.8, 2.3);
    const terms = [["Permanencia", "Sin plazo"], ["Facturación", "CFDI 4.0"], ["Exclusividad", "No requerida"], ["Soporte", "L–S · 9–19 h"]];
    terms.forEach((t, i) => {
      const y = 2.14 + i * 0.56;
      s.addText(t[0], { x: 7.0, y, w: 1.25, h: 0.3, fontFace: I, fontSize: 10, color: INK2, margin: 0 });
      s.addText(t[1], { x: 8.15, y, w: 1.2, h: 0.42, fontFace: I, fontSize: 10, bold: true, color: DUSK, margin: 0 });
      if (i < 3) s.addShape(pres.shapes.LINE, { x: 7.0, y: y + 0.44, w: 2.3, h: 0, line: { color: STONE, width: 0.75 } });
    });
    footer(s);
    s.addNotes("Pitch a proveedores: beneficios con íconos + tarjeta de condiciones tipo ficha técnica.");
  }

  /* ================= CIERRE ================= */
  {
    const s = slideNew(DUSK);
    s.addImage({ data: orns.ribTealD, x: -0.9, y: 3.75, w: 12.2, h: 2.3 });
    eyebrow(s, "GRACIAS", M, 1.15, 6, { color: TAUPE });
    s.addText([
      { text: "Menos ruido, ", options: { color: WAX } },
      { text: "más claridad.", options: { color: "7FC5CC" } },
    ], { x: M, y: 1.45, w: 8.6, h: 1.0, fontFace: F, fontSize: 38, bold: true, margin: 0 });
    s.addText("Hablemos del siguiente paso.", { x: M, y: 2.55, w: 6.5, h: 0.4, fontFace: I, fontSize: 14, color: TAUPE, margin: 0 });
    ctaPill(s, "Agenda una demo", M, 3.15, 2.2, "primary");
    s.addImage({ data: ic.mail, x: 3.05, y: 3.27, w: 0.2, h: 0.2 });
    s.addText("hola@ophira.mx", { x: 3.33, y: 3.15, w: 2.0, h: 0.44, fontFace: I, fontSize: 11.5, color: WAX, valign: "middle", margin: 0 });
    s.addImage({ data: ic.globe, x: 5.45, y: 3.27, w: 0.2, h: 0.2 });
    s.addText("ophira.mx", { x: 5.73, y: 3.15, w: 1.6, h: 0.44, fontFace: I, fontSize: 11.5, color: WAX, valign: "middle", margin: 0 });
    wordmark(s, M, H - 0.62, true);
    s.addText("Hecho en México, para parejas mexicanas.", { x: W - M - 3.6, y: H - 0.60, w: 3.6, h: 0.3, fontFace: I, fontSize: 10, color: TAUPE, align: "right", margin: 0 });
    s.addNotes("Cierre/CTA sobre Future Dusk con ornamento ribbon Teal. Botón primario siempre Teal.");
    pageNum++; pageNum--;
  }

  /* ================= ANEXO — GUÍA RÁPIDA ================= */
  {
    const s = slideNew(WAX);
    header(s, "ANEXO", "Guía rápida del sistema");
    const chips = [
      ["Wax Paper", WAX, DUSK, true], ["Future Dusk", DUSK, WAX, false], ["Teal", TEAL, WAX, false],
      ["Warm Mist", MIST, DUSK, true], ["Soft Stone", STONE, DUSK, false], ["Muted Ink", INK2, WAX, false],
      ["Glow Spark", GOLD, DUSK, false], ["Butter (deco)", BUTTER, DUSK, false], ["Clavel (deco)", CLAVEL, WAX, false],
    ];
    chips.forEach((c, i) => {
      const w = 0.94, x = M + i * (w + 0.06);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.5, w, h: 0.7, rectRadius: 0.07, fill: { color: c[1] }, line: c[3] ? { color: STONE, width: 1 } : { type: "none" } });
      s.addText(c[0], { x: x - 0.03, y: 2.24, w: w + 0.06, h: 0.42, fontFace: I, fontSize: 7.5, color: INK2, align: "center", margin: 0 });
    });
    s.addShape(pres.shapes.LINE, { x: M, y: 2.78, w: CW, h: 0, line: { color: STONE, width: 0.75 } });
    s.addText("Fraunces SemiBold — títulos y números hero", { x: M, y: 2.95, w: 5.9, h: 0.42, fontFace: F, fontSize: 16, bold: true, color: DUSK, margin: 0 });
    s.addText("Inter — cuerpo, etiquetas, tablas y botones. Eyebrows en MAYÚSCULAS con tracking amplio.", { x: M, y: 3.48, w: 5.9, h: 0.4, fontFace: I, fontSize: 11, color: DUSK, margin: 0 });
    eyebrow(s, "ASÍ SE VE UN EYEBROW · MUTED INK", M, 3.92, 5.5);
    const rules = ["Regla 70 / 20 / 10: papel, estructura, acento.", "Máx. un ornamento por slide; nunca sobre datos.", "Butter y Clavel jamás como texto ni CTA.", "CTAs siempre en Teal."];
    s.addText(rules.map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 9 }, breakLine: j < rules.length - 1, paraSpaceAfter: 5 } })),
      { x: 6.7, y: 2.95, w: 2.85, h: 1.6, fontFace: I, fontSize: 9.5, color: DUSK, margin: 0 });
    badge(s, "Éxito", M, 4.55, "success", 0.95);
    badge(s, "Advertencia", M + 1.1, 4.55, "warning", 1.15);
    badge(s, "Error", M + 2.4, 4.55, "error", 0.95);
    badge(s, "Neutro", M + 3.5, 4.55, "secondary", 0.95);
    ctaPill(s, "Botón primario", 5.0, 4.5, 1.7, "primary");
    ctaPill(s, "Secundario", 6.85, 4.5, 1.45, "secondary");
    footer(s);
    s.addNotes("Cheat-sheet del sistema para quien edite la plantilla: paleta, tipografía, badges, botones y reglas duras.");
  }

  await pres.writeFile({ fileName: "OPHIRA_Plantilla_Corporativa.pptx" });
  console.log("done:", pageNum, "slides");
})().catch((e) => { console.error(e); process.exit(1); });
