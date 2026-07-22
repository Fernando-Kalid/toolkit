# Operator's Toolkit — Phase 3 methodology

Read before Sections 2–7. Formulas and templates for building the model, the GTM, the roadmap, the dashboard, and the experiments. Keep all financial outputs labeled **Illustrative** — these are planning instruments, not forecasts or financial advice.

## Contents
1. Unit-economics math
2. Illustrative 12-month build method
3. GTM-motion selection
4. Funnel math
5. North-Star and KPI selection
6. 30/60/90 roadmap template
7. Experiment design
8. Stage-gate / kill-criteria template

---

## 1. Unit-economics math

Build these as low / base / high with the driver behind each. Prefer the `xlsx` skill so the formulas are live and sensitivity is one cell away.

- **CAC** = fully-loaded acquisition spend ÷ new customers acquired (in the same period). Blend across channels, and also show per-channel where data allows — blended CAC hides the channel that actually works.
- **Contribution margin per customer** = price − variable cost to serve (COGS, payments, support, fulfillment). This, not revenue, is what pays back CAC.
- **LTV** = contribution margin per period × expected lifetime. For recurring: `LTV ≈ (ARPA × gross margin) ÷ churn rate`. For transactional: `avg order contribution × purchases per year × retained years`.
- **LTV:CAC** — target ≈ 3:1 or better; < 1:1 destroys value each sale. Above ~5:1 may mean underinvestment in growth, not virtue.
- **CAC payback (months)** = CAC ÷ monthly contribution margin per customer. Target under ~12 months (SMB) or ~18–24 (enterprise); longer requires patient capital.
- **Breakeven condition** — state plainly what must be true for one customer to be profitable (e.g., "retain ≥ 14 months at ≥ 68% gross margin"). This single sentence is often the most useful line in the model.

## 2. Illustrative 12-month build method

Build revenue *up* from GTM assumptions — never top-down "we'll capture 1% of TAM."
```
new customers/month  (from channel spend ÷ CAC, capped by channel capacity)
  × price / ARPA
  − churn (for recurring)
  = active customers and MRR/revenue by month
revenue − variable costs = gross profit
gross profit − fixed costs (team, tooling, overhead) = operating result / burn
cumulative burn vs. cash = runway; sign flip = breakeven
```
Show **base + downside + upside**, each pinned to one moved driver (e.g., CAC +50%, conversion −30%, ramp slips a quarter). The purpose is sensitivity — which assumption breaks the model — not a single confident line.

## 3. GTM-motion selection

Pick the motion the economics and buyer actually support:

| Motion | Fits when | Primary channels | CAC/notes |
|---|---|---|---|
| Product-led (PLG) | low price, fast time-to-value, self-serve | organic, content, in-product virality | low CAC, needs volume + activation |
| Sales-led | high ACV, complex/considered purchase | outbound, SDR/AE, partnerships | high CAC, needs high LTV to justify |
| Channel/partner | fragmented buyers, existing aggregators | resellers, marketplaces, integrators | CAC shared, margin shared |
| Community/creator | identity-driven, high-trust categories | community, creators, events | slow build, durable moat |

Motion must match pricing from Phase 2: a $30/mo product can't fund an enterprise sales team; a $60k ACV product usually can't be sold purely self-serve.

## 4. Funnel math

Define the stages, assume a conversion rate per step (label each **Estimate**), and derive volume and CAC:
```
traffic/leads → MQL → SQL → trial/demo → paid → retained
```
Work backward from the target: to land N paying customers/month at the assumed step conversions, how much top-of-funnel is needed, and at what channel cost? If the required top-of-funnel exceeds the channel's realistic capacity, the plan is infeasible as drawn — surface that now, not in month 4.

## 5. North-Star and KPI selection

- **North-Star metric** — the single measure that best captures the value customers actually receive (e.g., weekly active teams, GMV, nights booked). It should predict revenue, not just correlate with activity.
- **Input metrics** — the 3–5 drivers the team can directly move that feed the North-Star (breadth, depth, frequency, efficiency).
- **Leading vs. lagging** — leading indicators (activation, engagement) move first and are steerable; lagging (revenue, churn) confirm. Track both; manage on the leading ones.
- **Kill vanity metrics** — cumulative signups, raw impressions, and registered-but-inactive users flatter without informing. Every dashboard metric should be able to change a decision.

## 6. 30/60/90 roadmap template

One primary objective per phase; front-load de-risking.

| Horizon | Primary objective | Key deliverables | Owner (role) | De-risks which assumption |
|---|---|---|---|---|
| Days 0–30 | | | | |
| Days 31–60 | | | | |
| Days 61–90 | | | | |

If everything feels "priority 1," the sequencing isn't done. Force one objective per phase.

## 7. Experiment design

For each load-bearing assumption from Phase 2's kill-criteria:

| Assumption (labeled) | Cheapest test | Success threshold (pre-set) | Timeline | Spend gated on result |
|---|---|---|---|---|
| | | | | |

Rules: decide the threshold *before* running the test (post-hoc goalposts fool everyone); pick the test that most cheaply could prove you *wrong*; gate the next spend increment on the outcome. A good early experiment costs little and can kill a bad bet in weeks.

## 8. Stage-gate / kill-criteria template

Release resources in tranches tied to evidence, not calendar.

| Milestone | Go/continue signal | Kill / pivot trigger | Resource gate released |
|---|---|---|---|
| e.g., first 20 paying customers | CAC ≤ target, activation ≥ X% | CAC 2× target after channel tests | scale budget to $Y |

This turns Phase 2's kill-criteria into an operating discipline: the plan can be stopped as rationally as it was started. Continuing past a triggered kill-criterion should require an explicit, written reason — not inertia.

---

**Reminder on financials:** present ranges, expose drivers, label everything Illustrative, and frame the model as a living planning tool to be updated as real data arrives. Do not present it as a forecast, a guarantee, or financial advice.
