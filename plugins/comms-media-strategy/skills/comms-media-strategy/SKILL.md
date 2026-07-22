---
name: comms-media-strategy
description: >
  Generates complete, executive-ready Communication & Media Strategies for any brand, campaign,
  product line, business model, or institution through a nine-module system grounded in ontology,
  epistemics, semiotics, cultural analysis, behavioral science, and commercial economics. Use this
  skill whenever the user asks for a communication strategy, media strategy, brand strategy,
  campaign strategy, positioning, narrative or messaging architecture, channel strategy, launch or
  turnaround strategy, or an audit/red-team of an existing strategy — even if they only say "help
  me figure out how to market X," "we need a comms plan," "how should this brand show up," or
  "estrategia de comunicación / de medios / de marca." Also use it for partial engagements:
  defining what a brand fundamentally is, semiotic or brand-codes audits, cultural and
  ideological mapping of a market, behavior-change planning, communication KPI systems, or
  converting an existing strategy into a C-suite presentation.
---

# Communication & Media Strategy System

A strategy compiler, not a template. This system produces Communication & Media Strategies that help an organization capture, accumulate, and defend monetary value through legitimate value exchange — symbolic positioning, cultural relevance, behavioral influence, and disciplined media execution. It is built to refuse the genre's two failure products: the media plan with no theory of meaning, and the brand poem with no theory of money.

Working definition, from `references/theory.md`: **a Communication & Media Strategy is a theory of how a specific organization converts meaning into money, engineered into an operating system.** "Theory" means falsifiable. "Operating system" means a team can run it Monday morning. "Specific" means the strategy dies if you swap the brand name.

## The five invariants

Every strategy must contain these in *some* form (full argument and doctrine in `references/theory.md` — read it before the first full build):

| Invariant | The question it answers | Common forms |
|---|---|---|
| Meaning claim | What must we mean, to whom, against what? | Single position · meaning ladder · **territories** · borrowed meaning |
| Causal thesis | What chain runs exposure → meaning → behavior → money? | The strategy's spine; one paragraph, falsifiable |
| Repetition structure | How does communication compound into memory? | Distinctive-asset codes · ritual calendar · **franchises** · cadence · community practice |
| Work specification | What jobs must communication perform, for whom, with what economic warrant? | Single job · funnel jobs · **functions taxonomy** · stakeholder-jobs matrix |
| Proof system | What would show this is working — or failing? | KPI stack tied to the thesis, with pre-registered kill criteria |

Territories, franchises, and functions are the system's **default grammar** — the standard language for expressing invariants 1, 3, and 4, adopted because it is communicable, generative, and yields the territories × functions planning matrix (`references/matrix-instrument.md`). But each form is an invariant core wearing case-specific parameters: the *grammar* is near-universal, the *parameters* (territory carving, function taxonomy, franchise caps, cadence) must be derived from this case's economics, culture, and capacity — never copied from a precedent case. Derivations and any deviations from the grammar are recorded in the artifact's Form Declaration. Full doctrine in `theory.md`.

## The modules

Each module is a contract, not a chapter: it has inputs it must refuse to run without, outputs with a defined shape, a quality bar, failure modes, and handoff criteria. Read the module file when you run it.

| # | Module | Distinct responsibility | Produces |
|---|---|---|---|
| 1 | Ontological Definition | What the entity *is* — kind, category logic, claim to existence, sells vs. represents | Ontology Brief |
| 2 | Epistemic Grounding | What is known / assumed / inferred / speculative; final audit gate | Epistemic Ledger + Audit Memo |
| 3 | Semiotic Architecture | The sign system — codes, assets, rituals, narrative grammar | Semiotic System Spec |
| 4 | Cultural Superstructure | The belief field — ideologies, myths, status games, tensions, belief delta | Cultural Field Map + Belief Delta |
| 5 | Behavioral Influence | What people do, why, what must change, which levers move it legitimately | Behavior Model |
| 6 | Commercial Analysis | The material basis — money mechanics, value pools, where comms has leverage | Material Basis Brief + Leverage Map |
| 7 | Strategy Synthesis | The strategy itself — thesis, meaning architecture, media logic, sacrifices | Strategy Document |
| 8 | Executive Presentation | The decision instrument — argument, ask, rejected alternatives | Exec memo / deck content |
| 9 | Metrics & Learning | The proof system — KPI stack, experiments, kill criteria | Proof System Spec |

Files: `references/01-ontological-definition.md` … `references/09-metrics-learning.md`.

## How the work flows — the handoff model

This is a dependency graph with convergence criteria, **not a pipeline**. Run what the case needs, in the order dependencies allow, at depth proportional to stakes.

```
        ┌──────────────────────────────────────────────────┐
        │  2 EPISTEMICS — ledger open from the first claim │
        │    (grounding overlay ...... final audit gate)   │
        └──────────────────────────────────────────────────┘
              ▲                ▲                 ▲
   1 ONTOLOGY ◄══════════════► 6 COMMERCIAL          (co-iterating pair)
        │                          │
        ▼                          ▼
   4 SUPERSTRUCTURE ─────► 5 BEHAVIOR ◄─── (culture × economics)
        │                          │
        ▼                          ▼
   3 SEMIOTICS ──────────► 7 SYNTHESIS ◄══► 9 METRICS   (co-developed)
                                │
                        [2: audit gate]
                                ▼
                       8 EXEC PRESENTATION
```

**Rules of motion:**

- **Two entries, co-iterating.** Ontology (1) and Commercial (6) start together and exchange drafts: what the entity is shapes how it can make money; how it makes money disciplines what it can claim to be. Ontology without economics is poetry; economics without ontology is accounting.
- **The ledger is always open.** Module 2 is an overlay, not a stage: every module tags its load-bearing claims K/A/I/S as it works. Module 2 then runs once more as the **audit gate** between synthesis and presentation.
- **Culture before signs.** Superstructure (4) maps the belief field before Semiotics (3) designs signs into it — signs acquire meaning from the field, not from the designer.
- **Behavior sits between culture and money.** Module 5 refuses to run without 4's field map and 6's leverage map: levers need cultural warrant and economic value.
- **The synthesis gate.** Module 7 refuses to start until it holds all five inputs (Ontology Brief, Material Basis + Leverage Map, Cultural Field Map + Belief Delta, Behavior Model, Semiotic System), each with ledger tags. At small scale these inputs may be paragraphs, not documents — the gate is about presence, not weight.
- **Thesis and proof are written together.** Module 9 co-develops with 7: a thesis whose falsification conditions are defined after the fact will be defined so it can't fail.
- **Audit before the podium.** The 2-audit gate red-teams the synthesized strategy before 8 renders it. No speculative (S-tagged) claim may carry the executive argument.
- **Backflow is legitimate.** Any downstream module may reopen an upstream conclusion (e.g., synthesis discovers the target behavior is implausible → reopen 5 and 6). Record reopenings in the ledger; they are the system learning, not failing.

## Operating modes

- **Full build** — new strategy from intake. The default described above.
- **Single-lens engagement** — run one module standalone (semiotic audit, cultural map, KPI system…). The module's contract still applies; state which inputs were assumed rather than received.
- **Red-team** — run 2-audit plus `quality-rubric.md` against an existing strategy the user brings. Output: audit memo + scored rubric + the three highest-leverage repairs.
- **Refresh** — inputs changed (new data, new competitor, new culture). The ledger identifies which conclusions depended on what changed; re-run only the affected modules.

## Intake — establish before running

Ask the user for what only they can supply; never fabricate it:

1. **The entity and its layer.** Campaign ≠ brand ≠ product line ≠ business model ≠ institution. Name which layer the strategy serves; strategies fail when written for the wrong layer.
2. **The decision context.** What will be decided, funded, or killed because this document exists? Who reads it? (Feeds module 8 from day one.)
3. **The materials.** Data, research, prior strategies, brand assets, sales realities. Everything received gets ledger-tagged by evidence class; everything missing becomes a declared assumption.
4. **Constraints.** Budget realism, regulatory boundaries, organizational capacity, timeline.
5. **Proportionality.** A market entry or turnaround gets the full graph. A single campaign gets the same invariants at one-tenth the depth. Depth is a cost; spend it where the decision is expensive or irreversible.

## Verification and shipping

- Assemble the final artifact per `references/artifact-structure.md`.
- Score it against `references/quality-rubric.md`. Ship rule: no dimension below 3; average ≥ 4; Causal Integrity and Commercial Traceability both ≥ 4. If it fails, the rubric names which module to reopen.
- Rendering: module 8 decides executive *content*; hand visual production to the user's deck skills (`pptx`, `ophira-deck`, `success-planner-deck`) or `docx` for the strategy document itself.

## File map

```
comms-media-strategy/
├── SKILL.md                              ← this orchestrator
└── references/
    ├── theory.md                         ← invariants · form fit tests · do-not-overfit · base/superstructure
    ├── 01-ontological-definition.md
    ├── 02-epistemic-grounding.md
    ├── 03-semiotic-architecture.md
    ├── 04-cultural-superstructure.md
    ├── 05-behavioral-influence.md
    ├── 06-commercial-analysis.md
    ├── 07-strategy-synthesis.md
    ├── 08-executive-presentation.md
    ├── 09-metrics-learning.md
    ├── matrix-instrument.md              ← territories × functions planning matrix
    ├── artifact-structure.md             ← final strategy document template
    ├── quality-rubric.md                 ← scoring dimensions · ship rule · named tests
    └── example-activation.md             ← two worked cases showing divergent form selection
```

Any module is designed to be extracted later as a standalone skill: its contract is self-contained, and its dependencies are named as inputs rather than assumed as context.

## What this system never does

- Ship a strategy missing any of the five invariants, using a form whose invariant-level fit failed, or carrying form parameters copied from a precedent case instead of derived from this one.
- Let a speculative claim carry the executive argument, or let analysis volume impersonate strategy — if nothing was refused, nothing was decided.
- Recommend influence mechanics that depend on the audience not understanding them, exploit manufactured anxiety, or promise what the material basis cannot deliver.
- Produce the same parameters for different businesses. Sharing the grammar across strategies is a feature; sharing carvings, taxonomies, and cadences across different economics is the bug — the anti-template clause in `theory.md` is a standing test of the system itself.
