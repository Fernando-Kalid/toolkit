---
name: campaign-development
description: >
  Compiles a completed Communication & Media Strategy into a single landed, time-bound campaign —
  brief card, insight, franchise idea platform, seven-test quality gate, channel ecosystem, arc,
  and pre-registered measurement — through a six-step methodology. Use this skill whenever the
  user wants to create, plan, develop, or land a campaign, launch, activation, drop, promotion,
  or seasonal push out of an existing strategy — even if they only say "turn this into a
  campaign," "plan the launch," "I need a campaign for Q4," "let's activate this," "bájame la
  estrategia a una campaña," or "necesito una campaña / un lanzamiento." Also use it to audit or
  red-team an existing campaign idea against the seven discriminating tests (ownership,
  sacrifice, branding, insight, fertility, Tuesday, register), or to generate and score candidate
  campaign ideas from a brief. Accepts the strategy as pasted text, .md files, .doc/.docx files,
  or directly from a comms-media-strategy build earlier in the conversation.
---

# Campaign Development — strategy, compiled down

A campaign is the strategy compiled down: **one objective, one belief-move, one territory, one idea — then sequenced in time.** The strategy is the always-true architecture; the campaign is a thin, focused instantiation that gets its own pass through the same invariants at a fraction of the depth. Almost everything that determines whether a campaign is astonishing or merely competent is decided *before* any execution exists — a shoot, a reel, an offer is the last thing chosen, not the first.

The generative principle is sacrifice: a campaign with nothing it refuses to say and no audience it declines to chase has no shape. Run the six steps in order. Do not skip to the tests or to tactics until Steps 1–3 are locked — that inversion is the single most common way a campaign becomes a pile of well-shot assets with no spine.

## Modes

- **Compile** (default) — a strategy exists; produce one campaign from it via the six steps below.
- **Idea audit** — the user brings an existing campaign idea; run it through `references/tests.md`, return the completed scorecard, the diagnosis, and the highest-leverage repair. No new campaign document unless asked.

## Intake — locate the strategy, then the gaps

The expensive asset already exists. Never rebuild it, and never fabricate what only it (or the user) can supply.

1. **Find the strategy.** In order of preference: a document pasted or attached in the conversation (.md or text); a .docx/.doc file (extract with `pandoc file.docx -t markdown -o out.md`, or the docx skill); a strategy produced earlier in this conversation by `comms-media-strategy`. If several candidates exist, confirm which one governs before anything else.
2. **Map its vocabulary.** Strategies name the same invariants differently. Locate equivalents rather than demanding exact terms:

   | Campaign input | Accept any of |
   |---|---|
   | Territory | meaning territories · positioning platforms · message pillars |
   | Arc | strategic arcs · narrative architecture · story chapters |
   | Belief-move | dual-belief WTB · belief delta · attitude-shift objectives |
   | Segment | audience · target · personas · stakeholder-jobs matrix |
   | Distinctive assets | brand codes · semiotic system · asset estate · taglines, rituals, visual codes |
   | Channel logic | media logic · channel roles · proportion pyramid |
   | Proof system | KPI stack · metrics & learning · measurement framework |

3. **Minimum to run:** the entity/brand, at least one territory-level meaning claim, a belief or attitude target, and a segment. Interview for whatever is missing — ask only for what the user alone can supply, and only for the gaps. Anything still missing after that becomes a declared assumption tagged [S] in the campaign's ledger — never a silent invention.
4. **Constraints:** team size, budget reality, timing window. These discipline Steps 5–6 — a two-person team and a twenty-person team get different ecosystems from the same idea.

## The six steps

Read `references/methodology.md` before running Steps 2–6 at depth — it carries the construction guidance and the evidence-anchored numbers with their caveats.

**Step 1 — Compile the brief onto one card.** One objective, one segment, one territory (a secondary at most), one arc, one belief-move written as a falsifiable sentence — *"from [current belief] to [target belief], for [this person]"* — and the one number that would prove the belief moved. One campaign, one job, one number: if three objectives are on the card, three weak campaigns are wearing one trench coat. **→ GATE A: present the card; wait for confirmation before proceeding.**

**Step 2 — Mine the insight before inventing anything.** An insight is a tension in the audience's life the brand can resolve — the job they'd hire the product to do — not a feature or a fact. Apply the opposite test: if the insight's opposite is obviously stupid, it's a platitude; if the opposite is *also arguably true*, it's real. Output: one insight sentence worth building a year of work on.

**Step 3 — Crack the idea as a franchise, not a firework.** Invent a repeatable, ownable device — a phrase, ritual, format, or visual code — that can run three times and get *richer*, not a clever one-off. Extend the strategy's existing distinctive assets rather than replacing them: consistency compounds, and novelty every cycle throws the compounding away. Compress each platform to one sentence — if it needs a paragraph, it isn't landed. Build 2–3 candidate platforms, each with three concrete example executions (proof of fertility, not decoration), and make the candidates genuinely different resolutions of the tension, not variants of one idea.

**Step 4 — Run the discriminating tests.** Score every candidate against all seven tests in `references/tests.md`, in writing, with one line of evidence per verdict. An idea that fails one test is not "close" — it is a different, weaker idea wearing your idea's clothes. Repair or replace failures before presenting. **→ GATE B: present the surviving candidates with their scorecards and one recommendation; the user picks.**

**Step 5 — Architect the ecosystem and the arc.** Assign each channel one job — not "be everywhere." Split brand-building vs. activation with 60:40 as a movable anchor, not gospel. Concentrate disproportionate resource behind one hero moment and let everything else orbit it; structure content as hero–hub–hygiene; sequence tease → reveal → sustain → convert → afterglow with dates; and name the **first domino** — the single launch act that, if it lands, pulls the rest into motion.

**Step 6 — Instrument, then protect scope.** Pre-register kill and amplify criteria *before* launch — falsification conditions written after the fact will be written so the campaign can't fail. Separate leading indicators from the lagging number. Cut the deliverable list to what the named team can actually execute: over-invest in the hero moment, cut the rest without mercy.

## Gates and the escape hatch

Gates A and B exist because concentration (Step 1) and idea selection (Step 4) are the two judgment calls the user must own; everything else is craft. Present, then wait. If the user explicitly asks for a one-shot run, or genuinely cannot respond, make the call — but state the choice and its reasoning at the gate, tag it [S] in the ledger, and continue. Never choose silently.

## Register

"Astonishing" defaults to loud, and for many brands loud is wrong. Match the mode of astonishment to the brand's register: for a restraint brand, the boldest available move is restraint executed at a level no one else will bother with — a loud execution under an anti-noise thesis fights the brand's own argument and loses. The full doctrine and the Register test live in `references/tests.md`.

## Output

Produce one campaign document per `references/output-template.md`: brief card, insight, platform + executions, completed test scorecard, ecosystem and arc, measurement stub, ledger, implementation checklist, rejected candidates. Save it as a markdown file named `campaign-<brand-or-campaign-slug>.md`, written in the user's working language. Keep load-bearing claims tagged K/A/I/S — the campaign inherits the strategy system's epistemic contract. `references/evidence.md` holds the tiers, sources, and the three standing caveats; consult it when a claim needs its receipt, when the document will face a board, or when the user challenges grounding.

## What this skill refuses

- A brief carrying a menu of objectives, or a belief-move that cannot be falsified.
- Proceeding past a failed test by calling it "close," or past Gate A/B without either user confirmation or a declared, tagged decision.
- Tactics before Steps 1–3 are locked; executions invented before a platform exists.
- An ecosystem the named team cannot execute — scope is a strategic variable, not an aspiration.
- Quoting the evidence base as law. The numbers are observational, largely FMCG-derived anchors: directions, not physics (`references/evidence.md`, caveats).

## File map

```
campaign-development/
├── SKILL.md                    ← this orchestrator
└── references/
    ├── methodology.md          ← six steps expanded · construction guidance · anchored numbers with caveats
    ├── tests.md                ← the seven discriminating tests · register doctrine · scoring protocol
    ├── output-template.md      ← campaign document structure · C1 brief card · C2 scorecard · C3 measurement stub
    └── evidence.md             ← epistemic contract · evidence tiers · full sources · the three standing caveats
```
