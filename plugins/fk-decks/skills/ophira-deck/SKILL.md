---
name: ophira-deck
description: Generate on-brand OPHIRA presentations as PowerPoint .pptx (imports cleanly into Google Slides). Use whenever the user asks to create, build, design, or update an OPHIRA presentation, deck, slides, pitch, propuesta, board update, QBR, all-hands, keynote, or report — or anything "con la marca OPHIRA / estilo OPHIRA / brandeado de OPHIRA", even if they just say "haz una presentación" in an OPHIRA context. Applies the exact design system (Wax Paper & Future Dusk surfaces, Fraunces + Inter, Teal accent, organic blob/arch/ribbon ornaments, 70/20/10 rule) and the component library (KPIs, charts, tables, badges RAG, timelines, pricing, funnels, team cards).
---

# OPHIRA Deck Generator

Builds branded .pptx presentations for OPHIRA (B2B2C wedding-planning platform, Mexican market, es_MX). Brand voice: calm, precise, luxury-adjacent — never loud. Tagline: *"Menos ruido, más claridad."*

## Workflow

1. **Content first.** Before touching any code, gather the real content: audience (management / C-suite / clientes / proveedores), purpose, and the actual facts, numbers, and messages. If the user hasn't provided them, ask or research. Default language for slide content is Spanish (es_MX).
2. **Plan the slide list**, mapping each slide to a layout from the catalog below. One idea per slide.
3. **Build** with pptxgenjs + the bundled helper library (see Setup). Consult `assets/example_deck.js` — a fully validated 32-slide reference implementation — for exact coordinates and recipes of any layout before writing your own version of it.
4. **Recompress**: pptxgenjs writes bloated zips. Run `python <pptx-skill>/scripts/rezip.py out.pptx` if the pptx skill is available, otherwise re-zip with any zip tool.
5. **Visual QA**: render to images (LibreOffice → pdftoppm) and inspect with fresh-eyes subagents. See "QA notes" below for known font caveats.

## Setup

```bash
npm install pptxgenjs react react-dom react-icons sharp
```

In your build script, require the bundled helpers (copy `scripts/ophira_helpers.js` next to your script or require it by absolute path):

```javascript
const { buildContext } = require("./ophira_helpers");
const ctx = await buildContext();           // { pres, T, orns, icon, h }
const s = ctx.h.slideNew(ctx.T.WAX);        // new slide on Wax Paper
ctx.h.header(s, "ESTA SEMANA · ALTA PRIORIDAD", "Tu próximo paso");
// ... add content ...
await ctx.pres.writeFile({ fileName: "deck.pptx" });
```

The helpers expose: `slideNew`, `footer`, `eyebrow`, `h2`, `header` (eyebrow+H2+divider), `card`, `badge` (RAG pills), `ctaPill`, `logo` (official brand PNGs), `divider` (section separator slide), `kpi`, `chartDefaults`, plus pre-rendered ornament PNGs (`orns.*`) and an `icon(FeatherComponent, hex)` rasterizer. Read the top of `scripts/ophira_helpers.js` for the full API and token names.

If you copy `ophira_helpers.js` elsewhere, also keep `assets/brand/` reachable (pass `buildContext({ brandDir })` with its path); otherwise the logo falls back to a text wordmark.

## Brand hard rules (non-negotiable)

- **70/20/10**: ~70% Wax Paper `FAF6EC` backgrounds, ~20% Future Dusk `2A2A3E` structure/dark slides, ~10% Teal `00707B` accent. No dark mode as default; dark slides are punctuation (covers, quotes, dividers, close).
- **CTAs are always Teal.** Butter `F2CC5D` and Clavel `E2725B` are decorative-only washes at 10–20% opacity: never as text on light backgrounds, never as CTA fill, never for warning/error semantics.
- **Max one ornament per slide** (blob / arch / ribbon), always bleeding off-canvas, and **never behind dense data** (tables, charts, lists). Ornaments only on: covers, section dividers, closings, celebration slides.
- **Eyebrow convention** over every title: 10.5pt Inter, UPPERCASE, charSpacing ~2.4, Muted Ink `6E6875`.
- **Fonts**: Fraunces (bold=SemiBold) for display/H1/quotes/hero numbers; Inter for everything else. Both exist in Google Fonts, so a Google Slides import renders correctly.
- Charts: key series always Teal, rest neutrals from the ramp (Teal → Dusk → Taupe `B8A398` → Butter → Clavel → Stone `DCCFBA`); axes/grids Soft Stone 0.5–1pt; labels Muted Ink.
- Semantic states: success = Teal, warning = `A46A2A`, error = `7A2E2E`, on 15% tint pills (pre-blended hexes in helpers: `TEAL15`, `WARN15`, `ERR15`).
- **Official logos are bundled** in `assets/brand/`: horizontal isologo in Dusk / White / Teal, square isotype in Dusk / White (all transparent PNGs; horizontal aspect ratio 3.615). Use `h.logo(slide, {x, y, h, kind, variant})` — dusk on light backgrounds, white on Future Dusk, teal only for accent moments on light. Never recolor, stretch, or crowd the logo (clear space ≥ isotype height). `h.footer()` automatically places the small isotype + page number; the text wordmark "OPHIRA" (Inter bold, wide tracking) is only a fallback if the assets are missing. On covers and closings place `h.logo()` and skip `h.footer()` — one brand mark per slide is enough.

## Layout catalog

All validated in `assets/example_deck.js` (slide numbers in parentheses):

| Layout | Use for |
|---|---|
| Cover light / dark (1–2) | openings; dark variant for proposals/keynotes |
| Agenda 2-col (3) | numbered index, Fraunces Teal numerals |
| Section divider (4, 14, 19, 24, 28) | big Fraunces number, alternate Mist/Dusk backgrounds |
| Title + body + aside card (5) | narrative, decisions |
| Two columns (6) | comparisons, before/after |
| Feature cards ×3 (7) | value props with Teal line icons |
| KPI row (8) | hero numbers, Glow Spark `D4AF37` hairline detail |
| Bar / line / doughnut charts (9, 10, 17, 21) | data slides |
| Data table (11) | Mist header, Stone borders, semantic status column |
| Timeline (12) | processes; done nodes Teal solid, future outline |
| Quote dark (13) | testimonials, Glow Spark quote mark |
| Status rows + RAG badges (15) | management project reviews |
| OKRs + progress bars (16) | Mist track, Teal fill, Fraunces % |
| Team cards (18) | initials avatar on Dusk circle |
| Executive summary (20) | KPIs + narrative + decision card |
| Risk matrix 2×2 (22) | severity badges + Teal "Mitigación" |
| Strategic roadmap columns (23) | header ramp Teal → Dusk → Cherry Mocha `4B2A2A` |
| Icon rows + proof card (25, 30) | customer/vendor pitches |
| Celebration / case study (26) | the one place Butter wash leads |
| Pricing ×3 (27) | highlighted plan = Dusk card, Teal CTA |
| Funnel (29) | rounded bars, product stage in Teal |
| Closing CTA (31) | tagline + contact + Teal pill |
| Style-guide annex (32) | optional cheat-sheet slide |

## Typography scale (16:9, 10 × 5.625 in)

Cover H1: Fraunces 42–44 · Divider title: Fraunces 34 · Slide H2: Inter 23 bold · Card head: Fraunces 14–16 · Body: Inter 11–13 · Secondary: Inter 9.5–10.5 Muted Ink · Eyebrow: Inter 10.5 +tracking · KPI hero: Fraunces 36–54 · Buttons/badges: Inter 12 / 9.5 bold.

## QA notes (learned the hard way)

- LibreOffice previews substitute Fraunces/Inter with wider fonts — treat text-fit checks as approximate and size number/eyebrow boxes with ~10% slack. Real currency figures like `$180,000` in a 3-column KPI row fit at **36pt max** in the substitute font (42pt+ wraps).
- Skip percent data-labels on doughnut charts (white labels are illegible on the light ramp segments); rely on the legend.
- On roadmap-style column headers, Taupe fill + Wax text fails contrast — use Cherry Mocha `4B2A2A` for the third column instead.
- Keep eyebrow labels short; wide tracking makes them wrap early (~2.0 in fits ±18 characters at 10.5pt).
- Add speaker notes (`slide.addNotes`) with usage/talking-point guidance on every slide.
- pptxgenjs pitfalls: hex colors without `#`, never 8-char hex, fresh shadow objects per shape, `bullet: true` not "•".

## Reference files

- `scripts/ophira_helpers.js` — token constants + helper API (require it, don't rewrite it).
- `assets/brand/` — official logo PNGs (horizontal dusk/white/teal, isotype dusk/white).
- `assets/example_deck.js` — validated full-template generator; copy coordinates from here. (Note: it predates the bundled logos and uses the text wordmark; in new decks use `h.logo()` instead.)
- `references/design-system.md` — the complete original design-system specification (colors, ornament SVG paths, component specs). Read when you need a value not covered above.
