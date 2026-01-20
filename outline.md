# Think Like an Attacker — Session Outline

**Event:** Right of Boom 2026, Las Vegas
**Date:** February 4, 2026
**Duration:** 3 hours (+ buffer for Q&A)
**Presenters:** Tim Fournet (Rewst) & Roddy Bergeron (Sherweb)

---

## Core Philosophy

- **Educate, don't terrorize** — MSPs are already stressed; empower them, don't panic them
- **Value over description** — Honor the session promise, but prioritize what attendees actually need
- **The Guardrail Sandwich** — The mental model they take home: Deterministic → Probabilistic → Deterministic

---

## Part I: The Landscape (25 min)
*"What's actually happening"*

### 1. Opening: The Automation Arms Race
- Both attackers and defenders are adopting AI simultaneously
- This isn't the future—it's now
- Frame the session: "Understand the game, then win it"

### 2. Attacker Patterns (Condensed)
- 15-minute recon demo showing speed and scale
- Not dwelling on fear—establishing context
- Transition: "This is what automation looks like on offense. Now let's flip it."

### 3. The Guardrail Sandwich
- Introduce the core framework early
- **Deterministic inputs** (code/validation) → **Probabilistic reasoning** (AI) → **Deterministic outputs** (code/validation)
- "Crusty Code → Spicy AI → Crusty Code"
- This becomes the lens for everything that follows

---

## Part II: Defensive Automation (75 min)
*"Same tools, your advantage"*

### 4. Why Defenders Win
- You have: context, logs, baselines, legitimate access
- Attackers have: speed, surprise
- Use AI to leverage YOUR advantages, not just match their speed

### 5. Demo Block

#### Config Drift Detection (~15 min)
- Spot what attackers would exploit before they do
- Continuous validation against known-good baselines
- Maps to attacker recon techniques

#### Endpoint Validation (~15 min)
- Atomic Red Team style testing
- Test your defenses before attackers do
- Safely validate detection capabilities

#### Segmentation Testing (~15 min)
- Prove isolation actually works
- Automated lateral movement simulation
- Validate that controls do what you think they do

#### Alert Triage with AI (~15 min)
- Decision support, not decision making
- Human approval workflows
- Show the guardrail sandwich in production

### 6. Evolution Race
- Visual comparison: Manual → Scripted → Autonomous
- The "aha" moment for automation value
- Message: speed AND accuracy improve together

---

## BREAK (15 min)
*"Process, caffeinate, prepare to operationalize"*

---

## Part III: Governance & Trust (35 min)
*"How to do this without getting fired"*

### 7. The AI Governance Question
- Your clients are asking: "Is AI safe to use?"
- Your insurers are asking: "How are you controlling AI?"
- Your auditors are asking: "Where's the paper trail?"
- You need answers to all three

### 8. Building Auditable AI Workflows
- **Reasoning logs** for every autonomous decision
- **Human-in-the-loop thresholds** — what requires approval?
- **The "explain to a jury" test** — could you defend this decision?
- **Demo:** Walk through an audit trail from an automated response

### 9. When AI Isn't the Answer
- Knowing when NOT to automate
- The boundaries matter as much as the capabilities
- High-stakes decisions that require human judgment
- The cost of getting it wrong vs. the cost of being slow

---

## Part IV: Monday Morning (30 min)
*"What you actually do next"*

### 10. Your 90-Day Roadmap

| Timeframe | Action |
|-----------|--------|
| Week 1-2 | Audit current automation, identify guardrail gaps |
| Month 1 | Pick ONE use case (alert triage recommended) |
| Month 2 | Add logging and human approval workflows |
| Month 3 | Evaluate data, expand or retreat based on results |

### 11. The Hard Conversations
- **Talking to clients** — How to explain AI in your security stack
- **Talking to leadership** — Making the case for AI investment
- **Talking to your team** — AI as augmentation, not replacement

### 12. Resources & Q&A
- Code samples and scripts
- Guardrail templates
- Policy templates for AI governance
- CIS control mappings
- Open floor for questions

---

## Time Summary

| Section | Duration | Purpose |
|---------|----------|---------|
| Part I: The Landscape | 25 min | Context + framework |
| Part II: Defensive Automation | 75 min | Core demos and patterns |
| Break | 15 min | Recharge |
| Part III: Governance & Trust | 35 min | Make it defensible |
| Part IV: Monday Morning | 30 min | Make it actionable |
| **Total** | **3 hours** | Buffer for organic Q&A |

---

## Learning Objectives Delivered

1. ✓ How attacker automation patterns can be repurposed for defense (Parts I & II)
2. ✓ Ways to safely test endpoint detection and network segmentation (Part II demos)
3. ✓ Practical methods to automate ongoing security validation (Parts II & IV)
4. ✓ Steps for building ethical, repeatable testing routines that scale (Parts III & IV)

---

## Key Takeaways for Attendees

1. **The Guardrail Sandwich** — Safe AI means: deterministic validation → AI reasoning → deterministic validation
2. **Defenders have advantages** — Context, baselines, and legitimate access beat raw speed
3. **Governance is capability** — Audit trails and human-in-loop aren't overhead, they're what makes AI trustworthy
4. **Start small, expand with data** — One use case, instrumented well, teaches you more than five deployed blind
