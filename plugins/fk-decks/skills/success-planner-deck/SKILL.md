---
name: success-planner-deck
description: >-
  Generate on-brand THE SUCCESS PLANNER corporate presentations as PowerPoint
  .pptx (also imports cleanly into Google Slides). Use whenever the user asks to
  create, build, design, or update a Success Planner presentation, deck, slides,
  pitch, keynote, board update, all-hands, QBR, or report — or anything "in the
  Success Planner / Winner's Circle style / brand". Applies the exact design
  system (warm bone & onyx surfaces, Playfair Display italic + Bricolage
  Grotesque + Montserrat, single cognac accent, gold hero numbers), the six
  master layouts, the official logo, and the executive component library
  (charts, KPIs, deltas, comparisons, callouts, diagrams, RAG/OKR status, and
  CFO/COO/CEO/CMO/CIO dashboards).
---

# The Success Planner — Corporate Deck Builder

Build presentations that look and feel like the Success Planner brand ("The
Winner's Circle"). You generate a real `.pptx` with **pptxgenjs** using the
bundled design modules — never plain white slides with bullets.

## Bundled assets (in `assets/`)
- `sp-design.js` — tokens (colors `C`, fonts `F`, geometry `G`, theme accent `T`), the **logo** helper, chrome helpers (`eyebrow`, `hairline`, `ring`, `dot`, `footer`, `pill`), and `defineMasters(pres)` (embeds the 6 reusable layouts).
- `sp-components.js` — executive components: `header`, `chapterOpener`, `kpi`, `deltaChip`, `statusPill`, `progressBar`, `callout`, `insight`, `dataTable`, `matrix2x2`, `timeline`, `funnel`, `processFlow`, `pyramid`, `pillars`, `waterfall`, `chartOpts`, `palette`, `SEM`.
- `logo-ink.png` / `logo-ivory.png` — official vertical logo (ink for light slides, ivory for onyx). Referenced automatically by `logo()`.
- `example-build.js` — a working starter deck (cover → divider → KPIs → chart → closing). Copy and adapt it.
- `fix_notes_order.py` — post-process step (see Workflow).
- `design-system-reference.md` — the full brand spec (source of truth).

## Workflow (do this every time)
1. **Clarify** intent if underspecified (audience, length, tone, key content). Ask via the question tool before building.
2. **Set up the workspace.** Copy the asset files into your working output dir so they sit together (the logo helper resolves `logo-*.png` relative to `sp-design.js`):
   ```bash
   cp <skill>/assets/{sp-design.js,sp-components.js,logo-ink.png,logo-ivory.png,fix_notes_order.py,example-build.js} .
   npm install pptxgenjs
   # for icons/diagrams needing rasterization only: npm install react-icons react react-dom sharp
   ```
3. **Author the deck** in a build script (start from `example-build.js`). Rules below. Put the user's real content in; keep placeholders out.
4. **Build:** `node build.js`
5. **Recompress + fix chart/notes ordering** (required — pptxgenjs writes bloated zips and slightly out-of-order XML):
   ```bash
   python <pptx-skill>/scripts/rezip.py Deck.pptx      # from the pptx skill
   python fix_notes_order.py Deck.pptx                 # bundled
   ```
6. **Visually QA.** Render to images and inspect with a subagent (fresh eyes) for overflow/overlap/contrast. Fix, re-verify once.
   ```bash
   python <pptx-skill>/scripts/office/soffice.py --headless --convert-to pdf Deck.pptx
   pdftoppm -jpeg -r 120 Deck.pdf slide
   ```
   Note: the three brand fonts are **not** installed in the render sandbox, so LibreOffice substitutes a generic sans. That is expected — the fonts render correctly on the user's machine. Do not treat font substitution as a defect; add ~10% slack on serif/grotesque text boxes and don't trust exact text-fit there. Charts DO render.
7. **Deliver** the `.pptx` with `present_files`.

## Design rules (non-negotiable)
- **Surfaces alternate, light-led:** `BONE → CREAM → PARCHMENT2 → [ONYX] → …`. Onyx (`C.onyx`) is punctuation — **1–2 slides max** (a divider and the closing). Never pure white or pure black.
- **Type roles never mix:** serif italic (`F.serif`, Playfair) = emotion/headlines/quotes; grotesque (`F.grot`, Bricolage 700) = declarative statement titles; sans (`F.sans`, Montserrat) = body, eyebrows, labels, data. Eyebrows are UPPERCASE + tracked.
- **One accent** — cognac by default (`T.accent`). To re-theme a whole deck set `T.accent = "2D4A3E"` (forest) or `"1A1A2E"` (midnight) BEFORE building; every accent-role element and chart follows it. **Gold (`C.gold`) is a separate garnish — reserve it for the single hero number**, never fills.
- **Logo:** `logo(s,{x,y,w,variant:"ink"})` on the cover (top-left, light bg); `logo(s,{center:true,y,w,variant:"ivory"})` as the closing sign-off on onyx. Keep the text wordmark ("THE SUCCESS PLANNER") only in running footers.
- **Layout:** `LAYOUT` is 13.333"×7.5". Use `G.mx` (0.92") side margins and `G.cw` content width. Generous air, one idea per slide. Hairlines only (`hairline`) — **never** decorative color bars/stripes or accent underlines under titles.
- **Charts** are native pptxgenjs (editable). Always style with `chartOpts(bgHex, {...})` and lead the series with `T.accent`; pair every chart with a `callout`/`insight` that states the takeaway.
- **Every slide needs a visual** (chart, KPI row, diagram, callout, or the type-as-hero cover). No plain title+bullets.

## Slide starters (copy the pattern from `example-build.js`)
- **Cover:** bone + ink logo + eyebrow + serif-italic headline (force line breaks; leave a gap before the sub) + `footer({noWordmark:true})`.
- **Section divider:** onyx + centered eyebrow + serif-italic title + centered wordmark.
- **Content/statement:** `header({eyebrow,title,lede})` + body/columns + `footer({right})`.
- **KPIs:** 4-up `kpi(...)` with `deltaChip`s and vertical hairlines; hero in gold. Or `dataTable` for variance (color by favorability via `SEM`).
- **Charts:** column/line/combo/stacked/area/doughnut/`waterfall`/bubble — see component list. `funnel`, `matrix2x2`, `timeline`, `processFlow`, `pyramid`, `pillars` for diagrams.
- **Status:** `statusPill` (RAG), risk heat map (5×5 tinted grid), OKR `progressBar`s.
- **Role dashboards:** combine 4 KPIs + one chart + a small table/progress set (CFO/COO/CEO/CMO/CIO patterns exist in the full Kit).
- **Closing:** onyx + serif-italic line + ivory logo.

## Guardrails
Do: keep it light-led; italic serif for feeling; one accent; wide margins; warm soft shadows; gold only on the hero number.
Don't: pure white/black; gold fills; mixed font roles; edge stripes/accent underlines; crowded slides; body copy past ~62 characters wide.
