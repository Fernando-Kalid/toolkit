/* ============================================================================
 * THE SUCCESS PLANNER — Corporate Slide Design System (pptxgenjs module)
 * Tokens + reusable "chrome" helpers + slide masters.
 * Every value is lifted verbatim from slide-design-system.md so decks stay
 * visually married to the storefront brand.
 * ==========================================================================*/
const path = require("path");

// Overridable "drop accent" (design §2.5): one accent per deck/theme.
// Build scripts may set T.accent to re-theme every accent-role element.
const T = { accent: "9B6A3A", name: "Coñac" };

// Official vertical logo, rasterized to tight transparent PNGs (see make_logo.py)
const LOGO = {
  ink:   path.join(__dirname, "logo-ink.png"),   // for bone / cream / parchment
  ivory: path.join(__dirname, "logo-ivory.png"), // for onyx
  ratio: 2.0289,                                  // width / height
};

// Place the brand logo. Pass w (inches); height derives from the lockup ratio.
// variant: "ink" (default, light bg) or "ivory" (dark bg). center:true ignores x.
function logo(slide, o = {}) {
  const w = o.w ?? 2.2, h = w / LOGO.ratio;
  const x = o.center ? (13.333 - w) / 2 : o.x;
  slide.addImage({ path: o.variant === "ivory" ? LOGO.ivory : LOGO.ink,
    x, y: o.y, w, h, altText: "The Winner's Circle · Success Planner" });
  return { w, h };
}

// ---------- 1. COLOR TOKENS (exact hex, no # per pptxgenjs) ----------------
const C = {
  onyx:      "0E0E0E",
  ivory:     "F5F0E8",
  gold:      "C5963A",
  goldDark:  "B8872E",
  bone:      "FBF7F0",
  cream:     "FCFAF6",
  parch2:    "F4ECDD",
  sandDeep:  "EBE0CC",
  parch:     "F2E8D0",
  ink:       "171514",
  inkBody:   "3A352F",
  inkMuted:  "6B6258",
  cognac:    "9B6A3A",
  obsidian:  "1C1C24",
  slate:     "4A4A58",
  success:   "A8D5A2",
  midnight:  "1A1A2E",
  forest:    "2D4A3E",
  sand:      "C9B99A",
  // ink-on-dark helpers (design §2.4) — solid approximations of the rgba tokens
  dim:       "A7A29A", // DIM body copy on onyx  (≈ ivory @ .62)
  dimSoft:   "938E86", // eyebrow on onyx        (≈ ivory @ .55)
};

// ---------- 2. TYPE ROLES (the three brand families) -----------------------
const F = {
  serif: "Playfair Display",      // emotional beats — ALWAYS italic, wt 400
  grot:  "Bricolage Grotesque",   // declarative statement headlines — wt 700
  sans:  "Montserrat",            // body, eyebrows, labels, UI, captions
};

// ---------- 3. LAYOUT GEOMETRY (LAYOUT_WIDE = 13.333" x 7.5") ---------------
const G = {
  W: 13.333, H: 7.5,
  mx: 0.92,               // left/right safe margin (generous air)
  get cw() { return this.W - 2 * this.mx; }, // content width = 11.493
  eyebrowY: 0.66,
  footerY: 6.94,
};

// ---------- 4. CHROME HELPERS ---------------------------------------------
// Eyebrow / kicker — the brand's most recognizable device (uppercase, tracked)
function eyebrow(slide, text, o = {}) {
  slide.addText((text || "").toUpperCase(), {
    x: o.x ?? G.mx, y: o.y ?? G.eyebrowY, w: o.w ?? G.cw, h: 0.34,
    fontFace: F.sans, fontSize: o.fontSize ?? 12, bold: true,
    color: o.color ?? C.inkMuted, charSpacing: o.charSpacing ?? 2.6,
    align: o.align ?? "left", valign: "middle", margin: 0,
  });
}

// Hairline divider (design §5.3 — hairlines only, never heavy grids)
function hairline(slide, o = {}) {
  slide.addShape("line", {
    x: o.x ?? G.mx, y: o.y ?? 1.2, w: o.w ?? G.cw, h: 0,
    line: { color: o.color ?? C.ink, width: o.width ?? 0.75,
            transparency: o.transparency ?? 90 },
  });
}

// Thin gold ring — quiet atmospheric motif (design: "gold rings", garnish)
function ring(slide, o = {}) {
  slide.addShape("ellipse", {
    x: o.x, y: o.y, w: o.d ?? 1.6, h: o.d ?? 1.6,
    fill: { type: "none" },
    line: { color: o.color ?? C.gold, width: o.width ?? 1,
            transparency: o.transparency ?? 0 },
  });
}

// Small filled dot (active dot / list marker in the accent hue)
function dot(slide, o = {}) {
  slide.addShape("ellipse", {
    x: o.x, y: o.y, w: o.d ?? 0.09, h: o.d ?? 0.09,
    fill: { color: o.color ?? T.accent }, line: { type: "none" },
  });
}

// Footer: wordmark left + optional meta right, over a faint hairline
function footer(slide, o = {}) {
  const onDark = o.onDark ?? false;
  const wordColor = onDark ? C.dimSoft : C.inkMuted;
  hairline(slide, { y: G.footerY - 0.14, color: onDark ? "FFFFFF" : C.ink,
                    transparency: onDark ? 92 : 90 });
  if (!o.noWordmark) slide.addText("THE SUCCESS PLANNER", {
    x: G.mx, y: G.footerY, w: 5, h: 0.3, fontFace: F.sans, fontSize: 8.5,
    bold: true, color: wordColor, charSpacing: 2.2, valign: "middle", margin: 0,
  });
  if (o.right) {
    slide.addText(o.right.toUpperCase(), {
      x: G.W - G.mx - 5, y: G.footerY, w: 5, h: 0.3, fontFace: F.sans,
      fontSize: 8.5, color: wordColor, charSpacing: 1.6, align: "right",
      valign: "middle", margin: 0,
    });
  }
}

// ---------- 5. SLIDE MASTERS (real reusable layouts for PPT / GSlides) ------
// Placeholders are editable in PowerPoint; static chrome repeats automatically.
function defineMasters(pres) {
  const numOpts = (dark) => ({
    x: G.W - G.mx - 1.2, y: G.footerY, w: 1.2, h: 0.3, fontFace: F.sans,
    fontSize: 8.5, color: dark ? C.dimSoft : C.inkMuted, align: "right",
  });

  // 9.1 TITLE — bone
  pres.defineSlideMaster({
    title: "SP_TITLE", background: { color: C.bone },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: G.mx, y: 2.35, w: G.cw, h: 0.4, fontFace: F.sans, fontSize: 12, bold: true, color: C.inkMuted, charSpacing: 2.6 }, text: "EYEBROW · KICKER" } },
      { placeholder: { options: { name: "title", type: "title", x: G.mx, y: 2.75, w: 9.4, h: 2.1, fontFace: F.serif, italic: true, fontSize: 62, color: C.ink, valign: "top" }, text: "Headline en serif itálica" } },
      { placeholder: { options: { name: "sub", type: "body", x: G.mx, y: 4.95, w: 7.6, h: 1.0, fontFace: F.serif, italic: true, fontSize: 22, color: C.inkBody, valign: "top" }, text: "Subtítulo de apoyo en serif itálica." } },
    ],
  });

  // 9.2 SECTION DIVIDER — onyx punctuation
  pres.defineSlideMaster({
    title: "SP_DIVIDER", background: { color: C.onyx },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: 1.4, y: 2.7, w: G.W - 2.8, h: 0.4, fontFace: F.sans, fontSize: 12, bold: true, color: C.dimSoft, charSpacing: 2.6, align: "center" }, text: "CAPÍTULO" } },
      { placeholder: { options: { name: "title", type: "title", x: 1.4, y: 3.15, w: G.W - 2.8, h: 1.9, fontFace: F.serif, italic: true, fontSize: 40, color: C.ivory, align: "center", valign: "top" }, text: "Título de sección centrado" } },
    ],
  });

  // 9.3 CONTENT / STATEMENT — cream
  pres.defineSlideMaster({
    title: "SP_CONTENT", background: { color: C.cream },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: G.mx, y: G.eyebrowY, w: G.cw, h: 0.34, fontFace: F.sans, fontSize: 12, bold: true, color: C.inkMuted, charSpacing: 2.6 }, text: "EYEBROW" } },
      { placeholder: { options: { name: "title", type: "title", x: G.mx, y: 1.05, w: G.cw, h: 1.1, fontFace: F.grot, bold: true, fontSize: 38, color: C.ink, valign: "top" }, text: "Titular declarativo en grotesca" } },
      { placeholder: { options: { name: "body", type: "body", x: G.mx, y: 2.35, w: 7.4, h: 3.6, fontFace: F.sans, fontSize: 15, color: C.inkBody, valign: "top" }, text: "Cuerpo de texto en Montserrat." } },
    ],
    slideNumber: numOpts(false),
  });

  // 9.3b CONTENT ALT — parchment2 (same skeleton, recessed warm band)
  pres.defineSlideMaster({
    title: "SP_CONTENT_ALT", background: { color: C.parch2 },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: G.mx, y: G.eyebrowY, w: G.cw, h: 0.34, fontFace: F.sans, fontSize: 12, bold: true, color: C.inkMuted, charSpacing: 2.6 }, text: "EYEBROW" } },
      { placeholder: { options: { name: "title", type: "title", x: G.mx, y: 1.05, w: G.cw, h: 1.1, fontFace: F.grot, bold: true, fontSize: 38, color: C.ink, valign: "top" }, text: "Titular declarativo en grotesca" } },
      { placeholder: { options: { name: "body", type: "body", x: G.mx, y: 2.35, w: 7.4, h: 3.6, fontFace: F.sans, fontSize: 15, color: C.inkBody, valign: "top" }, text: "Cuerpo de texto en Montserrat." } },
    ],
    slideNumber: numOpts(false),
  });

  // 9.4 DATA / METRIC — sand-deep (warm gravity)
  pres.defineSlideMaster({
    title: "SP_METRIC", background: { color: C.bone },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: G.mx, y: G.eyebrowY, w: G.cw, h: 0.34, fontFace: F.sans, fontSize: 12, bold: true, color: C.inkMuted, charSpacing: 2.6 }, text: "EYEBROW" } },
      { placeholder: { options: { name: "title", type: "title", x: G.mx, y: 1.05, w: G.cw, h: 1.0, fontFace: F.grot, bold: true, fontSize: 34, color: C.ink, valign: "top" }, text: "Título de la métrica" } },
    ],
    slideNumber: numOpts(false),
  });

  // 9.5 QUOTE / INTERLUDE — parchment2 (calm variant)
  pres.defineSlideMaster({
    title: "SP_QUOTE", background: { color: C.parch2 },
    objects: [
      { placeholder: { options: { name: "quote", type: "title", x: 1.7, y: 2.5, w: G.W - 3.4, h: 2.2, fontFace: F.serif, italic: true, fontSize: 34, color: C.ink, align: "center", valign: "middle" }, text: "“Cita editorial en serif itálica.”" } },
      { placeholder: { options: { name: "attr", type: "body", x: 1.7, y: 4.9, w: G.W - 3.4, h: 0.4, fontFace: F.sans, fontSize: 11, bold: true, color: C.inkMuted, charSpacing: 2.4, align: "center" }, text: "ATRIBUCIÓN" } },
    ],
  });

  // 9.6 CLOSING / CTA — onyx with grain feel
  pres.defineSlideMaster({
    title: "SP_CLOSING", background: { color: C.onyx },
    objects: [
      { placeholder: { options: { name: "eyebrow", type: "body", x: 1.4, y: 2.6, w: G.W - 2.8, h: 0.4, fontFace: F.sans, fontSize: 12, bold: true, color: C.dimSoft, charSpacing: 2.6, align: "center" }, text: "EL SIGUIENTE PASO" } },
      { placeholder: { options: { name: "title", type: "title", x: 1.4, y: 3.05, w: G.W - 2.8, h: 1.6, fontFace: F.serif, italic: true, fontSize: 40, color: C.ivory, align: "center", valign: "top" }, text: "Línea de cierre en serif" } },
    ],
  });
}

// ---------- 6. PILL / BADGE (component vocabulary §8) -----------------------
function pill(slide, text, o = {}) {
  const onDark = o.onDark ?? false;
  slide.addText(text.toUpperCase(), {
    x: o.x, y: o.y, w: o.w ?? 1.7, h: o.h ?? 0.36,
    shape: "roundRect", rectRadius: 0.18,
    fill: { type: "none" },
    line: { color: o.color ?? T.accent, width: 1, transparency: 55 },
    fontFace: F.sans, fontSize: o.fontSize ?? 10, bold: true,
    color: o.color ?? T.accent, charSpacing: 1.8, align: "center",
    valign: "middle", margin: 0,
  });
}

module.exports = { C, F, G, T, LOGO, logo, eyebrow, hairline, ring, dot, footer, pill, defineMasters };
