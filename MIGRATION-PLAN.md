# Presentation Migration Plan

## Overview

Migrate from the old "Think Like an Attacker" outline to the new balanced outline focusing on education over fear.

**Old Structure:** 4 parts, 19 slides, attack-heavy (45 min attacker playbook)
**New Structure:** 4 parts, ~18 slides, balanced (25 min landscape, 75 min defense)

---

## Architecture Notes

### How Slides Work
1. **Data**: `src/data/slides.jsx` - Array of slide objects with `type` field
2. **Router**: `src/PresentationApp.jsx` - `renderSlide()` switch maps `type` → component
3. **Slide Components**: `src/components/slides/*.jsx` - Reusable slide layouts
4. **Demo Components**: `src/DemoComponents.jsx` - Interactive demos (keep in one file for now)

### Convention: Multi-file slides
All new slide components should be created as separate files in `src/components/slides/`.

---

## Phase 1: Create New Slide Components

### New Components Needed

| Component | Type | Purpose |
|-----------|------|---------|
| `ArmsRaceSlide.jsx` | `armsRace` | Part 1 opener - stats, both sides adopting AI |
| `StatsSlide.jsx` | `stats` | Reusable stat display (key numbers + sources) |
| `GovernanceSlide.jsx` | `governance` | Part 3 - regulatory landscape, questions |
| `AuditTrailSlide.jsx` | `auditTrail` | Part 3 - 5 pillars, explain-to-jury test |
| `HITLSlide.jsx` | `hitl` | Part 3 - human-in-loop best practices |
| `BoundariesSlide.jsx` | `boundaries` | Part 3 - when AI isn't the answer |
| `RoadmapSlide.jsx` | `roadmap` | Part 4 - 90-day implementation plan |
| `ConversationsSlide.jsx` | `conversations` | Part 4 - hard conversations guide |
| `InsuranceSlide.jsx` | `insurance` | Part 4 - cyber insurance readiness |

### Components to Modify

| Component | Changes |
|-----------|---------|
| `ThreatSlide.jsx` | Update content, reframe from "fear" to "context" |
| `SandwichSlide.jsx` | Move earlier in deck, add OWASP reference |
| `BridgeSlide.jsx` | Update to "Why Defenders Win" framing |
| `OperationalizationSlide.jsx` | Condense, merge with roadmap |

### Components to Keep As-Is

| Component | Reason |
|-----------|--------|
| `TitleSlide.jsx` | Works fine |
| `IntroSlide.jsx` | Works fine |
| `BreakSlide.jsx` | Works fine |
| `ClosingSlide.jsx` | Works fine |
| `ContentSlide.jsx` | Generic, reusable |
| `GridSlide.jsx` | Generic, reusable |

---

## Phase 2: Update Demo Components

### Demos to Keep (in DemoComponents.jsx)

| Demo | Updates Needed |
|------|----------------|
| `AIReconDemo` | Add 2025 stats (1,265% phishing surge, 95% cost savings) |
| `M365ConfigDriftDemo` | Add 23% misconfiguration stat, M365DSC reference |
| `NetworkSegmentationDemo` | Add CISA July 2025 guidance reference |
| `EndpointValidationDemo` | Add Atomic Red Team stats (1,139 tests, 224 techniques) |
| `AlertTriageDemo` | Add 90% faster investigations stat, IBM numbers |
| `EvolutionRace` | Update with new stats (33% cost reduction, 100 days faster) |
| `DeterminismDemo` | Keep as-is, good guardrail illustration |

### Demos to Remove or Condense

| Demo | Reason |
|------|--------|
| `AttackDemo` | Condense into recon demo or cut |
| `TokenHeistDemo` | Optional - can mention without full demo |

### New Demo Content Needed

| Demo | Purpose |
|------|---------|
| Deepfake story callout | Arup $25M, Italian Defense Minister (static slide, not demo) |
| Audit trail walkthrough | Show real audit log from Alert Triage demo |

---

## Phase 3: Update Slide Data

### New slides.jsx Structure

```javascript
export const slides = [
  // ============================================
  // PART 1: THE LANDSCAPE (25 min)
  // ============================================

  // Slide 0: Title (keep)
  { type: 'title', ... },

  // Slide 1: Intro (keep)
  { type: 'intro', ... },

  // Slide 2: Arms Race (NEW)
  { type: 'armsRace',
    title: "The Automation Arms Race",
    subtitle: "Both sides are adopting AI. Now.",
    stats: [...],
    notes: "Frame as 'understand the game' not 'be scared'"
  },

  // Slide 3: Attacker Patterns Condensed (MODIFIED aiRecon)
  { type: 'aiRecon',
    title: "Attacker Patterns",
    subtitle: "Speed, scale, and what we're matching",
    notes: "15 min max. End with 'now let's flip it'"
  },

  // Slide 4: Guardrail Sandwich (MOVED from slide 7)
  { type: 'sandwich', ... },

  // ============================================
  // PART 2: DEFENSIVE AUTOMATION (75 min)
  // ============================================

  // Slide 5: Why Defenders Win (NEW bridge framing)
  { type: 'bridge',
    title: "Why Defenders Win",
    subtitle: "Context, baselines, and legitimate access",
    notes: "IBM stats: $2M savings, 80 days faster"
  },

  // Slide 6: Config Drift Demo
  { type: 'm365Drift', ... },

  // Slide 7: Endpoint Validation Demo
  { type: 'endpointValidation', ... },

  // Slide 8: Segmentation Testing Demo
  { type: 'networkSeg', ... },

  // Slide 9: Alert Triage Demo
  { type: 'alertTriage', ... },

  // Slide 10: Evolution Race
  { type: 'evolutionRace', ... },

  // ============================================
  // BREAK (15 min)
  // ============================================

  // Slide 11: Break
  { type: 'break', ... },

  // ============================================
  // PART 3: GOVERNANCE & TRUST (35 min)
  // ============================================

  // Slide 12: AI Governance Question (NEW)
  { type: 'governance', ... },

  // Slide 13: Auditable AI Workflows (NEW)
  { type: 'auditTrail', ... },

  // Slide 14: When AI Isn't the Answer (NEW)
  { type: 'boundaries', ... },

  // ============================================
  // PART 4: MONDAY MORNING (30 min)
  // ============================================

  // Slide 15: 90-Day Roadmap (NEW)
  { type: 'roadmap', ... },

  // Slide 16: Hard Conversations (NEW)
  { type: 'conversations', ... },

  // Slide 17: Resources & Takeaways
  { type: 'takeaways', ... },

  // Slide 18: Closing Q&A
  { type: 'closing', ... }
];
```

---

## Phase 4: Update PresentationApp.jsx

Add new cases to `renderSlide()` switch:

```javascript
case 'armsRace':
  return <ArmsRaceSlide slide={slide} theme={t} />;

case 'governance':
  return <GovernanceSlide slide={slide} theme={t} />;

case 'auditTrail':
  return <AuditTrailSlide slide={slide} theme={t} />;

case 'hitl':
  return <HITLSlide slide={slide} theme={t} />;

case 'boundaries':
  return <BoundariesSlide slide={slide} theme={t} />;

case 'roadmap':
  return <RoadmapSlide slide={slide} theme={t} />;

case 'conversations':
  return <ConversationsSlide slide={slide} theme={t} />;

case 'insurance':
  return <InsuranceSlide slide={slide} theme={t} />;
```

Update imports at top of file.

---

## Phase 5: Update index.js Exports

Update `src/components/slides/index.js` to export new components.

---

## Execution Order

### Step 1: Structural Setup
- [ ] Create new slide component files (empty shells)
- [ ] Update `src/components/slides/index.js` exports
- [ ] Add switch cases to `PresentationApp.jsx`

### Step 2: Part 1 Slides
- [ ] Create `ArmsRaceSlide.jsx` with 2025 stats
- [ ] Update `AIReconDemo` with new stats and condensed framing
- [ ] Move Guardrail Sandwich earlier (update slides.jsx order)

### Step 3: Part 2 Slides
- [ ] Update `BridgeSlide.jsx` to "Why Defenders Win"
- [ ] Update demo components with 2025 research stats
- [ ] Verify all 4 defensive demos work

### Step 4: Part 3 Slides
- [ ] Create `GovernanceSlide.jsx`
- [ ] Create `AuditTrailSlide.jsx`
- [ ] Create `BoundariesSlide.jsx`

### Step 5: Part 4 Slides
- [ ] Create `RoadmapSlide.jsx`
- [ ] Create `ConversationsSlide.jsx`
- [ ] Update `TakeawaysSlide` with new resources

### Step 6: Final Assembly
- [ ] Rewrite `slides.jsx` with new order
- [ ] Test full presentation flow
- [ ] Update presenter notes
- [ ] Remove unused slide types

---

## Files to Create

```
src/components/slides/
├── ArmsRaceSlide.jsx      (NEW)
├── GovernanceSlide.jsx    (NEW)
├── AuditTrailSlide.jsx    (NEW)
├── BoundariesSlide.jsx    (NEW)
├── RoadmapSlide.jsx       (NEW)
├── ConversationsSlide.jsx (NEW)
└── index.js               (UPDATE)
```

## Files to Modify

```
src/data/slides.jsx        (REWRITE)
src/PresentationApp.jsx    (UPDATE switch + imports)
src/DemoComponents.jsx     (UPDATE stats in demos)
src/components/slides/BridgeSlide.jsx (UPDATE framing)
src/components/slides/SandwichSlide.jsx (UPDATE with OWASP)
```

## Files to Potentially Remove

```
src/components/slides/CISDeepDiveSlide.jsx  (not in new outline)
src/components/slides/ControlsSlide.jsx     (not in new outline)
```

---

## Research References

All slide content should pull from:
- `research/part1-landscape-2025.md`
- `research/part2-defensive-automation.md`
- `research/part3-governance-trust.md`
- `research/part4-monday-morning.md`

Stats and sources are documented with links in these files.
