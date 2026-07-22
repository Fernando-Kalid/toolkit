# Analyst's Toolkit — Phase 1 methodology

Read this before sizing (Section 2), benchmarking economics (Section 8), or running the industry-structure analysis (Section 6). It is the quantitative and epistemic backbone of the report.

## Contents
1. Epistemic labeling in practice
2. Market sizing — top-down and bottom-up
3. Reconciling the two sizings
4. Porter's five forces — working checklist
5. Financial benchmark reference ranges
6. Sanity-check heuristics
7. Source-quality hierarchy
8. Common failure modes

---

## 1. Epistemic labeling in practice

Attach a label to every material claim. The reader must never have to guess whether a number is measured or invented.

- **Fact / Hecho** — traceable to a credible source or to arithmetic on sourced inputs. Cite it.
- **Estimate / Estimación** — you derived it. Show the anchor inputs and the arithmetic inline (e.g., "≈ 2.1M SMBs × 8% addressable × $1,200 ACV ≈ $200M — *Estimate*"). Prefer a low/base/high range.
- **Assumption / Supuesto** — an input taken as given to move forward. Flag it so Phase 2 can stress-test it.
- **Hypothesis / Hipótesis** — plausible, directionally supported, not yet confirmed. Frame it as testable.

A useful discipline: if you cannot say *how you would verify it*, it is at best a Hypothesis, not a Fact.

## 2. Market sizing — top-down and bottom-up

Always do **both** and reconcile them. One method alone is a guess; two methods that converge is an insight; two that diverge is the most interesting finding in the section.

**Top-down** — start from a large published aggregate and narrow with defensible filters:
```
TAM (published category revenue)
  × % relevant sub-category
  × % reachable given geography / channel / regulation
  = SAM
  × realistic share capturable in 3–5 yrs (informed by competitive structure)
  = SOM
```
State each filter and its source or logic. The failure mode is unjustified percentages ("we'll get 1%") — every multiplier needs a reason.

**Bottom-up** — build from unit economics upward:
```
# of target buyers (from population / firmographic data)
  × penetration or adoption rate
  × purchase frequency
  × average price / ACV
  = revenue opportunity
```
Bottom-up is usually more credible because each input is inspectable. Prefer it as your base case when the two disagree.

**Definitions to keep straight:** TAM = total demand if you had 100% share; SAM = the slice you can actually serve (geography, segment, channel, regulation); SOM = the slice you can realistically win in the stated horizon.

## 3. Reconciling the two sizings

Put them side by side and explain any gap:

| Method | Estimate (base) | Key drivers | Main uncertainty |
|---|---|---|---|
| Top-down | $X | published TAM × filters | filter %s |
| Bottom-up | $Y | buyers × freq × price | adoption rate |

If top-down ≫ bottom-up, the headline TAM is probably overstated for this business — trust bottom-up. If bottom-up ≫ top-down, you may be defining the category too narrowly, or you have found genuine latent/uncontested demand worth flagging as a Hypothesis. Either way, the *reconciliation* is the deliverable, not the raw numbers.

## 4. Porter's five forces — working checklist

Score each force and, crucially, conclude what it means for **structural profitability**. A high-margin-looking business in a structurally hostile industry is a trap.

- **Rivalry** — number and concentration of players; growth rate (slow growth intensifies rivalry); differentiation vs. commoditization; exit barriers.
- **Barriers to entry** — capital, brand, network effects, switching costs, regulation, distribution access, proprietary tech/data, economies of scale.
- **Supplier power** — concentration of suppliers; uniqueness of input; switching cost; forward-integration threat.
- **Buyer power** — concentration of buyers; price sensitivity; switching cost; backward-integration threat; information symmetry.
- **Substitutes** — availability, relative price/performance, and buyer propensity to switch. Include "do nothing" and non-obvious substitutes.

Close with a one-line verdict: *structurally attractive*, *mixed*, or *structurally difficult* — and the single force that matters most here.

## 5. Financial benchmark reference ranges

Use these as **priors** to sanity-check figures and to fill gaps as clearly-labeled **Estimates**. They are broad orders of magnitude, not sector-specific truths — override them with sourced data whenever you have it.

| Metric | Healthy signal (rough prior) | Notes |
|---|---|---|
| Gross margin — SaaS | 70–85% | below ~65% questions the "software" thesis |
| Gross margin — marketplace (take-rate) | 60–90% on the take, take-rate 10–30% | GMV ≠ revenue |
| Gross margin — DTC / e-commerce | 30–60% | before CAC and fulfillment |
| Gross margin — services | 20–50% | scales with people, not code |
| LTV : CAC | ≈ 3:1 or better | below 1:1 is value-destructive |
| CAC payback | under 12 mo (SMB), under 18–24 mo (enterprise) | longer needs cheap capital |
| Net revenue retention (SaaS) | over 100% (best-in-class 120%+) | expansion offsets churn |
| Monthly logo churn (SMB SaaS) | 1–3% | 5%+ caps growth hard |
| Rule of 40 (growth% + margin%) | ≥ 40 | for scaling software |

When you cite one, mark whether the subject's figure is *above*, *at*, or *below* the prior, and what that implies. Label the prior itself as **Estimate** unless sourced.

## 6. Sanity-check heuristics

- **Reconcile top-down vs. bottom-up** (Section 2). A 10×+ gap means a definitional error somewhere — find it.
- **Share-of-wallet check:** SOM should be a plausible share of SAM given the number and strength of incumbents. "We take 20% in year 2 against three funded incumbents" needs an extraordinary reason.
- **Penetration realism:** compare your assumed adoption rate to analogous categories' historical curves; new categories adopt slower than founders expect.
- **Price × volume triangulation:** if implied volume at your price exceeds the plausible buyer population, the price or the TAM is wrong.
- **Unit-economics closure:** if CAC, margin, and frequency imply LTV:CAC below 1, the model does not work at current inputs — say so plainly (it is a finding, not a failure).

## 7. Source-quality hierarchy

Prefer, in descending order: regulatory filings and government statistics; primary research and the subject's own data; reputable industry analysts and financial data providers; academic and specialized institutions; quality trade press; company self-reporting (directional, treat as claims); anonymous or content-farm sources (avoid). Note the date — in fast-moving categories, a two-year-old number may already be a Hypothesis. When two credible sources conflict, present both and reason about which methodology to trust.

## 8. Common failure modes

- Presenting a single TAM headline as *the* opportunity (always narrow to SAM/SOM and reconcile).
- Unlabeled numbers that read as facts but are guesses.
- Competitive maps on axes that don't drive buying decisions (pick axes that segment the market economically, not cosmetically).
- Confusing GMV with revenue in marketplaces, or ARR with cash.
- Treating a hype trend as a structural shift — separate durable forces from noise in Section 5.
- Skipping "Preliminary implications" — the implication is the point; the data is just evidence for it.
- Drifting into recommendation. Phase 1 stops at attractiveness and open questions.
