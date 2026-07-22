# The Winner's Circle — Corporate Slide Design System

> **Purpose.** A reference for building corporate slideshows (keynote decks, pitch decks,
> board updates, internal all-hands) that look and feel like the **Success Planner** storefront.
> Every token below is lifted verbatim from the live shop's design system so slides stay
> visually married to the brand.
>
> **Source of truth.** Colors + button styles: [`apps/success-planner/src/lib/theme.js`](../../apps/success-planner/src/lib/theme.js).
> CSS custom properties: [`apps/success-planner/src/index.css`](../../apps/success-planner/src/index.css).
> Motion: [`apps/success-planner/src/lib/motion.js`](../../apps/success-planner/src/lib/motion.js).
> Layout / section rhythm: [`apps/success-planner/src/SuccessPlannerPage.jsx`](../../apps/success-planner/src/SuccessPlannerPage.jsx).
>
> When these files change, update this doc — the storefront is canonical, this is the mirror.

---

## 1. Design DNA — the one-paragraph brief

The storefront is a **light-led, warm-neutral editorial system** (a "Rhode-inspired revamp"): pages
rest on warm bone/cream, headlines are set in an **italic serif** for emotional beats, a **bold
grotesque** carries display moments, and **onyx (near-black) is reserved for 1–2 dramatic
"punctuation" moments** rather than being the default canvas. Accents are quiet and warm — a single
**cognac gold** underline that elongates on hover. Motion is a **slow, confident settle, never a
bounce**. Translated to slides: *most slides are light and airy; a few section dividers go full
onyx; type does the heavy lifting; gold is a garnish, not a fill.*

**Voice on a slide:** restrained luxury, generous whitespace, one idea per slide, serif for the
feeling / grotesque for the statement / sans for the detail.

---

## 2. Color system

All hex values are exact. Contrast ratios (from source comments) are measured against the default
`bone` surface unless noted.

### 2.1 Global brand palette — *The Winner's Circle*

| Token | Hex | Role on a slide |
|---|---|---|
| `--twc-onyx` / `ONYX` | `#0E0E0E` | Dark "punctuation" slide backgrounds; primary ink on light |
| `--twc-ivory` / `IVORY` | `#F5F0E8` | Text/elements **on** onyx slides |
| `--twc-gold` / `GOLD` | `#C5963A` | Premium metallic accent (rings, key numbers, thin rules) |
| `--twc-gold-dark` / `GOLD_DARK` | `#B8872E` | Gold hover / pressed / gradient stop |
| `--twc-obsidian` / `OBSIDIAN` | `#1C1C24` | Raised surfaces on dark slides (cards on onyx) |
| `--twc-warm-slate` / `SLATE` | `#4A4A58` | Muted cool ink on dark, secondary lines |

### 2.2 Light-led canvas — surfaces (light → deep)

These are the everyday slide backgrounds. **Alternate them between slides** exactly as the site
alternates between sections (see §4.3).

| Token | Hex | Use |
|---|---|---|
| `--sp-bone` / `BONE` | `#FBF7F0` | **Default slide background** (page base) |
| `--sp-cream` / `CREAM` (`CARD_LIGHT`) | `#FCFAF6` | Raised cards / alt slide surface 1 |
| `--sp-parchment-2` / `PARCHMENT2` | `#F4ECDD` | Recessed warm band / alt slide surface 2 |
| `--sp-sand-deep` / `SAND_DEEP` | `#EBE0CC` | Deepest warm band (pairs with onyx text) |
| `--sp-parchment` / `PARCHMENT` | `#F2E8D0` | Warm accent band |

### 2.3 Ink on light (warm, high-contrast)

| Token | Value | Contrast on bone | Use |
|---|---|---|---|
| `--sp-ink` / `INK` | `#171514` | 15.9:1 (AAA) | Headings |
| `--sp-ink-body` / `INK_BODY` | `#3A352F` | 9.6:1 (AAA) | Body copy |
| `--sp-ink-muted` / `INK_MUTED` | `#6B6258` | 4.9:1 (AA) | Eyebrows, captions, meta, labels |
| `--sp-ink-faint` / `INK_FAINT` | `rgba(23,21,20,0.30)` | decorative | Faint eyebrows, watermark digits |
| `--sp-rule-light` / `RULE_LIGHT` | `rgba(23,21,20,0.10)` | — | Hairline dividers on light |

### 2.4 Ink on dark (for onyx punctuation slides)

| Token | Value | Use |
|---|---|---|
| `IVORY` | `#F5F0E8` | Headings on onyx |
| `DIM` | `rgba(245,240,232,0.62)` | Body copy on onyx |
| `RULE` | `rgba(255,255,255,0.07)` | Dividers on onyx |
| eyebrow-on-dark | `rgba(245,240,232,0.55)` | Eyebrow labels on onyx |

### 2.5 Accent + semantic

| Token | Value | Use |
|---|---|---|
| `--sp-accent` (default) / `COGNAC` / `ACCENT_DEFAULT` | `#9B6A3A` | **The one accent** — underlines, CTA sweep, active dots, swatch ring |
| `--sp-accent-ink` | `#FBF7F0` | Text/icon sitting on an accent fill |
| `SUCCESS` | `#A8D5A2` | "Included" / "Free" / positive check marks |
| `GOLD` | `#C5963A` | Metallic emphasis distinct from cognac (use sparingly) |

**The "drop" accent system.** The accent is a *single overridable variable*. A section (or, for us, a
**deck chapter**) can re-theme itself by setting `--sp-accent` to a new hex — every underline, active
dot, and CTA inside inherits it. On slides: pick one accent per deck (default cognac), or give each
major chapter its own accent hue while keeping surfaces + type identical.

### 2.6 Sub-brand palette (available, used sparingly)

`--sp-cognac #9B6A3A` · `--sp-forest #2D4A3E` · `--sp-parchment #F2E8D0` · `--sp-sand #C9B99A` ·
`--sp-midnight #1A1A2E`. Forest/midnight are good candidate *chapter accents* under the drop system.

### 2.7 Semantic status colors (for RAG / status slides)

Lifted from the shipment tracking badge — a ready-made status scale for corporate decks (project
status, risk/RAG indicators, health checks). Render as pill badges (§8) with the color as text on a
`rgba(23,21,20,0.03)` fill + `1px` border in the same color.

| Meaning | Hex | Storefront origin |
|---|---|---|
| In progress / active | `#2563EB` (blue) | `in_transit` / `out_for_delivery` |
| Done / on-track | `#3E7C52` (green) | `delivered` |
| At-risk / blocked | `#C9603A` (rust) | `exception` / `returned` |
| Pending / queued | `#C5963A` (gold) | `created` / `preparing` |
| Neutral / unknown | `#6B6258` (ink-muted) | `pending` / `unknown` |

### 2.8 Edition accent palette (candidate chapter accents)

Each product edition carries its own `accentHex` under the drop-accent system — a pre-vetted set of
warm hues you can assign to **deck chapters** (each chapter re-themes `--sp-accent`) while keeping
surfaces and type identical:

`OG / cognac #9B6A3A` · `Essentials / forest #2D4A3E` · `Lemon Drop #F2D45C` · `Baby Blue #B8D4E8` ·
`Matcha #B5C9A3` · `Red Velvet #9B2335` · `Midnight Agave #1A4A47`.

---

## 3. Typography system

Five families, each with a fixed job. **Never mix jobs.**

| Family | Stack | Role | On a slide |
|---|---|---|---|
| **Display / Serif** | `'Playfair Display', 'Benton Modern Display', Georgia, serif` | Emotional beats, hero headlines — **usually italic, weight 400** | Title-slide headline, quote slides, section names |
| **Grotesque** | `'Bricolage Grotesque', 'Greycliff CF', system-ui, sans-serif` | Bold display voice — **weight 600** | Statement headlines, big declarative section headers |
| **UI** | `'Greycliff CF', system-ui, -apple-system, 'Segoe UI', sans-serif` | Eyebrows, buttons, labels, meta — **uppercase, tracked** | Kickers, footers, chip labels, CTAs |
| **Body** | `'Montserrat', system-ui, -apple-system, sans-serif` | Long-form reading — weight 400 | Paragraphs, bullets, captions |

> **Font sourcing.** Playfair Display, Montserrat, Bricolage Grotesque are on Google Fonts. **Greycliff
> CF is a licensed font (cdnfonts)** — for slide decks where it isn't installed, substitute the UI role
> with a tight geometric sans (Montserrat 600 / system-ui) and keep the uppercase + tracking.

### 3.1 Global text defaults

Body font, `line-height: 1.5` (page) / `1.7` (body copy), `letter-spacing: 0.01em`, `font-weight: 400`,
`font-synthesis: none`, antialiased.

### 3.2 The type scale (as used on the site) → slide sizes

The site uses `clamp(min, vw, max)`. The **max** value is the desktop/large-screen size — use that as
the slide size. Suggested `pt` assumes a 13.33"×7.5" (16:9) master.

| Role | Site CSS | Family / style | Slide size (pt) |
|---|---|---|---|
| **Hero headline** | `clamp(2.75rem, 7.5vw, 6rem)`, `line-height:1.0`, `letter-spacing:-.01em` | Serif **italic** 400 | 54–72 pt |
| **Statement headline** | `clamp(1.75rem, 4vw, 3.25rem)`, `line-height:1.1`, `letter-spacing:-.015em` | Grotesque 600 | 34–44 pt |
| **Section header (serif)** | `clamp(1.75rem, 4vw, 3.5rem)`, `line-height:1.2` | Serif **italic** 400 | 34–44 pt |
| **Sub-headline / lede** | `clamp(1.25rem, 2.6vw, 1.875rem)`, `line-height:1.3` | Serif **italic** 400 | 22–30 pt |
| **Pull quote / interlude** | `clamp(1.75rem, 3.8vw, 3.5rem)`, `line-height:1.25`, `letter-spacing:.005em` | Serif italic 400, on onyx | 32–44 pt |
| **Card title** | `clamp(1.5rem, 2.4vw, 2rem)`, `line-height:1.1` | Serif italic 400 | 24–32 pt |
| **Body / paragraph** | `16px`, `line-height:1.9`, `max-width:62ch` | Body 400 | 14–18 pt |
| **Small body / caption** | `13–14px`, `line-height:1.7` | Body 400 | 11–13 pt |
| **Eyebrow / kicker** | `11px`, `letter-spacing:.18–.22em`, `UPPERCASE`, weight 600 | UI | 10–12 pt, tracked +200 |
| **Micro-label / tag** | `9–10px`, `letter-spacing:.14–.18em`, `UPPERCASE`, weight 600 | UI | 8–9 pt |

### 3.3 Signature type patterns (copy these exactly)

**Eyebrow / kicker** — the brand's most recognizable text device. Sits above every headline:
```
font-family: UI (Greycliff/geometric sans)
font-size: 11px      letter-spacing: .18em–.22em
text-transform: UPPERCASE      font-weight: 600
color: INK_MUTED (#6B6258)  [or rgba(245,240,232,.55) on onyx]
margin-bottom: 1rem–1.75rem
```
Spanish examples from the site: *"Las ediciones", "El ritual", "El ritmo", "El arco".*

**Serif headline (the emotional voice)** — italic, weight 400, negative tracking, tight leading,
constrained measure (`max-width: 11ch` for heroes, `~24–26ch` for quotes). This italic serif is the
single most brand-defining choice.

**Grotesque headline (the declarative voice)** — weight 600, `letter-spacing:-.015em`, `line-height:1.1`.
Use when the line is a *claim* rather than a *feeling*.

**Editorial CTA / text link** — uppercase UI 11–12px, `letter-spacing:.06–.16em`, with a **1.5px accent
underline that animates from `scaleX(.28)` → `scaleX(1)` on hover** (Loro Piana / Hermès move). On a
static slide, render the underline at partial width as a deliberate detail, or full width for the active item.

---

## 4. Layout, spacing & rhythm

### 4.1 Spacing scale (CSS custom properties)

| Token | Value | Meaning |
|---|---|---|
| `--space-section` | `clamp(5rem, 12vw, 9rem)` | Vertical breathing room between sections → **generous top/bottom slide margins** (~0.8–1.2" on a slide) |
| `--space-section-lg` | `clamp(7rem, 18vw, 14rem)` | Extra-large section air (chapter opens) |
| `--space-gutter` | `clamp(1.5rem, 4vw, 3rem)` | Horizontal page gutter → **slide left/right safe margin** (~0.5–0.75") |

**Principle:** the site is defined by *air*. On slides, keep wide margins and never fill the frame edge-to-edge.

### 4.2 Content measures & containers

| Container | Max width | Use |
|---|---|---|
| Full section | `1280px` | Master content width |
| Prose / editorial | `1080–1120px` | Text-forward slides |
| Narrow reading column | `620–920px` | Single-column body, quotes |
| Body line length | `62ch` (`~24–34ch` for headlines) | Keep paragraphs short |

**Grids:** editions use a 2-col card grid (`repeat(2, minmax(0,1fr))`, gap `clamp(1.5rem,4vw,3.5rem)`),
collapsing to 1 column under 760px. A "system" grid runs 4-col → 2-col → 1-col. For slides: **2-up or
4-up card rows** with equal gaps, generous gutters.

### 4.3 Surface alternation (the section rhythm)

The homepage cycles background surfaces to create quiet rhythm — **replicate this slide-to-slide:**

```
bone → cream → parchment2 → [ONYX punctuation] → bone → cream → parchment2 → …
```

Actual sequence from the page: `hero(BONE) → ediciones(CREAM) → manifesto(PARCHMENT2) →
interlude(ONYX) → arco(BONE) → incluye(CREAM) → (PARCHMENT2) → (BONE/CREAM/PARCHMENT2) →
faq(BONE) → closing(ONYX)`. Onyx appears **twice** in a long scroll — treat it as a rare accent slide.

---

## 5. Shape, elevation & borders

### 5.1 Radius

| Token | Value | Use |
|---|---|---|
| `--radius-btn` | `8px` | Buttons / CTAs |
| `--radius-card` | `14px` | Cards, media frames, image blocks |
| `--radius-pill` | `9999px` | Pills, tags, badges, avatars, dots |

### 5.2 Elevation (shadow recipes — verbatim)

Shadows are **soft, warm, and directional** (long downward throw, tinted with the ink color, never pure black):

| Level | Recipe | Use |
|---|---|---|
| Hero media | `0 30px 70px -34px rgba(23,21,20,.45), 0 2px 8px -4px rgba(23,21,20,.2)` | Big feature image on a slide |
| Card | `0 22px 50px -30px rgba(23,21,20,.4)` | Standard raised card |
| Drawer / panel | `-24px 0 80px rgba(23,21,20,…)` | Overlay panels |
| Focus ring (light) | `0 0 0 2px INK, 0 0 0 3px BONE` | Selected/keyboard state |
| Accent selection ring | `0 0 0 4px rgba(197,150,58,.…)` (gold) | Active swatch / current step |

### 5.3 Borders / rules

Hairlines only: `1px solid rgba(23,21,20,0.10)` on light (`RULE_LIGHT`), `1px solid rgba(255,255,255,0.07)`
on dark (`RULE`). Tables and FAQ rows use `border-top` hairlines — no heavy grids. Accent-bordered chips
use `1px solid rgba(155,106,58,0.45)` (cognac at 45%).

---

## 6. Motion system → slide transitions & builds

The site's motion is centralized and disciplined. Map it directly onto slide **build/entrance** animations
and **transitions**.

| Token | Value | Meaning |
|---|---|---|
| **Signature ease** `EASE` | `cubic-bezier(0.16, 1, 0.3, 1)` | The brand easing — a **slow confident settle, never a bounce**. Use for every build/transition. |
| Reveal duration | `0.85s` (`850ms`) | Fade-up of a headline/block |
| Body/word reveal | `0.55s` | Sentence-by-sentence text reveal |
| Stagger between children | `0.09s` (`90ms`) | Cascade grid items / bullets in one at a time |
| Sentence stagger | `0.08s` | Reveal a paragraph sentence by sentence |
| Card cross-fade (hover) | `1100–1200ms`, same ease | Slow image swap |
| Underline sweep | `650–700ms`, `cubic-bezier(0.22,1,0.36,1)` | CTA underline elongation |
| Small UI transition | `160–200ms ease` | Hover color/border shifts |
| Card hover lift | `whileHover y:-6`, `0.4s` EASE | Interactive tile |
| Base transition token | `--transition-base: 200ms ease-out` | Default UI |
| Slow transition token | `--transition-slow: 400ms ease-out` | Panels, drawers |
| Counter roll-up | `easeOutCubic`, `1500ms` | Animated KPI count-up (data slides) |

**Reveal primitive:** elements start at `opacity:0; translateY(20–24px)` and settle to `opacity:1;
translateY(0)` over 850ms on the signature ease. **→ Slide build recipe:** *Fade + rise 20px, 0.8s,
ease "0.16,1,0.3,1", stagger bullets 0.09s.*

**Viewport trigger:** reveal `once`, a touch before fully in view (`margin: 0px 0px -8% 0px`).

**Accessibility:** everything honors `prefers-reduced-motion: reduce` → no transforms, no transitions.
On slides, keep an un-animated fallback deck / respect "reduce motion" in the presenting app.

---

## 7. Texture & atmospheric treatments

Used *whisper-quiet* — craft, not decoration.

- **Film grain (dark beats):** `asfalt-dark` texture, `opacity: 0.05`, `mix-blend-mode: soft-light`.
  Reserved for onyx punctuation slides. Light-canvas variant: `opacity: 0.022`, `mix-blend-mode: multiply`.
- **Vignette (on imagery / dark slides):**
  `radial-gradient(62% 50% at 50% 42%, rgba(255,255,255,0.05) 0%, transparent 55%)` (soft top light) +
  `radial-gradient(120% 120% at 50% 78%, transparent 60%, rgba(0,0,0,0.55) 100%)` (bottom weight),
  `mix-blend-mode: soft-light`.
- **Image legibility scrim (text over photos):**
  `linear-gradient(to bottom, rgba(14,14,14,0.45) 0%, rgba(14,14,14,0.25) 40%, rgba(14,14,14,0.85) 100%)`.
- **Backdrop blur (sticky header / floating chrome):** `rgba(251,247,240,0.82)` + `blur(16px)`.

---

## 8. Component vocabulary → slide elements

Reusable primitives from the shop and how each maps onto a slide.

| Storefront element | Spec | Slide use |
|---|---|---|
| **Primary CTA (`btn-ink` / `btnInk`)** | fill `INK #171514`, text `BONE`, UI 12px 600, UPPERCASE, `letter-spacing:.10em`, radius 8px, hover `translateY(-1px)` + `opacity:.92` | Primary action / next-step button on a slide |
| **Inverse CTA (`btnIvory`)** | fill `IVORY`, text `ONYX`, same type | Primary CTA **on onyx** slides |
| **Accent CTA (`btnAccent`)** | fill `var(--sp-accent)`, text `--sp-accent-ink` | Themed CTA under the drop-accent |
| **Ghost button (`btnGhost`)** | transparent, `1px` border `rgba(245,240,232,.18)`, dim text | Secondary action on dark |
| **Text link (`sp-textlink`)** | UI 12px 600, UPPERCASE, tracked, animated accent underline | Inline "learn more" affordance |
| **Icon pill / chip** | `padding:8px`, `radius:9999px`, `1px` cognac-45% border, cognac text, UI 11px 600 UPPERCASE | Menu/nav chip, filter tag |
| **Tag / badge** | UI 9px 600, `letter-spacing:.14em`, UPPERCASE, `INK` on `rgba(251,247,240,.92)`, pill radius, `blur(4px)` | "New", "Sold out", status labels on cards |
| **Count badge** | cognac fill, `BONE` text, 9px 700, pill, min 17px | Numeric counter / notification |
| **Card (`sp-card`)** | media `aspect-ratio:4/5`, radius 14px, `CREAM` bg, card shadow; body: eyebrow → serif-italic title → clamped body → price/CTA foot | Content card, feature tile, team card |
| **Editorial rail** | horizontal scroll-snap row, `aspect-ratio:3/4` frames, active **cognac dots** below | Gallery / logo wall / timeline strip |
| **Comparison table** | hairline `border-top` rows, centered value cols, accent check `✓` (`var(--sp-accent)`) vs faint `✗` `rgba(23,21,20,.20)` | Feature / plan / tier comparison |
| **FAQ row** | hairline `border-top`, left-aligned question, +/− affordance | Agenda list, Q&A |
| **Numbered "arc" row** | grid `3rem 1.05fr 1fr`, faint big number + label + body | Step-by-step process, roadmap |
| **Marquee** | infinite `translate3d(0)→(-50%)` track | Logo/partner ticker (auto-scroll) |

---

## 9. Slide-template blueprints

Six master layouts. Each names the surface, type roles, and accent so a deck stays on-system.

### 9.1 Title slide
- **Surface:** `BONE #FBF7F0` (optionally a full-bleed image with the bottom scrim from §7).
- **Eyebrow:** UI 11px, `.22em`, UPPERCASE, `INK_MUTED` — e.g. *"THE WINNER'S CIRCLE · 2026"*.
- **Headline:** Serif **italic 400**, 54–72pt, `INK`, `line-height:1.0`, `max-width:11ch`, `letter-spacing:-.01em`.
- **Sub:** Serif italic, 22–30pt, `INK_BODY`, `max-width:24ch`.
- **Footer/meta:** UI 11px tracked, `INK_MUTED`.
- **Build:** headline fade-up 0.85s EASE; sub delayed +0.15s.

### 9.2 Section divider (the onyx punctuation)
- **Surface:** `ONYX #0E0E0E` + film grain (opacity .05, soft-light) + vignette.
- **Eyebrow:** UI 11px `.22em` UPPERCASE, `rgba(245,240,232,.55)`.
- **Title:** Serif **italic** 32–44pt, `IVORY`, centered, `max-width:26ch`, subtle `text-shadow` if over image.
- Use **rarely** — one or two per deck, to reset attention.

### 9.3 Content / statement slide
- **Surface:** alternate `CREAM` or `PARCHMENT2`.
- **Eyebrow → Grotesque headline (600, 34–44pt, `-.015em`) → body** (Montserrat 14–18pt, `line-height:1.9`, `62ch`).
- Optional single accent underline (cognac) under the eyebrow.
- **Build:** stagger blocks 0.09s.

### 9.4 Data / metric slide
- **Surface:** `BONE` or `SAND_DEEP` (deep warm) for gravity.
- **Big number:** Grotesque 600 (or Serif for a softer read), `INK`; **gold `#C5963A`** for the hero metric.
- **Label:** UI micro-label 9–10px `.18em` UPPERCASE `INK_MUTED`.
- Use the **4-up grid** for KPI rows; hairline rules between.

### 9.5 Quote / interlude slide
- **Surface:** `ONYX` (dramatic) or `PARCHMENT2` (calm).
- **Quote:** Serif **italic 400**, 32–44pt, `IVORY`/`INK`, `line-height:1.25`, centered, `max-width:26ch`.
- **Attribution:** UI 11px tracked UPPERCASE, dim.

### 9.6 Closing / CTA slide
- **Surface:** `ONYX` with grain (mirrors the site's closing section).
- **Eyebrow → serif italic line → `btnIvory` CTA** (fill ivory, onyx text) or accent CTA.
- Keep it to one action.

---

## 10. Quick-reference: theme mapping for slide software

### 10.1 PowerPoint / Google Slides theme color slots

| Theme slot | Hex | Notes |
|---|---|---|
| Text/Background — Dark 1 | `#171514` (INK) | Primary text on light |
| Text/Background — Light 1 | `#FBF7F0` (BONE) | Primary background |
| Text/Background — Dark 2 | `#0E0E0E` (ONYX) | Punctuation background |
| Text/Background — Light 2 | `#F5F0E8` (IVORY) | Text on dark |
| Accent 1 | `#9B6A3A` (COGNAC) | The accent |
| Accent 2 | `#C5963A` (GOLD) | Metallic emphasis |
| Accent 3 | `#3A352F` (INK_BODY) | Body text |
| Accent 4 | `#6B6258` (INK_MUTED) | Captions / eyebrows |
| Accent 5 | `#F4ECDD` (PARCHMENT2) | Alt surface |
| Accent 6 | `#A8D5A2` (SUCCESS) | Positive / included |
| Hyperlink | `#9B6A3A` (COGNAC) | — |

**Theme fonts:** Headings → *Playfair Display* (set italic in masters), Body → *Montserrat*.
Keep a *Bricolage Grotesque* and a geometric-sans (Greycliff substitute) style pair defined for
statement headlines and eyebrows/labels respectively.

### 10.2 Copy-paste palette
```
Onyx        #0E0E0E    Ivory       #F5F0E8    Gold        #C5963A    Gold-dark  #B8872E
Bone        #FBF7F0    Cream       #FCFAF6    Parchment2  #F4ECDD    Sand-deep  #EBE0CC
Ink         #171514    Ink-body    #3A352F    Ink-muted   #6B6258    Cognac     #9B6A3A
Obsidian    #1C1C24    Slate       #4A4A58    Success     #A8D5A2    Midnight   #1A1A2E
Forest      #2D4A3E    Sand        #C9B99A    Parchment   #F2E8D0
```

---

## 11. Guardrails — do / don't

**Do**
- Keep decks **light-led**; reserve onyx for 1–2 divider/closing slides.
- Set headlines in **italic serif**; let the italic be the signature.
- Give slides **air** — wide margins, short measures, one idea per slide.
- Use **one accent** (cognac by default); re-theme per chapter with the drop-accent variable if needed.
- Animate builds with the **signature ease `0.16,1,0.3,1`**, fade + 20px rise, 0.85s, 0.09s stagger.
- Use **warm, soft, directional shadows** tinted `rgba(23,21,20,…)` — never pure black.

**Don't**
- Don't use pure white (`#FFF`) surfaces or pure black text — always warm bone/ink.
- Don't fill large areas with gold; it's a **thin garnish** (rings, key numbers, hairlines).
- Don't bounce, spring, or use fast/snappy transitions — motion is a *settle*.
- Don't mix font roles (no serif buttons, no grotesque body).
- Don't crowd the frame or run body copy past ~62 characters wide.
- Don't introduce a second accent color per deck without the drop-accent rationale.

---

*Derived from the live Success Planner storefront design system. Keep in sync with
`apps/success-planner/src/lib/theme.js`, `index.css`, and `lib/motion.js`.*
