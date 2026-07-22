# Module 9 — Metrics, Learning & Results

**Role in the system:** makes the strategy falsifiable and improvable. Co-develops with synthesis — a thesis and its proof conditions are written together, or the proof will be written to flatter the thesis.

## Purpose

Build the proof system: indicators mapped to every link of the causal chain, experiments that convert assumptions into knowledge, feedback loops wired to actual decisions, and pre-registered conditions for concluding the strategy works — or fails. Measurement here is epistemology with a budget: its job is to change minds, not decorate reviews.

## Invoke when

Alongside Module 7 (mandatory co-development); standalone when a user asks for comms KPIs, brand health systems, media measurement, or "how do we know it's working"; in refresh mode when results arrive and the ledger needs updating.

## Required inputs

- The thesis and objectives (Module 7, in draft — that's the point).
- The Leverage Map (Module 6), Behavior Model (Module 5), distinctive assets (Module 3).
- The ledger's A-list and fragility map — the experiment agenda comes from here.
- Existing measurement infrastructure and its known blind spots.

## Expected outputs — the Proof System Spec

1. **The KPI stack, mapped to the chain.** Each link of the thesis gets its indicators: *exposure* (reach, share of relevant attention) → *meaning* (brand tracking on the claim, distinctive-asset recognition and attribution, positioning shift) → *behavior* (the Behavior Model's countable acts: search, trial, switching, menu placement, retention) → *money* (revenue quality, margin, price maintenance, LTV/CAC movement, the leverage-map outcomes). An indicator that maps to no link is decoration and gets cut.
2. **Leading/lagging structure with expected lags.** Which indicators move first and how long the chain takes — stated in advance, so silence at month two is read against the expected lag, not against hope. Brand-building and demand-capture run on different clocks; the spec says which clock each KPI is on.
3. **Brand health indicators.** Mental availability across category entry points, asset fame × attribution, pricing power proxies (price elasticity trend, discount dependence).
4. **Media performance metrics, with attribution honesty.** What each channel is accountable for given its *role* (from Module 7's media logic), and the attribution limits stated plainly. Triangulate — experiments and holdouts, platform data treated as testimony rather than truth, aggregate modeling where spend justifies it. Never let last-click write history.
5. **Experimentation logic.** For each load-bearing assumption: the cheapest decisive test, its cost, its decision consequence ("if X, we do Y; if not-X, we do Z"). An experiment with no decision consequence is a hobby.
6. **Feedback cadence tied to decisions.** Which reviews happen when, and what each is empowered to change: creative rotation weekly, budget shifts monthly, strategy review quarterly, thesis review only against pre-registered conditions — protecting the strategy from both neglect and panic.
7. **Success and failure conditions, pre-registered.** *Working:* the named indicators move in sequence within tolerance. *Failing:* explicit kill/pivot criteria — "if [leading indicator] hasn't moved by [date] despite [delivery threshold met], the thesis is wrong at link [N]." Which link failed determines which module reopens.
8. **Goodhart defenses.** Every efficiency metric paired with an effectiveness metric; every proxy audited periodically against the behavior it proxies; no team graded solely on numbers it can manufacture.

## Quality bar

Every KPI traces to a chain link and a decision. Failure conditions are as specific as success conditions — and neither can be satisfied by activity alone. The team's own delivery metrics (things fully under its control) are labeled as delivery, never as outcomes.

## Definition of success

Six months in, the organization knows more than it did — the ledger has fewer A's, the thesis has survived contact or been revised at the failed link, and reviews change allocations rather than restate them.

## Failure modes

- **Vanity stack.** Impressions and engagement celebrated with no path to a chain link.
- **Attribution theater.** False precision assigning credit; last-click as court of record.
- **Unfalsifiability.** Success defined so any outcome confirms the strategy.
- **Cadence mismatch.** Brand effects judged on performance timelines — the pre-registered lag structure exists to prevent exactly this.
- **Metric capture.** Targets replacing the behaviors they proxy (Goodhart's law operating on schedule).

## Never do

- Never define success exclusively on metrics the team controls end-to-end.
- Never move a kill criterion after launch without recording the move, and its reason, in the ledger.
- Never report a proxy as the thing itself.

## Handoff

To Module 7 (falsification conditions embedded in the thesis), Module 8 (the 90-day proof plan and lag expectations), and back to Module 2 (results update tags: A→K or A→falsified). In refresh mode, findings determine which modules reopen.

## Output shape

```
PROOF SYSTEM — [entity]
CHAIN:  exposure → meaning → behavior → money
  exposure: [KPI, source, cadence]        meaning:  [claim tracking, asset attribution]
  behavior: [countable act ← TB1]         money:    [outcome ← L1, quality not just volume]
LAGS:    [indicator → expected movement window → clock: brand/demand]
EXPERIMENTS: [A#2 → test … → cost … → if pass: … / if fail: reopen module N]
CADENCE: weekly [may change …] · monthly [may change …] · quarterly [may change …]
WORKING IF: [sequence within tolerance] | FAILING IF: [kill criteria, dated, per link]
GOODHART: [efficiency KPI] paired with [effectiveness KPI] · proxy audits [cadence]
```
