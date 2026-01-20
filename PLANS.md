# Right of Boom 2026 - Masterclass Planning

## Session Details
- **Public Title**: "Think Like an Attacker: Automating Red Team Simulations and AI Testing"
- **Internal Title**: The Autonomy of Defense: Architecting the Future of the 8x Security Engineer
- **Presenters**: Tim Fournet (Rewst) & Roddy Bergeron (Sherweb)
- **Date**: Wed Feb 04, 2026
- **Time**: 1:30 PM - 5:00 PM PST (3.5 Hours)
- **Room**: 353
- **Sponsor**: Rewst (Platinum)
- **Tags**: Blue Team, Security, Security Ops, Incident Response, Automation

---

## Official Session Description (What We Promised)

> Tim Fournet, Automation Evangelist at Rewst, and Roddy Bergeron, Cybersecurity Fellow at Sherweb, lead a practical session that begins with an attacker's playbook and transitions into automated testing you can apply to your own environment.
>
> You'll see how attacker-style automation patterns translate into safe, repeatable methods for validating endpoint protection, testing network segmentation, and uncovering configuration gaps. The session explores how AI and automation improve accuracy, speed up validation, and help you think like an attacker.

### What Attendees Were Promised They'd Learn
1. **How attacker automation patterns can be repurposed for defense**
2. **Ways to safely test endpoint detection and network segmentation**
3. **Practical methods to automate ongoing security validation**
4. **Steps for building ethical, repeatable testing routines that scale**

### Delivery Checklist
- [ ] Show attacker playbook / automation patterns
- [ ] Demonstrate translation of attack → defense testing
- [ ] Cover endpoint protection validation
- [ ] Cover network segmentation testing
- [ ] Cover configuration gap discovery
- [ ] Provide practical, take-home automation methods
- [ ] Ensure routines are ethical and repeatable

---

## Gap Analysis: Promise vs Current Content

| What We Promised | What We Have | Gap |
|------------------|--------------|-----|
| Attacker playbook / patterns | AttackDemo, TokenHeistDemo | ✓ Covered |
| Attack → Defense testing translation | Nothing | **MAJOR GAP** |
| Endpoint protection validation | Nothing | **MAJOR GAP** |
| Network segmentation testing | Nothing | **MAJOR GAP** |
| Configuration gap discovery | Mentioned in slides | Needs demo |
| Practical automation methods | EvolutionRace concept | Needs practical takeaways |
| Ethical, repeatable routines | Nothing | **MAJOR GAP** |

### The Disconnect
Current content = "Autonomous SOC incident response"
Promised content = "Red team simulation → Defense testing"

### How to Reconcile
The narrative can bridge both:
1. **Part 1**: "Think Like an Attacker" - Show attacker automation (current demos work)
2. **Part 2**: "Automate Like an Attacker" - Translate attack patterns to defense testing
3. **Part 3**: "Defend at Attacker Speed" - Autonomous response with guardrails

### Missing Demos Needed for Promise Delivery

**NOTE: These need to be REAL demos, not visualizations. CPE credit session.**

#### REAL AI Demo Ideas

**1. Live Phishing Factory (Attacker POV)**
- Actually use an LLM to generate targeted phishing variants
- Show persona research → context gathering → email generation pipeline
- Demonstrate mutation/evasion techniques
- **Safety**: Use obviously fake domains, watermarks, no delivery mechanism
- **Takeaway**: "This is what you're up against"

**2. AI-Powered Reconnaissance Demo**
- Feed public data (LinkedIn, website, DNS) into LLM
- Watch it build an org chart and attack plan
- Show how fast AI identifies targets and entry points
- **Takeaway**: "Your public footprint is their attack surface"

**3. Token Theft + Session Hijack (Lab Environment)**
- Actually demonstrate Evilginx or similar in a sandboxed lab
- Show the real token capture and replay
- Demonstrate why MFA doesn't stop this
- **Takeaway**: "MFA is authentication, not authorization"

**4. AI Alert Triage System (Defense POV)**
- Build a REAL autonomous triage loop:
  - Ingest alert from SIEM/M365
  - AI reasons about context (calendar, travel, history)
  - Deterministic guardrails validate the decision
  - Execute remediation OR escalate
- **Show the actual prompts, the actual reasoning, the actual API calls**
- **Takeaway**: "Here's how to build this yourself"

**5. Config Drift Scanner with AI Analysis**
- Pull real M365/Entra config via Graph API
- Compare against CIS benchmark baseline
- AI explains WHY each drift matters and suggests remediation
- **Takeaway**: Attendees can replicate this in their environments

**6. Autonomous Endpoint Validation**
- Run safe EICAR/behavior tests against endpoints
- AI analyzes the results and identifies gaps
- Generates remediation recommendations
- **Takeaway**: Continuous validation methodology

**7. Network Segmentation Prober**
- Automated boundary testing (can X reach Y?)
- AI analyzes results against expected policy
- Flags violations with context
- **Takeaway**: "Here's how to validate your segmentation"

**8. Incident Response Copilot (Live)**
- Take a real alert (or realistic simulation)
- Show AI walking through investigation steps
- Demonstrate chain-of-thought reasoning
- Show guardrails preventing dangerous actions
- **Takeaway**: "AI as your L1 analyst"

---

## Demo Strategy (Consensus-Validated)

### Multi-Model Consensus (Jan 2026)
Consulted: gpt-5.2-pro (for), gpt-5.2 (against), gpt-5.1-codex (neutral)
**Result**: Strong agreement on restructuring demos for reliability and outcome alignment.

### Key Consensus Findings
1. **4 live demos too risky** → Reduce to 2-3 live + 1 semi-live
2. **Network segmentation MISSING** → Must add (promised outcome #2)
3. **"Autonomous IR" sounds reckless to MSPs** → Reframe as "AI triage + human approval"
4. **Demo brittleness = #1 risk** → Need cached data, offline fallbacks for each
5. **Emotional arc is solid** → Keep Fear→Belief Break→Hope→Empower

### Available Infrastructure
- ✓ Local lab VMs (Docker/VMs)
- ✓ Lab M365/Entra tenant (sandboxed)
- ✗ Production environments

### Revised Demo Structure (Post-Consensus)

```
DEMO 1: AI RECON (Semi-Live)                    [~20 min] → FEAR
├── Live prompt input (company domain)
├── Pre-cached OSINT data (fallback)
├── AI generates attack plan in ~60 seconds
├── CIS Mapping: #3 Data Protection, #14 Security Awareness
└── Takeaway: Script to audit public footprint

DEMO 2: TOKEN THEFT (Visualization)             [~10 min] → BELIEF BREAK
├── Use existing TokenHeistDemo animation
├── Explain real technique without live execution
├── Key message: "MFA is the starting gun, not finish line"
└── Takeaway: Detection queries for token replay

PATTERN: GUARDRAIL PO'BOY (Slides + Discussion) [~25 min] → HOPE
├── Deterministic Input Gates
├── AI Reasoning Layer (show actual prompts)
├── Deterministic Output Validation
├── Human approval workflow
└── Takeaway: Architecture diagram + prompt templates

DEMO 3: CONTINUOUS VALIDATION LOOP (Live)       [~35 min] → EMPOWERMENT
├── M365 Config Drift Scanner
│   ├── Pull tenant config via Graph API
│   ├── Compare against CIS M365 benchmark
│   ├── AI explains deviations and risk
│   └── CIS Mapping: #4 Secure Configuration
├── Network Segmentation Tester (NEW - addresses gap)
│   ├── "Can Host A reach Host B on Port X?"
│   ├── Test DC access, management VLAN boundaries
│   ├── AI analyzes results vs expected policy
│   └── CIS Mapping: #12 Network Infrastructure, #13 Network Monitoring
├── Alert Triage (Decision Support, NOT autonomous)
│   ├── Ingest sample alert
│   ├── AI reasons with context (calendar, history)
│   ├── Recommends action + shows confidence
│   ├── HUMAN APPROVES before execution
│   └── CIS Mapping: #17 Incident Response
└── Takeaway: Graph queries + segmentation test scripts + triage prompts

DEMO 4: ENDPOINT VALIDATION SUITE (Live)        [~25 min] → PRACTICAL TAKEAWAY
├── Run EICAR + safe behavior tests (Atomic Red Team style)
├── Collect detection results from EDR
├── AI analyzes gaps in coverage
├── Generates remediation recommendations
├── CIS Mapping: #10 Malware Defenses
└── Takeaway: Test scripts + analysis prompts + gap report template
```

### Demo Risk Mitigation

| Demo | Live Risk | Mitigation |
|------|-----------|------------|
| AI Recon | OSINT sources change, LLM latency | Pre-cached dataset, "golden run" recording |
| Token Theft | N/A | Visualization only |
| Config Scanner | Graph throttling, permissions | Offline snapshot of tenant config |
| Segmentation | Network issues | Pre-captured test results |
| Alert Triage | Ambiguous alerts, enrichment failures | Scripted alert with known-good response |
| Endpoint Validation | VM/EDR issues | Pre-recorded backup, offline results |

### Primary Takeaways (Must Deliver)
1. **Understand the threat** - Why they need to change (fear factor)
2. **Build their own** - Leave with actual code/prompts they can implement
3. **CIS compliance mapping** - Every demo ties back to specific controls
4. **Governance framework** - Human-in-the-loop, audit trails, approval workflows

### Visualizations (Keep As-Is)
- AttackDemo (42-sec OODA) - Use for concept reinforcement
- EvolutionRace - Use for Manual vs Script vs Autonomous comparison
- DeterminismDemo - Use for teaching when to use AI vs code

---

## Narrative Arc

**Core thesis**: Attackers use AI to move at machine speed. Defenders must respond with autonomous systems—but safely, with guardrails.

### The Emotional Journey
```
FEAR → BELIEF BREAK → HOPE → EMPOWERMENT
```

1. **Fear**: Show attacker speed (42-sec OODA, token theft, phishing at scale)
2. **Belief Break**: "MFA is not the finish line; it's the starting gun"
3. **Hope**: There IS a pattern that works (Guardrail Po'boy)
4. **Empowerment**: You can build this. Here's how.

### Content Ratio
- **35-40% Attacker content** (~70-80 min) - Create urgency
- **60-65% Defender content** (~110-120 min) - Deliver the solution

---

## The "Holy Shit" Moments

These are the belief reversals that make the talk memorable:

1. **"MFA is the starting gun, not the finish line"**
   - TokenHeistDemo: "If I steal the session, your MFA success becomes MY MFA success"

2. **"An attacker runs 100 OODA loops while your tech opens the ticket"**
   - Split-screen: Attacker chain progressing vs Defender workflow (login → VPN → SIEM → pivot → approval)

3. **"Automation fails fast; Autonomy fails safe"**
   - EvolutionRace: Script is fast but brittle, Autonomous is fast AND adaptive

---

## Current State Assessment

### What Exists
- [x] React/Vite presentation app running on port 2028
- [x] 4 themes (Corporate, Terminal, Dramatic, Bayou)
- [x] 20 slides (skeleton structure)
- [x] 4 interactive demos:
  - AttackDemo (42-second OODA loop)
  - EvolutionRace (Manual vs Script vs Autonomous)
  - TokenHeistDemo (MFA bypass visualization)
  - DeterminismDemo (When to use code vs AI)
- [x] Presenter info with headshots, logos, LinkedIn QR codes
- [x] "Guardrail Po'boy" Louisiana theming

### What's Missing (Critical Gaps)

#### Content Gaps
| Section | Blueprint Time | Current Slides | Needed |
|---------|---------------|----------------|--------|
| Hook & Intro | 20 min | 2 slides | Expand 8x Thesis explanation |
| Part I: Compliance | 40 min | 3 slides | Roddy needs 8-10 more slides |
| Part II: Engineering | 40 min | 4 slides + 2 demos | Phishing Factory demo |
| BREAK | 20 min | 0 slides | Break slide needed |
| Part III: Sandwich | 45 min | 4 slides | Multi-slide layer build |
| Part IV: Lab | 30 min | 1 demo | Hands-on lab materials |
| Part V: Wrap | 15 min | 2 slides | Expand governance section |

#### Technical Gaps
- [ ] Break slide ("Back at 3:30")
- [ ] Phishing Factory demo (LLM-generated phishing at scale)
- [ ] Lab infrastructure/materials for Part IV
- [ ] Speaker notes/timing cues
- [ ] Presenter view mode
- [ ] 404 errors for missing images need fixing

---

## Decisions Log

### 2026-01-05
1. **Removed "Electric Rougaroux"** - Content and image slide removed
2. **Renamed "Guardrail Sandwich" to "Guardrail Po'boy"** - Louisiana theming with:
   - Layer 1: French Bread (Top) - Deterministic Input
   - Layer 2: The Roast Beef - Probabilistic Reasoning
   - Layer 3: French Bread (Bottom) - Deterministic Output
   - Footer: "Crusty Code → Spicy AI → Crusty Code"
3. **Expanded slides to viewport width** - Using vw-based widths (85vw-95vw)
4. **Increased font sizes** - Titles: text-6xl/8xl, Body: text-2xl/3xl

---

## TODO - Priority Order (Consensus-Validated)

### P0 - DEMO BUILDS (Critical Path)

**DEMO 1: AI Recon (Semi-Live)** - Est. effort: Medium
- [ ] Python/Node script that takes company domain
- [ ] OSINT data collection (DNS, website scrape, public APIs)
- [ ] LLM prompt to generate attack plan from collected data
- [ ] Pre-cache "golden run" dataset for fallback
- [ ] Record backup video of successful run
- [ ] Test against: Fake company "Acme Corp" or sanitized Rewst/Sherweb

**DEMO 3: Continuous Validation Loop (Live)** - Est. effort: High (merged demo)

Part A: M365 Config Drift Scanner
- [ ] Graph API integration to pull tenant config
- [ ] CIS M365 benchmark baseline (JSON/YAML)
- [ ] Comparison logic + drift detection
- [ ] LLM analysis prompt: "Why this matters" + remediation
- [ ] Offline config snapshot for fallback
- [ ] Test against: Lab M365 tenant

Part B: Network Segmentation Tester (NEW - fills promised outcome gap)
- [ ] Simple connectivity test script (PowerShell/Python)
- [ ] Test matrix: "Can A reach B on port X?"
- [ ] Expected policy definition (what SHOULD be blocked)
- [ ] LLM analysis: Compare results vs policy, explain gaps
- [ ] Pre-captured results for fallback
- [ ] Test against: Lab VMs in different network segments

Part C: Alert Triage (Decision Support)
- [ ] Sample alert generator (or use real lab alert)
- [ ] Context enrichment: calendar lookup, user history, IP reputation
- [ ] LLM reasoning prompt with chain-of-thought
- [ ] Guardrail validation layer (deterministic checks)
- [ ] Human approval UI (simple approve/reject/escalate)
- [ ] Scripted "known-good" alert for reliable demo
- [ ] Test against: Lab M365 tenant

**DEMO 4: Endpoint Validation Suite (Live)** - Est. effort: Medium
- [ ] EICAR + safe behavior test scripts (Atomic Red Team style)
- [ ] Test runner that executes against lab VMs
- [ ] Results collector + formatter
- [ ] LLM analysis prompt: Identify gaps, recommend fixes
- [ ] Gap report template for attendee takeaway
- [ ] Pre-recorded backup with known-good results
- [ ] Test against: Local lab VMs with EDR

### P1 - Presentation Infrastructure
- [ ] Fix 404 image errors (headshots/logos)
- [ ] Add break slide ("Back at 3:30 PM")
- [ ] Add section transition slides (Part I → II → III → IV → V)
- [ ] Build presenter notes view
- [ ] Add timer/clock display

### P2 - Content Expansion
- [ ] Expand 8x Thesis explanation (full slide, not one bullet)
- [ ] Roddy's CIS v8 deep dive slides (8-10 more)
- [ ] CIS control mapping slides for each demo
- [ ] "What you'll take home" summary slides
- [ ] Attendee handout/resource page

### P3 - Polish & Backup
- [ ] Pre-record backup videos of all live demos
- [ ] Export key slides to PDF as fallback
- [ ] Test all demos on conference WiFi simulation (throttled)
- [ ] Rehearsal timing for each section

---

## Open Questions

1. **Lab Format**: What do attendees actually DO in the 30-minute lab?
   - Watch demos?
   - Follow along in their own environments?
   - Breakout discussions?

2. **Phishing Factory Demo**: Build a new demo or use video/screenshots?

3. **Fireside Chat Structure**: Blueprint says "peer conversation" - how to structure slides for back-and-forth between Tim & Roddy?

4. **Backup Plan**: If React app crashes, what's the fallback? PDF export?

---

## Session Timeline Mapping

```
1:30 PM  ┌─────────────────────────────────────────┐
         │  HOOK & INTRO (20 min)                  │
         │  Slides: 1-4                            │
         │  - Title, Tale of Two CISOs             │
         │  - CISO Confessional, 8x Thesis         │
1:50 PM  ├─────────────────────────────────────────┤
         │  PART I: COMPLIANCE GAP (40 min)        │
         │  Slides: 5-14 (NEED TO BUILD)           │
         │  Speaker: Roddy                         │
         │  - CIS Controls v8                      │
         │  - Configuration Drift                  │
         │  - Policy-to-Action Friction            │
2:30 PM  ├─────────────────────────────────────────┤
         │  PART II: ENGINEERING SHIFT (40 min)    │
         │  Slides: 15-22                          │
         │  Speaker: Tim                           │
         │  - Determinism definitions              │
         │  - DeterminismDemo                      │
         │  - AttackDemo (42 seconds)              │
         │  - TokenHeistDemo                       │
3:10 PM  ├─────────────────────────────────────────┤
         │  ☕ BREAK (20 min)                       │
         │  Slide: BREAK SLIDE                     │
3:30 PM  ├─────────────────────────────────────────┤
         │  PART III: THE SANDWICH (45 min)        │
         │  Slides: 24-35 (NEED TO BUILD)          │
         │  Speakers: Both                         │
         │  - Po'boy Overview                      │
         │  - Layer 1 Deep Dive                    │
         │  - Layer 2 Deep Dive                    │
         │  - Layer 3 Deep Dive                    │
4:15 PM  ├─────────────────────────────────────────┤
         │  PART IV: MASTERCLASS LAB (30 min)      │
         │  Slides: 36-40                          │
         │  - EvolutionRace Demo                   │
         │  - Live Demo / Hands-on                 │
4:45 PM  ├─────────────────────────────────────────┤
         │  PART V: WRAP & Q&A (15 min)            │
         │  Slides: 41-44                          │
         │  - Governance & Liability               │
         │  - 2027 Roadmap                         │
         │  - Q&A / LinkedIn QR codes              │
5:00 PM  └─────────────────────────────────────────┘
```

---

## File Structure

```
rightofboom2026/
├── src/
│   ├── PresentationApp.jsx    # Main presentation (746 lines - needs refactor?)
│   ├── DemoComponents.jsx     # Interactive demos
│   ├── main.jsx
│   └── index.css
├── public/
│   └── images/
│       ├── tim-fournet.jpg
│       ├── roddy-bergeron.jpg
│       ├── rewst-logo.png
│       └── sherweb-logo.svg
├── blueprint.md               # Original session outline
├── PLANS.md                   # This file - tracking decisions
└── [standard config files]
```

---

## Notes

- Theme switcher on title slide may be distracting - consider removing or moving
- "42 seconds" stat is used multiple times - need source citation
- Po'boy metaphor: Consider if "Roast Beef = Spicy" makes sense (it doesn't really)
