/**
 * OPHIRA deck helpers — brand tokens + slide primitives for pptxgenjs.
 *
 * Usage:
 *   const { buildContext, T } = require("./ophira_helpers");
 *   (async () => {
 *     const ctx = await buildContext();     // { pres, T, orns, icon, h }
 *     const { pres, T, orns, h } = ctx;
 *     const s = h.slideNew(T.WAX);
 *     h.header(s, "EYEBROW TEXT", "Título de la slide");
 *     h.footer(s);
 *     await pres.writeFile({ fileName: "deck.pptx" });
 *   })();
 *
 * API (all on ctx.h unless noted):
 *   slideNew(bgHex) -> slide                 new slide, tracks page number
 *   footer(slide, dark=false)                wordmark + page number
 *   eyebrow(slide, text, x, y, w, {color, align})
 *   h2(slide, text, x, y, w, {color, divider})
 *   header(slide, eyebrowText, title)        standard top block at margin
 *   card(slide, x, y, w, h, {fill, line:false, lineColor, shadow})
 *   badge(slide, text, x, y, kind, w)        kind: default|secondary|outline|success|warning|error
 *   ctaPill(slide, text, x, y, w, variant)   variant: primary|secondary|outline (primary = Teal, always)
 *   logo(slide, {x, y, h, kind, variant})    official logo PNG; kind: horizontal|iso; variant: dusk|white|teal;
 *                                            width auto-computed from height. Use on covers/closings.
 *   wordmark(slide, x, y, dark=false, size)  text fallback only — prefer logo()
 *   divider(sectionNo, title, sub, style, ornament)  full section-divider slide; style: "mist"|"dark";
 *                                            ornament: {data, x, y, w, h} or null
 *   kpi(slide, value, label, x, y, w, color) hero number + gold hairline + eyebrow label
 *   chartDefaults(overrides)                 brand axis/grid/legend options for addChart
 *   cardShadow()                             fresh shadow object (never reuse shadow objects!)
 * ctx.orns: blobClavel, blobButter, blobTeal, archTeal, archStoneD, archButter,
 *           ribButter, ribClavel, ribTealD   (base64 PNGs for slide.addImage({data}))
 * ctx.icon(FeatherComponent, hexNoHash)      async -> base64 PNG (react-icons/fi = line style)
 * ctx.T / exported T: color tokens below.
 *
 * Layout constants: 16:9 => W=10, H=5.625, margin M=0.5, content width CW=9.
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

/* ---------- Official brand assets (bundled in ../assets/brand) ----------
 * logo_horizontal_dusk.png  — isologo horizontal Future Dusk, transparent (light bg)
 * logo_horizontal_white.png — isologo horizontal white, transparent (dark bg)
 * logo_horizontal_teal.png  — isologo horizontal Teal, transparent (light bg, accent moments)
 * iso_dusk.png / iso_white.png — square isotype (symbol only), footers/covers
 * Aspect ratios: horizontal = 3.615 (w/h), isotype = 1.0
 */
const LOGO_AR = 3.615;
const DEFAULT_BRAND_DIR = path.join(__dirname, "..", "assets", "brand");

/* ---------- Brand tokens (hex, no #) ---------- */
const T = {
  WAX: "FAF6EC",    // Wax Paper — primary background (70%)
  DUSK: "2A2A3E",   // Future Dusk — text/structure, dark slides (20%)
  TEAL: "00707B",   // Transformative Teal — CTAs, accents, key numbers (10%)
  MIST: "F2EBDB",   // Warm Mist — secondary surfaces, cards, bars
  STONE: "DCCFBA",  // Soft Stone — borders, dividers, grids
  INK2: "6E6875",   // Muted Ink — secondary text, footers, eyebrows
  DEEP: "1E1E2A",   // Deep Ink — brand black
  GOLD: "D4AF37",   // Glow Spark — premium hairlines only
  BUTTER: "F2CC5D", // decorative wash only (15–20%)
  CLAVEL: "E2725B", // decorative wash only (10–15%)
  WARN: "A46A2A",
  ERR: "7A2E2E",
  TAUPE: "B8A398",
  MOCHA: "4B2A2A",  // Cherry Mocha — warm dark accent (use instead of Taupe for filled headers)
  TEAL_LIGHT: "7FC5CC", // teal accent word on dark backgrounds
  /* 15% tints pre-blended over Wax Paper (badges) */
  TEAL15: "D4E2DB", WARN15: "EDE1CF", ERR15: "E7D8D0",
  F: "Fraunces", I: "Inter",
  RAMP: ["00707B", "2A2A3E", "B8A398", "F2CC5D", "E2725B", "DCCFBA"],
  W: 10, H: 5.625, M: 0.5, CW: 9,
};

/* ---------- Ornaments (official SVG paths -> PNG with alpha) ---------- */
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

async function buildContext(opts = {}) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "OPHIRA";

  const brandDir = opts.brandDir || DEFAULT_BRAND_DIR;
  const brand = {};
  for (const [key, file] of Object.entries({
    horizontalDusk: "logo_horizontal_dusk.png",
    horizontalWhite: "logo_horizontal_white.png",
    horizontalTeal: "logo_horizontal_teal.png",
    isoDusk: "iso_dusk.png",
    isoWhite: "iso_white.png",
  })) {
    const p = path.join(brandDir, file);
    if (fs.existsSync(p)) brand[key] = p;
  }
  const hasBrand = !!brand.horizontalDusk;

  /* one-per-slide, low-opacity, must bleed off canvas, never behind data */
  const orns = {
    blobClavel: await orn("blob", T.CLAVEL, 0.13),
    blobButter: await orn("blob", T.BUTTER, 0.18),
    blobTeal:   await orn("blob", T.TEAL, 0.10),
    archTeal:   await orn("arch", T.TEAL, 0.16),
    archStoneD: await orn("arch", T.STONE, 0.14),
    archButter: await orn("arch", T.BUTTER, 0.18),
    ribButter:  await orn("ribbon", T.BUTTER, 0.18),
    ribClavel:  await orn("ribbon", T.CLAVEL, 0.11),
    ribTealD:   await orn("ribbon", T.TEAL, 0.20),
  };

  const { W, H, M, CW, F, I } = T;
  let pageNum = 0;
  const cardShadow = () => ({ type: "outer", color: T.DUSK, blur: 12, offset: 3, angle: 90, opacity: 0.10 });

  const h = {
    cardShadow,
    slideNew(bg) {
      const s = pres.addSlide();
      s.background = { color: bg };
      pageNum++;
      return s;
    },
    pageNum: () => pageNum,
    footer(s, dark = false) {
      const c = dark ? T.TAUPE : T.INK2;
      /* spec §4: small isotype in a corner + page number, Muted Ink */
      const iso = dark ? brand.isoWhite : brand.isoDusk;
      if (iso) {
        s.addImage({ path: iso, x: M, y: H - 0.38, w: 0.26, h: 0.26, transparency: dark ? 25 : 35 });
      } else {
        s.addText("OPHIRA", { x: M, y: H - 0.34, w: 1.6, h: 0.22, fontFace: I, fontSize: 8.5, bold: true, charSpacing: 3, color: c, margin: 0 });
      }
      s.addText(String(pageNum).padStart(2, "0"), { x: W - M - 0.6, y: H - 0.34, w: 0.6, h: 0.22, fontFace: I, fontSize: 8.5, color: c, align: "right", margin: 0 });
    },
    /* Official logo. kind: "horizontal" | "iso"; variant: "dusk" | "white" | "teal".
     * Position by x,y and HEIGHT (width auto from aspect ratio). Respect clear space >= isotype height. */
    logo(s, { x, y, h: lh = 0.32, kind = "horizontal", variant = "dusk" } = {}) {
      const key = kind === "iso" ? (variant === "white" ? "isoWhite" : "isoDusk")
        : variant === "white" ? "horizontalWhite" : variant === "teal" ? "horizontalTeal" : "horizontalDusk";
      const p = brand[key];
      if (!p) { h.wordmark(s, x, y, variant === "white", Math.round(lh * 40)); return; }
      s.addImage({ path: p, x, y, w: kind === "iso" ? lh : lh * LOGO_AR, h: lh });
    },
    eyebrow(s, txt, x, y, w, opts = {}) {
      s.addText(txt.toUpperCase(), { x, y, w, h: 0.24, fontFace: I, fontSize: 10.5, charSpacing: 2.4, color: opts.color || T.INK2, margin: 0, align: opts.align || "left" });
    },
    h2(s, txt, x = M, y = 0.62, w = CW, opts = {}) {
      s.addText(txt, { x, y, w, h: 0.5, fontFace: I, fontSize: 23, bold: true, color: opts.color || T.DUSK, margin: 0 });
      if (opts.divider !== false) s.addShape(pres.shapes.LINE, { x, y: y + 0.58, w, h: 0, line: { color: T.STONE, width: 1 } });
    },
    header(s, eb, title, opts = {}) {
      h.eyebrow(s, eb, M, 0.34, CW, opts);
      h.h2(s, title, M, 0.62, CW, opts);
    },
    card(s, x, y, w, hh, opts = {}) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w, h: hh, rectRadius: 0.09,
        fill: { color: opts.fill || T.WAX },
        line: opts.line === false ? { type: "none" } : { color: opts.lineColor || T.STONE, width: 1 },
        shadow: opts.shadow ? cardShadow() : undefined,
      });
    },
    badge(s, txt, x, y, kind = "success", w = 1.15) {
      const map = {
        default:   { f: T.TEAL, t: T.WAX, ln: null },
        secondary: { f: T.MIST, t: T.DUSK, ln: null },
        outline:   { f: T.WAX, t: T.DUSK, ln: T.STONE },
        success:   { f: T.TEAL15, t: T.TEAL, ln: null },
        warning:   { f: T.WARN15, t: T.WARN, ln: null },
        error:     { f: T.ERR15, t: T.ERR, ln: null },
      };
      const m = map[kind];
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.28, rectRadius: 0.14, fill: { color: m.f }, line: m.ln ? { color: m.ln, width: 1 } : { type: "none" } });
      s.addText(txt, { x, y: y + 0.01, w, h: 0.26, fontFace: I, fontSize: 9.5, bold: true, color: m.t, align: "center", valign: "middle", margin: 0 });
    },
    ctaPill(s, txt, x, y, w = 2.1, variant = "primary") {
      /* CTAs are ALWAYS Teal — never Butter/Clavel */
      const v = variant === "primary" ? { f: T.TEAL, t: T.WAX, ln: null } : variant === "secondary" ? { f: T.MIST, t: T.DUSK, ln: null } : { f: T.WAX, t: T.DUSK, ln: T.STONE };
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.44, rectRadius: 0.08, fill: { color: v.f }, line: v.ln ? { color: v.ln, width: 1 } : { type: "none" } });
      s.addText(txt, { x, y, w, h: 0.44, fontFace: I, fontSize: 12, bold: true, color: v.t, align: "center", valign: "middle", margin: 0 });
    },
    /* Text-only fallback wordmark; prefer h.logo() which uses the official isologo PNGs. */
    wordmark(s, x, y, dark = false, size = 13) {
      s.addText("OPHIRA", { x, y, w: 2.2, h: 0.32, fontFace: I, fontSize: size, bold: true, charSpacing: 3.5, color: dark ? T.WAX : T.DUSK, margin: 0 });
    },
    hasBrand: () => hasBrand,
    divider(sec, title, sub, style = "mist", ornament = null) {
      const s = h.slideNew(style === "dark" ? T.DUSK : T.MIST);
      if (ornament) s.addImage({ data: ornament.data, x: ornament.x, y: ornament.y, w: ornament.w, h: ornament.h });
      s.addText(sec, { x: M, y: 1.05, w: 3.4, h: 1.7, fontFace: F, fontSize: 96, bold: true, color: T.TEAL, margin: 0 });
      s.addShape(pres.shapes.LINE, { x: M, y: 3.0, w: 3.2, h: 0, line: { color: style === "dark" ? "4A4A62" : T.STONE, width: 1 } });
      h.eyebrow(s, "SECCIÓN", M, 3.22, 4, { color: style === "dark" ? T.TAUPE : T.INK2 });
      s.addText(title, { x: M, y: 3.5, w: 7.6, h: 0.75, fontFace: F, fontSize: 34, bold: true, color: style === "dark" ? T.WAX : T.DUSK, margin: 0 });
      s.addText(sub, { x: M, y: 4.3, w: 6.6, h: 0.55, fontFace: I, fontSize: 12.5, color: style === "dark" ? T.TAUPE : T.INK2, margin: 0 });
      h.footer(s, style === "dark");
      return s;
    },
    kpi(s, value, label, x, y, w, color = T.TEAL) {
      /* 36pt is the safe max for long currency figures in a 3-col row */
      s.addText(value, { x, y, w, h: 0.95, fontFace: F, fontSize: 36, bold: true, color, align: "center", margin: 0 });
      s.addShape(pres.shapes.LINE, { x: x + w / 2 - 0.35, y: y + 1.15, w: 0.7, h: 0, line: { color: T.GOLD, width: 1 } });
      h.eyebrow(s, label, x, y + 1.3, w, { align: "center" });
    },
    chartDefaults(overrides = {}) {
      return Object.assign({
        chartColors: [T.TEAL, T.STONE],
        catAxisLabelColor: T.INK2, valAxisLabelColor: T.INK2,
        catAxisLabelFontSize: 9.5, valAxisLabelFontSize: 9.5,
        valGridLine: { color: T.STONE, size: 0.5 }, catGridLine: { style: "none" },
        showLegend: true, legendPos: "b", legendColor: T.INK2, legendFontSize: 10,
        valAxisLineColor: T.STONE, catAxisLineColor: T.STONE, showTitle: false,
      }, overrides);
    },
  };

  return { pres, T, orns, icon, h, brand };
}

module.exports = { buildContext, T, orn, icon };
