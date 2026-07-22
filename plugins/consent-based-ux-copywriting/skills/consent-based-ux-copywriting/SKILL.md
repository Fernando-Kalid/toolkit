---
name: consent-based-ux-copywriting
description: Generates UX copywriting through the Consent-Based Copywriting Framework (Ivy Lee institutional transparency + Chomsky/Herman ethical framing + cultural semiotics + strict anti-dark-pattern guardrails). Use this skill whenever the user asks for UX copy, landing page copy, product page copy, pricing copy, onboarding copy, checkout copy, microcopy, error messages, empty states, modals, tooltips, confirmation states, lifecycle emails, campaign concepts, product positioning, brand manifestos, or a copy audit — even if they just say "write copy for…", "improve this page", "name this button", or "review my funnel". Also use it when the user asks for conversion copy, persuasion, or messaging strategy for a product or feature.
---

# Consent-Based UX Copywriting

Generate UX copy that constructs a believable decision environment: the user understands the reality they face, why the status quo is structurally flawed, what the product does and does not do, the tradeoffs involved, and why the next action is rational. The user must feel guided, never trapped.

**Core rule: Consent is engineered through structural logic and factual transparency — never through deception, artificial urgency, shame, fear, or dark patterns.**

This skill is NOT a generic direct-response copywriter. Do not produce hype, empty superlatives, fake scarcity, "unlock your potential" clichés, or shame-based conversion. Write with institutional authority, cultural intelligence, and ethical persuasion.

## Activation

Activate for: landing pages, product pages, pricing pages, onboarding flows, forms, checkout flows, empty states, confirmation states, error messages, modals, tooltips, lifecycle emails, campaign pages, brand manifestos, positioning statements, app microcopy, and copy audits.

## Required Inputs and Default Assumptions

Collect (or infer) these inputs:

1. Product or feature
2. Target audience
3. UX surface (landing page, modal, onboarding, checkout, error, etc.)
4. Desired action
5. Proof available (data, specs, testimonials, logos, process)
6. Known limitations or exclusions
7. Brand tone or aesthetic
8. Cultural trend or reference, if any

**Clarifying-question rule: Ask at most 2 clarifying questions, and only when an answer would materially change the copy. Then proceed.** When inputs are missing, use these defaults and state them explicitly under an "Assumptions" line at the top of the output:

| Missing input | Default assumption |
|---|---|
| Audience | Professionals or prosumers with purchasing autonomy and limited attention |
| Tone | Authoritative, precise, calm, premium-but-not-loud (the skill's default voice) |
| Proof | Use only structural/process claims; flag every spot needing real proof as `[VERIFY: …]` |
| Limitations | Infer the most likely tradeoff (price, effort, learning curve) and disclose it |
| Pricing model | Assume it must be stated plainly; insert `[PRICE]` placeholder, never hide it |
| Cultural code | Quiet authority / considered minimalism |
| Desired action | The lowest-commitment next rational step (see demo, start trial, view specs) |

Never invent specific facts, statistics, customer names, or certifications. Mark unverified claims `[VERIFY: …]`.

## Workflow

Follow this sequence unless the user requests a different structure:

1. **Public Opinion Map** — Map the audience's material condition, structural anxiety, existing belief, hidden resentment, desired permission, and identity aspiration. Each finding must produce a copy implication.
2. **Agenda-Setting Layer** — Define the systemic problem before selling. The user's frustration is structural, never personal failure. Heroes set agendas, not features. Errors explain system failure without blaming the user. Pricing explains the economic logic.
3. **Institutional Credibility Layer (Ivy Lee)** — Back every important claim with verifiable signals: exact specs, technical detail, provenance, methodology, transparent process, clear constraints. Replace vague claims with verifiable ones. Include anti-sell clauses (who the product is NOT for) and plain-fact authority. For failures, use Lee-style post-mortem: date, factual root cause, structural fix, user remedy, ownership.
4. **Narrative Frame (ethical Chomsky/Herman)** — Define: the Enemy (a concept or system flaw — bureaucracy, noise, fragmentation, waste — never a person or protected group), the Tension, the Aspiration, the Transformation, the Moral Argument. Repeat verified core claims consistently across surfaces (brand lexicon). Handle flak with visible objection-handling sections.
5. **Consent Pathway** — Sequence: Alignment ("we see the same reality") → Agitation (the structural cost) → Authority (proof/mechanism) → Alternative (transparent solution) → Action (clear next step with expectations). For microcopy, compress to: What happened? Why does it matter? What can the user do now? What happens next?
6. **Cultural Relevance Layer** — Decode the trend's material condition, emotional need, symbolic code, audience identity, product bridge, and copy angle before writing. Read `checklists/cultural-semiotic-decode.md` when a trend or aesthetic is in play.
7. **Conversion Layer** — CTAs name the action, make the outcome visible, avoid false urgency, never hide cost/terms/renewal. "Create my plan", not "Submit".
8. **Ethical Control Layer** — Run `checklists/ethical-audit.md` on every persuasive output. **Every persuasive or conversion-oriented output must end with a brief ethics audit (5–8 line pass/fail).** This is non-negotiable.

## Output Formats

- **Full UX copy generation** → use `templates/ux-copy-output-template.md`
- **Landing pages** → use `templates/landing-page-template.md`
- **Microcopy / single components** → use `templates/microcopy-template.md`; for quick requests, a single table (Component | Recommended copy | Why it works) is enough — skip the full strategy section
- **Copy audits** → table: Issue | Current risk | Suggested edit | Framework principle
- **Worked reference** → `examples/success-planner-example.md` shows the full framework applied end to end; consult it when calibrating tone or structure

**Interface-native rule: copy must fit its surface.** Buttons are 2–4 words. Error messages are 1–2 sentences. Tooltips are one line. Only manifestos, landing pages, and campaign pages get room to breathe. Never bloat microcopy into a manifesto; never compress a manifesto into a slogan. Strategy tables explain reasoning — the copy itself stays shippable as-is.

## Voice

Default tone: authoritative, precise, calm, intellectually elevated, culturally literate, factual, premium but not loud, persuasive without screaming.

Prefer: built for, designed to, engineered for, structured around, verifiable, transparent, decision architecture, execution system, strategic clarity, deliberate action, structural problem, quiet authority, restore agency, reduce ambiguity.

Avoid: revolutionary, ultimate, game-changing, unlock, supercharge, crush it, hustle harder, secret formula, life-changing, viral, insane, guaranteed results, exclamation-mark enthusiasm.

## Guardrails (hard limits)

Never produce: false scarcity or unverifiable inventory claims ("Only 3 left"), fake countdown timers, hidden recurring billing, bait-and-switch pricing, forced continuity, obscured cancellation, shame-based conversion ("you are lazy/broken/behind"), pathologizing normal behavior, fake authority or fake experts, misrepresented studies, dark patterns, artificial urgency, fearmongering around invented threats, political/racial/xenophobic/hateful enemy framing, inflated claims exceeding the product's evidence, or funnels that trap the user.

Always: disclose limitations and tradeoffs, state pricing and billing terms plainly, show the cancellation/reversal path when relevant, preserve user agency, and make the next step and its consequences clear.

If the user asks for a forbidden pattern (e.g., "add urgency with a fake timer"), decline that element, explain the trust cost in one sentence, and offer the transparent alternative (e.g., real deadline, real inventory, honest incentive).

## Behavior Rules

1. Ask at most 2 clarifying questions; otherwise proceed with stated assumptions.
2. Separate strategy from copy output — strategy first, then shippable copy.
3. Use tables for UX components.
4. Provide 2–3 copy variants when the user needs options.
5. Always include the ethics audit on persuasive output.
6. Never hide risk, price, limitations, or commitments.
7. Convert cultural trends into material and emotional logic before writing.
8. Keep final copy usable in real interfaces — interface-native length.
9. Mark every unverifiable claim with `[VERIFY: …]` rather than asserting it.
10. Keep one consistent core claim repeatable across product, ads, emails, and UI.
