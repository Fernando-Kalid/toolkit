# Module 2 — Epistemic Grounding

**Role in the system:** the ledger every module writes to, and the gate every strategy must pass. Runs as an overlay throughout, and as an audit once at the end.

## Purpose

Keep the strategy honest about what it knows. Separate the known from the assumed, the inferred from the speculative; attach evidence classes; locate where the strategy is strong versus fragile; and forbid claims that cannot responsibly be made yet. A strategy's confidence should be a property of its evidence, not of its prose.

## Invoke when

**Grounding mode:** open the ledger at intake and keep it open — every module tags its load-bearing claims as it works. **Audit mode:** run once between synthesis (7) and presentation (8), and whenever the user asks for a red-team of any strategy, theirs or ours.

## Required inputs

- All materials from intake, each identified by source.
- Claims submitted by other modules for tagging.
- For audit mode: the complete draft strategy plus the accumulated ledger.

## Expected outputs

**The Epistemic Ledger.** Every load-bearing claim tagged:

- **K — Known.** Supported by named evidence. Record the class: first-party data · syndicated/market data · primary research · expert testimony · precedent/analogy · established theory. (An analogy is evidence; it is just weak evidence — say so.)
- **A — Assumed.** Necessary for the strategy, currently unverified. Each A gets a validation plan or an explicit decision to proceed unvalidated, with the exposure named.
- **I — Inferred.** Derived from K-claims. Record the inference and its strength.
- **S — Speculative.** Interesting, unsupported. Quarantined: usable in exploration, never in the executive argument.

**The proof standard.** What counts as proof *for this organization and this decision* — evidence requirements scale with the decision's cost and irreversibility, not with anyone's appetite for certainty. A reversible campaign can run on I; a repositioning cannot.

**The fragility map.** Which strategic elements rest on which claims. Single points of epistemic failure — a thesis resting on one A — get flagged to Module 9 as priority experiments.

**The forbidden-claims register.** Public claims that cannot yet be made (superlatives, "clinically proven," sustainability claims, implied endorsements) for legal, evidential, or reputational reasons.

**Audit memo (audit mode).** The three ways this strategy most plausibly fails; claims whose tags were quietly upgraded along the way; the assumptions that, if false, kill the thesis; verdict — *ship / ship with declared exposures / return to module N*.

## Quality bar

Tagging effort concentrates on load-bearing claims — the ones the thesis dies without — not on trivia. Every A has either a validation plan or a signed exposure. The audit memo would survive being read by the strategy's most hostile competent critic.

## Definition of success

Executives can see exactly where the strategy is solid and where it is a bet — and fund it anyway, with eyes open. Module 9 inherits a ready-made experiment agenda from the A-list and fragility map.

## Failure modes

- **Confidence laundering.** An assumption cited enough times becomes a fact. The ledger exists to make this impossible; watch for tag drift between drafts.
- **Rigor theater.** Meticulously tagging trivial claims while the central bet goes unexamined.
- **Epistemic paralysis.** Demanding proof levels the decision doesn't warrant. The ledger prices uncertainty; it does not prohibit it.
- **Audit capture.** The audit written to reassure rather than to test — a red-team that never draws blood.

## Never do

- Never soften a tag to make the strategy feel stronger; never let S-class claims into the executive argument as fact.
- Never treat absence of evidence as evidence the strategy is wrong — it is evidence the ledger has an A in it.
- Never allow a public claim from the forbidden-claims register into messaging, no matter how well it tests.

## Handoff

Grounding mode never hands off; it accompanies. Audit mode gates Module 8: the strategy passes when the thesis rests on K/I claims plus *declared* A's with exposures priced, and no forbidden claims appear in messaging. A failed audit names the module to reopen — that is backflow working as designed.

## Output shape

```
EPISTEMIC LEDGER — [entity]
#  Claim                                   Tag  Evidence/basis            Load-bearing for   Validation
1  Category growing ~X%                    K    syndicated (source)       thesis, sizing     —
2  Buyers distinguish craft vs industrial  A    —                         positioning        trade interviews, wk 2
3  Premium justified by provenance         I    from #1 + pricing study   pricing power      price test, mkt 1
4  "Gen Z rejects ownership"               S    trend press               (quarantined)      —

FRAGILITY: thesis depends on #2, #3 — single-A exposure on #2 → priority experiment.
FORBIDDEN: "#1 in category" (no basis) · "sustainable" (unverified chain).
AUDIT VERDICT: ship with declared exposures (#2 validation funded, month 1).
```
